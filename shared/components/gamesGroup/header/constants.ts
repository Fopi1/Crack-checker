import { AlarmClockCheck, Clock, Flame, ThumbsUp, Users } from "lucide-react";

import { LucideComponent } from "@/types/components";

export const iconMap: Record<string, LucideComponent> = {
  Users: Users,
  AlarmClockCheck: AlarmClockCheck,
  Flame: Flame,
  ThumbsUp: ThumbsUp,
  Clock: Clock,
};

export const colors: Record<string, string> = {
  Users: "text-blue-500",
  AlarmClockCheck: "text-red-500",
  Flame: "text-yellow-500",
  ThumbsUp: "text-blue-500",
  Clock: "text-green-500",
};
