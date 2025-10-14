
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Achievement } from '@/types/gamification';
import { colors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
}

export default function AchievementBadge({ 
  achievement, 
  size = 'medium',
  onPress 
}: AchievementBadgeProps) {
  const handlePress = () => {
    if (achievement.unlocked) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.();
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          icon: 24,
          title: styles.smallTitle,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          icon: 48,
          title: styles.largeTitle,
        };
      default:
        return {
          container: styles.mediumContainer,
          icon: 32,
          title: styles.mediumTitle,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity onPress={handlePress} disabled={!achievement.unlocked}>
      <View style={[
        styles.container, 
        sizeStyles.container, 
        { opacity: achievement.unlocked ? 1 : 0.4 }
      ]}>
        <View style={[styles.iconContainer, { backgroundColor: achievement.color }]}>
          <IconSymbol 
            name={achievement.icon as any} 
            size={sizeStyles.icon} 
            color={colors.card} 
          />
        </View>
        {size !== 'small' && (
          <>
            <Text style={[styles.title, sizeStyles.title]} numberOfLines={2}>
              {achievement.title}
            </Text>
            {size === 'large' && (
              <Text style={styles.description} numberOfLines={3}>
                {achievement.description}
              </Text>
            )}
          </>
        )}
        {achievement.unlocked && achievement.unlockedAt && (
          <View style={styles.unlockedIndicator}>
            <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  smallContainer: {
    width: 60,
    height: 60,
    padding: 8,
  },
  mediumContainer: {
    width: 100,
    height: 120,
    padding: 12,
  },
  largeContainer: {
    width: 140,
    height: 160,
    padding: 16,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  smallTitle: {
    fontSize: 10,
  },
  mediumTitle: {
    fontSize: 12,
  },
  largeTitle: {
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  unlockedIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
