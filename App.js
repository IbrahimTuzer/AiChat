import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomePage from './src/screens/HomePage';
import Aipage from './src/screens/Aipage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Aipage" component={Aipage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
