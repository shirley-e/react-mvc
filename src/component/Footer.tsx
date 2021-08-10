import React from "react";
import { FilterType } from "./type/Type";

interface FooterProps {
  completedLength: number;
  filterValue: string;
  onClearCompleted: () => void;
  onFilterList: (filter: string) => any;
}
function Footer({
  completedLength,
  filterValue,
  onClearCompleted,
  onFilterList,
}: FooterProps) {
  const listLength = completedLength === 1 ? "item" : "items";
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{completedLength}</strong>
        {listLength} left
      </span>
      <ul className="filters">
        <li>
          <a
            className={filterValue === FilterType.ALL ? "selected" : ""}
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onFilterList(FilterType.ALL);
            }}
          >
            All
          </a>
        </li>
        <li>
          <a
            className={filterValue === FilterType.ACTIVE ? "selected" : ""}
            href="#/active"
            onClick={(e) => {
              e.preventDefault();
              onFilterList(FilterType.ACTIVE);
            }}
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={filterValue === FilterType.COMPLETED ? "selected" : ""}
            href="#/completed"
            onClick={(e) => {
              e.preventDefault();
              onFilterList(FilterType.COMPLETED);
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
