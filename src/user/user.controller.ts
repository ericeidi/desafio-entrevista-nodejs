import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from '../@core/application/usecase/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({
    status: 201,
    description: 'Expected response: created new user',
  })
  @ApiResponse({
    status: 400,
    description: 'Expected response: user already exists',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'search all users' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: return system users',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'find user by id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: return user by id',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update user by id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: update user by id',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: deleted user',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: failed to fetch data',
  })
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
