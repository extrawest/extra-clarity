export const NavItemTypeEnum = {
  Divider: 'divider',
  Href: 'href',
  RouterLink: 'router-link',
  Group: 'group',
} as const;

interface NavItemDivider {
  type: typeof NavItemTypeEnum.Divider;
}

export interface NavItemLink {
  type: typeof NavItemTypeEnum.RouterLink | typeof NavItemTypeEnum.Href;
  label: string;
  icon?: string;
  link: string;
  data?: unknown;
}

export interface NavItemGroup {
  type: typeof NavItemTypeEnum.Group;
  label: string;
  icon?: string;
  expanded?: boolean;
  data?: unknown;
  children: NavListSingleItem[];
}

export type NavListItem = NavItemLink | NavItemGroup | NavItemDivider;
export type NavListSingleItem = Exclude<NavListItem, NavItemGroup>;
