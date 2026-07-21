import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  private readonly authors: Author[];

  constructor() {
    this.authors = [
      {
        lastname: 'Christie',
        firstname: 'Agatha',
      },
      {
        lastname: 'Conan Doyle',
        firstname: 'Arthur',
      },
    ];
  }

  findAll(): Author[] {
    return this.authors;
  }

  save(author: Author): Author {
    this.authors.push(author);
    return author;
  }
}
