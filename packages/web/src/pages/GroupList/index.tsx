import './index.less'
import { useContext, useEffect, useRef, useReducer, Dispatch } from "react";
import { getUserGroup } from "../../apis/group.ts";
import { UserInfoContext } from "../../stores/userInfo/userInfoProvider.tsx";
import { SwitchGroup } from "../../stores/groupMessage/groupMessageAction.ts";
import { GroupMessageContext } from "../../stores/groupMessage/groupMessageProvider.tsx";
import { io, Socket } from "socket.io-client";
import { groupDataAction, groupDataReducer, groupDataState } from './groupDataReducer.ts';
import { GroupData } from './groupDataReducer.ts';


function createUnreadMessageConnection(query: { userId: number }) {
    return io(import.meta.env.VITE_WS_UNREAD_URL, {
        query: query,
        transports: ['websocket']
    });
}

function GroupItem({ info }: { info: GroupData }) {
    return (
        <div className='fill-up group-list-item-content'>
            <span className={'group-list-item-title'}>
                {info.group_name}
            </span>
            <span className={'unread-num-container'}>
                {(info.unread && info.unread !== 0) ? <span className={'unread-num'}>{info.unread}</span> : null}
            </span>
        </div>
    )
}

function Groups({ groupState, groupDispatch }: { groupState: groupDataState, groupDispatch: Dispatch<groupDataAction> }) {
    // 加载store
    const userInfoStore = useContext(UserInfoContext);
    const groupMessageStore = useContext(GroupMessageContext);

    // 登录的user更新时
    // 1. 加载user的群聊列表
    // 2. 设置active为第一个群聊
    // 3. 加载第一个群聊的消息
    useEffect(() => {
        console.log(`加载群聊数据: ${userInfoStore.state.id}`)
        getUserGroup({ id: userInfoStore.state.id }).then(res => {
            groupDispatch({
                type: "setData",
                value: res.data
            });
            SwitchGroup(res.data[0], groupMessageStore.dispatch);
        }).catch(e => {
            console.log(e);
        })
    }, [userInfoStore.state]);

    // 渲染群组数组
    const groupList = groupState.groups.map((e) => {

        // 点击群聊进行切换时
        // 设置群聊为active
        // 加载群聊数据
        // 将此群的未读消息数量清空
        function click() {
            SwitchGroup(e, groupMessageStore.dispatch);
            groupDispatch({
                type: "setActive",
                value: e.group_id
            });
        }

        return <div className={`group-list-item ${e.group_id === groupState.active ? 'group-list-item__active' : ''}`}
            key={e.group_id} onClick={click}>
            <GroupItem info={e} />
        </div>
    });

    return (
        <div className='fill-up group-list-container'>
            {groupList}
        </div>
    )
}

export default function GroupList() {

    const [state, dispatch] = useReducer(groupDataReducer, {
        groups: [],
        active: 0
    });


    // 加载store
    const userInfoStore = useContext(UserInfoContext);

    // // websocket连接
    const remind = useRef<Socket | null>(null);

    useEffect(() => {
        remind.current = createUnreadMessageConnection({ userId: userInfoStore.state.id });
        remind.current?.on('remind', (groupId: number) => {
            dispatch({
                type: 'addUnread',
                value: groupId
            })
        });
        return () => {
            remind.current?.disconnect();
            remind.current = null;
        }
    }, [userInfoStore.state]);

    return (
        <div className={'fill-up'}>
            <Groups groupState={state} groupDispatch={dispatch} />
        </div>
    )
}

