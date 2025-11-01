const requireTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  next();
};

const requireDueDate = (req, res, next) => {
  const { dueDate } = req.body;
  if (!dueDate) {
    return res.status(400).json({ message: "Due Date is required." });
  }

  next();
};

const requirePriority = (req, res, next) => {
  const { priority } = req.body;

  if (!["Low", "Medium", "High"].includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority should be in Low, Medium or High" });
  }

  next();
};

const requireStatus = (req, res, next) => {
  const { status } = req.body;

  if (!["Open", "In Progress", "Done"].includes(status)) {
    return res
      .status(400)
      .json({ message: "Status should be in Open, In Progress or Done" });
  }

  next();
};

const validatePriority = (req, res, next) => {
  const { priority } = req.body;

  if (priority !== undefined && !["Low", "Medium", "High"].includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority should be in Low, Medium or High" });
  }

  next();
};

const validateStatus = (req, res, next) => {
  const { status } = req.body;

  if (
    status !== undefined &&
    !["Open", "In Progress", "Done"].includes(status)
  ) {
    return res
      .status(400)
      .json({ message: "Status should be in Open, In Progress or Done" });
  }

  next();
};

module.exports = {
  requireTitle,
  requireDueDate,
  requirePriority,
  requireStatus,
  validatePriority,
  validateStatus,
};
