import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  private books: Book[] = [
    new Book(1, 'The Mysterious Affair at Styles', new Date(1921, 1)),
    new Book(2, 'Five Little Pigs', new Date(1942, 5)),
  ];

  create(createBookDto: CreateBookDto): Book {
    this.validateBookFields(createBookDto.name, createBookDto.publicationDate);
    const id = (this.books.sort((a, b) => a.id - b.id).at(-1)?.id ?? 0) + 1;
    const book = new Book(
      id,
      createBookDto.name,
      new Date(createBookDto.publicationDate),
    );
    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((book) => book.id === id);

    if (!book) {
      throw new NotFoundException(`The book of id ${id} does not exist.`);
    }

    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.findOne(id);

    if (updateBookDto.name) {
      book.name = updateBookDto.name;
    }

    if (updateBookDto.publicationDate) {
      this.validateBookPublicationDate(updateBookDto.publicationDate);
      book.publicationDate = new Date(updateBookDto.publicationDate);
    }

    return book;
  }

  remove(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
    }
  }

  private validateBookFields(bookName?: string, publicationDate?: string) {
    if (!bookName) {
      throw new BadRequestException('A book must have a name');
    }

    if (this.books.some((book) => book.name === bookName)) {
      throw new BadRequestException(
        `A book with the name ${bookName} already exists.`,
      );
    }

    if (!publicationDate) {
      throw new BadRequestException('A book must have a publication date');
    }
  }

  private validateBookPublicationDate(publicationDate: string) {
    const parsedPublicationDate = new Date(publicationDate);
    if (Number.isNaN(parsedPublicationDate.valueOf())) {
      throw new BadRequestException(
        'Invalid publication date format. Expects: YYYY-MM-DDTHH:mm:ss.sssZ',
      );
    }

    if (parsedPublicationDate.getTime() > Date.now()) {
      throw new BadRequestException(
        `A book cannot be published in the future.`,
      );
    }
  }
}
