import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { ChatModule } from "./modules/chat/chat.module";
import { GroupMessageModule } from "./modules/group_message/groupMessage.module";

@Module({
    imports: [
        UserModule,
        ChatModule,
        GroupMessageModule,
        TypeOrmModule.forRoot({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "SYP123456",
            "database": "chat",
            autoLoadEntities: true,
            "synchronize": true,
        })],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
