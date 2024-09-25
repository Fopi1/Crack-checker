import React from "react";

export const useElementWithProps = (
  element: React.ReactElement | undefined,
  props: object
): React.ReactElement => {
  if (element) {
    return React.cloneElement(element, props);
  }
  return React.createElement("div");
};
