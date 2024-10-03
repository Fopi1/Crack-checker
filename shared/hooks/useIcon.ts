import React from "react";

export const useIcon = (
  icon: React.ReactElement,
  iconProps: object
): React.ReactElement => {
  return React.cloneElement(icon, { ...iconProps });
};
