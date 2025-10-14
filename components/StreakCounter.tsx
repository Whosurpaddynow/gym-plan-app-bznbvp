
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  streakDates?: Date[];
}

export default function StreakCounter({ 
  currentStreak, 
  longestStreak, 
  streakDates = [] 
}: StreakCounterProps) {
  const flameScale = useSharedValue(1);
  const flameOpacity = useSharedValue(1);

  React.useEffect(() => {
    // Animate flame when streak updates
    flameScale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );
    flameOpacity.value = withSequence(
      withSpring(0.7),
      withSpring(1)
    );
  }, [currentStreak]);

  const flameAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flameScale.value }],
    opacity: flameOpacity.value,
  }));

  const getStreakColor = () => {
    if (currentStreak >= 30) return '#FFD700'; // Gold
    if (currentStreak >= 14) return colors.accent; // Orange
    if (currentStreak >= 7) return colors.error; // Red
    if (currentStreak >= 3) return colors.secondary; // Green
    return colors.primary; // Blue
  };

  const getStreakMessage = () => {
    if (currentStreak === 0) return 'Start your streak today!';
    if (currentStreak === 1) return 'Great start! Keep it up!';
    if (currentStreak < 7) return 'Building momentum!';
    if (currentStreak < 14) return 'You\'re on fire!';
    if (currentStreak < 30) return 'Incredible dedication!';
    return 'Legendary streak!';
  };

  const renderStreakDots = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    return (
      <View style={styles.streakDots}>
        {last7Days.map((date, index) => {
          const hasWorkout = streakDates.some(streakDate => 
            streakDate.toDateString() === date.toDateString()
          );
          
          return (
            <View
              key={index}
              style={[
                styles.streakDot,
                hasWorkout && { backgroundColor: getStreakColor() }
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View style={flameAnimatedStyle}>
          <IconSymbol 
            name="flame.fill" 
            size={32} 
            color={getStreakColor()} 
          />
        </Animated.View>
        <View style={styles.streakInfo}>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>
      </View>

      <Text style={styles.streakMessage}>{getStreakMessage()}</Text>

      {renderStreakDots()}

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{longestStreak}</Text>
          <Text style={styles.statLabel}>Best Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{streakDates.length}</Text>
          <Text style={styles.statLabel}>Total Workouts</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakInfo: {
    marginLeft: 16,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  streakLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: -4,
  },
  streakMessage: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  streakDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  streakDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
