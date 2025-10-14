
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useGameification } from '@/hooks/useGameification';
import AchievementBadge from '@/components/AchievementBadge';
import ChallengeCard from '@/components/ChallengeCard';
import StreakCounter from '@/components/StreakCounter';
import ProgressRing from '@/components/ProgressRing';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
} from 'react-native-reanimated';

export default function AchievementsScreen() {
  const { userStats, achievements, challenges, streakData, completeWorkout, logMeal } = useGameification();
  const [selectedTab, setSelectedTab] = useState<'achievements' | 'challenges' | 'stats'>('achievements');

  const levelProgress = (userStats.xp % 1000) / 1000;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.levelContainer}>
        <ProgressRing
          progress={levelProgress}
          size={80}
          strokeWidth={8}
          color={colors.primary}
        >
          <Text style={styles.levelNumber}>{userStats.level}</Text>
        </ProgressRing>
        <View style={styles.levelInfo}>
          <Text style={styles.levelTitle}>Level {userStats.level}</Text>
          <Text style={styles.xpText}>{userStats.xp} XP</Text>
          <Text style={styles.xpToNext}>{userStats.xpToNextLevel} XP to next level</Text>
        </View>
      </View>
      
      <View style={styles.quickStats}>
        <View style={styles.quickStat}>
          <IconSymbol name="trophy.fill" size={20} color={colors.accent} />
          <Text style={styles.quickStatValue}>{userStats.achievementsUnlocked}</Text>
          <Text style={styles.quickStatLabel}>Achievements</Text>
        </View>
        <View style={styles.quickStat}>
          <IconSymbol name="target" size={20} color={colors.secondary} />
          <Text style={styles.quickStatValue}>{userStats.challengesCompleted}</Text>
          <Text style={styles.quickStatLabel}>Challenges</Text>
        </View>
        <View style={styles.quickStat}>
          <IconSymbol name="flame.fill" size={20} color={colors.error} />
          <Text style={styles.quickStatValue}>{userStats.currentStreak}</Text>
          <Text style={styles.quickStatLabel}>Streak</Text>
        </View>
      </View>
    </View>
  );

  const renderTabSelector = () => (
    <View style={styles.tabSelector}>
      {[
        { key: 'achievements', label: 'Achievements', icon: 'trophy.fill' },
        { key: 'challenges', label: 'Challenges', icon: 'target' },
        { key: 'stats', label: 'Stats', icon: 'chart.bar.fill' },
      ].map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            selectedTab === tab.key && styles.activeTab
          ]}
          onPress={() => setSelectedTab(tab.key as any)}
        >
          <IconSymbol 
            name={tab.icon as any} 
            size={20} 
            color={selectedTab === tab.key ? colors.card : colors.textSecondary} 
          />
          <Text style={[
            styles.tabText,
            selectedTab === tab.key && styles.activeTabText
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Your Achievements</Text>
      <View style={styles.achievementsGrid}>
        {achievements.map(achievement => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            size="medium"
          />
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Progress</Text>
      {achievements.filter(a => !a.unlocked).map(achievement => (
        <View key={achievement.id} style={styles.progressItem}>
          <View style={styles.progressHeader}>
            <AchievementBadge achievement={achievement} size="small" />
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>{achievement.title}</Text>
              <Text style={styles.progressDescription}>{achievement.description}</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${(achievement.requirement.current / achievement.requirement.target) * 100}%`,
                  backgroundColor: achievement.color 
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {achievement.requirement.current} / {achievement.requirement.target}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderChallenges = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Active Challenges</Text>
      {challenges.filter(c => c.isActive && !c.isCompleted).map(challenge => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
      
      <Text style={styles.sectionTitle}>Completed Challenges</Text>
      {challenges.filter(c => c.isCompleted).map(challenge => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
      
      {challenges.filter(c => c.isCompleted).length === 0 && (
        <View style={styles.emptyState}>
          <IconSymbol name="target" size={48} color={colors.textSecondary} />
          <Text style={styles.emptyStateText}>No completed challenges yet</Text>
          <Text style={styles.emptyStateSubtext}>Complete your first challenge to see it here!</Text>
        </View>
      )}
    </View>
  );

  const renderStats = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Workout Streak</Text>
      <StreakCounter
        currentStreak={streakData.current}
        longestStreak={streakData.longest}
        streakDates={streakData.streakDates}
      />
      
      <Text style={styles.sectionTitle}>Overall Stats</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <IconSymbol name="dumbbell" size={32} color={colors.primary} />
          <Text style={styles.statValue}>{userStats.totalWorkouts}</Text>
          <Text style={styles.statLabel}>Total Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <IconSymbol name="leaf.fill" size={32} color={colors.secondary} />
          <Text style={styles.statValue}>{userStats.totalCaloriesLogged}</Text>
          <Text style={styles.statLabel}>Meals Logged</Text>
        </View>
        <View style={styles.statCard}>
          <IconSymbol name="star.fill" size={32} color={colors.accent} />
          <Text style={styles.statValue}>{userStats.xp}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>
        <View style={styles.statCard}>
          <IconSymbol name="calendar" size={32} color={colors.highlight} />
          <Text style={styles.statValue}>{streakData.longest}</Text>
          <Text style={styles.statLabel}>Best Streak</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Test Actions</Text>
      <View style={styles.testActions}>
        <TouchableOpacity 
          style={styles.testButton}
          onPress={completeWorkout}
        >
          <Text style={styles.testButtonText}>Complete Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.testButton}
          onPress={logMeal}
        >
          <Text style={styles.testButtonText}>Log Meal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'achievements':
        return renderAchievements();
      case 'challenges':
        return renderChallenges();
      case 'stats':
        return renderStats();
      default:
        return renderAchievements();
    }
  };

  return (
    <SafeAreaView style={[commonStyles.container]} edges={['top']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {renderTabSelector()}
        {renderContent()}
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
  header: {
    marginBottom: 24,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  levelInfo: {
    marginLeft: 20,
    flex: 1,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  xpText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 2,
  },
  xpToNext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStat: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  activeTabText: {
    color: colors.card,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  progressItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressInfo: {
    marginLeft: 12,
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  progressDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  testActions: {
    flexDirection: 'row',
    gap: 12,
  },
  testButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});
