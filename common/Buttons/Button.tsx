'use client';

import { ButtonParam, ButtonSize } from '@/types/common/ButtonParam';
import { Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';

const sizeMap: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

export default function CustomButton({
  size = 'md',
  variant = 'primary',
  icon,
  label,
  className = '',
  onClick,
  type = 'button',
  loading = false,
  disabled = false,
  tooltip,
}: ButtonParam & {
  loading?: boolean;
  disabled?: boolean;
  tooltip?: string;
}) {
  return (
    <Button
      variant={variant}
      className={`custom-btn ${sizeMap[size]} shadow-sm d-flex align-items-center justify-content-center gap-2 ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      title={tooltip}
    >
      {loading && <Spinner animation="border" size="sm" />}
      {icon && !loading && <i className={`${icon} fs-5`} />}
      {label && <span className="d-none d-md-inline">{label}</span>}
    </Button>
  );
}
