import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext'; // importe aqui
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import FavoritosScreens from './screens/FavoritosScreens';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: '#ff6600',
              tabBarInactiveTintColor: '#99999999',
              tabBarStyle: {
                height: 60,
                paddingBottom: 5,
                paddingTop: 5,
                elevation: 5,
                borderTopWidth: 0,
                backgroundColor: '#fff',
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Favoritos') {
                  iconName = focused ? 'heart' : 'heart-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favoritos" component={FavoritosScreens} />
          </Tab.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
