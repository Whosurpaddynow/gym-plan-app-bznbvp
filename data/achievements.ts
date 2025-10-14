
import { Achievement } from '@/types/gamification';
import { colors } from '@/styles/commonStyles';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_workout',
    title: 'Getting Started',
    description: 'Complete your first workout',
    icon: 'star.fill',
    color: colors.accent,
    unlocked: true,
    unlockedAt: new Date(),
    category: 'workout',
    requirement: {
      type: 'workouts_completed',
      target: 1,
      current: 1,
    },
  },
  {
    id: 'workout_warrior',
    title: 'Workout Warrior',
    description: 'Complete 10 workouts',
    icon: 'flame.fill',
    color: colors.error,
    unlocked: false,
    category: 'workout',
    requirement: {
      type: 'workouts_completed',
      target: 10,
      current: 3,
    },
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Maintain a 7-day workout streak',
    icon: 'calendar',
    color: colors.secondary,
    unlocked: false,
    category: 'streak',
    requirement: {
      type: 'streak_days',
      target: 7,
      current: 3,
    },
  },
  {
    id: 'consistency_king',
    title: 'Consistency King',
    description: 'Maintain a 30-day workout streak',
    icon: 'crown.fill',
    color: '#FFD700',
    unlocked: false,
    category: 'streak',
    requirement: {
      type: 'streak_days',
      target: 30,
      current: 3,
    },
  },
  {
    id: 'nutrition_tracker',
    title: 'Nutrition Tracker',
    description: 'Log meals for 7 days',
    icon: 'leaf.fill',
    color: colors.secondary,
    unlocked: false,
    category: 'nutrition',
    requirement: {
      type: 'calories_logged',
      target: 7,
      current: 2,
    },
  },
  {
    id: 'goal_crusher',
    title: 'Goal Crusher',
    description: 'Reach your target weight',
    icon: 'target',
    color: colors.primary,
    unlocked: false,
    category: 'milestone',
    requirement: {
      type: 'weight_goal',
      target: 1,
      current: 0,
    },
  },
];
