import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface DividerProps {
  vertical?: boolean;
  color?: string;
  thickness?: number;
  length?: number | string;
}

export function Divider({ 
  vertical = false,
  color = colors.border,
  thickness = StyleSheet.hairlineWidth,
  length = '100%'
}: DividerProps) {
  const style = {
    backgroundColor: color,
    ...(vertical ? {
      width: thickness,
      height: length,
    } : {
      height: thickness,
      width: length,
    }),
  };

  return <View style={style} />;
}