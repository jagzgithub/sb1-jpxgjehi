import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, Users, Trophy, Activity } from 'lucide-react-native';
import { Card } from '../common/Card';
import { useSystemAnalytics } from '../../hooks/admin/useSystemAnalytics';
import { colors, typography, spacing } from '../../theme';

export function SystemAnalytics() {
  const { analytics, isLoading } = useSystemAnalytics();

  if (isLoading) {
    return <View style={styles.loading} />;
  }

  const stats = [
    {
      icon: Users,
      title: 'Active Users',
      value: analytics?.activeUsers,
      period: 'Last 30 days',
      color: 'indigo',
    },
    {
      icon: Trophy,
      title: 'Total Matches',
      value: analytics?.totalMatches,
      period: 'All time',
      color: 'green',
    },
    {
      icon: Activity,
      title: 'Match Participation',
      value: `${analytics?.participationRate}%`,
      period: 'Average rate',
      color: 'purple',
    },
  ];

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.header}>
          <BarChart size={20} color={colors.primary} />
          <Text style={styles.title}>System Analytics</Text>
        </View>

        <View style={styles.grid}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <View 
                key={stat.title} 
                style={[styles.statCard, styles[`${stat.color}Bg`]]}
              >
                <Icon size={16} color={colors[stat.color]} />
                <Text style={[styles.statTitle, styles[`${stat.color}Text`]]}>
                  {stat.title}
                </Text>
                <Text style={[styles.statValue, styles[`${stat.color}Text`]]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statPeriod, styles[`${stat.color}Text`]]}>
                  {stat.period}
                </Text>
              </View>
            );
          })}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
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
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: spacing.md,
    borderRadius: 8,
  },
  statTitle: {
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  statPeriod: {
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
  },
  indigoBg: { backgroundColor: '#EEF2FF' },
  greenBg: { backgroundColor: '#ECFDF5' },
  purpleBg: { backgroundColor: '#F5F3FF' },
  indigoText: { color: '#4F46E5' },
  greenText: { color: '#059669' },
  purpleText: { color: '#7C3AED' },
});