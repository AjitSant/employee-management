import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    items: any[],
    searchText: string,
    key1: string,
    key2: string,
    key3: string,
    key4: string
  ) {
    // return empty array if array is falsy
    if (!items) {
      return [];
    }

    // return the original array if search text is empty
    if (!searchText) {
      return items;
    }

    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    // retrun the filtered array
    return items.filter((item) => {
      if (item) {
        return (
          (item[key1] &&
            item[key1].toString().toLowerCase().includes(searchText)) ||
          (item[key2] &&
            item[key2].toString().toLowerCase().includes(searchText)) ||
          (item[key3] &&
            item[key3].toString().toLowerCase().includes(searchText)) ||
          (item[key4] &&
            item[key4].toString().toLowerCase().includes(searchText))
        );
      }
      return false;
    });
  }
}
