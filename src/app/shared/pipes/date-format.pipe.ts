import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: Date|undefined, ...args: unknown[]): unknown {
        if (!value) return '';

        const date = new Date(value);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}.${month}.${day}. ${hours}:${minutes}`;
    }
}
