import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminNav } from '../components/admin/AdminNav';
import { SystemAnalytics } from '../components/admin/SystemAnalytics';
import { UserManagement } from '../components/admin/users/UserManagement';
import { MatchUpload } from '../components/admin/matches/MatchUpload';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export function AdminDashboard() {
  return (
    <View style={styles.container}>
      <AdminNav />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Overview" component={SystemAnalytics} />
        <Stack.Screen name="Users" component={UserManagement} />
        <Stack.Screen name="Matches" component={MatchUpload} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});