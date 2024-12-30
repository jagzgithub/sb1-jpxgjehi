import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { Card } from '../common/Card';
import { usePlayerStats } from '../../hooks/usePlayerStats';
import { colors, typography, spacing } from '../../theme';

export function PlayerStats() {
  const { stats, isLoading } = usePlayerStats();

  if (isLoading) {
    return <View style={styles.loading} />;
  }

  const statItems = [
    { label: 'Matches Played', value: stats?.matchesPlayed, color: 'indigo' },
    { label: 'Win Rate', value: `${stats?.winRate}%`, color: 'green' },
    { label: 'Average Score', value: stats?.averageScore, color: 'purple' },
    { label: 'Tournaments', value: stats?.tournamentsPlayed, color: 'yellow' },
  ];

  return (
    <Card>
      <View style={styles.header}>
        <TrendingUp size={20} color={colors.primary} />
        <Text style={styles.title}>Performance Stats</Text>
      </View>

      <View style={styles.grid}>
        {statItems.map((item) => (
          <View 
            key={item.label} 
            style={[styles.statItem, styles[`${item.color}Bg`]]}
          >
            <Text style={[styles.statLabel, styles[`${item.color}Text`]]}>
              {item.label}
            </Text>
            <Text style={[styles.statValue, styles[`${item.color}Text`]]}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: 200,
    backgroundColor: colors.border,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    padding: spacing.md,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
  },
  indigoBg: { backgroundColor: '#EEF2FF' },
  greenBg: { backgroundColor: '#ECFDF5' },
  purpleBg: { backgroundColor: '#F5F3FF' },
  yellowBg: { backgroundColor: '#FFFBEB' },
  indigoText: { color: '#4F46E5' },
  greenText: { color: '#059669' },
  purpleText: { color: '#7C3AED' },
  yellowText: { color: '#D97706' },
});