
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { MUSCLE_GROUPS, MuscleGroup } from '@/data/muscleGroups';
import * as Haptics from 'expo-haptics';

interface MuscleGroupSelectorProps {
  selectedGroups: string[];
  onSelectionChange: (groups: string[]) => void;
  visible: boolean;
  onClose: () => void;
}

const MuscleGroupCard = ({ 
  group, 
  isSelected, 
  onToggle 
}: { 
  group: MuscleGroup; 
  isSelected: boolean; 
  onToggle: () => void; 
}) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  return (
    <TouchableOpacity
      style={[
        styles.muscleGroupCard,
        isSelected && styles.selectedCard,
        { borderColor: group.color }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: group.color + '20' }]}>
          <IconSymbol 
            name={group.icon as any} 
            size={24} 
            color={isSelected ? colors.card : group.color} 
          />
        </View>
        <View style={styles.checkboxContainer}>
          <IconSymbol
            name={isSelected ? "checkmark.circle.fill" : "circle"}
            size={20}
            color={isSelected ? colors.success : colors.textSecondary}
          />
        </View>
      </View>
      
      <Text style={[
        styles.groupName,
        isSelected && styles.selectedText
      ]}>
        {group.name}
      </Text>
      
      <Text style={[
        styles.groupDescription,
        isSelected && styles.selectedDescription
      ]}>
        {group.description}
      </Text>
      
      <View style={styles.exerciseCount}>
        <Text style={[
          styles.exerciseCountText,
          isSelected && styles.selectedText
        ]}>
          {group.primaryExercises.length} exercises
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function MuscleGroupSelector({
  selectedGroups,
  onSelectionChange,
  visible,
  onClose
}: MuscleGroupSelectorProps) {
  const [localSelection, setLocalSelection] = useState<string[]>(selectedGroups);

  const handleToggleGroup = (groupId: string) => {
    setLocalSelection(prev => {
      if (prev.includes(groupId)) {
        return prev.filter(id => id !== groupId);
      } else {
        return [...prev, groupId];
      }
    });
  };

  const handleApply = () => {
    onSelectionChange(localSelection);
    onClose();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleSelectAll = () => {
    const allGroups = MUSCLE_GROUPS.map(group => group.id);
    setLocalSelection(allGroups);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleClearAll = () => {
    setLocalSelection([]);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleClose = () => {
    setLocalSelection(selectedGroups); // Reset to original selection
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <IconSymbol name="xmark" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Select Muscle Groups</Text>
          
          <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>
            Choose the muscle groups you want to target in your workout
          </Text>
          <Text style={styles.selectionCount}>
            {localSelection.length} of {MUSCLE_GROUPS.length} selected
          </Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={handleSelectAll}
          >
            <IconSymbol name="checkmark.circle" size={16} color={colors.primary} />
            <Text style={styles.quickActionText}>Select All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={handleClearAll}
          >
            <IconSymbol name="xmark.circle" size={16} color={colors.error} />
            <Text style={styles.quickActionText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {MUSCLE_GROUPS.map(group => (
              <MuscleGroupCard
                key={group.id}
                group={group}
                isSelected={localSelection.includes(group.id)}
                onToggle={() => handleToggleGroup(group.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.generateButton,
              localSelection.length === 0 && styles.disabledButton
            ]}
            onPress={handleApply}
            disabled={localSelection.length === 0}
          >
            <IconSymbol 
              name="sparkles" 
              size={20} 
              color={localSelection.length > 0 ? colors.card : colors.textSecondary} 
            />
            <Text style={[
              styles.generateButtonText,
              localSelection.length === 0 && styles.disabledButtonText
            ]}>
              Generate Workout Plan
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
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  applyButtonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 14,
  },
  subtitle: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  subtitleText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  selectionCount: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 6,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  muscleGroupCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    // Styling for checkbox
  },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  selectedText: {
    color: colors.card,
  },
  groupDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 12,
  },
  selectedDescription: {
    color: colors.card + 'CC',
  },
  exerciseCount: {
    alignItems: 'flex-start',
  },
  exerciseCountText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
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
