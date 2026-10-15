import {
  IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsObject, Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() slug: string;
  @ApiProperty() @IsString() brand: string;
  @ApiProperty() @IsString() tagline: string;
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsNumber() @Min(0) price: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() compareAtPrice?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() badge?: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isNew?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isBestseller?: boolean;
  @ApiProperty() @IsBoolean() inStock: boolean;
  @ApiProperty() @IsNumber() @Min(0) stockCount: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() featured?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() condition?: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() specifications?: Record<string, any>;
  @ApiPropertyOptional() @IsOptional() @IsObject() benchmarks?: Record<string, any>;
  @ApiPropertyOptional() @IsOptional() @IsArray() colorVariants?: { name: string; hex: string }[];
  @ApiPropertyOptional() @IsOptional() @IsArray() images?: string[];
  @ApiProperty() @IsString() categoryId: string;
}
