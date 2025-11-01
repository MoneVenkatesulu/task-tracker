import { useState, useEffect } from "react";

import fetchStatusConstants from "../../constants";
import LoadingView from "../../components/LoadingView";
import FailureView from "../../components/FailureView";
import TaskItem from "../../components/TaskItem";

import {
  TaskListHeading,
  FilterContainer,
  FilterTitle,
  RadioInputEl,
  FiltersBtn,
  TableData,
} from "./styledComponents";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const navigate = useNavigate();

  const [fetchData, setFetchData] = useState({
    taskList: [],
    fetchStatus: fetchStatusConstants.inProgress,
  });

  const [selected, setSelected] = useState({
    priority: "",
    status: "",
  });

  async function getAllTasks() {
    try {
      setFetchData((prev) => ({
        ...prev,
        fetchStatus: fetchStatusConstants.inProgress,
      }));

      const response = await fetch(
        `http://localhost:5000/tasks?priority=${selected.priority}&status=${selected.status}`
      );

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      setFetchData({
        taskList: data.tasks,
        fetchStatus: fetchStatusConstants.success,
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);

      setFetchData((prev) => ({
        fetchData: prev.fetchData,
        fetchStatus: fetchStatusConstants.failure,
      }));
    }
  }

  useEffect(() => {
    getAllTasks();
  }, [selected]);

  const successView = () => {
    if (fetchData.taskList.length === 0) {
      return (
        <div className="no-data-view">
          <h3>No Tasks available!</h3>
          <p>You can clear added filters or add new task</p>
          <div>
            <FiltersBtn
              type="button"
              onClick={() =>
                setSelected({
                  priority: "",
                  status: "",
                })
              }
            >
              Clear Filters
            </FiltersBtn>

            <FiltersBtn type="button" onClick={() => navigate("/add-task")}>
              Add new task
            </FiltersBtn>
          </div>
        </div>
      );
    }

    return (
      <div>
        <FilterContainer>
          <FilterTitle>Priority:</FilterTitle>
          <RadioInputEl
            type="radio"
            id="Low"
            name="priority"
            value="Low"
            checked={selected.priority === "Low"}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, priority: e.target.value }))
            }
          />
          <label htmlFor="Low">Low</label>
          <RadioInputEl
            type="radio"
            id="Medium"
            name="priority"
            value="Medium"
            checked={selected.priority === "Medium"}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, priority: e.target.value }))
            }
          />
          <label htmlFor="Medium">Medium</label>
          <RadioInputEl
            type="radio"
            id="High"
            name="priority"
            value="High"
            checked={selected.priority === "High"}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, priority: e.target.value }))
            }
          />
          <label htmlFor="High">High</label>
        </FilterContainer>

        <FilterContainer>
          <FilterTitle>Status:</FilterTitle>
          <RadioInputEl
            type="radio"
            id="Open"
            name="status"
            value="Open"
            checked={selected.status === "Open"}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, status: e.target.value }))
            }
          />
          <label htmlFor="Open">Open</label>
          <RadioInputEl
            type="radio"
            id="In Progress"
            name="status"
            value="In Progress"
            checked={selected.status === "In Progress"}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, status: e.target.value }))
            }
          />
          <label htmlFor="In Progress">In Progress</label>
          <RadioInputEl
            type="radio"
            id="Done"
            name="status"
            value="Done"
            checked={selected.status === "Done"}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, status: e.target.value }))
            }
          />
          <label htmlFor="Done">Done</label>
        </FilterContainer>

        <FiltersBtn
          type="button"
          onClick={() =>
            setSelected({
              priority: "",
              status: "",
            })
          }
        >
          Clear Filters
        </FiltersBtn>

        <TaskListHeading>Task List</TaskListHeading>

        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <TableData>ID</TableData>
              <TableData>Title</TableData>
              <TableData>Description</TableData>
              <TableData>Priority</TableData>
              <TableData>Due Date</TableData>
              <TableData>Status</TableData>
              <TableData>Created At</TableData>
              <TableData>Edit Task</TableData>
            </tr>
          </thead>

          <tbody>
            {fetchData.taskList.map((eachItem) => (
              <TaskItem
                key={eachItem.id}
                eachTask={eachItem}
                reFetchTaskList={() => getAllTasks()}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  switch (fetchData.fetchStatus) {
    case fetchStatusConstants.inProgress:
      return <LoadingView />;
    case fetchStatusConstants.failure:
      return <FailureView />;
    case fetchStatusConstants.success:
      return successView();
    default:
      return null;
  }
}

export default TaskList;
