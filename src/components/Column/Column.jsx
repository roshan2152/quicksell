import React from "react";
import "./Column.css";
import Ticket from "../Ticket/Ticket";
import { groupImages } from "../Images";

const Column = ({ data, groupBy }) => {
    return (
        <div className="column-container">
            {Object.keys(data).map((groupKey) => (
                <div key={groupKey} className="column">
                    <div className="heading">
                        <div className="group-name">
                            {groupImages[groupKey] ? (
                                <img
                                    src={groupImages[groupKey]}
                                    alt={groupKey}
                                    className="column-img"
                                />
                            ) : (
                                <div className="user-logo">
                                    {data[groupKey][0]?.userName
                                        ? data[groupKey][0].userName[0].toUpperCase()
                                        : "U"}
                                </div>
                            )}
                            <h4>{groupKey}</h4>
                        </div>

                        <div>
                            <img src={groupImages.Add} />
                            <img src={groupImages.Dots} />
                        </div>
                    </div>

                    {data[groupKey].map((ticket) => (
                        <Ticket key={ticket.id} ticket={ticket} groupBy={groupBy} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Column;
