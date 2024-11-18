import React, { useState, useEffect } from "react";
import "./KanbanBoard.css";
import Column from "../Column/Column";
import DisplayDropdown from "../DropdownToggle/DisplayDropdown";

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupBy, setGroupBy] = useState(
        () => localStorage.getItem("groupBy") || "status"
    );
    const [orderBy, setOrderBy] = useState(
        () => localStorage.getItem("orderBy") || "priority"
    );

    const priorityMapping = {
        0: "NoPriority",
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Urgent",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://api.quicksell.co/v1/internal/frontend-assignment"
                );
                const data = await response.json();

                setTickets(data.tickets);
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("groupBy", groupBy);
        localStorage.setItem("orderBy", orderBy);
    }, [groupBy, orderBy]);

    const userMap = users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
    }, {});

    const groupTickets = () => {
        switch (groupBy) {
            case "status":
                return tickets.reduce((acc, ticket) => {
                    const key = ticket.status;
                    acc[key] = acc[key] || [];
                    acc[key].push(ticket);
                    return acc;
                }, {});
            case "user":
                return tickets.reduce((acc, ticket) => {
                    const key = userMap[ticket.userId];
                    acc[key] = acc[key] || [];
                    ticket.userName = userMap[ticket.userId];
                    acc[key].push(ticket);
                    return acc;
                }, {});
            case "priority":
                return tickets.reduce((acc, ticket) => {
                    const key = priorityMapping[ticket.priority];
                    acc[key] = acc[key] || [];
                    ticket.priorityLabel = priorityMapping[ticket.priority];
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

    return (
        <div className="kanban-container">
            <DisplayDropdown
                groupBy={groupBy}
                orderBy={orderBy}
                setGroupBy={setGroupBy}
                setOrderBy={setOrderBy}
                className="dropdown"
            />

            <div className="kanban-board">
                <Column data={groupedAndSortedTickets} groupBy={groupBy} />
            </div>
        </div>
    );
};

export default KanbanBoard;
