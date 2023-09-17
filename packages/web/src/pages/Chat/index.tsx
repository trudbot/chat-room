import './index.less'
import {Input} from "antd";
import React, {useContext, useEffect, useRef, useState} from "react";
import {UserInfoContext} from "../../stores/userInfo/userInfoProvider.tsx";
import {GroupMessageContext} from "../../stores/groupMessage/groupMessageProvider.tsx";
import {MessagePanel} from "./components/messagePanel.tsx";
import {useChatConnection} from "./hooks/chatConnection.ts";
import {Socket} from "socket.io-client";
import {ToClient_Join, ToClient_Leave, ToClient_Message} from "chat-room-types";
import {MType} from "../../stores/groupMessage/groupMessageReducer.ts";

const {TextArea} = Input;

export default function Chat() {
    const userInfoStore = useContext(UserInfoContext);
    const messageStore = useContext(GroupMessageContext);

    const [inputText, setInputText] = useState<string>('');

    const connection = useRef<null | {chatSocket: Socket; send: (msg: string, date: Date) => void}>(null);

    useEffect(() => {
        console.log('连接')
        connection.current = useChatConnection({groupId: messageStore.state.group.group_id, userId: userInfoStore.state.id});

        connection.current.chatSocket.on('message', (msg: ToClient_Message) => {
            messageStore.dispatch({
                type: "add",
                value: {
                    type: MType.message,
                    ...msg
                }
            });
        });

        connection.current.chatSocket.on('join', (msg: ToClient_Join) => {
            messageStore.dispatch({
                type: "add",
                value: {
                    type: MType.join,
                    ...msg
                }
            })
        });

        connection.current.chatSocket.on('leave', (msg: ToClient_Leave) => {
            messageStore.dispatch({
                type: "add",
                value: {
                    type: MType.leave,
                    ...msg
                }
            })
        });

        return () => {
            if (connection.current === null) {
                return;
            }
            connection.current.chatSocket.disconnect();
            connection.current = null;
        }
    }, [userInfoStore.state, messageStore.state.group]);

    // 提交消息
    function inputKeyDown(e: React.KeyboardEvent) {
        const code = e.key;
        if (code === 'Enter') {
            console.log(inputText)
            if (inputText !== '') {
                if (connection.current === null) {
                    throw new Error("聊天socket未连接")
                }
                connection.current.send(inputText, new Date());
            }
            setInputText('')
            e.preventDefault();
        }
    }

    return (
        <div className={'home-container'}>
            <div className='header'>
                {messageStore.state.group.group_name}
            </div>
            <div className={'message-pane'}>
                <MessagePanel/>
            </div>
            <div className='input-container'>
                <div className='input-area'>
                    <TextArea onKeyDown={inputKeyDown} rows={4} value={inputText}
                              onChange={(e) => setInputText(e.target.value)}></TextArea>
                </div>
            </div>
        </div>
    )
}
