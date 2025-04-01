import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatCurrency',
    standalone: true,
})
export class FormatCurrencyPipe implements PipeTransform {
    transform(value: string): string {
        const numericValue = parseFloat(value.replace(/,/g, ''));

        if (isNaN(numericValue)) {
            return 'Invalid number';
        }

        const currencyPipe = new CurrencyPipe('en-US');
        return currencyPipe.transform(numericValue, 'GBP', 'symbol', '1.2-2') ?? '-';
    }
}
