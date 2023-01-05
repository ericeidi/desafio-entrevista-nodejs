import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserRepository } from 'src/@core/domain/repository/user/user.repository';
import { UserTypeormRepository } from 'src/@core/infra/db/user/user-typeorm.repository';
import { UserSchema } from 'src/@core/infra/db/user/user.schema';
import { DataSource } from 'typeorm';
import { UserService } from '../@core/application/usecase/user/user.service';
import { jwtConstants } from '../shared/constants/jwt-secret';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.auth';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '100s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: UserTypeormRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeormRepository(dataSource.getRepository(UserSchema));
      },
      inject: [getDataSourceToken()],
    },

    {
      provide: UserService,
      useFactory: (userRepository: UserRepository) => {
        return new UserService(userRepository);
      },
      inject: [UserTypeormRepository],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
