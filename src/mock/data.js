export const KanbanDemoData = [
  {
    name: "backlog",
    id: "col-1",
    description: "Backlogsssss",
    leads: [
      { name: "Look into render bug in dashboard", id: "lead1", column: "col-1", order: 0 },
      { name: "SOX compliance checklist", id: "lead2", column: "col-1", order: 1 },
      { name: "[SPIKE] Migrate to Azure", id: "lead3", column: "col-1", order: 2 },
      { name: "Document Notifications service", id: "lead4", column: "col-1", order: 3 },
    ],
  },
  {
    name: "todo",
    id: "col-2",
    description: "How many todo?",
    leads: [
      {
        name: "Research DB options for new microservice",
        id: "lead5",
        column: "col-2",
        order: 0,
      },
      {
        name: "Postmortem for outage",
        id: "lead6",
        column: "col-2",
        order: 1,
      },
      { name: "Sync with product on Q3 roadmap", id: "lead7", column: "col-2", order: 2 },
    ],
  },
  {
    name: "doing",
    id: "col-3",
    description: "what we doing?",
    leads: [
      {
        name: "Refactor context providers to use Zustand",
        id: "lead8",
        column: "col-3",
        order: 0,
      },
      {
        name: "Add logging to daily CRON",
        id: "lead9",
        column: "col-3",
        order: 1,
      },
    ],
  },
  {
    name: "done",
    id: "col-4",
    description: "this is doned",
    leads: [
      {
        name: "Set up DD dashboards for Lambda listener",
        id: "lead10",
        column: "col-4",
        order: 0,
      },
    ],
  },
];
