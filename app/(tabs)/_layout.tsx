import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import colors from '../../src/constants/colors';

const TabIcon = ({ name, focused, color }: { name: any, focused: boolean, color: string }) => {
  return (
    <View style={{
      width: 64,
      height: 32,
      borderRadius: 16,
      backgroundColor: focused ? colors.primarioClaro : 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
    }}>
      <Ionicons name={focused ? name.replace('-outline', '') : name} size={24} color={color} />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primario,
        tabBarInactiveTintColor: colors.textoSecundario,
        tabBarStyle: {
          backgroundColor: colors.blanco,
          height: 84,
          paddingBottom: 20,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: colors.gris,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700' as const,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => <TabIcon name="home-outline" focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="farmacias"
        options={{
          title: 'Farmacias',
          tabBarIcon: ({ color, focused }) => <TabIcon name="medical-outline" focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mascotas"
        options={{
          title: 'Mascotas',
          tabBarIcon: ({ color, focused }) => <TabIcon name="paw-outline" focused={focused} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => <TabIcon name="person-outline" focused={focused} color={color} />,
        }}
      />
    </Tabs>
  );
}
