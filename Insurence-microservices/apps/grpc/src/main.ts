import { NestFactory } from '@nestjs/core';
import { grpcModule } from './grpc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protoPath, userProto, userProtobufPackage } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    grpcModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, protoPath, userProto),
        package: userProtobufPackage
      }
    });
  await app.listen();
}
bootstrap();
