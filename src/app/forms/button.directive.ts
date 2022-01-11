import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appButton]"
})
export class ButtonDirective {

  @HostBinding("style.box-shadow")shadow: string = "";
  @HostBinding("style.background-color")color: string = "";


  @HostListener("mouseenter") enter(): void {
    this.shadow = "0 0 10px 0 #f8edeb inset, 0 0 10px 4px #f8edeb";
  }

  @HostListener("mouseleave") leave(): void {
    this.shadow = "";
  }

  @HostListener("click") changeColor(): void {
    if (this.color === ""){
      this.color = "#f8edeb";
    } else {
      this.color = "";
    }
  }

}
