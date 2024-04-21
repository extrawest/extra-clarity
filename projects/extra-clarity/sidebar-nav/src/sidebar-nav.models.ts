export const EC_NAV_ITEM_TYPE = {
  Divider: 'divider',
  Href: 'href',
  RouterLink: 'router-link',
  Group: 'group',
} as const;

interface EcNavItemDivider {
  type: typeof EC_NAV_ITEM_TYPE.Divider;
}

export interface EcNavItemLink {
  type: typeof EC_NAV_ITEM_TYPE.RouterLink | typeof EC_NAV_ITEM_TYPE.Href;
  label: string;
  icon?: string;
  link: string;
  data?: unknown;
}

export interface EcNavItemGroup {
  type: typeof EC_NAV_ITEM_TYPE.Group;
  label: string;
  icon?: string;
  expanded?: boolean;
  data?: unknown;
  children: EcNavListSingleItem[];
}

export type EcNavListItem = EcNavItemLink | EcNavItemGroup | EcNavItemDivider;
export type EcNavListSingleItem = Exclude<EcNavListItem, EcNavItemGroup>;

export type EcNavList = readonly EcNavListItem[];
