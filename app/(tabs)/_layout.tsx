
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
      title: 'Home',
      icon: 'house.fill',
      route: '/(tabs)/(home)',
    },
    {
      name: 'workout',
      title: 'Workout',
      icon: 'dumbbell',
      route: '/(tabs)/workout',
    },
    {
      name: 'nutrition',
      title: 'Nutrition',
      icon: 'leaf.fill',
      route: '/(tabs)/nutrition',
    },
    {
      name: 'achievements',
      title: 'Achievements',
      icon: 'trophy.fill',
      route: '/(tabs)/achievements',
    },
    {
      name: 'profile',
      title: 'Profile',
      icon: 'person.fill',
      route: '/(tabs)/profile',
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
