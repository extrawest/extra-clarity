export const NAV_ITEM_TYPE = {
  Divider: 'divider',
  Href: 'href',
  RouterLink: 'router-link',
  Group: 'group',
} as const;

interface NavItemDivider {
  type: typeof NAV_ITEM_TYPE.Divider;
}

export interface NavItemLink {
  type: typeof NAV_ITEM_TYPE.RouterLink | typeof NAV_ITEM_TYPE.Href;
  label: string;
  icon?: string;
  link: string;
  data?: unknown;
}

export interface NavItemGroup {
  type: typeof NAV_ITEM_TYPE.Group;
  label: string;
  icon?: string;
  expanded?: boolean;
  data?: unknown;
  children: NavListSingleItem[];
}

export type NavListItem = NavItemLink | NavItemGroup | NavItemDivider;
export type NavListSingleItem = Exclude<NavListItem, NavItemGroup>;

export type NavList = readonly NavListItem[];
