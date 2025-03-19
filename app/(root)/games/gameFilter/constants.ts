import { AlarmClockCheck, Clock, Flame, ThumbsUp, Users } from 'lucide-react';

import { LucideComponent } from '@/types/components';

export const iconMap: Record<string, LucideComponent> = {
  "Popular games": Users,
  "Last cracked games": AlarmClockCheck,
  "Hot games": Flame,
  "Most liked": ThumbsUp,
  "Unreleased games": Clock,
};

export const colors: Record<string, string> = {
  "Popular games": "text-blue-500",
  "Last cracked games": "text-red-500",
  "Hot games": "text-yellow-500",
  "Most liked": "text-blue-500",
  "Unreleased games": "text-green-500",
};
