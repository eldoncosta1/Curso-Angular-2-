import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray'
})
export class FiltroArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
   

    let filter = args.toLocaleLowerCase();
    return value.filter(
      v => v.toLocaleLowerCase().indexOf(filter) != -1
    );    
    
  }

}
