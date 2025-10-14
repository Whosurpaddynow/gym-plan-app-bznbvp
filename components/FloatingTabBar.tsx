
import { IconSymbol } from '@/components/IconSymbol';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 40,
  borderRadius = 25,
  bottomMargin = 34,
}: FloatingTabBarProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const animatedValue = useSharedValue(0);

  const handleTabPress = (route: string) => {
    console.log('Tab pressed:', route);
    router.push(route as any);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            animatedValue.value,
            [0, tabs.length - 1],
            [0, containerWidth / tabs.length * (tabs.length - 1)]
          ),
        },
      ],
    };
  });

  // Find the active tab index
  const activeIndex = tabs.findIndex(tab => {
    if (pathname === '/' || pathname === '/(tabs)/(home)/') {
      return tab.name === '(home)';
    }
    return pathname.includes(tab.name);
  });

  React.useEffect(() => {
    if (activeIndex >= 0) {
      animatedValue.value = withSpring(activeIndex, {
        damping: 15,
        stiffness: 150,
      });
    }
  }, [activeIndex, animatedValue]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, { bottom: bottomMargin }]}>
        <BlurView
          intensity={Platform.OS === 'ios' ? 100 : 0}
          style={[
            styles.tabBar,
            {
              width: containerWidth,
              borderRadius,
              backgroundColor: Platform.OS === 'ios' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : colors.card,
            },
          ]}
        >
          {/* Active tab indicator */}
          <Animated.View
            style={[
              styles.activeIndicator,
              {
                width: containerWidth / tabs.length,
                borderRadius: borderRadius - 4,
                backgroundColor: colors.primary,
              },
              animatedStyle,
            ]}
          />

          {/* Tab buttons */}
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            
            return (
              <TouchableOpacity
                key={tab.name}
                style={[styles.tabButton, { width: containerWidth / tabs.length }]}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.7}
              >
                <IconSymbol
                  name={tab.icon as any}
                  size={24}
                  color={isActive ? colors.card : colors.text}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isActive ? colors.card : colors.text,
                      opacity: isActive ? 1 : 0.7,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    pointerEvents: 'box-none',
  },
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    elevation: 8,
  },
  activeIndicator: {
    position: 'absolute',
    height: '80%',
    top: '10%',
    left: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    zIndex: 1,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
