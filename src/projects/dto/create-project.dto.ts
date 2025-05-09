import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateProjectDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    imageUrl: string;

    @ApiProperty()
    @IsString()
    startDate: Date;

    @ApiProperty()
    @IsInt()
    userId: number;
}
