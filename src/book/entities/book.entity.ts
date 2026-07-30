export class Book {
  name: string;
  publicationDate: Date;

  constructor(
    readonly id: number,
    name: string,
    publicationDate: Date,
  ) {
    this.id = id;
    this.name = name;
    this.publicationDate = publicationDate;
  }
}
