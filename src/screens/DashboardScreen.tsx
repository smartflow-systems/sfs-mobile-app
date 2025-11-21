import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getSystemStats, getBillingOverview, getRepoHealth } from '../services/api';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data
  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ['systemStats'],
    queryFn: getSystemStats,
  });

  const { data: billing, refetch: refetchBilling } = useQuery({
    queryKey: ['billing'],
    queryFn: getBillingOverview,
  });

  const { data: repos, refetch: refetchRepos } = useQuery({
    queryKey: ['repos'],
    queryFn: getRepoHealth,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchStats(), refetchBilling(), refetchRepos()]);
    setRefreshing(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.gold}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SFS Control Tower</Text>
        <Text style={styles.headerSubtitle}>SmartFlow Systems Command Center</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Repos"
          value={stats?.total || 0}
          subtitle={`${stats?.healthy || 0} healthy`}
          color={COLORS.gold}
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(billing?.totalRevenue || 0)}
          subtitle="Total earned"
          color={COLORS.success}
        />
        <StatCard
          title="Active Subs"
          value={billing?.activeSubscriptions || 0}
          subtitle="Subscriptions"
          color={COLORS.info}
        />
        <StatCard
          title="MRR"
          value={formatCurrency(billing?.monthlyRecurringRevenue || 0)}
          subtitle="Monthly recurring"
          color={COLORS.warning}
        />
      </View>

      {/* Repository Health Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Repository Health</Text>
        {repos?.slice(0, 5).map((repo: any) => (
          <View key={repo.name} style={styles.repoCard}>
            <View style={styles.repoHeader}>
              <Text style={styles.repoName}>{repo.name}</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: repo.status === 'healthy' ? COLORS.success : COLORS.warning },
                ]}
              >
                <Text style={styles.statusText}>
                  {repo.status === 'healthy' ? '✓' : '!'}
                </Text>
              </View>
            </View>
            {repo.github?.lastCommit && (
              <Text style={styles.repoSubtitle} numberOfLines={1}>
                {repo.github.lastCommit.message}
              </Text>
            )}
            <View style={styles.repoMeta}>
              <Text style={styles.metaText}>
                {repo.github?.openIssues || 0} issues
              </Text>
              <Text style={styles.metaText}>•</Text>
              <Text style={styles.metaText}>
                {repo.github?.openPRs || 0} PRs
              </Text>
              {repo.github?.language && (
                <>
                  <Text style={styles.metaText}>•</Text>
                  <Text style={styles.metaText}>{repo.github.language}</Text>
                </>
              )}
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All {repos?.length || 0} Repos →</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {billing?.recentTransactions?.slice(0, 3).map((tx: any) => (
          <View key={tx.id} style={styles.transactionCard}>
            <View style={styles.txHeader}>
              <Text style={styles.txCustomer}>{tx.customer}</Text>
              <Text style={[styles.txAmount, { color: COLORS.success }]}>
                {formatCurrency(tx.amount)}
              </Text>
            </View>
            <Text style={styles.txDescription}>{tx.description}</Text>
            <Text style={styles.txDate}>
              {new Date(tx.created * 1000).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
}

function StatCard({ title, value, subtitle, color }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.caption,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.md,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statTitle: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.xs,
  },
  statValue: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.xs,
  },
  statSubtitle: {
    ...TYPOGRAPHY.small,
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.md,
  },
  repoCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  repoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  repoName: {
    ...TYPOGRAPHY.h3,
    flex: 1,
  },
  statusBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  repoSubtitle: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.xs,
  },
  repoMeta: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  metaText: {
    ...TYPOGRAPHY.small,
  },
  viewAllButton: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  viewAllText: {
    ...TYPOGRAPHY.body,
    color: COLORS.gold,
    fontWeight: '600',
  },
  transactionCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  txCustomer: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  txAmount: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
  },
  txDescription: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.xs,
  },
  txDate: {
    ...TYPOGRAPHY.small,
  },
});
