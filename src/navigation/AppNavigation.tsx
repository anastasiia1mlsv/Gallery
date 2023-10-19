import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ImageScreen from '../screens/ImageScreen';
import { RootNavigationList } from "./types.";
import { customTheme } from "../components/CustomeTheme";

const Stack = createStackNavigator<RootNavigationList>();

const AppNavigation: React.FC = () => {
  const theme = customTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{
          headerTitle: "Gallery from Unsplash.com",
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.colors.textColor,
            fontWeight:'bold'
          }
        }}/>
        <Stack.Screen name="ImageScreen" component={ImageScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
