# Task Tracker - Notes

- **Database:** SQLite — lightweight, serverless, easy to set up for small apps.
- **Schema:** `tasks` table with id, title, description, priority (Low/Medium/High), due_date, status (Open/In Progress/Done), created_at.
- **Backend:** Express.js REST API with middleware for input validation; endpoints: `POST /tasks`, `GET /tasks`, `PUT /tasks/:id`, `GET /insights`.
- **Frontend:** React with functional components and hooks; key components: Header, TaskForm, TaskList, TaskItem, TasksInsights.
- **Insights Logic:** Counts open tasks, calculates priority distribution (%), and tasks due in next 3 days.
- **Future:** Add authentication, state management (Redux/Context), and notifications.
