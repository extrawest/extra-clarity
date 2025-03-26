import {
  EC_NAV_ITEM_TYPE,
  EcNavItemDivider,
  EcNavItemGroup,
  EcNavItemLink,
  EcNavListSingleItem,
} from './sidebar-nav.models';

export const divider = {
  type: EC_NAV_ITEM_TYPE.Divider,
};

export const createDivider = (): EcNavItemDivider => ({ type: EC_NAV_ITEM_TYPE.Divider });

export const createGroup = (
  label: string,
  children: EcNavListSingleItem[],
  icon?: string,
): EcNavItemGroup => ({
  label,
  children,
  icon,
  type: EC_NAV_ITEM_TYPE.Group,
});

export const createHrefLink = (label: string, link: string, icon?: string): EcNavItemLink => ({
  label,
  link,
  icon,
  type: EC_NAV_ITEM_TYPE.Href,
});

export const createRouterLink = (label: string, link: string, icon?: string): EcNavItemLink => ({
  label,
  link,
  icon,
  type: EC_NAV_ITEM_TYPE.RouterLink,
});
