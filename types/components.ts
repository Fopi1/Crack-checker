import { LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export type IconProps = FC<SVGProps<SVGSVGElement>>;

export type LucideComponent = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
