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
    const { email, role } = registerDto;

    // Check if user already exists in either brand or influencer schema
    const userExists = await this.authService.checkUserExists(email);
    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    // Proceed with registration
    const id = await this.authService.register(registerDto);
    const payload = { email, role, id };
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
    user.role = 'influencer';
    if (!user) {
      // If not found, check in brand schema
      user = await this.authService.findBrandByEmail(email);
      user.role = 'brand';
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
    const payload = { email, id, role, name };
    const accessToken = this.jwtService.sign(payload);

    // Set the access token as a signed cookie
    res.cookie('accessToken', accessToken, { httpOnly: true, signed: true });
    res.send();
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: Request, @Res() res: Response) {
    interface User {
      name: string;
      email: string;
      role: string;
      id: string;
    }
    const user = req.user as User;
    if (!user) {
      return res.status(400).send('User not found');
    }
    const { id, ...theRest } = user;
    res.send(theRest);
  }
}
