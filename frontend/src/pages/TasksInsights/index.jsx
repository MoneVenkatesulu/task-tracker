import { useState, useEffect } from "react";

import fetchStatusConstants from "../../constants";
import LoadingView from "../../components/LoadingView";
import FailureView from "../../components/FailureView";

import { TaskListHeading, InsightText } from "./styledComponents";

function TasksInsights() {
  const [fetchStatus, setFetchStatus] = useState(
    fetchStatusConstants.inProgress
  );
  const [insight, setInsight] = useState({});

  const fetchInsights = async () => {
    try {
      const response = await fetch(
        "https://task-tracker-backend-tah7.onrender.com/insights"
      );

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      setInsight(data);
      setFetchStatus(fetchStatusConstants.success);
    } catch (e) {
      console.log(`Error: ${e.messagge}`);
      setFetchStatus(fetchStatusConstants.failure);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const tasksInsightsView = () => {
    const { insightStr } = insight;

    return (
      <div>
        <TaskListHeading>Tasks Insights</TaskListHeading>
        <InsightText>{insightStr}</InsightText>
      </div>
    );
  };

  switch (fetchStatus) {
    case fetchStatusConstants.inProgress:
      return <LoadingView />;
    case fetchStatusConstants.failure:
      return <FailureView />;
    case fetchStatusConstants.success:
      return tasksInsightsView();
    default:
      return null;
  }
}

export default TasksInsights;
