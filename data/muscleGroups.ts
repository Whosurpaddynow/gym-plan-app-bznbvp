
export interface MuscleGroup {
  id: string;
  name: string;
  description: string;
  primaryExercises: string[];
  secondaryExercises: string[];
  icon: string;
  color: string;
}

export const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: 'chest',
    name: 'Chest',
    description: 'Pectorals - builds upper body pushing strength',
    primaryExercises: [
      'Bench Press', 'Push-ups', 'Incline Dumbbell Press', 'Decline Bench Press',
      'Chest Flyes', 'Dips', 'Incline Push-ups', 'Chest Press Machine'
    ],
    secondaryExercises: [
      'Overhead Press', 'Tricep Dips', 'Close-Grip Bench Press'
    ],
    icon: 'figure.strengthtraining.traditional',
    color: '#FF6B6B'
  },
  {
    id: 'back',
    name: 'Back',
    description: 'Latissimus dorsi, rhomboids, traps - builds pulling strength',
    primaryExercises: [
      'Pull-ups', 'Lat Pulldowns', 'Barbell Rows', 'T-Bar Rows', 'Cable Rows',
      'Deadlifts', 'Face Pulls', 'Reverse Flyes', 'Superman'
    ],
    secondaryExercises: [
      'Bicep Curls', 'Hammer Curls', 'Shrugs'
    ],
    icon: 'figure.strengthtraining.functional',
    color: '#4ECDC4'
  },
  {
    id: 'shoulders',
    name: 'Shoulders',
    description: 'Deltoids - builds shoulder stability and strength',
    primaryExercises: [
      'Overhead Press', 'Lateral Raises', 'Front Raises', 'Rear Delt Flyes',
      'Pike Push-ups', 'Handstand Push-ups', 'Arnold Press', 'Upright Rows'
    ],
    secondaryExercises: [
      'Bench Press', 'Push-ups', 'Pull-ups'
    ],
    icon: 'figure.strengthtraining.traditional',
    color: '#45B7D1'
  },
  {
    id: 'arms',
    name: 'Arms',
    description: 'Biceps and triceps - builds arm strength and definition',
    primaryExercises: [
      'Bicep Curls', 'Hammer Curls', 'Tricep Extensions', 'Close-Grip Bench Press',
      'Tricep Dips', 'Preacher Curls', 'Cable Curls', 'Tricep Pushdowns'
    ],
    secondaryExercises: [
      'Pull-ups', 'Push-ups', 'Rows', 'Overhead Press'
    ],
    icon: 'figure.strengthtraining.traditional',
    color: '#96CEB4'
  },
  {
    id: 'legs',
    name: 'Legs',
    description: 'Quadriceps, hamstrings, glutes - builds lower body power',
    primaryExercises: [
      'Squats', 'Lunges', 'Leg Press', 'Romanian Deadlifts', 'Bulgarian Split Squats',
      'Leg Extensions', 'Leg Curls', 'Step-ups', 'Wall Sits'
    ],
    secondaryExercises: [
      'Deadlifts', 'Hip Thrusts', 'Calf Raises'
    ],
    icon: 'figure.strengthtraining.functional',
    color: '#FECA57'
  },
  {
    id: 'glutes',
    name: 'Glutes',
    description: 'Gluteus maximus - builds hip power and stability',
    primaryExercises: [
      'Hip Thrusts', 'Glute Bridges', 'Romanian Deadlifts', 'Bulgarian Split Squats',
      'Clamshells', 'Lateral Walks', 'Single-Leg Glute Bridges', 'Sumo Squats'
    ],
    secondaryExercises: [
      'Squats', 'Lunges', 'Deadlifts', 'Step-ups'
    ],
    icon: 'figure.strengthtraining.functional',
    color: '#FF9FF3'
  },
  {
    id: 'core',
    name: 'Core',
    description: 'Abdominals, obliques - builds stability and strength',
    primaryExercises: [
      'Planks', 'Russian Twists', 'Bicycle Crunches', 'Mountain Climbers',
      'Dead Bug', 'Bird Dog', 'Hollow Body Hold', 'Side Planks'
    ],
    secondaryExercises: [
      'Squats', 'Deadlifts', 'Overhead Press', 'Pull-ups'
    ],
    icon: 'figure.core.training',
    color: '#54A0FF'
  },
  {
    id: 'cardio',
    name: 'Cardio',
    description: 'Cardiovascular system - improves heart health and endurance',
    primaryExercises: [
      'Burpees', 'Jumping Jacks', 'High Knees', 'Butt Kickers', 'Jump Squats',
      'Mountain Climbers', 'Running in Place', 'Jump Rope', 'Battle Ropes'
    ],
    secondaryExercises: [
      'Circuit Training', 'HIIT Workouts', 'Plyometric Exercises'
    ],
    icon: 'heart.fill',
    color: '#FF6348'
  }
];

export interface Exercise {
  id: string;
  name: string;
  primaryMuscleGroups: string[];
  secondaryMuscleGroups: string[];
  equipment: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string[];
  tips: string[];
  defaultSets: number;
  defaultReps: string;
  restTime: string;
}

export const EXERCISE_DATABASE: Exercise[] = [
  // Chest Exercises
  {
    id: 'bench-press',
    name: 'Bench Press',
    primaryMuscleGroups: ['chest'],
    secondaryMuscleGroups: ['shoulders', 'arms'],
    equipment: ['Barbell', 'Bench'],
    difficulty: 'Intermediate',
    instructions: [
      'Lie flat on bench with feet firmly on ground',
      'Grip barbell slightly wider than shoulder width',
      'Lower bar to chest with control',
      'Press bar up explosively to starting position'
    ],
    tips: [
      'Keep shoulder blades retracted',
      'Maintain slight arch in lower back',
      'Control the descent, explosive ascent'
    ],
    defaultSets: 3,
    defaultReps: '8-10',
    restTime: '2-3 minutes'
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    primaryMuscleGroups: ['chest'],
    secondaryMuscleGroups: ['shoulders', 'arms', 'core'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    instructions: [
      'Start in plank position with hands shoulder-width apart',
      'Lower body until chest nearly touches ground',
      'Push back up to starting position',
      'Keep body in straight line throughout'
    ],
    tips: [
      'Engage core throughout movement',
      'Don\'t let hips sag or pike up',
      'Full range of motion for best results'
    ],
    defaultSets: 3,
    defaultReps: '10-15',
    restTime: '60-90 seconds'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    primaryMuscleGroups: ['chest'],
    secondaryMuscleGroups: ['shoulders', 'arms'],
    equipment: ['Dumbbells', 'Bench'],
    difficulty: 'Intermediate',
    instructions: [
      'Set bench to 30-45 degree incline',
      'Hold dumbbells at chest level',
      'Press weights up and slightly together',
      'Lower with control to starting position'
    ],
    tips: [
      'Focus on upper chest contraction',
      'Don\'t arch back excessively',
      'Control the weight throughout'
    ],
    defaultSets: 3,
    defaultReps: '10-12',
    restTime: '90 seconds'
  },

  // Back Exercises
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    primaryMuscleGroups: ['back'],
    secondaryMuscleGroups: ['arms', 'shoulders'],
    equipment: ['Pull-up Bar'],
    difficulty: 'Intermediate',
    instructions: [
      'Hang from bar with overhand grip',
      'Pull body up until chin clears bar',
      'Lower with control to full extension',
      'Repeat for desired reps'
    ],
    tips: [
      'Engage lats and squeeze shoulder blades',
      'Avoid swinging or kipping',
      'Full range of motion is key'
    ],
    defaultSets: 3,
    defaultReps: '6-10',
    restTime: '2-3 minutes'
  },
  {
    id: 'barbell-rows',
    name: 'Barbell Rows',
    primaryMuscleGroups: ['back'],
    secondaryMuscleGroups: ['arms', 'shoulders'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    instructions: [
      'Hinge at hips with slight knee bend',
      'Grip barbell with overhand grip',
      'Pull bar to lower chest/upper abdomen',
      'Lower with control to starting position'
    ],
    tips: [
      'Keep back straight throughout',
      'Squeeze shoulder blades at top',
      'Don\'t use momentum'
    ],
    defaultSets: 4,
    defaultReps: '8-10',
    restTime: '2-3 minutes'
  },
  {
    id: 'lat-pulldowns',
    name: 'Lat Pulldowns',
    primaryMuscleGroups: ['back'],
    secondaryMuscleGroups: ['arms'],
    equipment: ['Cable Machine'],
    difficulty: 'Beginner',
    instructions: [
      'Sit at lat pulldown machine',
      'Grip bar wider than shoulder width',
      'Pull bar down to upper chest',
      'Control the weight back up'
    ],
    tips: [
      'Lean back slightly',
      'Focus on pulling with lats',
      'Don\'t pull behind neck'
    ],
    defaultSets: 3,
    defaultReps: '10-12',
    restTime: '90 seconds'
  },

  // Shoulder Exercises
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    primaryMuscleGroups: ['shoulders'],
    secondaryMuscleGroups: ['arms', 'core'],
    equipment: ['Barbell', 'Dumbbells'],
    difficulty: 'Intermediate',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold weight at shoulder level',
      'Press straight up overhead',
      'Lower with control to starting position'
    ],
    tips: [
      'Keep core tight throughout',
      'Don\'t arch back excessively',
      'Press in straight line'
    ],
    defaultSets: 3,
    defaultReps: '8-10',
    restTime: '2-3 minutes'
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    primaryMuscleGroups: ['shoulders'],
    secondaryMuscleGroups: [],
    equipment: ['Dumbbells'],
    difficulty: 'Beginner',
    instructions: [
      'Stand with dumbbells at sides',
      'Raise weights out to sides',
      'Lift to shoulder height',
      'Lower with control'
    ],
    tips: [
      'Slight bend in elbows',
      'Don\'t swing the weights',
      'Control the negative'
    ],
    defaultSets: 3,
    defaultReps: '12-15',
    restTime: '60-90 seconds'
  },

  // Leg Exercises
  {
    id: 'squats',
    name: 'Squats',
    primaryMuscleGroups: ['legs'],
    secondaryMuscleGroups: ['glutes', 'core'],
    equipment: ['Barbell', 'Bodyweight'],
    difficulty: 'Beginner',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower hips back and down',
      'Descend until thighs parallel to floor',
      'Drive through heels to stand up'
    ],
    tips: [
      'Keep chest up and core tight',
      'Knees track over toes',
      'Full depth for best results'
    ],
    defaultSets: 4,
    defaultReps: '8-12',
    restTime: '2-3 minutes'
  },
  {
    id: 'lunges',
    name: 'Lunges',
    primaryMuscleGroups: ['legs'],
    secondaryMuscleGroups: ['glutes', 'core'],
    equipment: ['Bodyweight', 'Dumbbells'],
    difficulty: 'Beginner',
    instructions: [
      'Step forward into lunge position',
      'Lower back knee toward ground',
      'Both knees should be at 90 degrees',
      'Push back to starting position'
    ],
    tips: [
      'Keep front knee over ankle',
      'Don\'t let front knee cave in',
      'Maintain upright torso'
    ],
    defaultSets: 3,
    defaultReps: '10-12 each leg',
    restTime: '90 seconds'
  },
  {
    id: 'deadlifts',
    name: 'Deadlifts',
    primaryMuscleGroups: ['legs', 'back'],
    secondaryMuscleGroups: ['glutes', 'core'],
    equipment: ['Barbell'],
    difficulty: 'Advanced',
    instructions: [
      'Stand with feet hip-width apart',
      'Hinge at hips and grip barbell',
      'Drive through heels to stand up',
      'Keep bar close to body throughout'
    ],
    tips: [
      'Keep back neutral throughout',
      'Engage lats to keep bar close',
      'Hip hinge, not squat movement'
    ],
    defaultSets: 4,
    defaultReps: '5-6',
    restTime: '3-4 minutes'
  },

  // Arm Exercises
  {
    id: 'bicep-curls',
    name: 'Bicep Curls',
    primaryMuscleGroups: ['arms'],
    secondaryMuscleGroups: [],
    equipment: ['Dumbbells', 'Barbell'],
    difficulty: 'Beginner',
    instructions: [
      'Stand with weights at sides',
      'Curl weights up toward shoulders',
      'Squeeze biceps at top',
      'Lower with control'
    ],
    tips: [
      'Keep elbows at sides',
      'Don\'t swing or use momentum',
      'Full range of motion'
    ],
    defaultSets: 3,
    defaultReps: '12-15',
    restTime: '60-90 seconds'
  },
  {
    id: 'tricep-extensions',
    name: 'Tricep Extensions',
    primaryMuscleGroups: ['arms'],
    secondaryMuscleGroups: [],
    equipment: ['Dumbbells'],
    difficulty: 'Beginner',
    instructions: [
      'Hold weight overhead with both hands',
      'Lower weight behind head',
      'Keep elbows stationary',
      'Extend back to starting position'
    ],
    tips: [
      'Keep elbows close to head',
      'Control the descent',
      'Feel stretch in triceps'
    ],
    defaultSets: 3,
    defaultReps: '12-15',
    restTime: '60-90 seconds'
  },

  // Core Exercises
  {
    id: 'planks',
    name: 'Planks',
    primaryMuscleGroups: ['core'],
    secondaryMuscleGroups: ['shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    instructions: [
      'Start in push-up position',
      'Lower to forearms',
      'Keep body in straight line',
      'Hold for desired time'
    ],
    tips: [
      'Don\'t let hips sag or pike',
      'Breathe normally',
      'Engage entire core'
    ],
    defaultSets: 3,
    defaultReps: '30-60 seconds',
    restTime: '60 seconds'
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    primaryMuscleGroups: ['core'],
    secondaryMuscleGroups: [],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    instructions: [
      'Sit with knees bent, lean back slightly',
      'Lift feet off ground',
      'Rotate torso side to side',
      'Touch ground beside hips'
    ],
    tips: [
      'Keep chest up',
      'Control the rotation',
      'Engage obliques'
    ],
    defaultSets: 3,
    defaultReps: '20 each side',
    restTime: '60 seconds'
  },

  // Cardio Exercises
  {
    id: 'burpees',
    name: 'Burpees',
    primaryMuscleGroups: ['cardio'],
    secondaryMuscleGroups: ['chest', 'legs', 'core'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    instructions: [
      'Start standing, drop to squat',
      'Jump back to plank position',
      'Do a push-up',
      'Jump feet back to squat, then jump up'
    ],
    tips: [
      'Maintain good form throughout',
      'Land softly on jumps',
      'Modify as needed'
    ],
    defaultSets: 3,
    defaultReps: '10-15',
    restTime: '90 seconds'
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    primaryMuscleGroups: ['cardio', 'core'],
    secondaryMuscleGroups: ['shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    instructions: [
      'Start in plank position',
      'Alternate bringing knees to chest',
      'Keep hips level',
      'Move at quick pace'
    ],
    tips: [
      'Keep core engaged',
      'Don\'t let hips bounce',
      'Breathe rhythmically'
    ],
    defaultSets: 3,
    defaultReps: '30 seconds',
    restTime: '60 seconds'
  }
];

export const getExercisesByMuscleGroups = (selectedGroups: string[]): Exercise[] => {
  return EXERCISE_DATABASE.filter(exercise => 
    exercise.primaryMuscleGroups.some(group => selectedGroups.includes(group)) ||
    exercise.secondaryMuscleGroups.some(group => selectedGroups.includes(group))
  );
};

export const getMuscleGroupById = (id: string): MuscleGroup | undefined => {
  return MUSCLE_GROUPS.find(group => group.id === id);
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return EXERCISE_DATABASE.find(exercise => exercise.id === id);
};
