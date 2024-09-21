import React from "react";
import { Link } from "../components/types";

export const useElementWithProps = (links: Link[], props: object): Link[] => {
  const linksWithProps = links.map((link) => {
    return { ...link, icon: React.cloneElement(link.icon, props) };
  });
  return linksWithProps;
};
