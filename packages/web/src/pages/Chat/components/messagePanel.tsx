import {useContext, useEffect, useRef} from "react";
import {GroupMessageContext} from "../../../stores/groupMessage/groupMessageProvider.tsx";
import {MType} from "../../../stores/groupMessage/groupMessageReducer.ts";
import {ToClient_Message, UserInfo} from "chat-room-types";
import {UserInfoContext} from "../../../stores/userInfo/userInfoProvider.tsx";
import './messagePanel.less'

function MessageItem({messageBody, other}: { messageBody: ToClient_Message & { type: MType }, other: boolean }) {
    return (
        <div className='message-item'>
            <div className={`message-item-header ${other ? 'other' : 'me'}`}>{messageBody.actor.name + " " + messageBody.time}</div>
            <div className={`message-item-content ${other ? 'other' : 'me'}`}>
                <div className='text'>
                    {messageBody.message}
                </div>
            </div>
        </div>
    )
}

function JoinOrLeaveMessageItem({actor, type}: { type: MType, actor: UserInfo }) {

    return (
        <div className={'join-leave'}>
            <div className={type === MType.join ? 'join' : 'leave'}>
                {actor.name + ((type === MType.join) ? "进入了" : "离开了") + "群聊"}
            </div>
        </div>
    )
}

export function MessagePanel() {
    const messageStore = useContext(GroupMessageContext);
    const userInfoStore = useContext(UserInfoContext);
    const list = messageStore.state.messages.map((e, idx) => {
        if (e.type === MType.message) {
            return <MessageItem messageBody={e as ToClient_Message & { type: MType }}
                                other={e.actor.id !== userInfoStore.state.id} key={idx}/>
        } else {
            return <JoinOrLeaveMessageItem type={e.type} actor={e.actor} key={idx}/>
        }
    });

    const msg = useRef<HTMLDivElement | null>(null);

    // 当消息发生变化时， 自动划到底部
    function toBottom() {
        const element = msg.current;
        if (element === null) {
            return;
        }
        element.scrollTop = element.scrollHeight;
    }

    useEffect(() => {
        toBottom();
    });

    useEffect(() => {
        toBottom()
    }, [messageStore.state.messages]);
    return (
        <div className={'fill-up message-pane-container'} ref={msg}>
            <ul>
                {list}
            </ul>
        </div>
    )
}
