import './index.less'
import {useContext, useEffect, useRef, useState} from "react";
import {Group} from "chat-room-types";
import {getUserGroup} from "../../apis/group.ts";
import {UserInfoContext} from "../../stores/userInfo/userInfoProvider.tsx";
import {SwitchGroup} from "../../stores/groupMessage/groupMessageAction.ts";
import {GroupMessageContext} from "../../stores/groupMessage/groupMessageProvider.tsx";
import {io, Socket} from "socket.io-client";

type GroupData = Group & { unread: number };

function createUnreadMessageConnection(query: { userId: number }) {
    return io(import.meta.env.VITE_WS_UNREAD_URL, {
        query: query,
        transports: ['websocket']
    });
}

function GroupItem({info}: { info: GroupData }) {
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

function Groups({groups, setGroups, active, setActive}: { groups: GroupData[], setGroups: (groups: GroupData[]) => void, active: number, setActive: (active: number) => void}) {
    // 加载store
    const userInfoStore = useContext(UserInfoContext);
    const groupMessageStore = useContext(GroupMessageContext);

    // 登录的user更新时
    // 1. 加载user的群聊列表
    // 2. 设置active为第一个群聊
    // 3. 加载第一个群聊的消息
    useEffect(() => {
        console.log(`加载群聊数据: ${userInfoStore.state.id}`)
        getUserGroup({id: userInfoStore.state.id}).then(res => {
            setGroups(res.data.map(e => {
                return {
                    ...e,
                    unread: 0
                }
            }));
            setActive(res.data[0].group_id);
            console.log(`初始化群聊数据时设置 ${res.data[0].group_id}, ${active}`)
            SwitchGroup(res.data[0], groupMessageStore.dispatch);
        }).catch(e => {
            console.log(e);
        })
    }, [userInfoStore.state]);

    // 渲染群组数组
    const groupList = groups.map((e) => {

        // 点击群聊进行切换时
        // 设置群聊为active
        // 加载群聊数据
        // 将此群的未读消息数量清空
        function click() {
            setActive(e.group_id);
            console.log(`当前active群组被设置为${e.group_id}`)
            SwitchGroup(e, groupMessageStore.dispatch);
            setGroups(groups.map(g => {
                if (g.group_id === e.group_id) {
                    return {
                        ...g,
                        unread: 0
                    }
                }
                return g;
            }))
        }

        return <div className={`group-list-item ${e.group_id === active ? 'group-list-item__active' : ''}`}
                    key={e.group_id} onClick={click}>
            <GroupItem info={e}/>
        </div>
    });

    return (
        <div className='fill-up group-list-container'>
            {groupList}
        </div>
    )
}

export default function GroupList() {
    // 当前打开的群聊
    const [activeGroup, setActive] = useState<number>(0);
    // 群聊数据
    const [groups, setGroups] = useState<GroupData[]>([]);

    // 加载store
    const userInfoStore = useContext(UserInfoContext);

    //
    function addUnreadMessage(groupId: number) {
        console.log(`收到remind消息, groupId: ${groupId}, activeId: ${activeGroup}`);
        if (groupId === activeGroup) {
            console.log("消息为当前群组, 不更新提示")
            return;
        }
        console.log(`消息不为当前群组， 更新提示, 更新前的groups为${JSON.stringify(groups)}`)
        setGroups(groups.map(e => {
            if (e.group_id === groupId) {
                return {
                    ...e,
                    unread: 5
                }
            }
            return e;
        }));
    }

    // // websocket连接
    const remind = useRef<Socket | null>(null);



    useEffect(() => {
        remind.current = createUnreadMessageConnection({userId: userInfoStore.state.id});
        remind.current?.on('remind', (groupId: number) => {
            addUnreadMessage(groupId);
        });
        return () => {
            remind.current?.disconnect();
            remind.current = null;
        }
    }, [userInfoStore.state]);

    return (
        <div className={'fill-up'}>
            <Groups groups={groups} setGroups={setGroups} active={activeGroup} setActive={setActive}/>
        </div>
    )
}

