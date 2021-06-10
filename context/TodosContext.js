// React
import { createContext, useState } from 'react';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const refreshTodos = async () => {
    try {
      const res = await fetch('/api/getTodos');
      const lastestTodos = await res.json();
      setTodos(lastestTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    try {
      const res = await fetch('/api/createTodo', {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: { 'Content-Type': 'application/json' },
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => {
        return [newTodo, ...prevTodos];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await fetch('/api/updateTodo', {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {
          'content-type': 'application/json',
        },
      });

      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch('/api/deleteTodo', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });

      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TodosContext.Provider
      value={{ todos, setTodos, refreshTodos, updateTodo, deleteTodo, addTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
