
import React from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)',
      icon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'workout',
      route: '/(tabs)/workout',
      icon: 'dumbbell',
      label: 'Workout',
    },
    {
      name: 'nutrition',
      route: '/(tabs)/nutrition',
      icon: 'leaf.fill',
      label: 'Nutrition',
    },
    {
      name: 'achievements',
      route: '/(tabs)/achievements',
      icon: 'trophy.fill',
      label: 'Achievements',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profile',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Screen
          name="(home)"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="house.fill" color={color} size={size} />
            ),
          }}
        />
        <NativeTabs.Screen
          name="workout"
          options={{
            title: 'Workout',
            tabBarIcon: ({ color, size }) => (
              <Icon name="dumbbell" color={color} size={size} />
            ),
          }}
        />
        <NativeTabs.Screen
          name="nutrition"
          options={{
            title: 'Nutrition',
            tabBarIcon: ({ color, size }) => (
              <Icon name="leaf.fill" color={color} size={size} />
            ),
          }}
        />
        <NativeTabs.Screen
          name="achievements"
          options={{
            title: 'Achievements',
            tabBarIcon: ({ color, size }) => (
              <Icon name="trophy.fill" color={color} size={size} />
            ),
          }}
        />
        <NativeTabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="person.fill" color={color} size={size} />
            ),
          }}
        />
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="workout" />
        <Stack.Screen name="nutrition" />
        <Stack.Screen name="achievements" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
