export class Student{
  private readonly _lastName: string;
  private readonly _firstName: string;
  private readonly _surname: string;
  private readonly _birthDate: Date;
  private readonly _gpa: number;
  private _selected: boolean = false;
  private _hideByFilter: boolean = false;
  private _deleted: boolean = false;

  constructor(lastName: string, firstName: string, surname: string, birthDate: string, gpa: number) {
    this._lastName = lastName;
    this._firstName = firstName;
    this._surname = surname;
    birthDate = birthDate.slice(3, 6) + birthDate.slice(0, 3) + birthDate.slice(6);
    this._birthDate = new Date(birthDate);
    this._gpa = gpa;
  }

  get lastName(): string {
    return this._lastName;
  }
  get firstName(): string {
    return this._firstName;
  }
  get surname(): string {
    return this._surname;
  }
  get birthDate(): Date {
    return this._birthDate;
  }
  get gpa(): number {
    return this._gpa;
  }
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    this._selected = value;
  }
  get hideByFilter(): boolean {
    return this._hideByFilter;
  }
  set hideByFilter(value: boolean) {
    this._hideByFilter = value;
  }
  get deleted(): boolean {
    return this._deleted;
  }
  set deleted(value: boolean) {
    this._deleted = value;
  }
}
