import "./App.css";
import React, {
  useState,
  Fragment,
  useCallback,
  useEffect,
  SetStateAction,
} from "react";
import TodoItem from "./component/TodoItem";
import Header from "./component/Header";
import { FilterType, EnterType } from "./component/type/Type";
import Footer from "./component/Footer";

type TodoListProps = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [text, setText] = useState("");

  const getLocalStorage = localStorage.getItem("todoList");

  let parsedToDos = [];

  if (getLocalStorage !== null) {
    parsedToDos = JSON.parse(getLocalStorage);
  }

  const [todoList, setTodoList] = useState<TodoListProps[]>(parsedToDos);

  const [filterValue, setFilterValue] = useState("all");

  const onKeyworldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value.trim());
    },
    []
  );

  const onKeyworld = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === EnterType.ENTER_TYPE) {
        setTodoList([
          ...todoList,
          {
            id: todoList.reduce((max, todo) => Math.max(todo.id, max), -1) + 1,
            title: text,
            completed: false,
          },
        ]);

        setText("");
      }
    },
    [text, todoList]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      setTodoList(todoList.filter((item) => item.id !== id));
    },
    [todoList]
  );

  const completeFlag = useCallback(
    (id: number) => {
      setTodoList(
        todoList.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    },
    [todoList]
  );

  const onFilterList = useCallback((filter: SetStateAction<string>) => {
    return setFilterValue(filter);
  }, []);

  const getFilteredTodos = useCallback(
    (filter: string) => {
      if (filter === FilterType.ACTIVE) {
        return todoList.filter((item) => item.completed === false);
      } else if (filter === FilterType.COMPLETED) {
        return todoList.filter((item) => item.completed === true);
      } else {
        return todoList;
      }
    },
    [todoList]
  );

  const onClearCompleted = useCallback(() => {
    setTodoList(todoList.filter((item) => item.completed === false));
  }, [todoList]);

  const listLength = todoList.length;

  const completedLength = todoList.filter(
    (item) => item.completed === false
  ).length;

  const completedAll = useCallback(() => {
    const completeData = todoList.every((item) => item.completed);
    setTodoList(
      todoList.map((item) => ({ ...item, completed: !completeData }))
    );
  }, [todoList]);

  const textUpdate = useCallback(
    (e: any, id: number): void => {
      setTodoList(
        todoList.map((items) =>
          items.id === id ? { ...items, title: e.target.value } : items
        )
      );
    },
    [todoList]
  );

  useEffect(() => {
    window.localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <Fragment>
      <section className="todoapp">
        <Header text={text} onKeyUp={onKeyworld} onChange={onKeyworldChange} />
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={listLength - completedLength === listLength}
          />
          <label htmlFor="toggle-all" onClick={completedAll}>
            Mark all as complete
          </label>
          <ul className="todo-list">
            {getFilteredTodos(filterValue).map((item) => (
              <div key={item.id}>
                <TodoItem
                  title={item.title}
                  completed={item.completed}
                  onChange={() => completeFlag(item.id)}
                  onClick={() => deleteTodo(item.id)}
                  onBlur={(e) => textUpdate(e, item.id)}
                  onKeyUp={(e) => textUpdate(e, item.id)}
                />
              </div>
            ))}
          </ul>
        </section>
        <Footer
          filterValue={filterValue}
          completedLength={completedLength}
          onClearCompleted={onClearCompleted}
          onFilterList={onFilterList}
        />
      </section>
    </Fragment>
  );
}

export default App;
