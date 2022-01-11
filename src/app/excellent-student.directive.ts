import { Directive, HostBinding, HostListener, Input, OnChanges } from "@angular/core";

@Directive({
  selector: "[appExcellentStudent]"
})
export class ExcellentStudentDirective implements  OnChanges{
  @Input() mark: number = -1;
  @HostBinding("class") class: string = "";
  @HostBinding("title") title: string = "";

  ngOnChanges(): void {
    if (this.mark === 5){
      this.class += "shine ";
    } else {
      if (this.class === "shine "){
        this.class = "";
      }
    }
  }

  @HostListener("mouseenter") onMouseEnter(): void {
    if (this.mark === 5){
      this.title = "Поздравляем🧑‍🎓";
    } else {
      this.title = "";
    }
  }
}
