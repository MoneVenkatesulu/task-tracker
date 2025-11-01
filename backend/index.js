const express = require("express");
const cors = require("cors");
const getDB = require("./src/db/database");
const tasksRouter = require("./src/routes/tasks.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", tasksRouter);

let db = null;
const PORT = 5000;

const initializeDBandServer = async () => {
  try {
    db = await getDB();

    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}/`)
    );
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBandServer();
