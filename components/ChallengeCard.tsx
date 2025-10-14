
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Challenge } from '@/types/gamification';
import { colors } from '@/styles/commonStyles';
import ProgressRing from './ProgressRing';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface ChallengeCardProps {
  challenge: Challenge;
  onPress?: () => void;
}

export default function ChallengeCard({ challenge, onPress }: ChallengeCardProps) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.98, {}, () => {
      scale.value = withSpring(1);
    });
    onPress?.();
  };

  const progress = challenge.progress.current / challenge.progress.target;
  const progressPercentage = Math.round(progress * 100);

  const getTimeRemaining = () => {
    const now = new Date();
    const timeLeft = challenge.endDate.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const daysLeft = Math.floor(hoursLeft / 24);
    
    if (daysLeft > 0) {
      return `${daysLeft}d left`;
    } else if (hoursLeft > 0) {
      return `${hoursLeft}h left`;
    } else {
      return 'Ending soon';
    }
  };

  const getRewardText = () => {
    if (challenge.reward.type === 'xp') {
      return `+${challenge.reward.value} XP`;
    } else if (challenge.reward.type === 'badge') {
      return `Badge: ${challenge.reward.value}`;
    }
    return 'Reward';
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={[styles.iconContainer, { backgroundColor: challenge.color }]}>
              <IconSymbol name={challenge.icon as any} size={24} color={colors.card} />
            </View>
            <View style={styles.titleText}>
              <Text style={styles.title}>{challenge.title}</Text>
              <Text style={styles.description}>{challenge.description}</Text>
            </View>
          </View>
          <View style={styles.typeIndicator}>
            <Text style={[styles.typeText, { color: challenge.color }]}>
              {challenge.type.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <ProgressRing
            progress={progress}
            size={60}
            strokeWidth={6}
            color={challenge.color}
          >
            <Text style={styles.progressText}>{progressPercentage}%</Text>
          </ProgressRing>
          
          <View style={styles.progressDetails}>
            <Text style={styles.progressLabel}>
              {challenge.progress.current} / {challenge.progress.target}
            </Text>
            <Text style={styles.timeRemaining}>{getTimeRemaining()}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.rewardContainer}>
            <IconSymbol name="gift.fill" size={16} color={colors.accent} />
            <Text style={styles.rewardText}>{getRewardText()}</Text>
          </View>
          
          {challenge.isCompleted && (
            <View style={styles.completedIndicator}>
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
              <Text style={styles.completedText}>Completed!</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  typeIndicator: {
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  progressDetails: {
    marginLeft: 16,
    flex: 1,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  timeRemaining: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
    marginLeft: 6,
  },
  completedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
    marginLeft: 4,
  },
});
