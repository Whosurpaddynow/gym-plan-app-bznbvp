
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
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

interface WorkoutPlanPreviewProps {
  plan: WorkoutPlan | null;
  visible: boolean;
  onClose: () => void;
  onSelect: (plan: WorkoutPlan) => void;
}

const WorkoutPlanPreview = ({ plan, visible, onClose, onSelect }: WorkoutPlanPreviewProps) => {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (plan && visible) {
      const firstDay = Object.keys(plan.weeklySchedule)[0];
      setSelectedDay(firstDay);
    }
  }, [plan, visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!plan) return null;

  const handleSelect = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelect(plan);
    onClose();
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

  const selectedWorkout = plan.weeklySchedule[selectedDay];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="xmark" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Workout Plan Preview</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Plan Overview */}
          <View style={styles.planOverview}>
            <Text style={styles.planTitle}>{plan.name}</Text>
            <Text style={styles.planDescription}>{plan.description}</Text>
            
            <View style={styles.planStats}>
              <View style={styles.statItem}>
                <IconSymbol name="calendar" size={20} color={colors.primary} />
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>{plan.duration}</Text>
              </View>
              
              <View style={styles.statItem}>
                <IconSymbol name="clock" size={20} color={colors.primary} />
                <Text style={styles.statLabel}>Frequency</Text>
                <Text style={styles.statValue}>{plan.daysPerWeek} days/week</Text>
              </View>
              
              <View style={styles.statItem}>
                <IconSymbol name="target" size={20} color={getDifficultyColor(plan.difficulty)} />
                <Text style={styles.statLabel}>Level</Text>
                <Text style={[styles.statValue, { color: getDifficultyColor(plan.difficulty) }]}>
                  {plan.difficulty}
                </Text>
              </View>
            </View>
          </View>

          {/* Target Muscle Groups */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Target Muscle Groups</Text>
            <View style={styles.muscleGroups}>
              {plan.targetMuscleGroups.map((group, index) => (
                <View key={index} style={styles.muscleGroupTag}>
                  <Text style={styles.muscleGroupText}>{group}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Equipment Needed */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Equipment Needed</Text>
            <View style={styles.equipmentList}>
              {plan.equipment.map((item, index) => (
                <View key={index} style={styles.equipmentItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={styles.equipmentText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Weekly Schedule */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Schedule</Text>
            
            {/* Day Selector */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
              <View style={styles.dayButtons}>
                {Object.keys(plan.weeklySchedule).map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      selectedDay === day && styles.selectedDayButton
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text style={[
                      styles.dayButtonText,
                      selectedDay === day && styles.selectedDayButtonText
                    ]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Selected Day Workout */}
            {selectedWorkout && (
              <View style={styles.workoutDetail}>
                <View style={styles.workoutHeader}>
                  <Text style={styles.workoutName}>{selectedWorkout.name}</Text>
                  <View style={styles.workoutMeta}>
                    <View style={styles.metaItem}>
                      <IconSymbol name="clock" size={14} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{selectedWorkout.estimatedDuration} min</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <IconSymbol name="target" size={14} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{selectedWorkout.focusAreas.join(', ')}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.exercisesList}>
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <View key={exercise.id} style={styles.exerciseItem}>
                      <View style={styles.exerciseNumber}>
                        <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                      </View>
                      
                      <View style={styles.exerciseInfo}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text style={styles.exerciseDetails}>
                          {exercise.sets} sets × {exercise.reps}
                          {exercise.restTime && ` • Rest: ${exercise.restTime}`}
                        </Text>
                        {exercise.notes && (
                          <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
                        )}
                        <View style={styles.exerciseMuscles}>
                          {exercise.muscleGroups.map((muscle, idx) => (
                            <Text key={idx} style={styles.muscleTag}>{muscle}</Text>
                          ))}
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            <View style={styles.benefitsList}>
              {plan.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <IconSymbol name="star.fill" size={16} color={colors.warning} />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tips */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pro Tips</Text>
            <View style={styles.tipsList}>
              {plan.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <IconSymbol name="lightbulb.fill" size={16} color={colors.primary} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Select Button */}
        <Animated.View style={[styles.selectContainer, animatedStyle]}>
          <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
            <IconSymbol name="plus.circle.fill" size={20} color={colors.card} />
            <Text style={styles.selectButtonText}>Select This Plan</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  planOverview: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  planTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  planStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleGroupTag: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  muscleGroupText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  equipmentList: {
    gap: 8,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  daySelector: {
    marginBottom: 16,
  },
  dayButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedDayButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  selectedDayButtonText: {
    color: colors.card,
  },
  workoutDetail: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  workoutHeader: {
    marginBottom: 16,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  exercisesList: {
    gap: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.card,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  exerciseNotes: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  exerciseMuscles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  muscleTag: {
    fontSize: 10,
    color: colors.primary,
    backgroundColor: colors.primary + '10',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 22,
  },
  selectContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
  },
  selectButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default WorkoutPlanPreview;
