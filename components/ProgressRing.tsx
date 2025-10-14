
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '@/styles/commonStyles';

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export default function ProgressRing({
  progress,
  size = 100,
  strokeWidth = 8,
  color = colors.primary,
  backgroundColor = colors.border,
  children,
}: ProgressRingProps) {
  // Ensure all values are valid numbers
  const safeProgress = Math.max(0, Math.min(1, progress || 0));
  const safeSize = Math.max(20, size || 100);
  const safeStrokeWidth = Math.max(1, strokeWidth || 8);
  
  const radius = (safeSize - safeStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Static calculation - no animation to avoid Reanimated issues
  const strokeDashoffset = circumference * (1 - safeProgress);

  return (
    <View style={[styles.container, { width: safeSize, height: safeSize }]}>
      <Svg width={safeSize} height={safeSize} style={styles.svg}>
        {/* Background circle */}
        <Circle
          cx={safeSize / 2}
          cy={safeSize / 2}
          r={radius}
          stroke={backgroundColor || colors.border}
          strokeWidth={safeStrokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <Circle
          cx={safeSize / 2}
          cy={safeSize / 2}
          r={radius}
          stroke={color || colors.primary}
          strokeWidth={safeStrokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${safeSize / 2} ${safeSize / 2})`}
        />
      </Svg>
      {children && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
