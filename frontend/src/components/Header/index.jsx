import {
  HeaderContainer,
  AppTitle,
  TaskTabContainer,
  TaskTab,
} from "./styledComponents";

function Header() {
  return (
    <HeaderContainer className="responsive-container">
      <div>
        <AppTitle>Task Tracker</AppTitle>
      </div>
      <TaskTabContainer>
        <TaskTab to="/">Task List</TaskTab>
        <TaskTab to="/add-task">Add Task</TaskTab>
        <TaskTab to="/insights">Insights</TaskTab>
      </TaskTabContainer>
    </HeaderContainer>
  );
}

export default Header;
