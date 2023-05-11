import MyInput from "../components/UI/MyInput";
import MyButton from "../components/UI/MyButton";
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext, LoginContext, AdministratorContext} from "../context";
const Login = () => {

    const [login, changeLogin] = useState("")
    const [password, changePassword] = useState("")
    const [usedLogin, setUsedLogin] = useState(false)
    const [usedPassword, setUsedPassword] = useState(false)
    const [loginError, setLoginError] = useState("Email can't be empty")
    const [passwordError, setPasswordError] = useState("Password can't be empty")
    const [authError, setAuthError] = useState("")
    const [validForm, setValidForm] = useState(false)

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {globalLogin, setGlobalLogin} = useContext(LoginContext)
    const {isAdministrator, setIsAdministrator} = useContext(AdministratorContext)

    useEffect(() => {
        if (loginError || passwordError) {
            setValidForm(false)
        } else {
            setValidForm(true)
        }
    }, [loginError, passwordError])


    function APILogin() {
        if (login === "test@mail.ru" && password === "12345678") {
            setGlobalLogin(login)
            setIsAdministrator(true)
            return true
        } else {
            return false
        }
    }

    function auth(e) {
        setAuthError("")
        e.preventDefault()
        console.log(isAuth)
        console.log("Button was pressed:\nLogin - " + {login} + "\nPassword - " + {password});
        if (APILogin()) {
            console.log("Correct password")
            setIsAuth(true)
        } else {
            setAuthError("Incorrect login or password")
        }
    }

    const loginHandler = (args) => {
        setAuthError("")
        console.log("Login was changed: " + args.target.value)
        changeLogin(args.target.value)
        if (args.target.value.length === 0) {
            setLoginError("Email can't be empty")
        } else if (!validateEmail(args.target.value)) {
            setLoginError("Incorrect email")
        } else {
            setLoginError("")
        }
    }

    const passwordHandler = (args) => {
        setAuthError("")
        changePassword(args.target.value)
        if (args.target.value.length === 0) {
            setPasswordError("Password can't be empty")
        } else if (args.target.value.length < 6 || args.target.value.length > 18) {
            setPasswordError("The password must be between 6 and 18 characters")
        } else {
            setPasswordError("")
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'login':
                setUsedLogin(true)
                break
            case 'password':
                setUsedPassword(true)
                break
        }
    }


    return (
        <center>
            <div style={{padding: '25px', width: '600px'}}>
                <h1 align="center">Authorization</h1>
                <form>
                    {(usedLogin && loginError) && <div style={{textAlign: 'left', color: 'red', margin: '5px 15px 5px 15px'}}>{loginError}</div>}
                    <MyInput
                        onBlur={e => blurHandler(e)}
                        name={'login'}
                        value={login}
                        onChange={(args) => loginHandler(args)}
                        type="text"
                        placeholder="Enter email"
                    />
                    {(usedPassword && passwordError) ? <div style={{textAlign: 'left', color: 'red', margin: '5px 15px 5px 15px'}}>{passwordError}</div> : <div></div>}
                    <MyInput
                        onBlur={e => blurHandler(e)}
                        name={'password'}
                        value={password}
                        onChange={(args) => passwordHandler(args)}
                        type="password"
                        placeholder="Enter password"
                    />
                    {(authError) && <div style={{textAlign: 'left', color: 'red', margin: '5px 15px 5px 15px'}}>{authError}</div>}
                    <MyButton disabled={!validForm} onClick={auth}>Enter</MyButton>
                </form>
            </div>
        </center>
    );
};

export default Login;