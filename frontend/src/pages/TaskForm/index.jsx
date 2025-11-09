import { useState } from "react";

import {
  TaskFormContainer,
  TaskFormContent,
  AddTaskHeading,
  TaskFormEl,
  TextLabel,
  TitleInput,
  DescriptionInput,
  SubContainer,
  SelectEl,
  DateInputbar,
  AddTaskBtn,
  SuccessMsg,
} from "./styledComponents";

function TaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Open",
  });

  const [showWarning, setShowWarning] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const minDate = new Date().toISOString().split("T")[0];

  const AddTaskToDB = async () => {
    try {
      const url = "https://task-tracker-backend-tah7.onrender.com/tasks";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(url, options);

      if (!response.ok) throw new Error(response.message);

      const data = await response.json();
      setSuccessMsg(`${data.message} with id ${data.taskId}`);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };

  const onClickAddTask = (event) => {
    event.preventDefault();
    if (formData.title.trim(" ") === "" || formData.dueDate === "") {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    AddTaskToDB();
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      status: "Open",
    });
  };

  return (
    <TaskFormContainer>
      <TaskFormContent>
        <AddTaskHeading>Add Task</AddTaskHeading>
        <TaskFormEl>
          <TextLabel htmlFor="title">Title</TextLabel>
          <TitleInput
            type="text"
            id="title"
            name="title"
            placeholder="Enter Task Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <TextLabel htmlFor="description">Description</TextLabel>
          <DescriptionInput
            rows={5}
            name="description"
            id="description"
            placeholder="Enter Description..."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <SubContainer>
            <label htmlFor="priority">Priority</label>
            <SelectEl
              name="priority"
              id="priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  priority: e.target.value,
                }))
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </SelectEl>
          </SubContainer>
          <SubContainer>
            <label htmlFor="duedate">Due Date</label>
            <DateInputbar
              type="date"
              id="duedate"
              name="duedate"
              min={minDate}
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dueDate: e.target.value,
                }))
              }
            />
          </SubContainer>
          <SubContainer>
            <label htmlFor="status">Status</label>
            <SelectEl
              name="status"
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </SelectEl>
          </SubContainer>
          <AddTaskBtn type="submit" value="Add Task" onClick={onClickAddTask} />
          {showWarning && <p>*Task title and due dates are required.</p>}
          {successMsg !== "" ? <SuccessMsg>{successMsg}</SuccessMsg> : null}
        </TaskFormEl>
      </TaskFormContent>
    </TaskFormContainer>
  );
}

export default TaskForm;
