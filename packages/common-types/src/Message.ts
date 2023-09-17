import {UserInfo} from "./UserInfo";

export interface ToServer_Message {
    sender: number;
    message: string;
    time: string;
}

export interface ToClient_Message {
    actor: UserInfo;
    message: string;
    time: string;
}

export interface ToClient_Join {
    actor: UserInfo;
}

export interface ToClient_Leave {
    actor: UserInfo;
}
