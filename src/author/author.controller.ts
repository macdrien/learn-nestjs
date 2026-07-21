import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  findAll(): Author[] {
    return this.authorService.findAll();
  }

  @Post()
  createAuthor(@Body() author: Author) {
    this.authorService.save(author);
  }
}
