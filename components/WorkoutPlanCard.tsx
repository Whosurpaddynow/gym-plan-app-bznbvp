
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { WorkoutPlan } from '@/data/workoutPlans';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
  onSelect: (plan: WorkoutPlan) => void;
  onPreview: (plan: WorkoutPlan) => void;
}

const WorkoutPlanCard = ({ plan, onSelect, onPreview }: WorkoutPlanCardProps) => {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPreview(plan);
  };

  const handleSelect = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelect(plan);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return colors.success;
      case 'Intermediate':
        return colors.warning;
      case 'Advanced':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength':
        return 'dumbbell';
      case 'cardio':
        return 'heart.fill';
      case 'hybrid':
        return 'bolt.fill';
      case 'bodyweight':
        return 'figure.walk';
      default:
        return 'dumbbell';
    }
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <IconSymbol 
              name={getCategoryIcon(plan.category)} 
              size={24} 
              color={colors.primary} 
            />
            <Text style={styles.title}>{plan.name}</Text>
          </View>
          
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: getDifficultyColor(plan.difficulty) + '20' }]}>
              <Text style={[styles.badgeText, { color: getDifficultyColor(plan.difficulty) }]}>
                {plan.difficulty}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{plan.daysPerWeek} days/week</Text>
            </View>
          </View>
        </View>

        <Text style={styles.description}>{plan.description}</Text>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <IconSymbol name="clock" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{plan.duration}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <IconSymbol name="target" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>
              {plan.targetMuscleGroups.slice(0, 3).join(', ')}
              {plan.targetMuscleGroups.length > 3 && ` +${plan.targetMuscleGroups.length - 3} more`}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol name="wrench.and.screwdriver" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>
              {plan.equipment.length === 1 && plan.equipment[0] === 'None' 
                ? 'No equipment needed' 
                : plan.equipment.slice(0, 2).join(', ')
              }
              {plan.equipment.length > 2 && plan.equipment[0] !== 'None' && ` +${plan.equipment.length - 2} more`}
            </Text>
          </View>
        </View>

        <View style={styles.benefits}>
          <Text style={styles.benefitsTitle}>Key Benefits:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.benefitsList}>
              {plan.benefits.slice(0, 3).map((benefit, index) => (
                <View key={index} style={styles.benefitTag}>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.previewButton} onPress={handlePress}>
            <IconSymbol name="eye" size={16} color={colors.primary} />
            <Text style={styles.previewButtonText}>Preview</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
            <IconSymbol name="plus.circle.fill" size={16} color={colors.card} />
            <Text style={styles.selectButtonText}>Select Plan</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  benefits: {
    marginBottom: 16,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  benefitsList: {
    flexDirection: 'row',
    gap: 8,
  },
  benefitTag: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  benefitText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  previewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  previewButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  selectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  selectButtonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
});

export default WorkoutPlanCard;
