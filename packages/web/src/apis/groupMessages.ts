import request from "../utils/request.ts";
import {AxiosResponse} from "axios";
import {ToClient_Message} from "chat-room-types";

export function getGroupMessages(query: {groupId: number}): Promise<AxiosResponse<ToClient_Message[]>> {
    return request({
        url: "/messages",
        method: "get",
        params: query
    });
}
