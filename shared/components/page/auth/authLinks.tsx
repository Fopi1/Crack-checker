"use client";

import { TransitionLink } from "../../shared";
import { hoverColor, iconProps, loginLinks } from "./constants";

export const AuthLinks = () => {
  return (
    <div className="flex flex-col gap-2">
      {loginLinks.map((link) => {
        return (
          <TransitionLink
            key={link.href}
            {...link}
            sameSite
            iconProps={iconProps}
            hoverColor={hoverColor}
          >
            <span>Login with {link.name}</span>
          </TransitionLink>
        );
      })}
      <span className="inline-block uppercase mt-10 text-center">or</span>
    </div>
  );
};
