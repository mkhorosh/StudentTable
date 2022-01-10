export class Student{
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get selectedToEdit(): boolean {
    return this._selectedToEdit;
  }

  set selectedToEdit(value: boolean) {
    this._selectedToEdit = value;
  }
  private _id: number;
  _lastName: string;
  _firstName: string;
  _surname: string;
  _birthDate: Date;
  _gpa: number;
  private _selected: boolean = false;
  private _hideByFilter: boolean = false;
  private _deleted: boolean = false;
  private _selectedToEdit: boolean = false;

  constructor(id: number, lastName: string, firstName: string, surname: string, birthDate: string, gpa: number) {
    this._id = id;
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
