import { signIn } from "next-auth/react";

import { Discord, Google } from "../../icons";

export const hoverColor = "#fff";
export const iconProps = {
  "aria-hidden": true,
  width: "18",
  height: "18",
  role: "img",
  strokeWidth: "3",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
};
export const loginLinks = [
  {
    name: "Google",
    onClick: () => signIn("google", { redirect: false }),
    backgroundColor: "#4285f4",
    icon: Google,
  },
  {
    name: "Discord",
    onClick: () => signIn("discord", { redirect: false }),
    backgroundColor: "#7289da",
    icon: Discord,
  },
];
