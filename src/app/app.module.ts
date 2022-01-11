import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { MyFormsModule } from "./forms/myForms.module";
import { ExcellentStudentDirective } from "./excellent-student.directive";
import { ConvertDatePipe } from "./convert-date.pipe";
import { ConvertGpaPipe } from "./convert-gpa.pipe";

@NgModule({
  declarations: [
    AppComponent,
    ConvertDatePipe,
    ConvertGpaPipe,
    ExcellentStudentDirective,
  ],
  imports: [
    BrowserModule,
    MyFormsModule,
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
