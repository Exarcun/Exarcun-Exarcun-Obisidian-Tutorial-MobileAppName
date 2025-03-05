import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({
  title,
  onPress,
  type = 'primary', // primary, secondary, outline
  size = 'medium', // small, medium, large
  disabled = false,
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`${type}Button`],
        styles[`${size}Button`],
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          styles[`${type}Text`],
          styles[`${size}Text`],
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  primaryButton: {
    backgroundColor: '#4c84ff',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4c84ff',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    // Default size
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#333',
  },
  outlineText: {
    color: '#4c84ff',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: '#888888',
  },
});

export default CustomButton;