
import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles } from "@/styles/commonStyles";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const quickStats = [
    { label: 'Workouts This Week', value: '3', icon: 'dumbbell', color: colors.primary },
    { label: 'Calories Today', value: '1,850', icon: 'flame', color: colors.accent },
    { label: 'Weight Progress', value: '-2.5 lbs', icon: 'chart.line.uptrend.xyaxis', color: colors.secondary },
    { label: 'Streak', value: '12 days', icon: 'calendar', color: colors.highlight },
  ];

  const quickActions = [
    { 
      title: 'Start Workout', 
      description: 'Begin today\'s planned workout',
      icon: 'play.circle.fill',
      color: colors.primary,
      onPress: () => router.push('/(tabs)/workout')
    },
    { 
      title: 'Log Meal', 
      description: 'Track your nutrition intake',
      icon: 'plus.circle.fill',
      color: colors.secondary,
      onPress: () => router.push('/(tabs)/nutrition')
    },
    { 
      title: 'View Progress', 
      description: 'Check your fitness journey',
      icon: 'chart.bar.fill',
      color: colors.accent,
      onPress: () => router.push('/(tabs)/profile')
    },
  ];

  const todaysWorkout = {
    name: 'Upper Body Strength',
    exercises: ['Bench Press', 'Pull-ups', 'Shoulder Press', 'Barbell Rows'],
    duration: '45 min',
    completed: false,
  };

  const renderQuickStats = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Today's Overview</Text>
      <View style={styles.statsGrid}>
        {quickStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <IconSymbol name={stat.icon as any} size={24} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTodaysWorkout = () => (
    <View style={styles.workoutContainer}>
      <Text style={styles.sectionTitle}>Today's Workout</Text>
      <View style={styles.workoutCard}>
        <View style={styles.workoutHeader}>
          <View>
            <Text style={styles.workoutName}>{todaysWorkout.name}</Text>
            <Text style={styles.workoutDuration}>{todaysWorkout.duration}</Text>
          </View>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => router.push('/(tabs)/workout')}
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
        <Text style={styles.quoteText}>
          "The groundwork for all happiness is good health."
        </Text>
        <Text style={styles.quoteAuthor}>- Leigh Hunt</Text>
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
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subGreeting}>Ready to crush your fitness goals?</Text>
        </View>

        {renderQuickStats()}
        {renderTodaysWorkout()}
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
  header: {
    marginBottom: 24,
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
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
  workoutContainer: {
    marginBottom: 24,
  },
  workoutCard: {
    ...commonStyles.card,
  },
  workoutHeader: {
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
    marginVertical: 16,
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
