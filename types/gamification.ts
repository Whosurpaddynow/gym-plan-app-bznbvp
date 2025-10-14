
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'workout' | 'nutrition' | 'streak' | 'milestone';
  requirement: {
    type: 'workouts_completed' | 'streak_days' | 'calories_logged' | 'weight_goal';
    target: number;
    current: number;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isCompleted: boolean;
  progress: {
    current: number;
    target: number;
  };
  reward: {
    type: 'xp' | 'badge' | 'title';
    value: number | string;
  };
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  totalCaloriesLogged: number;
  achievementsUnlocked: number;
  challengesCompleted: number;
}

export interface StreakData {
  current: number;
  longest: number;
  lastWorkoutDate?: Date;
  streakDates: Date[];
}
