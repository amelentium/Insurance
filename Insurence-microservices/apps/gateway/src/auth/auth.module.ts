import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtExpirationHrs, jwtSecret } from '@app/common';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: `${jwtExpirationHrs}h` },
    })
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
