import './index.less'
import { Input } from 'antd';
import {login} from "../../apis/login.ts";
import {useContext} from "react";
import {UserInfoContext} from "../../stores/userInfo/userInfoProvider.tsx";
export default function Login({setLoginState}: {setLoginState: (state: boolean) => void}) {
    const {dispatch} = useContext(UserInfoContext);
    function inputKeyDown(e: any) {
        const code = e.keyCode;
        if (code === 13) {
            if (e.target.value !== '') {
                try {
                    login({name: e.target.value}).then(res => {
                        dispatch({
                            type: "set",
                            value: res.data
                        });
                        setLoginState(true);
                    }).catch(e => {
                        console.log(e)
                    })
                } catch (e) {
                    console.log("用户名不存在")
                }
                // setName(e.target.value);
            }
        }
    }
    return (
        <div className={'login-container'}>
            <div className={'input-name-container'}>
                <Input placeholder='  name' size='large' onKeyDown={inputKeyDown} style={{
                    borderRadius: '10px'
                }}/>
            </div>
        </div>
    )
}
