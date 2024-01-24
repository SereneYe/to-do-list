import { useState } from "react";

const initialPlans = [
  {
    name: "plan1",
    type: "Sleeping",
    date: "12/12",
    priority: "plan-priority2",
    description: "plan1-des",
    id: 333,
    finish: false,
  },
  {
    name: "plan2",
    type: "Eating",
    date: "12/13",
    priority: "plan-priority1",
    description: "plan2-des",
    id: 222,
    finish: false,
  },
  {
    name: "plan3",
    type: "Sleeping",
    date: "12/14",
    priority: "plan-priority3",
    description: "plan3-des",
    id: 111,
    finish: false,
  },
];

function Button({ className, onClick, children }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [plans, setPlans] = useState(initialPlans);
  const [showAddForm, setShowAddForm] = useState(false);
  function handleShowAddForm() {
    setShowAddForm((showAddForm) => !showAddForm);
  }

  function handleAddPlans(plan) {
    setPlans((plans) => [...plans, plan]);
    setShowAddForm(false);
  }

  function handleDeletePlan(id) {
    setPlans((plan) => plan.filter((plan) => plan.id !== id));
  }

  function handleTogglePlan(id) {
    setPlans((plan) =>
      plan.map((plan) =>
        plan.id === id ? { ...plan, finish: !plan.finish } : plan
      )
    );
  }
  function handleClearPlans() {
    setPlans([]);
  }
  function handleDeleteSelected() {
    setPlans((plan) => plan.filter((plan) => plan.finish === false));
  }
  return (
    <div className="app">
      <div class="sidebar">
        <PlanTitle />
        <PlanList
          plans={plans}
          onDeletePlan={handleDeletePlan}
          onTogglePlan={handleTogglePlan}
          onDeleteAll={handleClearPlans}
          onDeleteSelected={handleDeleteSelected}
        />
        {/* <AddPlanForm showAddForm={showAddForm} /> */}
        {showAddForm && <AddPlanForm onAddPlan={handleAddPlans} />}
        <Button className={`initial-add-button`} onClick={handleShowAddForm}>
          {showAddForm ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="4"
              stroke="currentColor"
              className="initial-add-button"
              width="20"
              height="20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="4"
              stroke="currentColor"
              className="initial-add-button"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}

function PlanTitle() {
  return <h1>🌸 TO DO LIST ✨</h1>;
}

function PlanList({
  plans,
  onDeletePlan,
  onTogglePlan,
  onDeleteSelected,
  onDeleteAll,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedPlans;
  if (sortBy === "input") sortedPlans = plans;
  if (["priority", "type"].includes(sortBy))
    sortedPlans = plans
      .slice()
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  if (["date", "finish"].includes(sortBy))
    sortedPlans = plans
      .slice()
      .sort((a, b) => Number(a[sortBy]) - Number(b[sortBy]));

  return (
    <ul className={`plan-list`}>
      <div className="button-box">
        <select
          className="sort-button"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="priority">Sort by importance</option>
          <option value="type">Sort by type</option>
          <option value="finish">Sort by completion</option>
          <option value="date">Sort by date</option>
        </select>
        <Button className="clear-button" onClick={onDeleteSelected}>
          Clear selected
        </Button>
        <Button className="clear-button" onClick={onDeleteAll}>
          Clear All
        </Button>
      </div>
      {sortedPlans.map((plan) => (
        <Plan
          plan={plan}
          key={plan.id}
          onDeletePlan={onDeletePlan}
          onTogglePlan={onTogglePlan}
        />
      ))}
    </ul>
  );
}

function Plan({ plan, onDeletePlan, onTogglePlan }) {
  return (
    <li className={`plan-item ${plan.priority}`}>
      <h3 style={plan.finish ? { textDecoration: "line-through" } : {}}>
        {plan.name}
      </h3>

      <p style={plan.finish ? { textDecoration: "line-through" } : {}}>
        <span>{plan.date}</span>
        {` [${plan.type}]`}
      </p>

      <div class="check-box">
        <input
          type="checkbox"
          id={plan.id}
          value={plan.finish}
          onChange={() => onTogglePlan(plan.id)}
        />
        <label for={plan.id}>
          <svg viewBox="0,0,50,50">
            <path d="M5 30 L 20 45 L 45 5"></path>
          </svg>
        </label>
      </div>
      <Button className={`button-detail`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          width="20"
          height="20"
          stroke="currentColor"
          className="detail-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </Button>
      <Button className={`button-delete`} onClick={() => onDeletePlan(plan.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          strokeWidth="1.8"
          stroke="currentColor"
          className="delete-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </Button>
    </li>
  );
}

function AddPlanForm({ showAddForm, onAddPlan }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !type || !priority) return;
    const newPlan = {
      name,
      type,
      date: "12/12",
      priority,
      description: "plan1-des",
      id: crypto.randomUUID(),
      finish: false,
    };
    onAddPlan(newPlan);
    setName("");
    setType("");
    setPriority("");
  }
  return (
    // <form className={`add-plan ${showAddForm ? "show" : ""}`}>
    <form className={`add-plan`} onSubmit={handleSubmit}>
      <label>Plan Name</label>
      <input
        type="text"
        placeholder="Enter Your Plan"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Plan Type</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="" disabled hidden>
          Choose Type
        </option>

        <option value="Sleeping">Sleeping</option>
        <option value="Eating">Eating</option>
        <option value="Playing">Playing</option>
        <option value="Coding">Coding</option>
      </select>
      <label>Plan Importance</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="" disabled hidden>
          Choose Priority
        </option>
        <option value="plan-priority1">Very</option>
        <option value="plan-priority2">Normal</option>
        <option value="plan-priority3">Other</option>
      </select>
      <Button>ADD</Button>
    </form>
  );
}
