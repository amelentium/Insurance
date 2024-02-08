import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE, protoPath, usersProto, USER_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

const HOST = process.env.GRPC_HOST || 'localhost';
const PORT = Number(process.env.GRPC_PORT) || 5000;
const address = `${HOST}:${PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: address,
          protoPath: join(__dirname, protoPath, usersProto),
          package: USER_PACKAGE_NAME
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
