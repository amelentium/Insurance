import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { CLAIMS_PACKAGE_NAME, claimsProto, protoPath } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

const HOST = process.env.GRPC_HOST || 'localhost';
const PORT = Number(process.env.GRPC_PORT) || 5000;
const address = `${HOST}:${PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CLAIMS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: address,
          protoPath: join(__dirname, protoPath, claimsProto),
          package: CLAIMS_PACKAGE_NAME
        }
      }
    ])
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService],
})
export class ClaimsModule {}
