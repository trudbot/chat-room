import {Group, ToClient_Join, ToClient_Leave, ToClient_Message} from "chat-room-types";

export enum MType {
    join,
    leave,
    message
}

export type messageData = ToClient_Message | ToClient_Join | ToClient_Leave;

export type messageType = messageData & {type: MType};

export interface groupMessageStore {
    group: Group;
    messages: messageType[];
}

export const groupMessageInit: groupMessageStore = {
    group: {
        group_id: -1,
        group_name: "无群聊"
    },
    messages: []
}

export type groupMessageAction = {type: "set"; value: groupMessageStore} | {type: "add", value: messageType};
export const groupMessageReducer = (state: groupMessageStore, action: groupMessageAction) => {
    switch (action.type) {
        case "set":
            return action.value;
        case "add":
            return {
                group: state.group,
                messages: [...state.messages, action.value]
            }
        default:
            throw new Error("Unknown action");
    }
}
