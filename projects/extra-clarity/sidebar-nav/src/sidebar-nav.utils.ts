import { NavItemGroup, NavItemLink, NavItemTypeEnum, NavListSingleItem } from './sidebar-nav.models';

export const divider = {
  type: NavItemTypeEnum.Divider,
};

export const createGroup = (label: string, children: NavListSingleItem[]): NavItemGroup => ({
  label,
  children,
  type: NavItemTypeEnum.Group,
});

export const createHrefLink = (label: string, link: string): NavItemLink => ({
  label,
  link,
  type: NavItemTypeEnum.Href,
});

export const createRouterLink = (label: string, link: string): NavItemLink => ({
  label,
  link,
  type: NavItemTypeEnum.RouterLink,
});
