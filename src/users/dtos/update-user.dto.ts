import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
