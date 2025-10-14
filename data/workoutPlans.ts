
export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // e.g., "4 weeks", "8 weeks"
  daysPerWeek: number;
  category: 'strength' | 'cardio' | 'hybrid' | 'bodyweight';
  targetMuscleGroups: string[];
  equipment: string[];
  weeklySchedule: {
    [key: string]: {
      name: string;
      exercises: {
        id: string;
        name: string;
        sets: number;
        reps: string;
        weight?: string;
        restTime?: string;
        notes?: string;
        muscleGroups: string[];
        equipment: string;
      }[];
      estimatedDuration: number; // in minutes
      focusAreas: string[];
    };
  };
  benefits: string[];
  tips: string[];
}

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    description: 'Perfect for beginners looking to build strength and learn proper form across all muscle groups.',
    difficulty: 'Beginner',
    duration: '4 weeks',
    daysPerWeek: 3,
    category: 'strength',
    targetMuscleGroups: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core'],
    equipment: ['Dumbbells', 'Barbell', 'Bench'],
    weeklySchedule: {
      'Monday': {
        name: 'Full Body A',
        exercises: [
          {
            id: 'fb1-1',
            name: 'Goblet Squats',
            sets: 3,
            reps: '12-15',
            restTime: '60-90s',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Dumbbell',
            notes: 'Focus on proper squat depth and form'
          },
          {
            id: 'fb1-2',
            name: 'Push-ups',
            sets: 3,
            reps: '8-12',
            restTime: '60s',
            muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
            equipment: 'Bodyweight',
            notes: 'Modify on knees if needed'
          },
          {
            id: 'fb1-3',
            name: 'Bent-over Dumbbell Rows',
            sets: 3,
            reps: '10-12',
            restTime: '60-90s',
            muscleGroups: ['Back', 'Biceps'],
            equipment: 'Dumbbells',
            notes: 'Keep back straight, squeeze shoulder blades'
          },
          {
            id: 'fb1-4',
            name: 'Overhead Press',
            sets: 3,
            reps: '8-10',
            restTime: '90s',
            muscleGroups: ['Shoulders', 'Triceps'],
            equipment: 'Dumbbells',
            notes: 'Press straight up, engage core'
          },
          {
            id: 'fb1-5',
            name: 'Plank',
            sets: 3,
            reps: '30-45s',
            restTime: '60s',
            muscleGroups: ['Core'],
            equipment: 'Bodyweight',
            notes: 'Keep body straight, breathe normally'
          }
        ],
        estimatedDuration: 45,
        focusAreas: ['Full Body Strength', 'Form Learning']
      },
      'Wednesday': {
        name: 'Full Body B',
        exercises: [
          {
            id: 'fb2-1',
            name: 'Lunges',
            sets: 3,
            reps: '10 each leg',
            restTime: '60-90s',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Bodyweight',
            notes: 'Step forward, 90-degree angles'
          },
          {
            id: 'fb2-2',
            name: 'Incline Push-ups',
            sets: 3,
            reps: '10-15',
            restTime: '60s',
            muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
            equipment: 'Bench',
            notes: 'Use bench or elevated surface'
          },
          {
            id: 'fb2-3',
            name: 'Lat Pulldowns',
            sets: 3,
            reps: '10-12',
            restTime: '60-90s',
            muscleGroups: ['Back', 'Biceps'],
            equipment: 'Cable Machine',
            notes: 'Pull to upper chest, control the weight'
          },
          {
            id: 'fb2-4',
            name: 'Lateral Raises',
            sets: 3,
            reps: '12-15',
            restTime: '45-60s',
            muscleGroups: ['Shoulders'],
            equipment: 'Dumbbells',
            notes: 'Lift to shoulder height, control descent'
          },
          {
            id: 'fb2-5',
            name: 'Dead Bug',
            sets: 3,
            reps: '8 each side',
            restTime: '45s',
            muscleGroups: ['Core'],
            equipment: 'Bodyweight',
            notes: 'Keep lower back pressed to floor'
          }
        ],
        estimatedDuration: 40,
        focusAreas: ['Full Body Strength', 'Stability']
      },
      'Friday': {
        name: 'Full Body C',
        exercises: [
          {
            id: 'fb3-1',
            name: 'Romanian Deadlifts',
            sets: 3,
            reps: '10-12',
            restTime: '90s',
            muscleGroups: ['Hamstrings', 'Glutes', 'Back'],
            equipment: 'Dumbbells',
            notes: 'Hinge at hips, feel stretch in hamstrings'
          },
          {
            id: 'fb3-2',
            name: 'Chest Press',
            sets: 3,
            reps: '10-12',
            restTime: '90s',
            muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
            equipment: 'Dumbbells',
            notes: 'Control the weight, full range of motion'
          },
          {
            id: 'fb3-3',
            name: 'Seated Cable Rows',
            sets: 3,
            reps: '10-12',
            restTime: '60-90s',
            muscleGroups: ['Back', 'Biceps'],
            equipment: 'Cable Machine',
            notes: 'Squeeze shoulder blades together'
          },
          {
            id: 'fb3-4',
            name: 'Bicep Curls',
            sets: 3,
            reps: '12-15',
            restTime: '45-60s',
            muscleGroups: ['Biceps'],
            equipment: 'Dumbbells',
            notes: 'Control the movement, no swinging'
          },
          {
            id: 'fb3-5',
            name: 'Mountain Climbers',
            sets: 3,
            reps: '20 total',
            restTime: '60s',
            muscleGroups: ['Core', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Keep hips level, quick alternating legs'
          }
        ],
        estimatedDuration: 45,
        focusAreas: ['Full Body Strength', 'Endurance']
      }
    },
    benefits: [
      'Builds foundational strength',
      'Teaches proper exercise form',
      'Improves overall fitness',
      'Time-efficient workouts'
    ],
    tips: [
      'Focus on form over weight',
      'Rest 48 hours between sessions',
      'Progress gradually each week',
      'Stay hydrated throughout'
    ]
  },
  {
    id: 'cardio-hiit',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training to burn calories and improve cardiovascular fitness.',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    daysPerWeek: 4,
    category: 'cardio',
    targetMuscleGroups: ['Full Body', 'Cardiovascular System'],
    equipment: ['Bodyweight', 'Optional: Dumbbells'],
    weeklySchedule: {
      'Monday': {
        name: 'HIIT Circuit A',
        exercises: [
          {
            id: 'hiit1-1',
            name: 'Burpees',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Full Body', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Explosive movement, modify if needed'
          },
          {
            id: 'hiit1-2',
            name: 'Jump Squats',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Legs', 'Glutes', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Land softly, full squat depth'
          },
          {
            id: 'hiit1-3',
            name: 'Push-up to T',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Chest', 'Core', 'Shoulders'],
            equipment: 'Bodyweight',
            notes: 'Rotate and reach up after each push-up'
          },
          {
            id: 'hiit1-4',
            name: 'High Knees',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Legs', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Drive knees up to chest level'
          },
          {
            id: 'hiit1-5',
            name: 'Plank Jacks',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Core', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Keep plank position, jump feet apart'
          }
        ],
        estimatedDuration: 25,
        focusAreas: ['Cardio', 'Fat Burning', 'Full Body']
      },
      'Tuesday': {
        name: 'Active Recovery',
        exercises: [
          {
            id: 'recovery1-1',
            name: 'Walking',
            sets: 1,
            reps: '20-30 minutes',
            muscleGroups: ['Legs', 'Cardio'],
            equipment: 'None',
            notes: 'Light pace, focus on recovery'
          },
          {
            id: 'recovery1-2',
            name: 'Dynamic Stretching',
            sets: 1,
            reps: '10-15 minutes',
            muscleGroups: ['Full Body'],
            equipment: 'None',
            notes: 'Leg swings, arm circles, hip circles'
          }
        ],
        estimatedDuration: 35,
        focusAreas: ['Recovery', 'Mobility']
      },
      'Thursday': {
        name: 'HIIT Circuit B',
        exercises: [
          {
            id: 'hiit2-1',
            name: 'Mountain Climbers',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Core', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Fast alternating legs, keep hips level'
          },
          {
            id: 'hiit2-2',
            name: 'Jump Lunges',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Legs', 'Glutes', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Explosive switch, land softly'
          },
          {
            id: 'hiit2-3',
            name: 'Pike Push-ups',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Shoulders', 'Triceps'],
            equipment: 'Bodyweight',
            notes: 'Downward dog position, press up'
          },
          {
            id: 'hiit2-4',
            name: 'Butt Kickers',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Legs', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Kick heels to glutes, quick pace'
          },
          {
            id: 'hiit2-5',
            name: 'Russian Twists',
            sets: 4,
            reps: '45s work / 15s rest',
            muscleGroups: ['Core'],
            equipment: 'Bodyweight',
            notes: 'Lean back, rotate side to side'
          }
        ],
        estimatedDuration: 25,
        focusAreas: ['Cardio', 'Core Strength', 'Agility']
      },
      'Saturday': {
        name: 'Cardio Finisher',
        exercises: [
          {
            id: 'cardio1-1',
            name: 'Jumping Jacks',
            sets: 3,
            reps: '60s work / 30s rest',
            muscleGroups: ['Full Body', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Full range of motion, steady rhythm'
          },
          {
            id: 'cardio1-2',
            name: 'Squat Pulses',
            sets: 3,
            reps: '60s work / 30s rest',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Bodyweight',
            notes: 'Stay low in squat, small pulses'
          },
          {
            id: 'cardio1-3',
            name: 'Bear Crawl',
            sets: 3,
            reps: '60s work / 30s rest',
            muscleGroups: ['Full Body', 'Core'],
            equipment: 'Bodyweight',
            notes: 'Keep knees off ground, crawl forward/back'
          }
        ],
        estimatedDuration: 20,
        focusAreas: ['Cardio Endurance', 'Muscle Endurance']
      }
    },
    benefits: [
      'Burns calories efficiently',
      'Improves cardiovascular health',
      'Boosts metabolism',
      'Time-efficient workouts'
    ],
    tips: [
      'Work at 80-90% effort during work intervals',
      'Use rest periods for active recovery',
      'Stay hydrated throughout',
      'Listen to your body and modify as needed'
    ]
  },
  {
    id: 'upper-lower-split',
    name: 'Upper/Lower Split',
    description: 'Intermediate program focusing on upper body and lower body on alternating days.',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    daysPerWeek: 4,
    category: 'strength',
    targetMuscleGroups: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Glutes'],
    equipment: ['Barbell', 'Dumbbells', 'Cable Machine', 'Bench'],
    weeklySchedule: {
      'Monday': {
        name: 'Upper Body A',
        exercises: [
          {
            id: 'ul1-1',
            name: 'Bench Press',
            sets: 4,
            reps: '8-10',
            weight: 'Progressive',
            restTime: '2-3 minutes',
            muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
            equipment: 'Barbell',
            notes: 'Control the descent, explosive press'
          },
          {
            id: 'ul1-2',
            name: 'Bent-over Barbell Rows',
            sets: 4,
            reps: '8-10',
            weight: 'Progressive',
            restTime: '2-3 minutes',
            muscleGroups: ['Back', 'Biceps'],
            equipment: 'Barbell',
            notes: 'Pull to lower chest, squeeze shoulder blades'
          },
          {
            id: 'ul1-3',
            name: 'Overhead Press',
            sets: 3,
            reps: '10-12',
            weight: 'Progressive',
            restTime: '90s-2min',
            muscleGroups: ['Shoulders', 'Triceps'],
            equipment: 'Barbell',
            notes: 'Press straight up, engage core'
          },
          {
            id: 'ul1-4',
            name: 'Pull-ups/Lat Pulldowns',
            sets: 3,
            reps: '8-12',
            restTime: '90s-2min',
            muscleGroups: ['Back', 'Biceps'],
            equipment: 'Pull-up Bar/Cable',
            notes: 'Full range of motion, control descent'
          },
          {
            id: 'ul1-5',
            name: 'Dips',
            sets: 3,
            reps: '10-15',
            restTime: '90s',
            muscleGroups: ['Triceps', 'Chest'],
            equipment: 'Dip Station',
            notes: 'Lean forward slightly for chest emphasis'
          },
          {
            id: 'ul1-6',
            name: 'Barbell Curls',
            sets: 3,
            reps: '12-15',
            restTime: '60-90s',
            muscleGroups: ['Biceps'],
            equipment: 'Barbell',
            notes: 'Control the movement, no swinging'
          }
        ],
        estimatedDuration: 60,
        focusAreas: ['Upper Body Strength', 'Muscle Building']
      },
      'Tuesday': {
        name: 'Lower Body A',
        exercises: [
          {
            id: 'ul2-1',
            name: 'Back Squats',
            sets: 4,
            reps: '8-10',
            weight: 'Progressive',
            restTime: '2-3 minutes',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Barbell',
            notes: 'Squat to parallel or below, drive through heels'
          },
          {
            id: 'ul2-2',
            name: 'Romanian Deadlifts',
            sets: 4,
            reps: '10-12',
            weight: 'Progressive',
            restTime: '2-3 minutes',
            muscleGroups: ['Hamstrings', 'Glutes', 'Back'],
            equipment: 'Barbell',
            notes: 'Hinge at hips, feel stretch in hamstrings'
          },
          {
            id: 'ul2-3',
            name: 'Bulgarian Split Squats',
            sets: 3,
            reps: '12 each leg',
            weight: 'Dumbbells',
            restTime: '90s',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Dumbbells',
            notes: 'Rear foot elevated, focus on front leg'
          },
          {
            id: 'ul2-4',
            name: 'Walking Lunges',
            sets: 3,
            reps: '20 total steps',
            weight: 'Dumbbells',
            restTime: '90s',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Dumbbells',
            notes: 'Long steps, 90-degree angles'
          },
          {
            id: 'ul2-5',
            name: 'Calf Raises',
            sets: 4,
            reps: '15-20',
            restTime: '60s',
            muscleGroups: ['Calves'],
            equipment: 'Dumbbells',
            notes: 'Full range of motion, pause at top'
          },
          {
            id: 'ul2-6',
            name: 'Plank',
            sets: 3,
            reps: '60-90s',
            restTime: '60s',
            muscleGroups: ['Core'],
            equipment: 'Bodyweight',
            notes: 'Keep body straight, breathe normally'
          }
        ],
        estimatedDuration: 60,
        focusAreas: ['Lower Body Strength', 'Functional Movement']
      },
      'Thursday': {
        name: 'Upper Body B',
        exercises: [
          {
            id: 'ul3-1',
            name: 'Incline Dumbbell Press',
            sets: 4,
            reps: '10-12',
            weight: 'Progressive',
            restTime: '90s-2min',
            muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
            equipment: 'Dumbbells',
            notes: '30-45 degree incline, full range of motion'
          },
          {
            id: 'ul3-2',
            name: 'T-Bar Rows',
            sets: 4,
            reps: '10-12',
            weight: 'Progressive',
            restTime: '90s-2min',
            muscleGroups: ['Back', 'Biceps'],
            equipment: 'T-Bar',
            notes: 'Pull to chest, squeeze shoulder blades'
          },
          {
            id: 'ul3-3',
            name: 'Lateral Raises',
            sets: 4,
            reps: '12-15',
            restTime: '60-90s',
            muscleGroups: ['Shoulders'],
            equipment: 'Dumbbells',
            notes: 'Lift to shoulder height, control descent'
          },
          {
            id: 'ul3-4',
            name: 'Face Pulls',
            sets: 3,
            reps: '15-20',
            restTime: '60s',
            muscleGroups: ['Rear Delts', 'Upper Back'],
            equipment: 'Cable Machine',
            notes: 'Pull to face level, squeeze shoulder blades'
          },
          {
            id: 'ul3-5',
            name: 'Close-Grip Bench Press',
            sets: 3,
            reps: '10-12',
            restTime: '90s',
            muscleGroups: ['Triceps', 'Chest'],
            equipment: 'Barbell',
            notes: 'Hands closer than shoulder width'
          },
          {
            id: 'ul3-6',
            name: 'Hammer Curls',
            sets: 3,
            reps: '12-15',
            restTime: '60s',
            muscleGroups: ['Biceps', 'Forearms'],
            equipment: 'Dumbbells',
            notes: 'Neutral grip, control the movement'
          }
        ],
        estimatedDuration: 55,
        focusAreas: ['Upper Body Hypertrophy', 'Muscle Definition']
      },
      'Friday': {
        name: 'Lower Body B',
        exercises: [
          {
            id: 'ul4-1',
            name: 'Front Squats',
            sets: 4,
            reps: '10-12',
            weight: 'Progressive',
            restTime: '2-3 minutes',
            muscleGroups: ['Legs', 'Core'],
            equipment: 'Barbell',
            notes: 'Keep chest up, elbows high'
          },
          {
            id: 'ul4-2',
            name: 'Stiff Leg Deadlifts',
            sets: 4,
            reps: '12-15',
            weight: 'Progressive',
            restTime: '90s-2min',
            muscleGroups: ['Hamstrings', 'Glutes'],
            equipment: 'Barbell',
            notes: 'Keep legs straight, feel hamstring stretch'
          },
          {
            id: 'ul4-3',
            name: 'Leg Press',
            sets: 3,
            reps: '15-20',
            weight: 'Progressive',
            restTime: '90s',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Leg Press Machine',
            notes: 'Full range of motion, control the weight'
          },
          {
            id: 'ul4-4',
            name: 'Leg Curls',
            sets: 3,
            reps: '12-15',
            restTime: '60-90s',
            muscleGroups: ['Hamstrings'],
            equipment: 'Leg Curl Machine',
            notes: 'Control the movement, squeeze at top'
          },
          {
            id: 'ul4-5',
            name: 'Leg Extensions',
            sets: 3,
            reps: '12-15',
            restTime: '60-90s',
            muscleGroups: ['Quadriceps'],
            equipment: 'Leg Extension Machine',
            notes: 'Control the movement, squeeze at top'
          },
          {
            id: 'ul4-6',
            name: 'Russian Twists',
            sets: 3,
            reps: '20 each side',
            restTime: '60s',
            muscleGroups: ['Core'],
            equipment: 'Bodyweight',
            notes: 'Lean back, rotate side to side'
          }
        ],
        estimatedDuration: 55,
        focusAreas: ['Lower Body Hypertrophy', 'Isolation Work']
      }
    },
    benefits: [
      'Allows for more volume per muscle group',
      'Better recovery between sessions',
      'Builds significant strength and muscle',
      'Flexible scheduling'
    ],
    tips: [
      'Progressive overload is key',
      'Rest at least 48 hours between same muscle groups',
      'Focus on compound movements first',
      'Track your weights and progress'
    ]
  },
  {
    id: 'bodyweight-anywhere',
    name: 'Bodyweight Anywhere',
    description: 'No equipment needed! Build strength and endurance using just your bodyweight.',
    difficulty: 'Beginner',
    duration: '6 weeks',
    daysPerWeek: 5,
    category: 'bodyweight',
    targetMuscleGroups: ['Full Body', 'Core', 'Functional Strength'],
    equipment: ['None'],
    weeklySchedule: {
      'Monday': {
        name: 'Upper Body Focus',
        exercises: [
          {
            id: 'bw1-1',
            name: 'Push-ups',
            sets: 4,
            reps: '8-15',
            restTime: '60-90s',
            muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
            equipment: 'Bodyweight',
            notes: 'Modify on knees if needed, progress to full'
          },
          {
            id: 'bw1-2',
            name: 'Pike Push-ups',
            sets: 3,
            reps: '6-12',
            restTime: '90s',
            muscleGroups: ['Shoulders', 'Triceps'],
            equipment: 'Bodyweight',
            notes: 'Downward dog position, press up'
          },
          {
            id: 'bw1-3',
            name: 'Tricep Dips',
            sets: 3,
            reps: '8-15',
            restTime: '60-90s',
            muscleGroups: ['Triceps', 'Shoulders'],
            equipment: 'Chair/Bench',
            notes: 'Use chair or bench, keep body close'
          },
          {
            id: 'bw1-4',
            name: 'Plank to Downward Dog',
            sets: 3,
            reps: '10-15',
            restTime: '60s',
            muscleGroups: ['Core', 'Shoulders'],
            equipment: 'Bodyweight',
            notes: 'Flow between plank and downward dog'
          },
          {
            id: 'bw1-5',
            name: 'Superman',
            sets: 3,
            reps: '12-20',
            restTime: '45s',
            muscleGroups: ['Back', 'Glutes'],
            equipment: 'Bodyweight',
            notes: 'Lift chest and legs, squeeze glutes'
          }
        ],
        estimatedDuration: 35,
        focusAreas: ['Upper Body Strength', 'Core Stability']
      },
      'Tuesday': {
        name: 'Lower Body Focus',
        exercises: [
          {
            id: 'bw2-1',
            name: 'Bodyweight Squats',
            sets: 4,
            reps: '15-25',
            restTime: '60-90s',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Bodyweight',
            notes: 'Full depth, drive through heels'
          },
          {
            id: 'bw2-2',
            name: 'Lunges',
            sets: 3,
            reps: '12 each leg',
            restTime: '60-90s',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Bodyweight',
            notes: 'Step forward, 90-degree angles'
          },
          {
            id: 'bw2-3',
            name: 'Single-Leg Glute Bridges',
            sets: 3,
            reps: '10 each leg',
            restTime: '60s',
            muscleGroups: ['Glutes', 'Hamstrings'],
            equipment: 'Bodyweight',
            notes: 'Squeeze glutes at top, control descent'
          },
          {
            id: 'bw2-4',
            name: 'Wall Sit',
            sets: 3,
            reps: '30-60s',
            restTime: '90s',
            muscleGroups: ['Legs', 'Glutes'],
            equipment: 'Wall',
            notes: 'Back against wall, thighs parallel to floor'
          },
          {
            id: 'bw2-5',
            name: 'Calf Raises',
            sets: 3,
            reps: '20-30',
            restTime: '45s',
            muscleGroups: ['Calves'],
            equipment: 'Bodyweight',
            notes: 'Rise up on toes, pause at top'
          }
        ],
        estimatedDuration: 30,
        focusAreas: ['Lower Body Strength', 'Endurance']
      },
      'Wednesday': {
        name: 'Core & Cardio',
        exercises: [
          {
            id: 'bw3-1',
            name: 'Plank',
            sets: 3,
            reps: '30-90s',
            restTime: '60s',
            muscleGroups: ['Core'],
            equipment: 'Bodyweight',
            notes: 'Keep body straight, breathe normally'
          },
          {
            id: 'bw3-2',
            name: 'Mountain Climbers',
            sets: 4,
            reps: '30s',
            restTime: '30s',
            muscleGroups: ['Core', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Fast alternating legs, keep hips level'
          },
          {
            id: 'bw3-3',
            name: 'Bicycle Crunches',
            sets: 3,
            reps: '20 each side',
            restTime: '45s',
            muscleGroups: ['Core'],
            equipment: 'Bodyweight',
            notes: 'Bring elbow to opposite knee'
          },
          {
            id: 'bw3-4',
            name: 'Burpees',
            sets: 3,
            reps: '8-15',
            restTime: '90s',
            muscleGroups: ['Full Body', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Full movement, modify if needed'
          },
          {
            id: 'bw3-5',
            name: 'High Knees',
            sets: 3,
            reps: '30s',
            restTime: '30s',
            muscleGroups: ['Legs', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Drive knees up to chest level'
          }
        ],
        estimatedDuration: 25,
        focusAreas: ['Core Strength', 'Cardiovascular Fitness']
      },
      'Thursday': {
        name: 'Full Body Circuit',
        exercises: [
          {
            id: 'bw4-1',
            name: 'Push-up to T',
            sets: 3,
            reps: '8-12',
            restTime: '60s',
            muscleGroups: ['Chest', 'Core', 'Shoulders'],
            equipment: 'Bodyweight',
            notes: 'Rotate and reach up after each push-up'
          },
          {
            id: 'bw4-2',
            name: 'Jump Squats',
            sets: 3,
            reps: '10-20',
            restTime: '60s',
            muscleGroups: ['Legs', 'Glutes', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Land softly, full squat depth'
          },
          {
            id: 'bw4-3',
            name: 'Bear Crawl',
            sets: 3,
            reps: '30s',
            restTime: '60s',
            muscleGroups: ['Full Body', 'Core'],
            equipment: 'Bodyweight',
            notes: 'Keep knees off ground, crawl forward/back'
          },
          {
            id: 'bw4-4',
            name: 'Side Plank',
            sets: 3,
            reps: '20-45s each side',
            restTime: '45s',
            muscleGroups: ['Core', 'Shoulders'],
            equipment: 'Bodyweight',
            notes: 'Keep body straight, stack feet'
          },
          {
            id: 'bw4-5',
            name: 'Jumping Jacks',
            sets: 3,
            reps: '30s',
            restTime: '30s',
            muscleGroups: ['Full Body', 'Cardio'],
            equipment: 'Bodyweight',
            notes: 'Full range of motion, steady rhythm'
          }
        ],
        estimatedDuration: 30,
        focusAreas: ['Full Body Conditioning', 'Functional Movement']
      },
      'Friday': {
        name: 'Flexibility & Recovery',
        exercises: [
          {
            id: 'bw5-1',
            name: 'Cat-Cow Stretch',
            sets: 2,
            reps: '10-15',
            restTime: '30s',
            muscleGroups: ['Back', 'Core'],
            equipment: 'Bodyweight',
            notes: 'Flow between cat and cow positions'
          },
          {
            id: 'bw5-2',
            name: 'Child\'s Pose',
            sets: 2,
            reps: '30-60s',
            restTime: '30s',
            muscleGroups: ['Back', 'Shoulders'],
            equipment: 'Bodyweight',
            notes: 'Sit back on heels, arms extended forward'
          },
          {
            id: 'bw5-3',
            name: 'Pigeon Pose',
            sets: 2,
            reps: '30s each side',
            restTime: '30s',
            muscleGroups: ['Hips', 'Glutes'],
            equipment: 'Bodyweight',
            notes: 'Hip opener, breathe deeply'
          },
          {
            id: 'bw5-4',
            name: 'Spinal Twist',
            sets: 2,
            reps: '30s each side',
            restTime: '30s',
            muscleGroups: ['Back', 'Core'],
            equipment: 'Bodyweight',
            notes: 'Seated twist, gentle rotation'
          },
          {
            id: 'bw5-5',
            name: 'Forward Fold',
            sets: 2,
            reps: '30-60s',
            restTime: '30s',
            muscleGroups: ['Hamstrings', 'Back'],
            equipment: 'Bodyweight',
            notes: 'Reach toward toes, relax neck'
          }
        ],
        estimatedDuration: 20,
        focusAreas: ['Flexibility', 'Recovery', 'Mobility']
      }
    },
    benefits: [
      'No equipment required',
      'Can be done anywhere',
      'Builds functional strength',
      'Improves body awareness'
    ],
    tips: [
      'Focus on proper form over speed',
      'Progress by increasing reps or time',
      'Listen to your body',
      'Consistency is key'
    ]
  }
];

export const MUSCLE_GROUPS = [
  'Chest', 'Back', 'Shoulders', 'Arms', 'Biceps', 'Triceps', 
  'Legs', 'Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 
  'Core', 'Full Body', 'Cardio'
];

export const EQUIPMENT_TYPES = [
  'Barbell', 'Dumbbells', 'Cable Machine', 'Bench', 'Pull-up Bar',
  'Bodyweight', 'Resistance Bands', 'Kettlebells', 'Medicine Ball',
  'None'
];

export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const WORKOUT_CATEGORIES = ['strength', 'cardio', 'hybrid', 'bodyweight'];
