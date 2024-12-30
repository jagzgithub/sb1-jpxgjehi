import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ImageBackground,
  useWindowDimensions,
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Trophy, Users, Calendar, Shield } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/common/Button';
import { colors, typography, spacing } from '../theme';

const features = [
  {
    icon: Trophy,
    title: 'Elite Training',
    description: 'Professional coaching and advanced techniques',
    color: colors.primary
  },
  {
    icon: Users,
    title: 'Active Community',
    description: 'Join a vibrant community of badminton enthusiasts',
    color: '#7C3AED'
  },
  {
    icon: Calendar,
    title: 'Regular Matches',
    description: 'Competitive matches and tournaments',
    color: '#2563EB'
  },
  {
    icon: Shield,
    title: 'All Skill Levels',
    description: 'Programs for beginners to advanced players',
    color: '#059669'
  }
];

export function Home() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} bounces={false}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1613918431703-aa50889e3be8?auto=format&fit=crop&q=80' }}
          style={[styles.hero, { width }]}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Acers</Text>
            </View>
            <Text style={styles.heroTitle}>
              Welcome to{'\n'}
              <Text style={styles.highlight}>Acers</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Join our premier badminton community for expert coaching, competitive matches, 
              and a vibrant sporting atmosphere
            </Text>
            <View style={styles.buttonGroup}>
              <Button
                title="Sign In"
                onPress={() => navigation.navigate('SignIn')}
                style={styles.button}
              />
              <Button
                title="Create Account"
                variant="secondary"
                onPress={() => navigation.navigate('SignUp')}
                style={styles.button}
              />
            </View>
          </View>
        </ImageBackground>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose Acers?</Text>
          <Text style={styles.sectionSubtitle}>
            Experience the perfect blend of professional training and community spirit
          </Text>
          
          <View style={styles.featureGrid}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <View key={index} style={styles.featureCard}>
                  <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
                    <Icon size={24} color={feature.color} />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Join?</Text>
          <Text style={styles.ctaText}>
            Start your journey with us today and experience the best in badminton training
          </Text>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('SignUp')}
            style={styles.ctaButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  hero: {
    height: Platform.OS === 'ios' ? 500 : 450,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.xl,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logoText: {
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  heroTitle: {
    fontSize: typography.sizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  highlight: {
    color: '#818CF8',
  },
  heroSubtitle: {
    fontSize: typography.sizes.lg,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    minWidth: 140,
  },
  featuresSection: {
    padding: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: typography.sizes.xxl,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.sm,
  },
  ctaText: {
    fontSize: typography.sizes.md,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  ctaButton: {
    backgroundColor: colors.white,
    minWidth: 200,
  },
});