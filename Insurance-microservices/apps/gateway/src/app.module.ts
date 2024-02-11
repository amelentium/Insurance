import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [UsersModule, ClaimsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
