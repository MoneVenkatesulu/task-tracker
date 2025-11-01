import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import TasksInsights from "./pages/TasksInsights";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app-content responsive-container">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/insights" element={<TasksInsights />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
