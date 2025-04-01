import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDate',
    standalone: true,
})
export class FormatDatePipe implements PipeTransform {
    transform(value: string): string {
        const date = new Date(value.replace(' ', ''));
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(date, 'dd-mm-yyyy HH:mm:ss') ?? '-';
    }
}
