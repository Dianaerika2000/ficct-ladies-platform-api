import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SigninUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'User password' })
  @IsString()
  password: string;
}