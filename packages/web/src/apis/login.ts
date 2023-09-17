import request from "../utils/request.ts";
import {AxiosResponse} from "axios";
import {UserInfo} from "chat-room-types";

export function login(query: {name: string}): Promise<AxiosResponse<UserInfo>> {
    return request({
        url: "/user/info",
        method: "get",
        params: query
    })
}
