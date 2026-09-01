import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CounterScreen() {
  // 1. Use useState for the counter value
  const [count, setCount] = useState<number>(0);

  // 2. Event Handlers
  const handleIncrease = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrease = () => {
    // 3. Prevent the value from going below zero
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      {/* Counter Value Box */}
      <View style={styles.displayBox}>
        <Text style={styles.counterText}>{count}</Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.btnIncrease]} onPress={handleIncrease}>
          <Text style={styles.buttonText}>Increase</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnDecrease]} onPress={handleDecrease}>
          <Text style={styles.buttonText}>Decrease</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnReset]} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // Dark theme background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  displayBox: {
    width: 250,
    height: 140,
    borderWidth: 1.5,
    borderColor: '#374151',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    backgroundColor: '#1f2937',
  },
  counterText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 95,
    alignItems: 'center',
  },
  btnIncrease: {
    backgroundColor: '#86efac', // Light Green
  },
  btnDecrease: {
    backgroundColor: '#fde047', // Light Yellow/Orange
  },
  btnReset: {
    backgroundColor: '#93c5fd', // Light Blue
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
});