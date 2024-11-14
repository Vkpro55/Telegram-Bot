import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user")
      .then((res) => {
        console.log("res data:", res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
      });
  }, []);

  console.log(users)

  const changeStatus = async (chatId, status) => {
    const res = await axios.put(
      `http://localhost:8000/user/${chatId}`,
      {
        status: status,
      }
    );
    console.log(res);
    window.alert(`User ${status}`);

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.chatId === chatId) {
          return { ...user, status: status };
        }
        return user;
      })
    );
  };

  const deleteUser = async (chatId) => {
    const res = await axios.delete(
      `http://localhost:8000/user/${chatId}`
    );
    console.log(res);
    window.alert("User deleted");

    setUsers((prevUsers) => prevUsers.filter((user) => user.chatId !== chatId));
  };

  return (
    <div>
      {users.length > 0 ? (
        users.map((user, index) => (
          <div key={user.chatId}>
            <Card>
              <CardContent>
                <List>
                  <ListItem
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {"Name: "} {user.firstName} {"Status: "}
                      {user.status}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => changeStatus(user.chatId, "Active")}
                >
                  Activate User
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => changeStatus(user.chatId, "Blocked")}
                >
                  Block User
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteUser(user.chatId)}
                >
                  Delete User
                </Button>
              </CardActions>
            </Card>
            <br />
          </div>
        ))
      ) : (
        <Typography variant="subtitle1">No Subscribers</Typography>
      )}
    </div>
  );
};

export default ManageUsers;
