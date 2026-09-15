
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const COURSE_DATA: Record<string, { title: string; instructor: string; description: string }> = {
  CCE106: {
    title: 'DEVELOPMENT AND EMERGING TECHNOLOGIES',
    instructor: 'LJ Orcullo',
    description: 'Learn React Native, Expo Router, and mobile application architectures.',
  },
  CS101: {
    title: 'IT/11 NETWORKING 2',
    instructor: 'xian rhel cadiogan',
    description: 'Fundamental concepts of programming, algorithms, and network thinking.',
  },
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const courseKey = typeof id === 'string' ? id.toUpperCase() : '';
  const course = COURSE_DATA[courseKey];

 
  if (!course) {
    return (
      <View style={styles.container}>
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Invalid Course ID</Text>
          <Text style={styles.errorText}>
            No course found matching parameter: "{id}"
          </Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.courseCode}>{courseKey}</Text>
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.instructor}>Instructor: {course.instructor}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back to Previous Screen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  courseCode: { fontSize: 14, fontWeight: 'bold', color: '#2563EB', letterSpacing: 1 },
  courseTitle: { fontSize: 24, fontWeight: 'bold', color: '#0F172A', marginVertical: 6 },
  instructor: { fontSize: 16, color: '#475569', marginBottom: 12 },
  description: { fontSize: 15, color: '#334155', lineHeight: 22, marginBottom: 20 },
  errorCard: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorTitle: { fontSize: 18, fontWeight: 'bold', color: '#991B1B', marginBottom: 6 },
  errorText: { fontSize: 14, color: '#7F1D1D', marginBottom: 16, textAlign: 'center' },
  backButton: { backgroundColor: '#1E3A8A', padding: 12, borderRadius: 6 },
  backButtonText: { color: '#FFFFFF', fontWeight: '600' },
});