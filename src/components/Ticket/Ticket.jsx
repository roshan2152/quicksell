import React from "react";
import "./Ticket.css";
import { groupImages, priorityImages } from "../Images";

const Ticket = ({ ticket, groupBy }) => {
    return (
        <div key={ticket.id} className="ticket">
            <div className="ticket-header">
                <p className="ticket-id">{ticket.id}</p>
                {groupBy !== "user" && (
                    <div className="user-logo">
                        {ticket.userName
                            ? ticket.userName[0].toUpperCase()
                            : "U"}
                    </div>
                )}
            </div>

            <div className="ticket-content">
                {groupBy === "status" && <></>}
                {groupBy === "user" && (
                    <img
                        src={groupImages[ticket.status]}
                        alt={ticket.status}
                    />
                )}
                {groupBy === "priority" && <></>}
                <p className="ticket-title">{ticket.title}</p>
            </div>

            <div className="ticket-priority">
                {ticket.priority >= 0 &&
                    ticket.priority < priorityImages.length &&
                    groupBy !== "priority" && (
                        <img
                            src={priorityImages[ticket.priority]}
                            alt={`${ticket.priority} Priority`}
                            className="priority-img"
                        />
                    )}

                <div className="tag">
                    <div className="dot"></div>
                    <p className="tag-title">{ticket.tag}</p>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
