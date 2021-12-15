import { Component } from "@angular/core";
import data from "../data/list.json";
import { Student } from "./Student";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  private _students: Array<Student> = [];
  private _highlightBadMarks: boolean = true;
  private _showDeleteAlert: boolean = false;

  constructor() {
    for (const student of data.studentArray){
      const newbie: Student = new Student(student["lastName"], student["firstName"], student["surname"], student["birthDate"],
        student["GPA"]);
      this._students.push(newbie);
    }
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
}


