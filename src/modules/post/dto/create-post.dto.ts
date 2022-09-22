import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '제목' })
  title: string;

  @IsString()
  @ApiPropertyOptional({ description: '설명' })
  content: string;

  @IsString()
  @ApiProperty({ description: '사용자 아이디' })
  userId: string;
}
