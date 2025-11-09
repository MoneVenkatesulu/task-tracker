import { useState } from "react";

import { TableData, SelectEl, EditBtn } from "./styledComponents";

function TaskItem({ eachTask, reFetchTaskList }) {
  const [editing, setEditing] = useState(false);

  const [newData, setNewData] = useState({
    priority: eachTask.priority,
    status: eachTask.status,
  });

  const {
    id,
    title,
    description,
    priority,
    due_date: dueDate,
    status,
    created_at: createdAt,
  } = eachTask;

  const updateTaskList = async () => {
    try {
      const url = `https://task-tracker-backend-tah7.onrender.com/tasks/${id}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      };

      const response = await fetch(url, options);

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      console.log(data.message);
      reFetchTaskList();
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  const onSave = () => {
    setEditing(false);
    updateTaskList();
  };

  return (
    <tr>
      <TableData>{id}</TableData>
      <TableData>{title}</TableData>
      <TableData>{description}</TableData>

      {editing ? (
        <TableData>
          <SelectEl
            name="priority"
            value={newData.priority}
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </SelectEl>
        </TableData>
      ) : (
        <TableData>{priority}</TableData>
      )}

      <TableData>{dueDate}</TableData>

      {editing ? (
        <TableData>
          <SelectEl
            name="status"
            value={newData.status}
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </SelectEl>
        </TableData>
      ) : (
        <TableData>{status}</TableData>
      )}

      <TableData>{createdAt}</TableData>
      <td>
        {editing ? (
          <EditBtn type="button" onClick={onSave}>
            Save
          </EditBtn>
        ) : (
          <EditBtn type="button" onClick={() => setEditing(true)}>
            Edit
          </EditBtn>
        )}
      </td>
    </tr>
  );
}

export default TaskItem;
