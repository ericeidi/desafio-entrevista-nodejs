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
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({
    status: 201,
    description: 'Expected response: criado novo usuário.',
  })
  @ApiResponse({
    status: 400,
    description: 'Expected response: usuário já existente.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos usuários' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Retornar usuários do sistema.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao buscar dados.',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar usuário por id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Retornar usuário por id.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao buscar dados.',
  })
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário por id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Usuário atualizado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao buscar dados.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário por id' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: Usuário deletado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: Falha ao buscar dados.',
  })
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
