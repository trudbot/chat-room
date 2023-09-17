import {Module} from "@nestjs/common";
import {UnreadGateway} from "./unread.gateway";
import {UserModule} from "../user/user.module";

@Module({
    providers: [UnreadGateway],
    imports: [UserModule],
    exports: [UnreadGateway]
})
export class UnreadModule{
}
