import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "convertGpa"
})
export class ConvertGpaPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const mark: string = value.toFixed(2);
    const maxMark: number = 5;
    return mark + "\\" + maxMark.toFixed(2);
  }

}
