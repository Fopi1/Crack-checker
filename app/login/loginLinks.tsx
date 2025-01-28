"use client";

import { hoverColor, iconProps, loginLinks } from "./constants";
import { TransitionLink } from "@/shared/components/shared";

export const LoginLinks = () => {
  return (
    <div className="flex flex-col gap-2">
      {loginLinks.map((link) => (
        <TransitionLink
          key={link.href}
          {...link}
          sameSite
          iconProps={iconProps}
          hoverColor={hoverColor}
        >
          <span>Login with {link.name}</span>
        </TransitionLink>
      ))}
      <span className="inline-block uppercase mt-10 text-center">or</span>
    </div>
  );
};
