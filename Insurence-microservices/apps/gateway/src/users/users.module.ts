import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE, protoPath, userProto, userProtobufPackage } from '@app/common';
import { join } from 'path';

const HOST = process.env.GRPC_HOST || 'localhost';
const PORT = Number(process.env.GRPC_PORT) || 5000;
const address = `${HOST}:${PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: address,
          protoPath: join(__dirname, protoPath, userProto),
          package: userProtobufPackage
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
