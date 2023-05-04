import React, {useState} from "react";
import "./styles/App.css";
import AppRouter from "./components/AppRouter";
import {AuthContext, LoginContext, AdministratorContext} from "./context";


function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [globalLogin, setGlobalLogin] = useState('unknown')
    const [isAdministrator, setIsAdministrator] = useState(false)


    return (
        <AdministratorContext.Provider value={{
            isAdministrator,
            setIsAdministrator
        }}>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth
            }}>
                <LoginContext.Provider value={{
                    globalLogin,
                    setGlobalLogin
                }}>
                    <AppRouter/>
                </LoginContext.Provider>
            </AuthContext.Provider>
        </AdministratorContext.Provider>
    );
}

export default App;