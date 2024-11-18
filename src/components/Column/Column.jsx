import React from "react";
import "./Column.css";
import NoPriority from '../../assets/No-priority.svg';
import LowPriority from '../../assets/Img - Low Priority.svg';
import MediumPriority from '../../assets/Img - Medium Priority.svg';
import HighPriority from '../../assets/Img - High Priority.svg';
import UrgentPriority from '../../assets/SVG - Urgent Priority colour.svg';

const Column = ({ data }) => {
  return (
    <div className="column-container">
      {Object.keys(data).map((groupKey) => (
        <div key={groupKey} className="column">
          <h3>{groupKey}</h3> {/* groupKey will be the userName when grouped by user */}
          {data[groupKey].map((ticket) => (
            <div key={ticket.id} className="ticket">
              <div className="ticket-header">
                <p className="ticket-id">{ticket.id}</p>
                <div className="user-logo">
                  {ticket.userName ? ticket.userName[0].toUpperCase() : "U"}
                </div>
              </div>

              <div className="ticket-content">
                <input
                  type="checkbox"
                  className="ticket-checkbox"
                  id={`checkbox-${ticket.id}`}
                />
                <p className="ticket-title">{ticket.title}</p>
              </div>

              <div className="ticket-priority">
                {
                  ticket.priority === 0 && <img src={NoPriority} alt="No Priority" className="priority-img"/> ||
                  ticket.priority === 1 && <img src={LowPriority} alt="Low Priority" className="priority-img"/> ||
                  ticket.priority === 2 && <img src={MediumPriority} alt="Medium Priority" className="priority-img"/> ||
                  ticket.priority === 3 && <img src={HighPriority} alt="High Priority" className="priority-img"/> ||
                  ticket.priority === 4 && <img src={UrgentPriority} alt="Urgent Priority" className="priority-img"/>
                }

                {
                    <div className="tag">
                        <div className="dot"></div>
                        <p className="tag-title">{ticket.tag}</p>
                    </div>
                }
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Column;
