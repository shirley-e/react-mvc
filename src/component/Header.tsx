import React from "react";

interface HeaderProps {
  text: string;
  onChange: (...args: any[]) => any;
  onKeyUp: (...args: any[]) => any;
}

function Header({ text, onChange, onKeyUp }: HeaderProps) {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={text}
      />
    </header>
  );
}

export default Header;
