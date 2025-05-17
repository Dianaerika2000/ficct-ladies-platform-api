import { Module } from '@nestjs/common';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [RoleModule, UserModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
