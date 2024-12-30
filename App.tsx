import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/contexts/AuthContext';
import { Home } from './src/screens/Home';
import { SignIn } from './src/screens/SignIn';
import { SignUp } from './src/screens/SignUp';
import { Dashboard } from './src/screens/Dashboard';
import { AdminDashboard } from './src/screens/AdminDashboard';
import { Unauthorized } from './src/screens/Unauthorized';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="Unauthorized" component={Unauthorized} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}