import React, { useState, useEffect } from "react";
import "./KanbanBoard.css";
import Column from "./Column/Column";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [orderBy, setOrderBy] = useState("priority");

  // Priority mapping
  const priorityMapping = {
    0: "NoPriority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();

        setTickets(data.tickets);
        setUsers(data.users); // Assuming data.users contains user info
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Create a userId to userName mapping
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const groupTickets = () => {
    if (!Array.isArray(tickets)) return {};

    switch (groupBy) {
      case "status":
        return tickets.reduce((acc, ticket) => {
          const key = ticket.status || "Uncategorized";
          acc[key] = acc[key] || [];
          acc[key].push(ticket);
          return acc;
        }, {});
      case "user":
        return tickets.reduce((acc, ticket) => {
          const key = userMap[ticket.userId] || "Unassigned";
          acc[key] = acc[key] || [];
          ticket.userName = userMap[ticket.userId] || "Unknown";
          acc[key].push(ticket);
          return acc;
        }, {});
      case "priority":
        return tickets.reduce((acc, ticket) => {
          const key = priorityMapping[ticket.priority] || "NoPriority";
          acc[key] = acc[key] || [];
          ticket.priorityLabel = priorityMapping[ticket.priority] || "NoPriority"; // Store the string priority label
          acc[key].push(ticket);
          return acc;
        }, {});
      default:
        return {};
    }
  };

  const sortTickets = (groupedTickets) => {
    return Object.keys(groupedTickets).reduce((sortedGroups, key) => {
      sortedGroups[key] = [...groupedTickets[key]].sort((a, b) => {
        if (orderBy === "priority") {
          return b.priority - a.priority;
        } else if (orderBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
      return sortedGroups;
    }, {});
  };

  const displayTickets = () => {
    const grouped = groupTickets();
    return sortTickets(grouped);
  };

  const groupedAndSortedTickets = displayTickets();
  console.log(groupedAndSortedTickets);

  return (
    <div className="kanban-container">
      <div className="controls">
        <label>
          Group By:
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label>
          Order By:
          <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      <div className="kanban-board">
        <Column data={groupedAndSortedTickets} />
      </div>
    </div>
  );
};

export default KanbanBoard;
