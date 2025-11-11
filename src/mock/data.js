export const KanbanDemoData = [
  {
    name: "new leads",
    id: "col-1",
    description: "Recently captured leads awaiting qualification.",
    leads: [
      { name: "Acme Corp - Website Inquiry", id: "lead1", column: "col-1", order: 0 },
      { name: "Globex Ltd - Referral from John D.", id: "lead2", column: "col-1", order: 1 },
      { name: "Starlight Media - Demo Request", id: "lead3", column: "col-1", order: 2 },
      { name: "BrightTech Solutions - Trade Show Lead", id: "lead4", column: "col-1", order: 3 },
    ],
  },
  {
    name: "qualified",
    id: "col-2",
    description: "Leads that have been contacted and meet qualification criteria.",
    leads: [
      {
        name: "Northwind Traders - Interested in Enterprise Plan",
        id: "lead5",
        column: "col-2",
        order: 0,
      },
      {
        name: "BlueWave Analytics - Pricing Discussion Scheduled",
        id: "lead6",
        column: "col-2",
        order: 1,
      },
      {
        name: "Evergreen Foods - Needs Proposal",
        id: "lead7",
        column: "col-2",
        order: 2,
      },
    ],
  },
  {
    name: "negotiation",
    id: "col-3",
    description: "Leads currently in contract or pricing discussions.",
    leads: [
      {
        name: "UrbanGrid Energy - Proposal Sent",
        id: "lead8",
        column: "col-3",
        order: 0,
      },
      {
        name: "Pinnacle Health - Legal Review Pending",
        id: "lead9",
        column: "col-3",
        order: 1,
      },
    ],
  },
  {
    name: "closed won",
    id: "col-4",
    description: "Deals successfully closed and converted to customers.",
    leads: [
      {
        name: "Nova Retail Group - Enterprise Contract Signed",
        id: "lead10",
        column: "col-4",
        order: 0,
      },
    ],
  },
];
