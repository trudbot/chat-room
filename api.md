## webSocket事件
### connection
`?groupId:number&userId:number`
### message
* client --> server

```ts
{
  sender: number;
  message: string;
  time: string; // `yyyy-mm-dd hh:mm:ss`
}
```
* server --> client
```ts
{
    sender: number;
    message: string;
    time: string;
    sender_name: string;
}
```
## http接口
### `/messages?groupId: number`
返回值
```ts
{
    actor: UserInfo;
    message: string;
    time: string;
}[]

```
