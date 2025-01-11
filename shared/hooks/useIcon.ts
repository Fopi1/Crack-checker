import { cloneElement, ReactElement } from "react";

export const useIcon = (
  icon: ReactElement,
  iconProps: object
): ReactElement => {
  return cloneElement(icon, { ...iconProps });
};
