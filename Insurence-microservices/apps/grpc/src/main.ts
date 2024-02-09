import { NestFactory } from '@nestjs/core';
import { grpcModule } from './grpc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protoPath, usersProto, USERS_PACKAGE_NAME, claimsProto, CLAIMS_PACKAGE_NAME } from '@app/common';
import { ServerCredentials } from '@grpc/grpc-js';

async function bootstrap() {
  const HOST = process.env.GRPC_HOST || 'localhost';
  const PORT = Number(process.env.GRPC_PORT) || 5000;
  const address = `${HOST}:${PORT}`;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    grpcModule,
    {
      transport: Transport.GRPC,
      options: {
          url: address,
          protoPath: [
            join(__dirname, protoPath, usersProto),
            join(__dirname, protoPath, claimsProto),
          ],
          package: [
            USERS_PACKAGE_NAME,
            CLAIMS_PACKAGE_NAME,
          ],
          loader: {
            includeDirs: [ join(__dirname, protoPath) ],
          },
          credentials: ServerCredentials.createInsecure(),
      }
    });
  await app.listen();
}
bootstrap();
