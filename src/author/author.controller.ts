import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  findAll(): Author[] {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorService.findById(id);
  }

  @Post()
  createAuthor(@Body() author: CreateAuthorDto) {
    this.authorService.save(author);
  }

  @Patch(':id')
  updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() author: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(id, author);
  }

  @Delete(':id')
  removeById(@Param('id', ParseIntPipe) id: number) {
    this.authorService.deleteAuthorById(id);
  }
}
