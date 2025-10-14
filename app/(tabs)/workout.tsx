
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
import { useGameification } from '@/hooks/useGameification';
import ProgressRing from '@/components/ProgressRing';
import WorkoutPlanCard from '@/components/WorkoutPlanCard';
import WorkoutPlanPreview from '@/components/WorkoutPlanPreview';
import { WORKOUT_PLANS, WorkoutPlan } from '@/data/workoutPlans';

import * as Haptics from 'expo-haptics';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  notes?: string;
  completed?: boolean;
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EXERCISE_LIBRARY = [
  'Bench Press', 'Squats', 'Deadlifts', 'Pull-ups', 'Push-ups', 'Shoulder Press',
  'Barbell Rows', 'Dips', 'Lunges', 'Bicep Curls', 'Tricep Extensions', 'Planks',
  'Lat Pulldowns', 'Leg Press', 'Calf Raises', 'Russian Twists', 'Burpees', 'Mountain Climbers'
];

interface ExerciseItemProps {
  exercise: Exercise;
  onUpdate: (exerciseId: string, field: keyof Exercise, value: string | number | boolean) => void;
  onRemove: (exerciseId: string) => void;
}

const ExerciseItem = React.memo(({ exercise, onUpdate, onRemove }: ExerciseItemProps) => {
  const handleComplete = () => {
    onUpdate(exercise.id, 'completed', !exercise.completed);
  };

  return (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            exercise.completed && styles.completedButton
          ]}
          onPress={handleComplete}
        >
          <IconSymbol 
            name={exercise.completed ? "checkmark.circle.fill" : "circle"} 
            size={24} 
            color={exercise.completed ? colors.success : colors.textSecondary} 
          />
        </TouchableOpacity>
        
        <View style={styles.exerciseInfo}>
          <Text style={[
            styles.exerciseName,
            exercise.completed && styles.completedText
          ]}>
            {exercise.name}
          </Text>
          <Text style={styles.exerciseDetails}>
            {exercise.sets} sets × {exercise.reps}
            {exercise.weight && ` @ ${exercise.weight}`}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(exercise.id)}
        >
          <IconSymbol name="trash" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>

      {!exercise.completed && (
        <View style={styles.exerciseInputs}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Sets</Text>
            <TextInput
              style={styles.input}
              value={exercise.sets.toString()}
              onChangeText={(text) => onUpdate(exercise.id, 'sets', parseInt(text) || 0)}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Reps</Text>
            <TextInput
              style={styles.input}
              value={exercise.reps}
              onChangeText={(text) => onUpdate(exercise.id, 'reps', text)}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight</Text>
            <TextInput
              style={styles.input}
              value={exercise.weight || ''}
              onChangeText={(text) => onUpdate(exercise.id, 'weight', text)}
              placeholder="Optional"
            />
          </View>
        </View>
      )}
    </View>
  );
});

export default function WorkoutScreen() {
  const { completeWorkout, addXp } = useGameification();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [showWorkoutPlans, setShowWorkoutPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [showPlanPreview, setShowPlanPreview] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [currentView, setCurrentView] = useState<'schedule' | 'plans'>('schedule');
  
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([
    {
      day: 'Monday',
      exercises: [
        { id: '1', name: 'Bench Press', sets: 3, reps: '8-10', weight: '135 lbs', completed: false },
        { id: '2', name: 'Pull-ups', sets: 3, reps: '6-8', completed: false },
        { id: '3', name: 'Shoulder Press', sets: 3, reps: '10-12', weight: '65 lbs', completed: false },
      ]
    },
    {
      day: 'Tuesday',
      exercises: [
        { id: '4', name: 'Squats', sets: 4, reps: '8-10', weight: '185 lbs', completed: false },
        { id: '5', name: 'Deadlifts', sets: 3, reps: '5-6', weight: '225 lbs', completed: false },
        { id: '6', name: 'Lunges', sets: 3, reps: '12 each leg', completed: false },
      ]
    },
    {
      day: 'Wednesday',
      exercises: []
    },
    {
      day: 'Thursday',
      exercises: [
        { id: '7', name: 'Dips', sets: 3, reps: '8-12', completed: false },
        { id: '8', name: 'Bicep Curls', sets: 3, reps: '10-12', weight: '30 lbs', completed: false },
        { id: '9', name: 'Tricep Extensions', sets: 3, reps: '10-12', weight: '25 lbs', completed: false },
      ]
    },
    {
      day: 'Friday',
      exercises: []
    },
    {
      day: 'Saturday',
      exercises: [
        { id: '10', name: 'Planks', sets: 3, reps: '60 seconds', completed: false },
        { id: '11', name: 'Russian Twists', sets: 3, reps: '20 each side', completed: false },
        { id: '12', name: 'Burpees', sets: 3, reps: '10', completed: false },
      ]
    },
    {
      day: 'Sunday',
      exercises: []
    },
  ]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (workoutStarted) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [workoutStarted]);

  const getCurrentDayWorkout = () => {
    return workoutPlan.find(day => day.day === selectedDay) || { day: selectedDay, exercises: [] };
  };

  const addExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      sets: 3,
      reps: '8-10',
      completed: false,
    };

    setWorkoutPlan(prev => prev.map(day => 
      day.day === selectedDay 
        ? { ...day, exercises: [...day.exercises, newExercise] }
        : day
    ));
    
    setShowExerciseLibrary(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const removeExercise = (exerciseId: string) => {
    setWorkoutPlan(prev => prev.map(day => 
      day.day === selectedDay 
        ? { ...day, exercises: day.exercises.filter(ex => ex.id !== exerciseId) }
        : day
    ));
  };

  const updateExercise = (exerciseId: string, field: keyof Exercise, value: string | number | boolean) => {
    setWorkoutPlan(prev => prev.map(day => 
      day.day === selectedDay 
        ? { 
            ...day, 
            exercises: day.exercises.map(ex => 
              ex.id === exerciseId ? { ...ex, [field]: value } : ex
            )
          }
        : day
    ));

    if (field === 'completed' && value === true) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      addXp(25); // Award XP for completing an exercise
    }
  };

  const handleSelectWorkoutPlan = (plan: WorkoutPlan) => {
    Alert.alert(
      'Apply Workout Plan',
      `This will replace your current workout schedule with "${plan.name}". Are you sure?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply Plan', 
          style: 'default',
          onPress: () => applyWorkoutPlan(plan)
        }
      ]
    );
  };

  const applyWorkoutPlan = (plan: WorkoutPlan) => {
    const newWorkoutPlan: WorkoutDay[] = DAYS_OF_WEEK.map(day => {
      const planDay = plan.weeklySchedule[day];
      if (planDay) {
        return {
          day,
          exercises: planDay.exercises.map(exercise => ({
            id: `${plan.id}-${exercise.id}`,
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            notes: exercise.notes,
            completed: false,
          }))
        };
      }
      return { day, exercises: [] };
    });

    setWorkoutPlan(newWorkoutPlan);
    setCurrentView('schedule');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    Alert.alert(
      'Plan Applied! 🎉',
      `"${plan.name}" has been applied to your workout schedule. You can now start your workouts!`,
      [{ text: 'Great!', style: 'default' }]
    );
  };

  const startWorkout = () => {
    setWorkoutStarted(true);
    setWorkoutTimer(0);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const finishWorkout = () => {
    const currentWorkout = getCurrentDayWorkout();
    const completedExercises = currentWorkout.exercises.filter(ex => ex.completed).length;
    const totalExercises = currentWorkout.exercises.length;
    
    if (completedExercises === 0) {
      Alert.alert('No exercises completed', 'Complete at least one exercise to finish your workout.');
      return;
    }

    const result = completeWorkout();
    setWorkoutStarted(false);
    
    Alert.alert(
      'Workout Complete! 🎉',
      `Great job! You completed ${completedExercises}/${totalExercises} exercises in ${Math.floor(workoutTimer / 60)}:${(workoutTimer % 60).toString().padStart(2, '0')}.\n\n${result.leveledUp ? `🎊 Level Up! You're now level ${result.newStreak}!` : ''}🔥 Streak: ${result.newStreak} days`,
      [{ text: 'Awesome!', style: 'default' }]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderViewSelector = () => (
    <View style={styles.viewSelector}>
      <TouchableOpacity
        style={[
          styles.viewButton,
          currentView === 'schedule' && styles.selectedViewButton
        ]}
        onPress={() => setCurrentView('schedule')}
      >
        <IconSymbol 
          name="calendar" 
          size={20} 
          color={currentView === 'schedule' ? colors.card : colors.textSecondary} 
        />
        <Text style={[
          styles.viewButtonText,
          currentView === 'schedule' && styles.selectedViewButtonText
        ]}>
          My Schedule
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.viewButton,
          currentView === 'plans' && styles.selectedViewButton
        ]}
        onPress={() => setCurrentView('plans')}
      >
        <IconSymbol 
          name="doc.text" 
          size={20} 
          color={currentView === 'plans' ? colors.card : colors.textSecondary} 
        />
        <Text style={[
          styles.viewButtonText,
          currentView === 'plans' && styles.selectedViewButtonText
        ]}>
          Workout Plans
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderWorkoutHeader = () => {
    const currentWorkout = getCurrentDayWorkout();
    const completedExercises = currentWorkout.exercises.filter(ex => ex.completed).length;
    const totalExercises = currentWorkout.exercises.length;
    const progress = totalExercises > 0 ? completedExercises / totalExercises : 0;

    return (
      <View style={styles.workoutHeader}>
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutTitle}>{selectedDay} Workout</Text>
          <Text style={styles.workoutSubtitle}>
            {completedExercises} of {totalExercises} exercises completed
          </Text>
        </View>
        
        <View style={styles.workoutControls}>
          {workoutStarted ? (
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{formatTime(workoutTimer)}</Text>
              <TouchableOpacity 
                style={styles.finishButton}
                onPress={finishWorkout}
              >
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.card} />
                <Text style={styles.finishButtonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.startWorkoutButton}
              onPress={startWorkout}
              disabled={totalExercises === 0}
            >
              <IconSymbol name="play.fill" size={20} color={colors.card} />
              <Text style={styles.startWorkoutButtonText}>Start Workout</Text>
            </TouchableOpacity>
          )}
        </View>

        {totalExercises > 0 && (
          <View style={styles.progressContainer}>
            <ProgressRing
              progress={progress}
              size={60}
              strokeWidth={6}
              color={colors.primary}
            >
              <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
            </ProgressRing>
          </View>
        )}
      </View>
    );
  };

  const renderDaySelector = () => (
    <View style={styles.daySelector}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.dayButtons}>
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
                {day.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderExerciseLibrary = () => (
    <View style={styles.exerciseLibrary}>
      <View style={styles.libraryHeader}>
        <Text style={styles.libraryTitle}>Exercise Library</Text>
        <TouchableOpacity onPress={() => setShowExerciseLibrary(false)}>
          <IconSymbol name="xmark" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.libraryList}>
        {EXERCISE_LIBRARY.map(exercise => (
          <TouchableOpacity
            key={exercise}
            style={styles.libraryItem}
            onPress={() => addExercise(exercise)}
          >
            <IconSymbol name="plus.circle" size={20} color={colors.primary} />
            <Text style={styles.libraryItemText}>{exercise}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderWorkoutPlans = () => (
    <View style={styles.workoutPlansContainer}>
      <View style={styles.plansHeader}>
        <Text style={styles.plansTitle}>Pre-Made Workout Plans</Text>
        <Text style={styles.plansSubtitle}>
          Choose from professionally designed workout programs that target all muscle groups
        </Text>
      </View>
      
      <ScrollView 
        style={styles.plansList}
        showsVerticalScrollIndicator={false}
      >
        {WORKOUT_PLANS.map(plan => (
          <WorkoutPlanCard
            key={plan.id}
            plan={plan}
            onSelect={handleSelectWorkoutPlan}
            onPreview={(plan) => {
              setSelectedPlan(plan);
              setShowPlanPreview(true);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderScheduleView = () => {
    const currentWorkout = getCurrentDayWorkout();

    return (
      <>
        {renderWorkoutHeader()}
        {renderDaySelector()}

        <View style={styles.exercisesContainer}>
          <View style={styles.exercisesHeader}>
            <Text style={styles.sectionTitle}>Exercises</Text>
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
              <Text style={styles.emptyStateText}>No exercises planned</Text>
              <Text style={styles.emptyStateSubtext}>Add exercises or choose a workout plan!</Text>
              <TouchableOpacity
                style={styles.browsePlansButton}
                onPress={() => setCurrentView('plans')}
              >
                <IconSymbol name="doc.text" size={16} color={colors.primary} />
                <Text style={styles.browsePlansButtonText}>Browse Workout Plans</Text>
              </TouchableOpacity>
            </View>
          ) : (
            currentWorkout.exercises.map(exercise => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                onUpdate={updateExercise}
                onRemove={removeExercise}
              />
            ))
          )}
        </View>

        {showExerciseLibrary && renderExerciseLibrary()}
      </>
    );
  };

  return (
    <SafeAreaView style={[commonStyles.container]} edges={['top']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
      >
        {renderViewSelector()}
        
        {currentView === 'schedule' ? renderScheduleView() : renderWorkoutPlans()}
      </ScrollView>

      <WorkoutPlanPreview
        plan={selectedPlan}
        visible={showPlanPreview}
        onClose={() => {
          setShowPlanPreview(false);
          setSelectedPlan(null);
        }}
        onSelect={handleSelectWorkoutPlan}
      />
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
  viewSelector: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedViewButton: {
    backgroundColor: colors.primary,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  selectedViewButtonText: {
    color: colors.card,
  },
  workoutHeader: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  workoutInfo: {
    marginBottom: 16,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  workoutSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  workoutControls: {
    alignItems: 'center',
    marginBottom: 16,
  },
  startWorkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startWorkoutButtonText: {
    color: colors.card,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  finishButtonText: {
    color: colors.card,
    fontWeight: '600',
    marginLeft: 6,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  daySelector: {
    marginBottom: 20,
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
  exercisesContainer: {
    flex: 1,
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  exerciseCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  completeButton: {
    marginRight: 12,
  },
  completedButton: {
    // Additional styles for completed state if needed
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  exerciseDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  removeButton: {
    padding: 4,
  },
  exerciseInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.text,
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
    marginBottom: 20,
  },
  browsePlansButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  browsePlansButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
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
    padding: 20,
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
    padding: 20,
  },
  libraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  libraryItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  workoutPlansContainer: {
    flex: 1,
  },
  plansHeader: {
    marginBottom: 20,
  },
  plansTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  plansSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  plansList: {
    flex: 1,
  },
});
