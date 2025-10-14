
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

interface UserProfile {
  name: string;
  age: string;
  height: string;
  weight: string;
  goal: 'weight-loss' | 'muscle-gain' | 'maintenance';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  targetWeight: string;
}

const GOALS = [
  { key: 'weight-loss', label: 'Weight Loss', icon: 'minus.circle', color: colors.error },
  { key: 'muscle-gain', label: 'Muscle Gain', icon: 'plus.circle', color: colors.secondary },
  { key: 'maintenance', label: 'Maintenance', icon: 'equal.circle', color: colors.primary },
];

const ACTIVITY_LEVELS = [
  { key: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
  { key: 'light', label: 'Light', description: 'Light exercise 1-3 days/week' },
  { key: 'moderate', label: 'Moderate', description: 'Moderate exercise 3-5 days/week' },
  { key: 'active', label: 'Active', description: 'Heavy exercise 6-7 days/week' },
  { key: 'very-active', label: 'Very Active', description: 'Very heavy exercise, physical job' },
];

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    age: '28',
    height: '5\'10"',
    weight: '175',
    goal: 'muscle-gain',
    activityLevel: 'moderate',
    targetWeight: '185',
  });

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const calculateBMI = () => {
    const heightInInches = 70; // Simplified for demo
    const weightInPounds = parseInt(profile.weight) || 0;
    const bmi = (weightInPounds / (heightInInches * heightInInches)) * 703;
    return bmi.toFixed(1);
  };

  const calculateCalories = () => {
    const weight = parseInt(profile.weight) || 0;
    const age = parseInt(profile.age) || 0;
    
    // Simplified BMR calculation (Mifflin-St Jeor for men)
    let bmr = 10 * (weight * 0.453592) + 6.25 * 178 - 5 * age + 5;
    
    // Activity multiplier
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9,
    };
    
    const calories = bmr * multipliers[profile.activityLevel];
    
    // Adjust for goal
    if (profile.goal === 'weight-loss') {
      return Math.round(calories - 500);
    } else if (profile.goal === 'muscle-gain') {
      return Math.round(calories + 300);
    }
    return Math.round(calories);
  };

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
      </View>
      <Text style={styles.name}>{profile.name}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(!isEditing)}
      >
        <IconSymbol name={isEditing ? "checkmark" : "pencil"} size={20} color={colors.card} />
        <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStatsCard = () => (
    <View style={styles.statsCard}>
      <Text style={styles.cardTitle}>Health Stats</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profile.weight} lbs</Text>
          <Text style={styles.statLabel}>Current Weight</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profile.height}</Text>
          <Text style={styles.statLabel}>Height</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{calculateBMI()}</Text>
          <Text style={styles.statLabel}>BMI</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{calculateCalories()}</Text>
          <Text style={styles.statLabel}>Daily Calories</Text>
        </View>
      </View>
    </View>
  );

  const renderGoalCard = () => (
    <View style={styles.goalCard}>
      <Text style={styles.cardTitle}>Fitness Goal</Text>
      {isEditing ? (
        <View style={styles.goalOptions}>
          {GOALS.map(goal => (
            <TouchableOpacity
              key={goal.key}
              style={[
                styles.goalOption,
                profile.goal === goal.key && { backgroundColor: goal.color }
              ]}
              onPress={() => updateProfile('goal', goal.key as any)}
            >
              <IconSymbol 
                name={goal.icon as any} 
                size={24} 
                color={profile.goal === goal.key ? colors.card : goal.color} 
              />
              <Text style={[
                styles.goalOptionText,
                profile.goal === goal.key && { color: colors.card }
              ]}>
                {goal.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.currentGoal}>
          <IconSymbol 
            name={GOALS.find(g => g.key === profile.goal)?.icon as any} 
            size={32} 
            color={GOALS.find(g => g.key === profile.goal)?.color} 
          />
          <Text style={styles.currentGoalText}>
            {GOALS.find(g => g.key === profile.goal)?.label}
          </Text>
        </View>
      )}
    </View>
  );

  const renderPersonalInfo = () => (
    <View style={styles.infoCard}>
      <Text style={styles.cardTitle}>Personal Information</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.infoInput}
            value={profile.name}
            onChangeText={(text) => updateProfile('name', text)}
          />
        ) : (
          <Text style={styles.infoValue}>{profile.name}</Text>
        )}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Age</Text>
        {isEditing ? (
          <TextInput
            style={styles.infoInput}
            value={profile.age}
            onChangeText={(text) => updateProfile('age', text)}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.infoValue}>{profile.age} years</Text>
        )}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Height</Text>
        {isEditing ? (
          <TextInput
            style={styles.infoInput}
            value={profile.height}
            onChangeText={(text) => updateProfile('height', text)}
          />
        ) : (
          <Text style={styles.infoValue}>{profile.height}</Text>
        )}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Current Weight</Text>
        {isEditing ? (
          <TextInput
            style={styles.infoInput}
            value={profile.weight}
            onChangeText={(text) => updateProfile('weight', text)}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.infoValue}>{profile.weight} lbs</Text>
        )}
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Target Weight</Text>
        {isEditing ? (
          <TextInput
            style={styles.infoInput}
            value={profile.targetWeight}
            onChangeText={(text) => updateProfile('targetWeight', text)}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.infoValue}>{profile.targetWeight} lbs</Text>
        )}
      </View>
    </View>
  );

  const renderActivityLevel = () => (
    <View style={styles.activityCard}>
      <Text style={styles.cardTitle}>Activity Level</Text>
      {isEditing ? (
        <View style={styles.activityOptions}>
          {ACTIVITY_LEVELS.map(level => (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.activityOption,
                profile.activityLevel === level.key && styles.selectedActivityOption
              ]}
              onPress={() => updateProfile('activityLevel', level.key as any)}
            >
              <Text style={[
                styles.activityOptionTitle,
                profile.activityLevel === level.key && styles.selectedActivityOptionText
              ]}>
                {level.label}
              </Text>
              <Text style={[
                styles.activityOptionDescription,
                profile.activityLevel === level.key && styles.selectedActivityOptionText
              ]}>
                {level.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.currentActivity}>
          <Text style={styles.currentActivityText}>
            {ACTIVITY_LEVELS.find(a => a.key === profile.activityLevel)?.label}
          </Text>
          <Text style={styles.currentActivityDescription}>
            {ACTIVITY_LEVELS.find(a => a.key === profile.activityLevel)?.description}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[commonStyles.container]} edges={['top']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
      >
        {renderProfileHeader()}
        {renderStatsCard()}
        {renderGoalCard()}
        {renderPersonalInfo()}
        {renderActivityLevel()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: colors.card,
    fontWeight: '600',
    marginLeft: 4,
  },
  statsCard: {
    ...commonStyles.card,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  goalCard: {
    ...commonStyles.card,
    marginBottom: 16,
  },
  goalOptions: {
    gap: 12,
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  goalOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  currentGoal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentGoalText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  infoCard: {
    ...commonStyles.card,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  infoInput: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingVertical: 4,
    minWidth: 100,
    textAlign: 'right',
  },
  activityCard: {
    ...commonStyles.card,
    marginBottom: 16,
  },
  activityOptions: {
    gap: 8,
  },
  activityOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedActivityOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activityOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  activityOptionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedActivityOptionText: {
    color: colors.card,
  },
  currentActivity: {
    padding: 12,
  },
  currentActivityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  currentActivityDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
