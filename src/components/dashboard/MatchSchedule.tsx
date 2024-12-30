import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { Card } from '../common/Card';
import { useMatches } from '../../hooks/useMatches';
import { colors, typography, spacing } from '../../theme';

export function MatchSchedule() {
  const { matches, isLoading } = useMatches();

  if (isLoading) {
    return <View style={styles.loading} />;
  }

  return (
    <Card>
      <View style={styles.header}>
        <Calendar size={20} color={colors.primary} />
        <Text style={styles.title}>Upcoming Matches</Text>
      </View>

      {matches?.map((match) => (
        <View key={match.id} style={styles.match}>
          <Text style={styles.opponent}>{match.opponent}</Text>
          <Text style={styles.date}>
            {new Date(match.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text style={styles.location}>{match.location}</Text>
        </View>
      ))}
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
  match: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    paddingLeft: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  opponent: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
  },
  date: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  location: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});