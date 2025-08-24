import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMenus } from '@/redux/slices/menuSlice';
import { fetchRoleMenuPermissions } from '@/redux/slices/roleMenuPermissionSlice';
import { MenuPermissionDto } from '@/types/master-data/menu.type';
import { RoleParam } from '@/types/master-data/role.type';
import { getMasterApiUrl } from '@/utils/api';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

interface Menu {
  id: string;
  parentId: string | null;
  parentMenu: string;
  name: string;
  icon: string | null;
  path: string | null;
  view: boolean;
  add: boolean;
  update: boolean;
  delete: boolean;
}

interface PermissionModalProps {
  role: RoleParam;
  onClose: () => void;
}

const initialMenus: Menu[] = [
  {
    id: '0445bb23-a476-4dd6-aa5a-1ec78c62ec20',
    parentId: null,
    parentMenu: '',
    name: 'Dashboard',
    icon: 'bi bi-speedometer',
    path: '/',
    view: false,
    add: false,
    update: false,
    delete: false,
  },
  {
    id: '0d806a96-49cb-4331-a499-fb7c955095c2',
    parentId: null,
    parentMenu: '',
    name: 'Master Data',
    icon: 'bi bi-database',
    path: null,
    view: false,
    add: false,
    update: false,
    delete: false,
  },
  {
    id: 'ded50648-ae37-4b90-8513-a261ddd5f687',
    parentId: '0d806a96-49cb-4331-a499-fb7c955095c2',
    parentMenu: 'Master Data',
    name: 'Menus',
    icon: null,
    path: '/master-data/menus',
    view: false,
    add: false,
    update: false,
    delete: false,
  },
  {
    id: 'e5ed1d33-457b-48e1-84dc-3bf41f7f5a2a',
    parentId: '0d806a96-49cb-4331-a499-fb7c955095c2',
    parentMenu: 'Master Data',
    name: 'Roles',
    icon: null,
    path: '/master-data/roles',
    view: false,
    add: false,
    update: false,
    delete: false,
  },
  {
    id: '40b587a1-c91a-49ab-a159-747c2c0b33ed',
    parentId: null,
    parentMenu: '',
    name: 'Task',
    icon: 'bi bi-list-task',
    path: '/tasks',
    view: false,
    add: false,
    update: false,
    delete: false,
  },
  {
    id: 'e0fa49f7-1d01-4e36-a0ae-6daf17bdd722',
    parentId: '40b587a1-c91a-49ab-a159-747c2c0b33ed',
    parentMenu: 'Task',
    name: 'Add Task',
    icon: null,
    path: '/master-data/menus',
    view: false,
    add: false,
    update: false,
    delete: false,
  },
];

export default function PermissionModal({
  role,
  onClose,
}: PermissionModalProps) {
  const roleUrl = getMasterApiUrl('/roles');
  const permissionUrl = getMasterApiUrl('/role-menu-permissions');
  const dispatch = useAppDispatch();
  const { menus } = useAppSelector((state) => state.menu);
  const { roleMenuPermissions, loading, error } = useAppSelector(
    (state) => state.roleMenuPermission,
  );
  const [menu, setMenu] = useState<Menu[]>(initialMenus);

  useEffect(() => {
    if (role?.id) {
      dispatch(fetchRoleMenuPermissions(role?.id));
      dispatch(fetchMenus());
    }
  }, [dispatch, role]);

  useEffect(() => {
    if (!menus) return;
    const transformedMenu: MenuPermissionDto[] = menus.map((m) => ({
      id: m.id,
      parentId: m.parentId,
      parentMenu: m.parentMenu,
      name: m.name,
      icon: m.icon,
      path: m.path,
      view: false,
      add: false,
      update: false,
      delete: false,
    }));

    const transformedPermission =
      roleMenuPermissions?.map((p) => ({
        id: p.id,
        roleId: p.roleId,
        menuId: p.menuId,
        view: p.view,
        add: p.add,
        update: p.update,
        delete: p.delete,
      })) ?? [];

    const mergedMenu = transformedMenu.map((menu) => {
      const perm = transformedPermission.find((p) => p.menuId === menu.id);
      if (perm) {
        return {
          ...menu,
          view: perm.view,
          add: perm.add,
          update: perm.update,
          delete: perm.delete,
        };
      }
      return menu;
    });

    setMenu(mergedMenu);
  }, [menus, roleMenuPermissions]);

  const togglePermission = (menuId: string, field: keyof Menu) => {
    setMenu((prev) =>
      prev.map((m) => (m.id === menuId ? { ...m, [field]: !m[field] } : m)),
    );
  };

  const renderTableWithRowSpan = () => {
    const parents = menu.filter((menu) => menu.parentId === null);

    return parents.flatMap((parent) => {
      const children = menu.filter((menu) => menu.parentId === parent.id);

      if (children.length === 0) {
        // No children, just render parent with its permissions
        return (
          <tr key={parent.id} className="table-light">
            <td>
              {parent.icon && <i className={`${parent.icon} me-2`}></i>}
              {parent.name}
            </td>
            <td></td>
            {['view', 'add', 'update', 'delete'].map((perm) => (
              <td key={perm} className="text-center">
                <input
                  type="checkbox"
                  checked={parent[perm as keyof Menu] as boolean}
                  onChange={() =>
                    togglePermission(parent.id, perm as keyof Menu)
                  }
                />
              </td>
            ))}
          </tr>
        );
      }

      // Parent with children → first row shows parent + parent permissions
      const firstRow = (
        <tr key={`${parent.id}-parent`} className="table-light">
          <td rowSpan={children.length + 1} className="align-middle">
            {parent.icon && <i className={`${parent.icon} me-2`}></i>}
            {parent.name}
          </td>
          <td className="fw-bold">-</td>
          {['view', 'add', 'update', 'delete'].map((perm) => (
            <td key={perm} className="text-center">
              <input
                type="checkbox"
                checked={parent[perm as keyof Menu] as boolean}
                onChange={() => togglePermission(parent.id, perm as keyof Menu)}
              />
            </td>
          ))}
        </tr>
      );

      // Child rows
      const childRows = children.map((child) => (
        <tr key={child.id}>
          <td>
            {child.icon && <i className={`${child.icon} me-2`}></i>}
            {child.name}
          </td>
          {['view', 'add', 'update', 'delete'].map((perm) => (
            <td key={perm} className="text-center">
              <input
                type="checkbox"
                checked={child[perm as keyof Menu] as boolean}
                onChange={() => togglePermission(child.id, perm as keyof Menu)}
              />
            </td>
          ))}
        </tr>
      ));

      return [firstRow, ...childRows];
    });
  };

  const savePermissions = () => {
    const transformedPermission =
      menu?.map((p) => ({
        roleId: role?.id,
        menuId: p.id,
        view: p.view,
        add: p.add,
        update: p.update,
        delete: p.delete,
      })) ?? [];
    axiosInstance
      .patch(`${permissionUrl}/${role?.id}`, transformedPermission)
      .then((response) => {
        Toast({
          message: 'Permission has been saved successfully!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        onClose();
      })
      .catch((error) => {
        Toast({
          message: 'Something went worng!',
          type: 'warning',
          autoClose: 1500,
          theme: 'colored',
        });
        console.error(error);
      });
  };
  console.log('menu:', menu);
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-start">Parent Menu</th>
            <th className="text-start">Child Menu</th>
            <th className="text-center">View</th>
            <th className="text-center">Add</th>
            <th className="text-center">Update</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>{renderTableWithRowSpan()}</tbody>
      </table>
      <div className="d-flex justify-content-end gap-2 mt-3 py-2 border-top">
        <Button variant="danger" onClick={onClose}>
          <i className="bi bi-x" /> Cancel
        </Button>
        {/* <PermissionGuard action="add"> */}
          <Button variant="primary" type="submit" onClick={savePermissions}>
            <i className="bi bi-floppy2-fill" /> Save
          </Button>
        {/* </PermissionGuard> */}
      </div>
    </div>
  );
}
