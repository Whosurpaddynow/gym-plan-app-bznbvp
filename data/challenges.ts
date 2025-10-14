
import { Challenge } from '@/types/gamification';
import { colors } from '@/styles/commonStyles';

export const ACTIVE_CHALLENGES: Challenge[] = [
  {
    id: 'daily_workout',
    title: 'Daily Grind',
    description: 'Complete a workout today',
    icon: 'dumbbell',
    color: colors.primary,
    type: 'daily',
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    isActive: true,
    isCompleted: false,
    progress: {
      current: 0,
      target: 1,
    },
    reward: {
      type: 'xp',
      value: 50,
    },
  },
  {
    id: 'weekly_warrior',
    title: 'Weekly Warrior',
    description: 'Complete 5 workouts this week',
    icon: 'flame.fill',
    color: colors.accent,
    type: 'weekly',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true,
    isCompleted: false,
    progress: {
      current: 3,
      target: 5,
    },
    reward: {
      type: 'xp',
      value: 200,
    },
  },
  {
    id: 'nutrition_master',
    title: 'Nutrition Master',
    description: 'Log all meals for 3 days',
    icon: 'leaf.fill',
    color: colors.secondary,
    type: 'weekly',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true,
    isCompleted: false,
    progress: {
      current: 2,
      target: 3,
    },
    reward: {
      type: 'badge',
      value: 'Nutrition Expert',
    },
  },
];
