import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement>;

export type LucideComponent = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

