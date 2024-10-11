import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Create the context
export const StoreContext = createContext(null);

// Create the provider
const StoreContextProvider = (props) => {
    const url = 'http://localhost:4000'
    const [user, setuser] = useState(null)
    const [loginId, setid] = useState(null)
    const [error, setError] = useState(null);
    const [loginloader, setloginloader] = useState(false)
    const [getroleLoader, setroleLoader] = useState(true)
    const [managers, setmanger] = useState([])
    const [Usertasks, setUsertasks] = useState([])
    const [managertasks, setManagertasks] = useState([])
    const [taskMessage, setTaskMessage] = useState(null)
    const [getManagerAssignedUserId, setManagerAssignedUserId] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [logindata, setlogindata] = useState({
        email: '',
        password: '',
    })

    const validateSignInForm = () => {
        const { email, password } = logindata;

        if (!email) {
            setError("Email field are required.");
            return false;
        }
        if (!password) {
            setError("Password field are required.");
            return false;
        }
        setError(null);
        return true;
    };

    const getrole = async () => {
        const getrole = await axios.get(`${url}/api/user/role`, {
            withCredentials: true // Make sure cookies are sent and stored
        })
        console.log(getrole.data.role)
        setuser(getrole.data.role);
        setid(getrole.data.id)
        setroleLoader(false)
    }


    // Define the login function
    const Login = async () => {

        if (!validateSignInForm()) {
            return;
        }
        setloginloader(true)
        try {
            const response = await axios.post(`${url}/api/user/login`, logindata, {
                withCredentials: true // Make sure cookies are sent and stored
            });
            if (response.data.success) {
                console.log(response.data);
                getrole()
                setlogindata({
                    email: '',
                    password: '',
                })
            } else {
                console.log(response)
                setError(response.data.Message);
            }
        } catch (err) {
            setError("An error occurred while logging in."); // Handle network errors
        } finally {
            setloginloader(false); // Stop loading in either case
        }
    };

    const getmanagers = async () => {
        const response = await axios.get(`${url}/api/user/managers`, {
            withCredentials: true
        })
        if (response.data.success) {
            setmanger(response.data.users)
            console.log(response.data)
        }
        console.log('no response')
    }
    //   /getall
    const gettasks = async () => {
        if (loginId) {
            console.log(loginId)
            const response = await axios.get(`${url}/api/task/get/${loginId}`, {
                withCredentials: true
            })
            console.log(response)
            if (response.data.success) {
                console.log(response.data)
                setUsertasks(response.data.tasks)
            }
            console.log('no response')
        }
    }
    const GetAllTasks = async () => {
        const response = await axios.get(`${url}/api/task/getall`, {
            withCredentials: true
        })
        if (response.data.success) {
            console.log(response.data)
            setUsertasks(response.data.tasks)
        }
        console.log('no response')
    }
    const GetManagerUsers = async () => {
        const id = getManagerAssignedUserId

        const response = await axios.get(`${url}/api/task/getmanagertasks/${id}`, {
            withCredentials: true
        })
        console.log(response)
        if (response.data.success) {
            setUsertasks(response.data.tasks)
            console.log(response.data.tasks)
        } else {
            setTaskMessage(response.data.message);
            console.log(taskMessage)
        }
    }



    useEffect(() => {
        getrole()
        console.log(user)
    }, [user])

    // Create the context value
    const ContextValue = {
        Login,
        logindata,
        setlogindata,
        error,
        setError,
        loginloader,
        user,
        setuser,
        getroleLoader,
        url,
        validateSignInForm,
        getmanagers,
        managers,
        loginId,
        Usertasks,
        setUsertasks,
        gettasks,
        GetAllTasks,
        taskMessage,
        setTaskMessage,
        managertasks,
        setManagertasks,
        GetManagerUsers,
        setManagerAssignedUserId,
        open,
        setOpen,

    };

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
