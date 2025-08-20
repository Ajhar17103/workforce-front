'use client';
import { ReactNode } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectPermissionByPath } from '@/redux/selectors/permissions';
import { usePathname } from 'next/navigation';

type Action = 'view' | 'add' | 'update' | 'delete';

export default function PermissionGuard({
  action,
  path,
  children,
}: {
  action: Action;
  path?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const targetPath = path || pathname;

  const permission = useAppSelector((state) =>
    selectPermissionByPath(state, targetPath),
  );

  if (!permission || !permission[action]) {
    return null;
  }

  return <>{children}</>;
}
