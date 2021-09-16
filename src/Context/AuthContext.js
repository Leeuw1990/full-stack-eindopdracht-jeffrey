import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const history = useHistory();
  const [authState, setAuthState] = useState({
    user: null,
    status: "pending",
  });

  async function fetchUser(jwtToken) {
    const decoded = jwt_decode(jwtToken);
    console.log(jwtToken)
    const userId = decoded.sub;
    localStorage.setItem("token", jwtToken);

    try {
      const result = await axios.get(
          `http://localhost:8080/api/users/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
      );
      console.log(result, "authcontxt");

      setAuthState({
        user: {
          role: result.data.roles,
          email: result.data.email,
          username: result.data.username,
          password: result.data.password,
          token: jwtToken,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          id: result.data.id,
        },
        status: "done",
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem('token')
    if (token !== null && authState.user === null) {
      if (mounted) {
        fetchUser(token);
      }
    } else {
      setAuthState({
        user: null,
        status: "done"
      });
    }
    return () => (mounted = false);
  }, []);



  async function loginFunction(jwt) {
    localStorage.setItem('token', jwt);
    await fetchUser(jwt);
    history.push('/profile');
  }

  function logOutFunction() {
    localStorage.clear();
    setAuthState({
      user: null,
      status: "done",
    });
    history.push("/");
  }

  const data = {
    ...authState,
    login: loginFunction,
    logout: logOutFunction,
  };

  return (
    <AuthContext.Provider value={data}>
      {authState.status === "done" ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
