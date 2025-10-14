
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  notes?: string;
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EXERCISE_LIBRARY = [
  'Bench Press', 'Squats', 'Deadlifts', 'Pull-ups', 'Push-ups', 'Overhead Press',
  'Barbell Rows', 'Dumbbell Curls', 'Tricep Dips', 'Lunges', 'Lat Pulldowns',
  'Leg Press', 'Shoulder Press', 'Chest Flyes', 'Leg Curls', 'Calf Raises',
  'Planks', 'Russian Twists', 'Mountain Climbers', 'Burpees'
];

export default function WorkoutScreen() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>(
    DAYS_OF_WEEK.map(day => ({ day, exercises: [] }))
  );
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);

  const getCurrentDayWorkout = () => {
    return workoutPlan.find(workout => workout.day === selectedDay) || { day: selectedDay, exercises: [] };
  };

  const addExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: 3,
      reps: '8-12',
      weight: '',
      notes: '',
    };

    setWorkoutPlan(prev => 
      prev.map(workout => 
        workout.day === selectedDay 
          ? { ...workout, exercises: [...workout.exercises, newExercise] }
          : workout
      )
    );
    setShowExerciseLibrary(false);
  };

  const removeExercise = (exerciseId: string) => {
    setWorkoutPlan(prev => 
      prev.map(workout => 
        workout.day === selectedDay 
          ? { ...workout, exercises: workout.exercises.filter(ex => ex.id !== exerciseId) }
          : workout
      )
    );
  };

  const updateExercise = (exerciseId: string, field: keyof Exercise, value: string | number) => {
    setWorkoutPlan(prev => 
      prev.map(workout => 
        workout.day === selectedDay 
          ? {
              ...workout,
              exercises: workout.exercises.map(ex => 
                ex.id === exerciseId ? { ...ex, [field]: value } : ex
              )
            }
          : workout
      )
    );
  };

  const renderDaySelector = () => (
    <View style={styles.daySelector}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {DAYS_OF_WEEK.map(day => (
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
              {day.substring(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderExerciseLibrary = () => (
    <View style={styles.exerciseLibrary}>
      <View style={styles.libraryHeader}>
        <Text style={styles.libraryTitle}>Exercise Library</Text>
        <TouchableOpacity onPress={() => setShowExerciseLibrary(false)}>
          <IconSymbol name="xmark" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.libraryList}>
        {EXERCISE_LIBRARY.map(exercise => (
          <TouchableOpacity
            key={exercise}
            style={styles.libraryItem}
            onPress={() => addExercise(exercise)}
          >
            <Text style={styles.libraryItemText}>{exercise}</Text>
            <IconSymbol name="plus" size={20} color={colors.primary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderExercise = (exercise: Exercise) => (
    <View key={exercise.id} style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
          <IconSymbol name="trash" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.exerciseDetails}>
        <View style={styles.exerciseInput}>
          <Text style={styles.inputLabel}>Sets</Text>
          <TextInput
            style={styles.smallInput}
            value={exercise.sets.toString()}
            onChangeText={(text) => updateExercise(exercise.id, 'sets', parseInt(text) || 0)}
            keyboardType="numeric"
            placeholder="3"
          />
        </View>
        
        <View style={styles.exerciseInput}>
          <Text style={styles.inputLabel}>Reps</Text>
          <TextInput
            style={styles.smallInput}
            value={exercise.reps}
            onChangeText={(text) => updateExercise(exercise.id, 'reps', text)}
            placeholder="8-12"
          />
        </View>
        
        <View style={styles.exerciseInput}>
          <Text style={styles.inputLabel}>Weight</Text>
          <TextInput
            style={styles.smallInput}
            value={exercise.weight}
            onChangeText={(text) => updateExercise(exercise.id, 'weight', text)}
            placeholder="lbs/kg"
          />
        </View>
      </View>
      
      <TextInput
        style={styles.notesInput}
        value={exercise.notes}
        onChangeText={(text) => updateExercise(exercise.id, 'notes', text)}
        placeholder="Notes (optional)"
        multiline
      />
    </View>
  );

  const currentWorkout = getCurrentDayWorkout();

  return (
    <SafeAreaView style={[commonStyles.container]} edges={['top']}>
      <View style={styles.header}>
        <Text style={commonStyles.title}>Workout Planner</Text>
        <Text style={commonStyles.textSecondary}>Plan your weekly workout schedule</Text>
      </View>

      {renderDaySelector()}

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
      >
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutTitle}>{selectedDay} Workout</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowExerciseLibrary(true)}
          >
            <IconSymbol name="plus" size={20} color={colors.card} />
            <Text style={styles.addButtonText}>Add Exercise</Text>
          </TouchableOpacity>
        </View>

        {currentWorkout.exercises.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="dumbbell" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyStateText}>No exercises planned for {selectedDay}</Text>
            <Text style={styles.emptyStateSubtext}>Tap "Add Exercise" to get started</Text>
          </View>
        ) : (
          currentWorkout.exercises.map(renderExercise)
        )}
      </ScrollView>

      {showExerciseLibrary && renderExerciseLibrary()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  daySelector: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: colors.card,
    fontWeight: '600',
    marginLeft: 4,
  },
  exerciseCard: {
    ...commonStyles.card,
    marginBottom: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  exerciseInput: {
    flex: 1,
    marginRight: 8,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  smallInput: {
    ...commonStyles.input,
    marginBottom: 0,
    textAlign: 'center',
  },
  notesInput: {
    ...commonStyles.input,
    marginBottom: 0,
    minHeight: 40,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  exerciseLibrary: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    zIndex: 1000,
  },
  libraryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  libraryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  libraryList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  libraryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  libraryItemText: {
    fontSize: 16,
    color: colors.text,
  },
});
