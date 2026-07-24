import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  private readonly authors: Author[] = [
    {
      id: 1,
      lastname: 'Christie',
      firstname: 'Agatha',
    },
    {
      id: 2,
      lastname: 'Conan Doyle',
      firstname: 'Arthur',
    },
  ];

  findAll(): Author[] {
    return this.authors;
  }

  save(author: CreateAuthorDto): Author {
    const authorId =
      (this.authors.sort((a, b) => a.id - b.id).at(-1)?.id ?? 0) + 1;
    const newAuthor = {
      id: authorId,
      lastname: author.lastname,
      firstname: author.firstname,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  findById(id: number) {
    return this.authors.find((author) => author.id === id);
  }
}
