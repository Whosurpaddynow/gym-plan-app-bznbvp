
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { 
  MUSCLE_GROUPS, 
  EXERCISE_DATABASE, 
  getExercisesByMuscleGroups,
  Exercise 
} from '@/data/muscleGroups';
import * as Haptics from 'expo-haptics';

interface CustomWorkoutGeneratorProps {
  selectedMuscleGroups: string[];
  visible: boolean;
  onClose: () => void;
  onGenerateWorkout: (exercises: any[]) => void;
}

interface WorkoutSettings {
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exerciseCount: number;
  includeCardio: boolean;
}

export default function CustomWorkoutGenerator({
  selectedMuscleGroups,
  visible,
  onClose,
  onGenerateWorkout
}: CustomWorkoutGeneratorProps) {
  const [settings, setSettings] = useState<WorkoutSettings>({
    duration: 45,
    difficulty: 'Intermediate',
    exerciseCount: 6,
    includeCardio: true
  });

  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  React.useEffect(() => {
    if (selectedMuscleGroups.length > 0) {
      const exercises = getExercisesByMuscleGroups(selectedMuscleGroups);
      setAvailableExercises(exercises);
    }
  }, [selectedMuscleGroups]);

  const generateWorkout = () => {
    if (selectedMuscleGroups.length === 0) {
      Alert.alert('No Muscle Groups Selected', 'Please select at least one muscle group first.');
      return;
    }

    let filteredExercises = availableExercises.filter(exercise => {
      // Filter by difficulty
      const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
      const maxDifficultyIndex = difficultyLevels.indexOf(settings.difficulty);
      const exerciseDifficultyIndex = difficultyLevels.indexOf(exercise.difficulty);
      
      return exerciseDifficultyIndex <= maxDifficultyIndex;
    });

    // If includeCardio is false, filter out cardio exercises
    if (!settings.includeCardio) {
      filteredExercises = filteredExercises.filter(exercise => 
        !exercise.primaryMuscleGroups.includes('cardio')
      );
    }

    // Ensure we have enough exercises
    if (filteredExercises.length < settings.exerciseCount) {
      Alert.alert(
        'Not Enough Exercises', 
        `Only ${filteredExercises.length} exercises available for your criteria. Try adjusting your settings.`
      );
      return;
    }

    // Smart selection algorithm
    const selectedExercises = smartExerciseSelection(
      filteredExercises, 
      selectedMuscleGroups, 
      settings.exerciseCount
    );

    // Convert to workout format
    const workoutExercises = selectedExercises.map((exercise, index) => ({
      id: `custom-${Date.now()}-${index}`,
      name: exercise.name,
      sets: exercise.defaultSets,
      reps: exercise.defaultReps,
      weight: '',
      notes: exercise.tips.join('. '),
      completed: false,
      muscleGroups: exercise.primaryMuscleGroups,
      equipment: exercise.equipment.join(', '),
      instructions: exercise.instructions,
      restTime: exercise.restTime
    }));

    onGenerateWorkout(workoutExercises);
    onClose();
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    Alert.alert(
      'Workout Generated! 🎉',
      `Created a ${settings.duration}-minute workout with ${workoutExercises.length} exercises targeting your selected muscle groups.`,
      [{ text: 'Start Workout!', style: 'default' }]
    );
  };

  const smartExerciseSelection = (
    exercises: Exercise[], 
    targetGroups: string[], 
    count: number
  ): Exercise[] => {
    const selected: Exercise[] = [];
    const usedGroups = new Set<string>();

    // First, ensure each target muscle group has at least one exercise
    for (const group of targetGroups) {
      const groupExercises = exercises.filter(ex => 
        ex.primaryMuscleGroups.includes(group) && 
        !selected.includes(ex)
      );
      
      if (groupExercises.length > 0) {
        const randomExercise = groupExercises[Math.floor(Math.random() * groupExercises.length)];
        selected.push(randomExercise);
        usedGroups.add(group);
      }
    }

    // Fill remaining slots with diverse exercises
    const remainingExercises = exercises.filter(ex => !selected.includes(ex));
    
    while (selected.length < count && remainingExercises.length > 0) {
      // Prefer exercises that target multiple muscle groups
      const multiGroupExercises = remainingExercises.filter(ex => 
        ex.primaryMuscleGroups.length > 1 || ex.secondaryMuscleGroups.length > 0
      );
      
      const candidatePool = multiGroupExercises.length > 0 ? multiGroupExercises : remainingExercises;
      const randomIndex = Math.floor(Math.random() * candidatePool.length);
      const selectedExercise = candidatePool[randomIndex];
      
      selected.push(selectedExercise);
      remainingExercises.splice(remainingExercises.indexOf(selectedExercise), 1);
    }

    return selected.slice(0, count);
  };

  const getMuscleGroupNames = () => {
    return selectedMuscleGroups
      .map(id => MUSCLE_GROUPS.find(group => group.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const DurationSelector = () => (
    <View style={styles.settingSection}>
      <Text style={styles.settingLabel}>Workout Duration</Text>
      <View style={styles.optionRow}>
        {[30, 45, 60, 75].map(duration => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.optionButton,
              settings.duration === duration && styles.selectedOption
            ]}
            onPress={() => {
              setSettings(prev => ({ ...prev, duration }));
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Text style={[
              styles.optionText,
              settings.duration === duration && styles.selectedOptionText
            ]}>
              {duration} min
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const DifficultySelector = () => (
    <View style={styles.settingSection}>
      <Text style={styles.settingLabel}>Difficulty Level</Text>
      <View style={styles.optionRow}>
        {(['Beginner', 'Intermediate', 'Advanced'] as const).map(difficulty => (
          <TouchableOpacity
            key={difficulty}
            style={[
              styles.optionButton,
              settings.difficulty === difficulty && styles.selectedOption
            ]}
            onPress={() => {
              setSettings(prev => ({ ...prev, difficulty }));
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Text style={[
              styles.optionText,
              settings.difficulty === difficulty && styles.selectedOptionText
            ]}>
              {difficulty}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const ExerciseCountSelector = () => (
    <View style={styles.settingSection}>
      <Text style={styles.settingLabel}>Number of Exercises</Text>
      <View style={styles.optionRow}>
        {[4, 6, 8, 10].map(count => (
          <TouchableOpacity
            key={count}
            style={[
              styles.optionButton,
              settings.exerciseCount === count && styles.selectedOption
            ]}
            onPress={() => {
              setSettings(prev => ({ ...prev, exerciseCount: count }));
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Text style={[
              styles.optionText,
              settings.exerciseCount === count && styles.selectedOptionText
            ]}>
              {count}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <IconSymbol name="xmark" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Generate Workout</Text>
          
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.targetMuscles}>
            <Text style={styles.sectionTitle}>Target Muscle Groups</Text>
            <Text style={styles.muscleGroupsList}>
              {getMuscleGroupNames() || 'No muscle groups selected'}
            </Text>
          </View>

          <DurationSelector />
          <DifficultySelector />
          <ExerciseCountSelector />

          <View style={styles.settingSection}>
            <TouchableOpacity
              style={styles.toggleRow}
              onPress={() => {
                setSettings(prev => ({ ...prev, includeCardio: !prev.includeCardio }));
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <View style={styles.toggleInfo}>
                <Text style={styles.settingLabel}>Include Cardio</Text>
                <Text style={styles.toggleDescription}>
                  Add cardio exercises for fat burning
                </Text>
              </View>
              <IconSymbol
                name={settings.includeCardio ? "checkmark.circle.fill" : "circle"}
                size={24}
                color={settings.includeCardio ? colors.success : colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.previewSection}>
            <Text style={styles.sectionTitle}>Workout Preview</Text>
            <View style={styles.previewCard}>
              <View style={styles.previewRow}>
                <IconSymbol name="clock" size={16} color={colors.primary} />
                <Text style={styles.previewText}>{settings.duration} minutes</Text>
              </View>
              <View style={styles.previewRow}>
                <IconSymbol name="figure.strengthtraining.traditional" size={16} color={colors.primary} />
                <Text style={styles.previewText}>{settings.exerciseCount} exercises</Text>
              </View>
              <View style={styles.previewRow}>
                <IconSymbol name="chart.line.uptrend.xyaxis" size={16} color={colors.primary} />
                <Text style={styles.previewText}>{settings.difficulty} level</Text>
              </View>
              <View style={styles.previewRow}>
                <IconSymbol name="target" size={16} color={colors.primary} />
                <Text style={styles.previewText}>{selectedMuscleGroups.length} muscle groups</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.generateButton,
              selectedMuscleGroups.length === 0 && styles.disabledButton
            ]}
            onPress={generateWorkout}
            disabled={selectedMuscleGroups.length === 0}
          >
            <IconSymbol 
              name="sparkles" 
              size={20} 
              color={selectedMuscleGroups.length > 0 ? colors.card : colors.textSecondary} 
            />
            <Text style={[
              styles.generateButtonText,
              selectedMuscleGroups.length === 0 && styles.disabledButtonText
            ]}>
              Generate My Workout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  targetMuscles: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  muscleGroupsList: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  settingSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  selectedOptionText: {
    color: colors.card,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleInfo: {
    flex: 1,
  },
  toggleDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  previewSection: {
    paddingVertical: 20,
  },
  previewCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: colors.border,
  },
  generateButtonText: {
    color: colors.card,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  disabledButtonText: {
    color: colors.textSecondary,
  },
});
