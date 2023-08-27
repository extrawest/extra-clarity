import { Pipe, PipeTransform } from '@angular/core';
import { escapeRegExp } from '@extrawest/extra-clarity/utils';

@Pipe({
  name: 'markMatched',
  standalone: true,
})
export class MarkMatchedStringPipe implements PipeTransform {
  transform(
    srcString: string | undefined | null,
    subString: string,
  ): string | undefined | null {
    if (!srcString || !subString) {
      return srcString;
    }

    return srcString.replace(
      new RegExp(escapeRegExp(subString), 'gi'),
      (match) => `<mark>${match}</mark>`,
    );
  }
}
