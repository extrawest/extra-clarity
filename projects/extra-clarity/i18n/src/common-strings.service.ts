import { Injectable } from '@angular/core';

import { commonStringsDefault } from './common-strings.default';
import { EcCommonStrings } from './common-strings.interface';

@Injectable({
  providedIn: 'root',
})
export class EcCommonStringsService {
  private _strings = commonStringsDefault;

  get keys(): Readonly<EcCommonStrings> {
    return this._strings;
  }

  localize(overrides: Partial<EcCommonStrings>) {
    this._strings = { ...this._strings, ...overrides };
  }

  parse(source: string, tokens: { [key: string]: string } = {}) {
    const names = Object.keys(tokens);
    let output = source;
    if (names.length) {
      names.forEach(name => {
        output = output.replace(`{${name}}`, tokens[name]);
      });
    }
    return output;
  }
}
