import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME, protoPath, usersProto } from '@app/common';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';

const HOST = process.env.GRPC_HOST || 'localhost';
const PORT = Number(process.env.GRPC_PORT) || 5000;
const address = `${HOST}:${PORT}`;

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: USERS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: address,
          protoPath: join(__dirname, protoPath, usersProto),
          package: USERS_PACKAGE_NAME
        }
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
