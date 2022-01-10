import { Component } from "@angular/core";
import data from "../data/list.json";
import { Student } from "./Student";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  get maxId(): number {
    return this._maxId;
  }

  set maxId(value: number) {
    this._maxId = value;
  }

  private _students: Array<Student> = [];
  private _highlightBadMarks: boolean = true;
  private _showDeleteAlert: boolean = false;
  private _selectedStudent: Student | undefined;
  private _maxId: number;
  title: string = "StudentTable";

  constructor() {
    this._maxId = 0;
    for (const student of data.studentArray){
      const newbie: Student = new Student(student["id"], student["lastName"], student["firstName"], student["surname"], student["birthDate"],
        student["GPA"]);
      this._students.push(newbie);
      if (student["id"] > this._maxId){
        this._maxId = student["id"];
      }
    }
    this._maxId++;
  }

  get students(): Array<Student> {
    return this._students;
  }

  get highlightBadMarks(): boolean {
    return this._highlightBadMarks;
  }
  set highlightBadMarks(value: boolean) {
    this._highlightBadMarks = value;
  }
  get showDeleteAlert(): boolean {
    return this._showDeleteAlert;
  }
  set showDeleteAlert(value: boolean) {
    this._showDeleteAlert = value;
  }

  get selectedStudent(): Student | undefined {
    return this._selectedStudent;
  }

  set selectedStudent(value: Student | undefined) {
    this._selectedStudent = value;
  }

  generateClass(student: Student): string {
    let res: string = "";
    if (student.gpa < 3 && this.highlightBadMarks) {
      res += "bad_marks ";
    }
    if (student.selected){
      res += "selected ";
    }
    return res;
  }

  findStudent(pattern: string): void{
    pattern = pattern.toLowerCase();
    for (const student of this.students){
      student.selected = false;
      const matchName: boolean = student.firstName.toLowerCase() === pattern;
      const matchLastName: boolean = student.lastName.toLowerCase() === pattern;
      const matchNameAndLastName: boolean = ((student.firstName + " " + student.lastName).toLowerCase() === pattern)
        || ((student.lastName + " " + student.firstName).toLowerCase() === pattern);
      if (matchName || matchLastName || matchNameAndLastName){
        student.selected = true;
      }
    }
  }

  clearFilters(): void {
    for (const student of this.students) {
      student.selected = false;
      student.hideByFilter = false;
    }
  }

  filterByGPA(min: string, max: string): void {
    for (const student of this.students){
      student.hideByFilter = student.gpa <= Number(min) || student.gpa >= Number(max);
    }
  }

  filterByDate(min: string, max: string): void{
    const minDate: Date = new Date(min);
    const maxDate: Date = new Date(max);
    for (const student of this.students){
      student.hideByFilter = student.birthDate <= minDate || student.birthDate >= maxDate;
    }
  }

  sortByName(): void{
    this.students.sort((a, b) => ((a.firstName > b.firstName) ? 1 : -1));
  }

  sortByLastName(): void{
    this.students.sort((a, b) => ((a.lastName > b.lastName) ? 1 : -1));
  }

  sortBySurname(): void{
    this.students.sort((a, b) => ((a.surname > b.surname) ? 1 : -1));
  }

  sortByDate(): void{
    this.students.sort((a, b) => ((a.birthDate > b.birthDate) ? 1 : -1));
  }

  sortByGPA(): void{
    this.students.sort((a, b) => ((a.gpa > b.gpa) ? 1 : -1));
  }

  deleteStudent(): void{
    for (let i = 0;i < this.students.length;i++){
      if (this.students[i].deleted){
        this.students.splice(Number(i), 1);
        return;
      }
    }
  }

  addStudent(newbie: Student): void {
    newbie.id = this._maxId;
    this._maxId++;
    this.students.push(newbie);
  }

  getOption(): string{
    if (this.selectedStudent){
      return "edit";
    }
    return "add";
  }

  editStudent(st: Student): void{
    for (const stud of this.students){
      if (stud.selectedToEdit){
        stud._lastName = st.lastName;
        stud._firstName = st.firstName;
        stud._surname = st.surname;
        stud._birthDate = st.birthDate;
        stud._gpa = st.gpa;
        stud.selectedToEdit = false;
        break;
      }
    }
    this.selectedStudent = undefined;
  }

  cancelEdit(): void{
    for (const stud of this.students){
      if (stud.selectedToEdit){
        stud.selectedToEdit = false;
        break;
      }
    }
    this.selectedStudent = undefined;
  }

  sortById(): void{
    this.students.sort((a, b) => ((a.id > b.id) ? 1 : -1));
  }

}


