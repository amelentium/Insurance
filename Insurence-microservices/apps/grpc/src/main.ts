import { NestFactory } from '@nestjs/core';
import { grpcModule } from './grpc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protoPath, userProto, userProtobufPackage } from '@app/common';
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
          protoPath: join(__dirname, protoPath, userProto),
          package: userProtobufPackage,
          credentials: ServerCredentials.createInsecure(),
      }
    });
  await app.listen();
}
bootstrap();
