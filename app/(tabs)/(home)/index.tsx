
import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles } from "@/styles/commonStyles";
import { useRouter } from "expo-router";
import { useGameification } from "@/hooks/useGameification";
import ProgressRing from "@/components/ProgressRing";
import AchievementBadge from "@/components/AchievementBadge";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();
  const { userStats, achievements, challenges, streakData, completeWorkout } = useGameification();

  const motivationalQuotes = [
    "The groundwork for all happiness is good health. - Leigh Hunt",
    "Take care of your body. It's the only place you have to live. - Jim Rohn",
    "A healthy outside starts from the inside. - Robert Urich",
    "Your body can do it. It's your mind you need to convince. - Unknown",
    "Fitness is not about being better than someone else. It's about being better than you used to be. - Unknown",
  ];

  const todaysQuote = motivationalQuotes[new Date().getDate() % motivationalQuotes.length];

  const quickStats = [
    { 
      label: 'Level', 
      value: userStats.level.toString(), 
      icon: 'star.fill', 
      color: colors.primary,
      progress: (userStats.xp % 1000) / 1000,
    },
    { 
      label: 'Streak', 
      value: `${streakData.current} days`, 
      icon: 'flame.fill', 
      color: colors.error,
      progress: Math.min(streakData.current / 30, 1),
    },
    { 
      label: 'Workouts', 
      value: userStats.totalWorkouts.toString(), 
      icon: 'dumbbell', 
      color: colors.secondary,
      progress: (userStats.totalWorkouts % 10) / 10,
    },
    { 
      label: 'XP Today', 
      value: '150', 
      icon: 'bolt.fill', 
      color: colors.accent,
      progress: 0.6,
    },
  ];

  const quickActions = [
    { 
      title: 'Start Workout', 
      description: 'Begin today\'s planned workout',
      icon: 'play.circle.fill',
      color: colors.primary,
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        router.push('/(tabs)/workout');
      }
    },
    { 
      title: 'Log Meal', 
      description: 'Track your nutrition intake',
      icon: 'plus.circle.fill',
      color: colors.secondary,
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/(tabs)/nutrition');
      }
    },
    { 
      title: 'View Achievements', 
      description: 'Check your progress & rewards',
      icon: 'trophy.fill',
      color: colors.accent,
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/(tabs)/achievements');
      }
    },
  ];

  const todaysWorkout = {
    name: 'Upper Body Strength',
    exercises: ['Bench Press', 'Pull-ups', 'Shoulder Press', 'Barbell Rows'],
    duration: '45 min',
    completed: false,
  };

  const renderWelcomeHeader = () => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    };

    return (
      <View style={styles.welcomeHeader}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>{getGreeting()}! 👋</Text>
          <Text style={styles.subGreeting}>Ready to level up your fitness?</Text>
        </View>
        <TouchableOpacity 
          style={styles.levelBadge}
          onPress={() => router.push('/(tabs)/achievements')}
        >
          <IconSymbol name="star.fill" size={16} color={colors.card} />
          <Text style={styles.levelText}>Lv. {userStats.level}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderQuickStats = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Today's Progress</Text>
      <View style={styles.statsGrid}>
        {quickStats.map((stat, index) => (
          <Animated.View 
            key={index} 
            style={styles.statCard}
            entering={withDelay(index * 100, withSpring({}))}
          >
            <ProgressRing
              progress={stat.progress}
              size={50}
              strokeWidth={4}
              color={stat.color}
            >
              <IconSymbol name={stat.icon as any} size={20} color={stat.color} />
            </ProgressRing>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );

  const renderTodaysWorkout = () => (
    <View style={styles.workoutContainer}>
      <View style={styles.workoutHeader}>
        <Text style={styles.sectionTitle}>Today's Workout</Text>
        <TouchableOpacity 
          style={styles.completeWorkoutButton}
          onPress={() => {
            const result = completeWorkout();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
        >
          <IconSymbol name="checkmark.circle.fill" size={20} color={colors.card} />
          <Text style={styles.completeWorkoutText}>Complete</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.workoutCard}>
        <View style={styles.workoutInfo}>
          <View>
            <Text style={styles.workoutName}>{todaysWorkout.name}</Text>
            <Text style={styles.workoutDuration}>{todaysWorkout.duration}</Text>
          </View>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push('/(tabs)/workout');
            }}
          >
            <IconSymbol name="play.fill" size={20} color={colors.card} />
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.exerciseList}>
          {todaysWorkout.exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseItem}>
              <IconSymbol name="dumbbell" size={16} color={colors.textSecondary} />
              <Text style={styles.exerciseText}>{exercise}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderRecentAchievements = () => {
    const recentAchievements = achievements.filter(a => a.unlocked).slice(0, 3);
    
    if (recentAchievements.length === 0) return null;

    return (
      <View style={styles.achievementsContainer}>
        <View style={styles.achievementsHeader}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/achievements')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.achievementsList}>
            {recentAchievements.map(achievement => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                size="medium"
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderActiveChallenges = () => {
    const activeChallenges = challenges.filter(c => c.isActive && !c.isCompleted).slice(0, 2);
    
    if (activeChallenges.length === 0) return null;

    return (
      <View style={styles.challengesContainer}>
        <View style={styles.challengesHeader}>
          <Text style={styles.sectionTitle}>Active Challenges</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/achievements')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {activeChallenges.map(challenge => (
          <View key={challenge.id} style={styles.challengeCard}>
            <View style={styles.challengeInfo}>
              <View style={[styles.challengeIcon, { backgroundColor: challenge.color }]}>
                <IconSymbol name={challenge.icon as any} size={20} color={colors.card} />
              </View>
              <View style={styles.challengeText}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeProgress}>
                  {challenge.progress.current} / {challenge.progress.target}
                </Text>
              </View>
            </View>
            <ProgressRing
              progress={challenge.progress.current / challenge.progress.target}
              size={40}
              strokeWidth={4}
              color={challenge.color}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderQuickActions = () => (
    <View style={styles.actionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsList}>
        {quickActions.map((action, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.actionCard}
            onPress={action.onPress}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
              <IconSymbol name={action.icon as any} size={24} color={colors.card} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDescription}>{action.description}</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMotivationalQuote = () => (
    <View style={styles.quoteContainer}>
      <View style={styles.quoteCard}>
        <IconSymbol name="quote.bubble" size={32} color={colors.primary} />
        <Text style={styles.quoteText}>{todaysQuote}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[commonStyles.container]} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "FitTracker",
            headerLargeTitle: true,
          }}
        />
      )}
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {renderWelcomeHeader()}
        {renderQuickStats()}
        {renderTodaysWorkout()}
        {renderRecentAchievements()}
        {renderActiveChallenges()}
        {renderQuickActions()}
        {renderMotivationalQuote()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.card,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '23%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  workoutContainer: {
    marginBottom: 24,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  completeWorkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completeWorkoutText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
  workoutCard: {
    ...commonStyles.card,
  },
  workoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  workoutDuration: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    color: colors.card,
    fontWeight: '600',
    marginLeft: 4,
  },
  exerciseList: {
    gap: 8,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  achievementsContainer: {
    marginBottom: 24,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  achievementsList: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  challengesContainer: {
    marginBottom: 24,
  },
  challengesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  challengeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  challengeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  challengeText: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  challengeProgress: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionsList: {
    gap: 12,
  },
  actionCard: {
    ...commonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  quoteContainer: {
    marginBottom: 24,
  },
  quoteCard: {
    ...commonStyles.card,
    alignItems: 'center',
    padding: 24,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.text,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
});
