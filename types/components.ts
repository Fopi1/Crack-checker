import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
import { Message } from "react-hook-form";

export type IconProps = SVGProps<SVGSVGElement>;

export type LucideComponent = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type ServerError =
  | (Record<
      string,
      Partial<{
        type: string | number;
        message: Message;
      }>
    > &
      Partial<{
        type: string | number;
        message: Message;
      }>)
  | undefined;
