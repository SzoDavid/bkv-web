import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

    transform(value: Date|undefined, ...args: unknown[]): unknown {
        if (!value) return '';

        const hours = value.getHours().toString().padStart(2, '0');
        const minutes = value.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }

}
