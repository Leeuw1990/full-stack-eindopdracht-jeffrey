import React, {createContext, useState, useEffect} from 'react';
import { useHistory }  from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';
export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    });

    useEffect(()=> {
        const token = localStorage.getItem('JWT_token')
        if(token !== null && authState.user === null) {
            loginFunction(token)
        } else {
            setAuthState({
                user: null,
                status: 'done',
            })
        }
    },[])

    async function loginFunction(jwtToken) {
        const decoded = jwt_decode(jwtToken)
        const userId = decoded.sub;
        localStorage.setItem('token', jwtToken)

        try {
            const result = await axios.get(`http://localhost:8080/api/users/user/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`,
                }
            })
            console.log(result, "authcontxt")

            setAuthState({
                user: {
                    role:result.data.roles,
                    email:result.data.email,
                    username:result.data.username,
                    password:result.data.password,
                    token: jwtToken,
                    firstName:result.data.firstName,
                    lastName:result.data.lastName,
                    id:result.data.id,
                },
                status: 'done',

            });
            history.push("/profile");

        } catch (e) {
            console.error(e)
        }
    }

    const data = {
        ...authState,
        login: loginFunction,
        logout: logOutFunction,
    }

    function logOutFunction() {
        localStorage.clear();
        setAuthState({
                user: null,
                status: 'done',
            }
        )
        history.push("/");
    }

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'done'
                ? children
                : <p>Loading...</p>
            }
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;