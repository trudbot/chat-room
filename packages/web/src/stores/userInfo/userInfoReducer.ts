import {UserInfo} from "chat-room-types";

export type userInfoAction = {type: "set"; value: UserInfo};
export const userInfoReducer = (state: UserInfo, action: userInfoAction) => {
    switch (action.type) {
        case "set":
            return {
                ...state,
                ...action.value
            }
        default:
            throw new Error("Unknown action");
    }
}
