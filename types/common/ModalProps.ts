export type ModalProps = {
  show: boolean;
  size?: "sm" | "lg" | "xl";
  title?: string;
  footer: boolean;
  onHide: () => void;
  children: React.ReactNode;
  fullscreen: true | 'sm-down'| 'md-down'| 'lg-down'| 'xl-down'| 'xxl-down'| 'xl-up';
};