import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/common/Header';
import { MatchSchedule } from '../components/dashboard/MatchSchedule';
import { PlayerStats } from '../components/dashboard/PlayerStats';
import { CaptainContact } from '../components/dashboard/CaptainContact';
import { colors, spacing } from '../theme';

export function Dashboard() {
  return (
    <View style={styles.container}>
      <Header title="Dashboard" />
      <ScrollView contentContainerStyle={styles.content}>
        <MatchSchedule />
        <PlayerStats />
        <CaptainContact />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
});