import './index.less'
import GroupList from "../GroupList";
import Chat from "../Chat";
export default function Layout() {

    return (
        <div className='layout-container fill-up'>
            <div className='layout-group-list-container'>
                <GroupList/>
            </div>
            <div className='layout-chat-container'>
                <Chat/>
            </div>
        </div>
    )
}
