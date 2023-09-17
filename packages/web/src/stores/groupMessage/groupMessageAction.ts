import {getGroupMessages} from "../../apis/groupMessages.ts";
import {Dispatch} from "react";
import {groupMessageAction} from "./groupMessageReducer.ts";
import {Group} from "chat-room-types";
import {MType} from "./groupMessageReducer.ts"

// 进行切换群聊时的数据加载
export function SwitchGroup(group: Group, dispatch: Dispatch<groupMessageAction>) {
    getGroupMessages({groupId: group.group_id}).then(res => {
        dispatch({
            type: "set",
            value: {
                group: group,
                messages: res.data.map(e => {
                    return {
                        ...e,
                        type: MType.message
                    }
                })
            }
        })
    })
}
