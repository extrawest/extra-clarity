import { NAV_ITEM_TYPE, NavItemGroup, NavItemLink, NavListSingleItem } from './sidebar-nav.models';

export const divider = {
  type: NAV_ITEM_TYPE.Divider,
};

export const createGroup = (label: string, children: NavListSingleItem[]): NavItemGroup => ({
  label,
  children,
  type: NAV_ITEM_TYPE.Group,
});

export const createHrefLink = (label: string, link: string): NavItemLink => ({
  label,
  link,
  type: NAV_ITEM_TYPE.Href,
});

export const createRouterLink = (label: string, link: string): NavItemLink => ({
  label,
  link,
  type: NAV_ITEM_TYPE.RouterLink,
});
