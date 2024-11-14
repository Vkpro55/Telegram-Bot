import { useState, useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import Login from "./Login";

const styles = {
  body: {
    background: '#f2f2f2',
    margin: 0,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: '16px',
    textAlign: 'center',
  },
};

const Home = () => {
  const [credentialResponse, setCredentialResponse] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage); // Directly use the string
    }
  }, []);

  useEffect(() => {
    if (credentialResponse !== null) {
      const decoded = jwt_decode(credentialResponse.credential);
      setUser(decoded.name);
    }
  }, [credentialResponse]);

  return (
    <div style={styles.body}>
      {user === null ? (
        <Container maxWidth="sm">
          <Paper elevation={3} style={styles.paper}>
            <Typography variant="h4" gutterBottom>
              Welcome to Weather Bot Admin Panel
            </Typography>
            <Typography variant="subtitle1">
              Please login to access the dashboard.
            </Typography>
            <Login setCredentialResponse={setCredentialResponse} />
          </Paper>
        </Container>
      ) : (
        <div>
          {localStorage.setItem('user', user)} {/* Store the string directly */}
          <Navigate to="/dashboard" />
        </div>
      )}
    </div>
  );
};

export default Home;
