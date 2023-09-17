import React, {createContext, Dispatch, useContext, useReducer} from "react";
import {userInfoReducer, userInfoAction} from "./userInfoReducer.ts";
import {UserInfo} from "chat-room-types";

const userInfoInit: UserInfo = {
    name: "unknown",
    id: -1
};

interface userInfoReducer {
    state: UserInfo;
    dispatch: Dispatch<userInfoAction>
}

export const UserInfoContext = createContext<userInfoReducer>({
    state: userInfoInit,
    dispatch: () => {
        throw new Error("userInfo reducer未定义");
    }
});


export const UserInfoProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(userInfoReducer, userInfoInit);
    return (
        <UserInfoContext.Provider value={{state, dispatch}}>
            {children}
        </UserInfoContext.Provider>
    )
}

export function useUserInfoContext() {
    return useContext(UserInfoContext);
}
