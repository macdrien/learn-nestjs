import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

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
    this.validateThatAuthorDoesNotExist(
      createAuthorDto.lastname,
      createAuthorDto.firstname,
    );

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

  updateAuthor(id: number, authorUpdates: UpdateAuthorDto) {
    this.validateThatAuthorDoesNotExist(
      authorUpdates.lastname,
      authorUpdates.firstname,
    );

    let author = this.findById(id);
    const authorIndex = this.authors.findIndex((elt) => elt.id === id);
    author = { ...author, ...authorUpdates };
    this.authors.splice(authorIndex, 1, author);
    return author;
  }

  private validateThatAuthorDoesNotExist(
    lastname: string,
    firstname: string,
  ): void {
    if (this.doesAuthorExists(lastname, firstname)) {
      throw new BadRequestException(
        `The author ${firstname} ${lastname} already exists`,
      );
    }
  }

  private doesAuthorExists(lastname: string, firstname: string) {
    return !!this.authors.find(
      (author) =>
        author.lastname === lastname && author.firstname === firstname,
    );
  }
}
