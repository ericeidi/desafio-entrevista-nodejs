import { Module } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { UserService } from 'src/@core/application/usecase/user/user.service';
import { UserRepository } from 'src/@core/domain/repository/user/user.repository';
import { UserTypeormRepository } from 'src/@core/infra/db/user/user-typeorm.repository';
import { UserSchema } from 'src/@core/infra/db/user/user.schema';
import { DataSource } from 'typeorm';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
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
})
export class UserModule {}
