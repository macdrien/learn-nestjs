import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  save(createAuthorDto: CreateAuthorDto): Author {
    if (
      this.authors.find(
        (author) =>
          author.lastname === createAuthorDto.lastname &&
          author.firstname === createAuthorDto.firstname,
      )
    ) {
      throw new BadRequestException(
        `The author ${createAuthorDto.firstname} ${createAuthorDto.lastname} already exists`,
      );
    }

    const authorId =
      (this.authors.sort((a, b) => a.id - b.id).at(-1)?.id ?? 0) + 1;
    const newAuthor = {
      id: authorId,
      lastname: createAuthorDto.lastname,
      firstname: createAuthorDto.firstname,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  findById(id: number) {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }
}
