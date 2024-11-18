import React from "react";
import "./DisplayDropdown.css";
import Display from "../../assets/Display.svg";
import Down from "../../assets/down.svg";

const DisplayDropdown = ({ groupBy, orderBy, setGroupBy, setOrderBy }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDropdown = () => setIsOpen((prevState) => !prevState);

    const handleSelection = (setter, value) => {
        setter(value);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <img src={Display} />
                <p>Display</p>
                <img src={Down} />
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-section">
                        <label>
                            <span>Grouping</span>
                            <select
                                value={groupBy}
                                onChange={(e) =>
                                    handleSelection(setGroupBy, e.target.value)
                                }
                            >
                                <option value="status">Status</option>
                                <option value="user">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </label>
                    </div>
                    <div className="dropdown-section">
                        <label>
                            <span>Ordering</span>
                            <select
                                value={orderBy}
                                onChange={(e) =>
                                    handleSelection(setOrderBy, e.target.value)
                                }
                            >
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayDropdown;
