import { OmitType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/user/dto/user.dto';

export class SignUpDto extends OmitType(CreateUserDto, ['role']) {}
export class SignInDto extends PickType(SignUpDto, [
  'email',
  'password',
] as const) {}
