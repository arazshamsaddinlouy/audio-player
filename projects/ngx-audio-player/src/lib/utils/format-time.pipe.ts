import { Pipe, PipeTransform } from '@angular/core';
import { formatTime } from './time-utils';

@Pipe({
  name: 'formatTime',
  standalone: true,
})
export class FormatTimePipe implements PipeTransform {
  transform(seconds: number): string {
    return formatTime(seconds);
  }
}
