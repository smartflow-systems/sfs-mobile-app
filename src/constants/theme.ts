// SFS Mobile App Theme - Brown/Black/Gold
export const COLORS = {
  // Primary SFS Colors
  gold: '#FFD700',
  goldHover: '#E6C200',
  brown: '#3B2F2F',
  black: '#0D0D0D',
  beige: '#F5F5DC',

  // UI Colors
  background: '#0D0D0D',
  surface: '#1A1A1A',
  surfaceLight: '#2D2D2D',

  // Text
  textPrimary: '#F5F5DC',
  textSecondary: 'rgba(245, 245, 220, 0.7)',
  textMuted: 'rgba(245, 245, 220, 0.5)',

  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Borders
  border: 'rgba(255, 215, 0, 0.2)',
  borderLight: 'rgba(255, 215, 0, 0.1)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: COLORS.gold,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: COLORS.gold,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: COLORS.textPrimary,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: COLORS.textSecondary,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: COLORS.textMuted,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
