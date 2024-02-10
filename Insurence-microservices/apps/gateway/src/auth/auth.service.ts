import { User } from '@app/common';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (private jwtService: JwtService) {}
  async signIn(user: User, password: string): Promise<string | undefined> {
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
