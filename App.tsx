import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardScreen from './src/screens/DashboardScreen';
import ClientsScreen from './src/screens/ClientsScreen';
import { COLORS } from './src/constants/theme';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: COLORS.surface,
              borderTopColor: COLORS.border,
              borderTopWidth: 1,
            },
            tabBarActiveTintColor: COLORS.gold,
            tabBarInactiveTintColor: COLORS.textMuted,
            headerStyle: {
              backgroundColor: COLORS.background,
              borderBottomColor: COLORS.border,
              borderBottomWidth: 1,
            },
            headerTintColor: COLORS.gold,
            headerTitleStyle: {
              fontWeight: '700',
            },
          }}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              tabBarLabel: 'Control Tower',
              tabBarIcon: ({ color }) => <TabIcon icon="🎯" color={color} />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Clients"
            component={ClientsScreen}
            options={{
              tabBarLabel: 'Clients',
              tabBarIcon: ({ color }) => <TabIcon icon="👥" color={color} />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Analytics"
            component={DashboardScreen}
            options={{
              tabBarLabel: 'Analytics',
              tabBarIcon: ({ color }) => <TabIcon icon="📊" color={color} />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={DashboardScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color }) => <TabIcon icon="⚙️" color={color} />,
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <Text style={{ fontSize: 24 }}>
      {icon}
    </Text>
  );
}
