export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonParam {
  size?: ButtonSize;
  variant?: string;
  icon?: string;
  label?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  tooltip?: string;
}
