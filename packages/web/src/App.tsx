import './App.css'
import Layout from "./pages/Layout";
import {useState} from "react";
import Login from "./pages/Login";
import {UserInfoProvider} from "./stores/userInfo/userInfoProvider.tsx";
import {GroupMessageProvider} from "./stores/groupMessage/groupMessageProvider.tsx";

function App() {

    const [loginState, setLoginState] = useState<boolean>(false);
    return (
        <>
            <UserInfoProvider>
                {
                    !loginState ?
                    <Login setLoginState={setLoginState}/>
                        :
                        <GroupMessageProvider>
                            <Layout/>
                        </GroupMessageProvider>
                }
            </UserInfoProvider>
        </>
    )
}

export default App
