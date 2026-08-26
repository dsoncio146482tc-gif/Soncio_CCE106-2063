import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Student Name */}
      <Text style={styles.title}>Soncio, Daniel Dave V.</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>My first mobile app</Text>

      {/* Course */}
      <Text style={styles.course}>BSIT</Text>

      {/* App Idea Description */}
      <Text style={styles.description}>
        I want to build a student attendance app using React Native to track daily class check-ins automatically.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Customized dark background color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#38bdf8', // Styled font color and size
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 12,
    textAlign: 'center',
  },
  course: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f43f5e',
    marginBottom: 20,
    letterSpacing: 1,
  },
  description: {
    fontSize: 15,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 22,
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
  },
});