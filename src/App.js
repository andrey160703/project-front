import React, {useState} from "react";
import "./styles/App.css";
import AppRouter from "./components/AppRouter";
import {AuthContext, LoginContext, AdministratorContext, UsersContext} from "./context";
import NewMemberForm from "./components/NewMemberForm";


function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [globalLogin, setGlobalLogin] = useState('unknown')
    const [isAdministrator, setIsAdministrator] = useState(false)
    const [allUsers, setAllUsers] = useState([
        { id: 1, name: "Andrey", login: "andrey101010", email: "avgusev_6@edu.hse.ru" },
        { id: 2, name: "Semen", login: "Semen12312", email: "prosemen@mail.ru" },
        { id: 3, name: "Ilya", login: "Ilyyyya", email: "superIlyaKU2222@mail.ru" },
        { id: 4, name: "helloWorldWorker", login: "hellologin", email: "helloworld@edu.hse.ru" },
        { id: 5, name: "Vasya", login: "vasya2312", email: "prvasyaen@mail.ru" },
        { id: 6, name: "Kolya", login: "IKolyaa", email: "sKolya@mail.ru" },
        { id: 7, name: "Andrey mishas", login: "amishas10", email: "agmishas@edu.hse.ru" },
        { id: 8, name: "Kokakola", login: "SemKokakola2", email: "pKokakolan@mail.ru" },
        { id: 9, name: "kolonka", login: "Ikolonka", email: "kolonka@mail.ru" },
        { id: 10, name: "Nikolya", login: "kolyssssssa", email: "kolyssssss@mail.ru" },
        { id: 11, name: "daniles", login: "amidaniles10", email: "adaniles@edu.hse.ru" },
        { id: 12, name: "KArinhhssa", login: "SeKArinhhssa2", email: "pKArinhhssan@mail.ru" },
        { id: 13, name: "Danila", login: "Clown", email: "Clown@mail.ru" }
    ]);
    const workers = [
            {id: 1, role: "worker", name: "Ivan", total: "10", completed: "5"},
            {id: 2, role: "worker", name: "Artur", total: "10", completed: "5"},
            {id: 5, role: "worker", name: "Semen", total: "10", completed: "3"},
            {id: 6, role: "worker", name: "Grisha", total: "10", completed: "8"}
        ];

    function test(data) {
        console.log(data)
    }

    return (
        <UsersContext.Provider value={{
                allUsers,
                setAllUsers
        }}>
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
                        {/*<NewMemberForm projectUsers={workers} onMemberAdded={test}/>*/}
                        <AppRouter/>
                    </LoginContext.Provider>
                </AuthContext.Provider>
            </AdministratorContext.Provider>
        </UsersContext.Provider>
    );
}

export default App;