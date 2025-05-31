import React, { useState, useEffect } from "react";
import "./App.css";
export default function App() {
  const BASEURL = "https://jsonplaceholder.typicode.com";
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [result, setResult] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASEURL}/users`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const searchUser = (e) => {
    e.preventDefault();
    const foundUser = users.find(user =>
      user.username.toLowerCase() === userName.toLowerCase()
    );
    if (foundUser) {
      setResult(foundUser);
    } else {
      setResult("User not found");
      setTodos([]);
    }
  };

  useEffect(() => {
    if (result && typeof result === "object") {
      const fetchTodos = async () => {
        try {
          const res = await fetch(`${BASEURL}/todos?userId=${result.id}`);
          const data = await res.json();
          setTodos(data);
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };
      fetchTodos();
    }
  }, [result]);

  return (
    <div className="form-container">
      <form onSubmit={searchUser}>
        <input
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="Enter Username"
          list = "usernames"
        />
        <datalist id = 'usernames'>
          {users.map((user) => (
            <option value={user.username}>{user.username}</option>
          ))}
        </datalist>
        <button type="submit">Search</button>
      </form>

      {result && (
        <div className="result">
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <div>
              <h3>{result.name}</h3>
              <p>Email: {result.email}</p>
              <p>Username: {result.username}</p>
            </div>
          )}
          {todos.length < 1 ? "Nothing to do" : (
            <div className="todos">
              <ol>
                {todos.map((task) => (
                  <li key={task.id}>{task.title} - {task.completed ? "Done" : "Pending"}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
