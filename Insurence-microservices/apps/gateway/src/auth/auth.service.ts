import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserTempDto } from '../users/dto/users.user.dto';

@Injectable()
export class AuthService {
  constructor (private jwtService: JwtService) {}
  async signIn(user: UserTempDto, password: string): Promise<string | undefined> {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return undefined;
    }

    const payload = {
      sub: user.id,
      username: user.username,
      isActive: user.isActive,
    };
    
    return await this.jwtService.signAsync(payload);
  }
}
