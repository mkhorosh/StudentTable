import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "convertDate"
})
export class ConvertDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    return value.toLocaleDateString();
  }

}
