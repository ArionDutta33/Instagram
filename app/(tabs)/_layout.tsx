import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '../provider/AuthProvider';
import NotificationProvider from '../provider/NotificationProvider';

const TabsLayout = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <NotificationProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#f15454', tabBarShowLabel: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'For you',
            tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            title: ' Create profile',
            tabBarIcon: ({ color }) => <FontAwesome name="plus-square-o" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
          }}
        />
      </Tabs>
    </NotificationProvider>
  );
};

export default TabsLayout;
