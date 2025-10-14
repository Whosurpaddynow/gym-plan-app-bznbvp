
import { useState, useEffect } from 'react';
import { Achievement, Challenge, UserStats, StreakData } from '@/types/gamification';
import { ACHIEVEMENTS } from '@/data/achievements';
import { ACTIVE_CHALLENGES } from '@/data/challenges';
import * as Haptics from 'expo-haptics';

export const useGameification = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 3,
    xp: 750,
    xpToNextLevel: 250,
    totalWorkouts: 12,
    currentStreak: 3,
    longestStreak: 8,
    totalCaloriesLogged: 15,
    achievementsUnlocked: 1,
    challengesCompleted: 5,
  });

  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [challenges, setChallenges] = useState<Challenge[]>(ACTIVE_CHALLENGES);
  
  const [streakData, setStreakData] = useState<StreakData>({
    current: 3,
    longest: 8,
    lastWorkoutDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    streakDates: [
      new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    ],
  });

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 1000) + 1;
  };

  const calculateXpToNextLevel = (xp: number) => {
    const currentLevel = calculateLevel(xp);
    const xpForNextLevel = currentLevel * 1000;
    return xpForNextLevel - xp;
  };

  const addXp = (amount: number) => {
    const newXp = userStats.xp + amount;
    const newLevel = calculateLevel(newXp);
    const leveledUp = newLevel > userStats.level;

    setUserStats(prev => ({
      ...prev,
      xp: newXp,
      level: newLevel,
      xpToNextLevel: calculateXpToNextLevel(newXp),
    }));

    if (leveledUp) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      console.log(`Level up! Now level ${newLevel}`);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    return { leveledUp, newLevel };
  };

  const completeWorkout = () => {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    
    // Update streak
    let newStreak = streakData.current;
    if (streakData.lastWorkoutDate) {
      const daysSinceLastWorkout = Math.floor(
        (today.getTime() - streakData.lastWorkoutDate.getTime()) / (24 * 60 * 60 * 1000)
      );
      
      if (daysSinceLastWorkout === 1) {
        newStreak += 1;
      } else if (daysSinceLastWorkout > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const newLongestStreak = Math.max(streakData.longest, newStreak);

    setStreakData(prev => ({
      ...prev,
      current: newStreak,
      longest: newLongestStreak,
      lastWorkoutDate: today,
      streakDates: [...prev.streakDates, today],
    }));

    // Update user stats
    setUserStats(prev => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + 1,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
    }));

    // Add XP
    const { leveledUp } = addXp(100);

    // Check for achievements
    checkAchievements();

    // Update challenges
    updateChallengeProgress('workouts_completed', 1);

    console.log('Workout completed! Streak:', newStreak);
    return { newStreak, leveledUp };
  };

  const checkAchievements = () => {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;
      
      switch (achievement.requirement.type) {
        case 'workouts_completed':
          shouldUnlock = userStats.totalWorkouts >= achievement.requirement.target;
          break;
        case 'streak_days':
          shouldUnlock = streakData.current >= achievement.requirement.target;
          break;
        case 'calories_logged':
          shouldUnlock = userStats.totalCaloriesLogged >= achievement.requirement.target;
          break;
        default:
          break;
      }

      if (shouldUnlock) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        console.log(`Achievement unlocked: ${achievement.title}`);
        
        setUserStats(prev => ({
          ...prev,
          achievementsUnlocked: prev.achievementsUnlocked + 1,
        }));

        return {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date(),
        };
      }

      return achievement;
    });

    setAchievements(updatedAchievements);
  };

  const updateChallengeProgress = (type: string, amount: number) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.isCompleted) return challenge;

      let shouldUpdate = false;
      
      if (type === 'workouts_completed' && challenge.id.includes('workout')) {
        shouldUpdate = true;
      } else if (type === 'calories_logged' && challenge.id.includes('nutrition')) {
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        const newProgress = Math.min(
          challenge.progress.current + amount,
          challenge.progress.target
        );
        
        const isCompleted = newProgress >= challenge.progress.target;
        
        if (isCompleted && !challenge.isCompleted) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          console.log(`Challenge completed: ${challenge.title}`);
          
          if (challenge.reward.type === 'xp') {
            addXp(challenge.reward.value as number);
          }
          
          setUserStats(prev => ({
            ...prev,
            challengesCompleted: prev.challengesCompleted + 1,
          }));
        }

        return {
          ...challenge,
          progress: { ...challenge.progress, current: newProgress },
          isCompleted,
        };
      }

      return challenge;
    }));
  };

  const logMeal = () => {
    setUserStats(prev => ({
      ...prev,
      totalCaloriesLogged: prev.totalCaloriesLogged + 1,
    }));

    addXp(25);
    updateChallengeProgress('calories_logged', 1);
    checkAchievements();
  };

  return {
    userStats,
    achievements,
    challenges,
    streakData,
    completeWorkout,
    logMeal,
    addXp,
  };
};
