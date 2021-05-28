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
    console.log("Hall wat gebeurt er??????????",history)

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
        // console.log(jwtToken)
        const decoded = jwt_decode(jwtToken)
        // const userid = decoded.sub;
        // console.log(userid)
        console.log(decoded)
        localStorage.setItem('token', jwtToken)
        try {
            const result = await axios.get('http://localhost:8080/authenticated', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer' + jwtToken,
                }
            })
            // const result = await axios.get(`http://localhost:3000/600/users/${userid}`
            console.log(result)
            setAuthState({
                user: {
                    // email:result.data.email,
                    username:result.data.username,
                    password:result.data.password,
                    // age:result.data.age,
                    // firstName:result.data.firstName,
                    // lastName:result.data.lastName,
                    // id:result.data.id,
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
        history.push("/sign-in");

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