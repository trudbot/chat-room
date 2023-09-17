import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./modules/user/user.module";
import {ChatModule} from "./modules/chat/chat.module";
import {Group_messageModule} from "./modules/group_message/group_message.module";

@Module({
    imports: [
        UserModule,
        ChatModule,
        Group_messageModule,
        TypeOrmModule.forRoot({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "SYP123456",
            "database": "chat",
            autoLoadEntities: true,
            "synchronize": true
        })],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
