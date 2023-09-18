import { Group } from "chat-room-types"

export type GroupData = Group & { unread: number };

export type groupDataState = {
    groups: GroupData[],
    active: number
};

export type groupDataAction =
    { type: "setData", value: Group[] } |
    { type: "addUnread", value: number } |
    { type: "setActive", value: number };

export const groupDataReducer = (state: groupDataState, action: groupDataAction): groupDataState => {
    switch (action.type) {
        case "setData":
            return {
                groups: action.value.map(e => {
                    return {
                        ...e,
                        unread: 0
                    }
                }),
                active: action.value[0].group_id
            };
        case "addUnread":
            // 如果是active收到消息， 则不设置未读
            if (action.value === state.active) {
                return state;
            }
            return {
                active: state.active,
                groups: state.groups.map(e => {
                    if (e.group_id === action.value) {
                        return {
                            ...e,
                            unread: e.unread + 1
                        }
                    }
                    return e;
                })
            }
        case "setActive":
            return {
                // 将active群组的未读消息清空
                groups: state.groups.map(e => {
                    if (e.group_id === action.value) {
                        return {
                            ...e,
                            unread: 0
                        }
                    }
                    return e;
                }),
                active: action.value
            }
        default:
            throw new Error("groupDataReducer: 未知的action type");
    }
}