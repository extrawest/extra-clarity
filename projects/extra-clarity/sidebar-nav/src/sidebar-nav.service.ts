import { Injectable, TemplateRef } from '@angular/core';
import { IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable()
export class SidebarNavService {
  customLabelTemplateRef?: TemplateRef<unknown>;

  readonly navigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

  constructor(private router: Router) {}

  isPathActive(url: string, paths: IsActiveMatchOptions['paths']): boolean {
    return this.router.isActive(url, {
      paths,
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });
  }
}
