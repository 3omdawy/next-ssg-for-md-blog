---
title: "Thinking in React"
date: "2024-12-15"
author: "Yoga"
tags: ["react", "frontend", "tutorial", "state-management"]
category: "React"
description: "A comprehensive guide to designing and implementing React applications following best practices - from component hierarchy to performance optimization."
draft: false
---

## 📖 References

- [Thinking in React - React documentation](https://react.dev/learn/thinking-in-react)

## Starting Point

We have the **UI design** and the **API contract** ready.

Time to implement the frontend 😀.

What are the steps that we should follow to design and implement our frontend components in React?

---

## Steps

### 1. Break down the UI into a **component hierarchy**

💡 UI Design => list of components with their hierarchy

- The main question here is **how to set the boundaries on grouping components together or splitting them**. In sense there is some art to it, but generally it should follow the single responsibility principle.

> if a component considered is too simple and not reusable then it can be a part of its parent component ... at least initially. Start with the most simple implementation and then extract the common parts into separate components.

💡 API Contract => **data flow**

- Which component will read from the API (or write to it)
- How the data (props) will flow from parent to child and what its format is

> If the API response is not mapped to the UI design elements then some "massaging" for the data is needed to fit the needs of the UI components. This is better done by a separate data transformation helper function (that can be tested in isolation) called by the component consuming the API.

---

### 2. Build a **static version** in React

💡 Output: the markup and styling (static UI implementing the UI design)

Renders static UI without any interactivity (i.e. JSX + styling from fixed data, without state or effects), but based on the **actual data model** (i.e. with a stubbed JSON object with the same format that should return from the API) - or by mocking the API response.

> Here, we implement the output of the previous step + the UI look and feel.

---

### 3. Implement **UI states**

💡 Output: dynamic app in terms of UI

This is really important because the component (and all its child components) are rerendered when a state changes, so states should be wisely chosen.

- States are things that:

  - Are dynamic not static.
  - Are not passed as props from parent to child.
  - Cannot be inferred from another state or from the props.

```javascript
// ✅ Good
const [items, setItems] = useState([]);
const [filter, setFilter] = useState("");
const filteredItems = items.filter((item) => item.includes(filter));

// ❌ Avoid
const [filteredItems, setFilteredItems] = useState([]);
```

> Note: if form inputs do not need to be controlled (i.e. rely on browser checks and do the final validation on form submission) then form inputs should not be states.

- Decide the state management mechanism (useState / useReducer / the context API / a global store like Redux or Zustand)
- Think about the component that owns each state: Lift state to the lowest common ancestor that needs to read or update it
- Implement the inverse data flow path if needed (callbacks from child components to update the parent state, since in React data flows only from the parent to the child)
- Think also about the initial value per state

> More at this brilliant course on Frontend Masters about [State Management in React](https://frontendmasters.com/courses/react-nextjs-state/)

---

### 4. Finalize **server states and side effects**

💡 Output: data-synced app with external effects

1. Implement event handlers for user interactions (onClick, onChange, onSubmit, etc.)
2. Manage side effects: things that happen outside of the component (i.e. API calls for data fetching, events from an event system [frontend or backend], etc.). Here `useEffect` or an event handler can be used.
3. Finalize the supporting states like loading / disabled / error states.

---

### 5. Add performance optimizations **if needed**

💡 Output: app with improved UX

If needed based on measurements, implement performance optimizations like:

1. Memoization (if not done automatically by the new React Compiler)
2. Transitions (to avoid blocking interactions with the UI when you click something that takes time to calculate => keep the UI responsive while performing larger background tasks like calling an LLM)
3. Optimistic renders (if you know what the UI should look like, but the sync with the backend is not done yet ... like messaging apps)
4. Deferred values (like when having a slider to update image properties - or a search bar with live searching). This is better than doing debouncing.

> More at this brilliant course on Frontend Masters about [Intermediate React](https://frontendmasters.com/courses/intermediate-react-v6/)
