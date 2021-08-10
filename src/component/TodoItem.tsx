import React, { ChangeEventHandler, useState } from "react";

interface TodoItemProps {
  title: string;
  completed: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: () => void;
  onBlur?: (...args: any[]) => any;
  onKeyUp?: (...args: any[]) => any;
}
function TodoItem({
  title,
  completed,
  onChange,
  onClick,
  onBlur,
  onKeyUp,
}: TodoItemProps) {
  const [editor, setEditor] = useState<boolean>(false);
  const [text, setText] = useState(title);

  const doubleClickTitleUpdate = () => {
    setEditor((prevState) => !prevState);
  };

  const handleTextChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditor(false);
    onBlur?.(e);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditor(false);
      onKeyUp?.(e);
    }
  };

  return (
    <li className={completed ? "completed" : editor === true ? "editing" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={onChange}
        />
        <label onDoubleClick={doubleClickTitleUpdate}>{title}</label>

        <button className="destroy" onClick={onClick} />
      </div>

      <input
        className="edit"
        type="text"
        value={text}
        onChange={handleTextChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        autoFocus
      />
    </li>
  );
}

export default TodoItem;
