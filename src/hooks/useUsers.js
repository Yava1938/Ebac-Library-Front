import { useEffect, useState, useCallback } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { events } from "../services/events";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async () => {
    const data = await getUsers();
    setUsers(data || []);
  }, []);

  const removeUser = async (id) => {
    await deleteUser(id);
    await loadUsers();
    events.emit("refreshDashboard"); 
  };

  useEffect(() => {
    loadUsers(); 

    const unsubscribe = events.on("refreshDashboard", loadUsers);
    return unsubscribe;
  }, [loadUsers]);

  return { users, removeUser };
};