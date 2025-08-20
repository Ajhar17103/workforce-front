import { RootState } from '@/redux/store';

export const selectPermissionByPath = (state: RootState, path: string) => {
  const menu = state.menu.menus.find((m) => m.path === path);
  if (!menu) return null;

  const perm = state.roleMenuPermission.roleMenuPermissions.find(
    (p) => p.menuId === menu.id,
  );

  return perm || null;
};
