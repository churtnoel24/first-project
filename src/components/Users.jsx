import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(user => {
        return <li key={user.id}>{user.name}, PHONE Number {user.phone}</li>
      })}
    </ul>
  );
}

export default Users;
