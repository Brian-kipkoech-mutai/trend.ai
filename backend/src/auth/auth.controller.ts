import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  returnHello(): string {
    return 'Hello auth!';
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Promise<void> {
    console.log('route pinged');
    const { email, role ,name} = registerDto;

    // Check if user already exists in either brand or influencer schema
    const userExists = await this.authService.checkUserExists(email);
    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    // Proceed with registration
    console.log('registerDto', registerDto);
    const id = await this.authService.register(registerDto);
    const payload = { email, role, id, name };
    const accessToken = this.jwtService.sign(payload);

    // Set the access token as a signed cookie
    res.cookie('accessToken', accessToken, { httpOnly: true, signed: true });
    res.status(200).json({ message: 'Registration successful' });

    // User is automatically logged in after registration
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { email, password } = loginDto;

    // Check if user exists in influencer schema
    let user = await this.authService.findInfluencerByEmail(email);
    if (user) {
       user.role = 'influencer';
     }
    else if (!user) {
      // If not found, check in brand schema
      user = await this.authService.findBrandByEmail(email);
      if (user) {
        user.role = 'brand';
      }
    }

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    console.log('user', user);
    // Validate password (this should be implemented in AuthService)
    const isPasswordValid = await this.authService.validatePassword(
      password,
      user.role,
      user.email,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const { id, role, name } = user;
    console.log('mongouser',user)
    const payload = { email, id, role, name };
    const accessToken = this.jwtService.sign(payload);

    // Set the access token as a signed cookie
    res.cookie('accessToken', accessToken, { httpOnly: true, signed: true });
    res.send();
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  getUser(@Req() req: Request, @Res() res: Response) {
    interface User {
      name: string;
      email: string;
      role: string;
      id: string;
    }
    const user = req.user as User;
    console.log('userrrrr', user);
    if (!user) {
      return res.status(400).send('User not found');
    }
    const { id, ...theRest } = user;
    res.send(theRest);
  }
}
