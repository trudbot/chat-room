import React, {createContext, Dispatch, useReducer} from "react";
import {groupMessageAction, groupMessageInit, groupMessageReducer, groupMessageStore} from "./groupMessageReducer.ts";



export const GroupMessageContext = createContext<{state: groupMessageStore, dispatch: Dispatch<groupMessageAction>}>({
    state: groupMessageInit,
    dispatch: () => {
        throw new Error("group message reducer未定义")
    }
});
export function GroupMessageProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(groupMessageReducer, groupMessageInit);

    return (
        <GroupMessageContext.Provider value={{state, dispatch}}>
            {children}
        </GroupMessageContext.Provider>
    )
}
