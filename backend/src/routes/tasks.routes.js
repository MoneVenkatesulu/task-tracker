const express = require("express");
const getDB = require("../db/database");
const {
  requireTitle,
  requireDueDate,
  requirePriority,
  requireStatus,
  validatePriority,
  validateStatus,
} = require("../middlewares/middleware.js");

const router = express.Router();

router.post(
  "/tasks",
  requireTitle,
  requireDueDate,
  requirePriority,
  requireStatus,
  async (req, res) => {
    const { title, description, priority, dueDate, status } = req.body;

    try {
      const db = await getDB();

      const result = await db.run(
        `INSERT INTO tasks (title, description, priority, due_date, status) VALUES (?, ?, ?, ?, ?);`,
        [title, description, priority, dueDate, status]
      );

      res.json({ message: "Task successfully created", taskId: result.lastID });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message });
    }
  }
);

router.get("/tasks", async (req, res) => {
  const { priority = "", status = "" } = req.query;

  try {
    const db = await getDB();

    const result = await db.all(
      `SELECT * FROM tasks WHERE priority LIKE ? AND status LIKE ?;`,
      [`%${priority}%`, `%${status}%`]
    );

    res.json({ tasks: result });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put("/tasks/:id", validatePriority, validateStatus, async (req, res) => {
  const { id } = req.params;
  const { priority, status } = req.body;

  let updates = [];
  let values = [];

  if (priority) {
    updates.push("priority = ?");
    values.push(priority);
  }

  if (status) {
    updates.push("status = ?");
    values.push(status);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No data provided to update." });
  }

  values.push(id);

  try {
    const db = await getDB();

    await db.run(
      `UPDATE tasks SET ${updates.join(", ")} WHERE id = ?;`,
      values
    );

    res.json({ message: "Task updated successfully." });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/insights", async (req, res) => {
  try {
    const db = await getDB();

    const opened = await db.get(
      `SELECT COUNT(*) AS count FROM tasks WHERE status = "Open";`
    );

    const priorityLow = await db.get(
      `SELECT COUNT(*) AS count FROM tasks WHERE priority = "Low";`
    );

    const priorityMedium = await db.get(
      `SELECT COUNT(*) AS count FROM tasks WHERE priority = "Medium";`
    );

    const priorityHigh = await db.get(
      `SELECT COUNT(*) AS count FROM tasks WHERE priority = "High";`
    );

    const curDate = new Date();
    curDate.setDate(curDate.getDate() + 3);

    const compareDate = `${curDate.getFullYear()}-${curDate.getMonth()}-${curDate.getDate()}`;

    const soonDues = await db.get(
      `SELECT COUNT(*) AS count FROM tasks WHERE due_date <= ?;`,
      [compareDate]
    );

    const totalTasks = await db.get(`SELECT COUNT(*) AS count FROM tasks;`);

    let insightStr = "";
    let count = 0;

    if (opened.count > 0) {
      insightStr = `${opened.count} tasks are in Open status. `;
    }

    if (priorityLow.count > 0) {
      count = parseInt((priorityLow.count / totalTasks.count) * 100);
      insightStr += `${count}% tasks are Low priority. `;
    } else if (priorityLow.count < priorityMedium.count) {
      count = parseInt((priorityMedium.count / totalTasks.count) * 100);
      insightStr += `${count}% tasks are Medium priority. `;
    } else if (priorityMedium.count < priorityHigh.count) {
      count = parseInt((priorityHigh.count / totalTasks.count) * 100);
      insightStr += `${count}% tasks are High priority. `;
    }

    if (soonDues.count > 0) {
      insightStr += `${soonDues.count} tasks are due in next 3 days. `;
    }

    res.json({ insightStr });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
