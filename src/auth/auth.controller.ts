import { Controller, Post, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiOperation({ summary: 'authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'Expected response: authenticated user.',
  })
  @ApiResponse({
    status: 500,
    description: 'Expected response: something went wrong.',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
