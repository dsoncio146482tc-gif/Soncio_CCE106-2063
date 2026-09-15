import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CalculatorScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<string | number>('');

  
  const calculate = (operator: string) => {
    // 1. Validate empty inputs
    if (num1.trim() === '' || num2.trim() === '') {
      setResult('Please enter both numbers!');
      return;
    }

    const firstVal = parseFloat(num1);
    const secondVal = parseFloat(num2);

    // 2. Validate invalid numeric input
    if (isNaN(firstVal) || isNaN(secondVal)) {
      setResult('Invalid input! Enter valid numbers.');
      return;
    }

    // 3. Prevent division by zero
    if (operator === '/' && secondVal === 0) {
      setResult('Cannot divide by zero!');
      return;
    }

    // Perform operations
    let res = 0;
    switch (operator) {
      case '+':
        res = firstVal + secondVal;
        break;
      case '-':
        res = firstVal - secondVal;
        break;
      case '*':
        res = firstVal * secondVal;
        break;
      case '/':
        res = firstVal / secondVal;
        break;
    }

    setResult(`Result: ${res}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Simple Calculator</Text>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="First number"
          placeholderTextColor="#94a3b8"
          value={num1}
          onChangeText={setNum1}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Second number"
          placeholderTextColor="#94a3b8"
          value={num2}
          onChangeText={setNum2}
        />
      </View>

      {/* Buttons (+ - * /) */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.btnBlue]} onPress={() => calculate('+')}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnGreen]} onPress={() => calculate('-')}>
          <Text style={styles.btnText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnLime]} onPress={() => calculate('*')}>
          <Text style={styles.btnText}>×</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnGreenish]} onPress={() => calculate('/')}>
          <Text style={styles.btnText}>÷</Text>
        </TouchableOpacity>
      </View>

      {/* Result Display Box */}
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>
          {result === '' ? 'Result: ' : result}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    width: 130,
    height: 60,
    fontSize: 22,
    textAlign: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  button: {
    width: 65,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnBlue: {
    backgroundColor: '#60a5fa',
  },
  btnGreen: {
    backgroundColor: '#86efac',
  },
  btnLime: {
    backgroundColor: '#bef264',
  },
  btnGreenish: {
    backgroundColor: '#a7f3d0',
  },
  btnText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  resultBox: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#a3e635',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});