import { Injectable, TemplateRef } from '@angular/core';
import { IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';

@Injectable()
export class EcSidebarNavService {
  customLabelTemplateRef?: TemplateRef<unknown>;

  readonly navigationEnd = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
  );

  constructor(private router: Router) {}

  getUniqueIdentityItems<T extends object>(
    originalList: readonly T[] | null | undefined,
  ): readonly T[] {
    if (!originalList?.length) {
      return [];
    }

    const items: T[] = [];

    originalList.forEach((originalItem) => {
      if (items.includes(originalItem)) {
        // Creating clones of repeated items to grant correct tracking within a @for loop
        items.push({ ...originalItem });
      } else {
        items.push(originalItem);
      }
    });

    return items;
  }

  isPathActive(url: string, paths: IsActiveMatchOptions['paths']): boolean {
    return this.router.isActive(url, {
      paths,
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });
  }
}
