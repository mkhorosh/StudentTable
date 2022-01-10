import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Student } from "../Student";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.css"]
})
export class FormsComponent implements OnChanges{

  @Input() student: Student | undefined;
  @Output() byAdd: EventEmitter<Student> = new EventEmitter<Student>();
  @Input() option: string | undefined;
  @Output() byEdit: EventEmitter<Student> = new EventEmitter<Student>();
  @Output() byCancel: EventEmitter<string> = new EventEmitter<string>();

  showErrorMessage: boolean = false;

  private _form: FormGroup = new FormGroup({
    fullName: new FormGroup({
      lastName: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required])
    }, this.checkFullName),
    birthDate: new FormControl("", [Validators.required, this.checkBirthDate]),
    GPA: new FormControl("", [Validators.required, Validators.min(0), Validators.max(5)])
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (this.student) {
      const date: string = this.student?.birthDate.toLocaleDateString();
      this.form.setValue({
        fullName: {
          lastName: this.student?.lastName,
          firstName: this.student?.firstName,
          surname: this.student?.surname
        },
        birthDate:date.slice(6) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2),
        GPA: this.student?.gpa
      });
    }
  }

  get form(): FormGroup {
    return this._form;
  }

  checkFullName(control: AbstractControl): { [p: string]: boolean } | null{
    if (control.value.firstName === control.value.lastName){
      return { invalidFullName: true };
    }
    if (control.value.firstName === control.value.surname){
      return { invalidFullName: true };
    }
    return null;
  }

  checkBirthDate(control: AbstractControl): { [p: string]: boolean } | null{
    if (control.value) {
      const today = new Date();
      const birthday = new Date(control.value);
      if (birthday < new Date(today.getFullYear() - 10, today.getMonth(), today.getDate())) {
        return { invalidBirthDate: true };
      }
    }
      return null;
  }

  addStudent(): void{
    let date: string = this.form.value.birthDate;
    date = date.slice(8) + "." + date.slice(5, 7) + "." + date.slice(0, 4);
    if (this.form.valid){
      const newbie: Student = new Student(0, this.form.value.fullName.lastName,
        this.form.value.fullName.firstName, this.form.value.fullName.surname,
        date, this.form.value.GPA);
      this.byAdd.emit(newbie);
      this.showErrorMessage = false;
      this.form.reset();
    } else {
      this.showErrorMessage = true;
    }
  }

  public findInvalidControls(): Array<string> {
    const invalid: Array<string> = [];
    const controls: { [p: string]: AbstractControl } = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  editStudent(): void{
    if (this.form.valid && this.student){
      let date: string = this.form.value.birthDate;
      date = date.slice(8) + "." + date.slice(5, 7) + "." + date.slice(0, 4);
      const newbie: Student = new Student(this.student?.id, this.form.value.fullName.lastName,
        this.form.value.fullName.firstName, this.form.value.fullName.surname,
        date, this.form.value.GPA);
      this.byEdit.emit(newbie);
      this.showErrorMessage = false;
      this.form.reset();
    } else {
      this.showErrorMessage = true;
    }

  }

  cancelEdit(): void{
    this.showErrorMessage = false;
    this.form.reset();
    this.byCancel.emit();
  }
}
