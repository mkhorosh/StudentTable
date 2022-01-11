import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormsComponent } from "./forms.component";
import { ButtonDirective } from "./button.directive";


@NgModule({
  declarations: [
    ButtonDirective,
    FormsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ButtonDirective,
    FormsComponent,
  ]
})
export class MyFormsModule { }
