import request from "../utils/request.ts";
import {AxiosResponse} from "axios";
import {Group} from "chat-room-types";

export function getUserGroup(query: {id: number}): Promise<AxiosResponse<Group[]>> {
    return request({
        url: "/user/groups",
        method: "get",
        params: query
    })
}
