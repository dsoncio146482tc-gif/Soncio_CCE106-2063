import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type Student = {
  id?: string | number;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  course?: string | null;
};

export default function StudentCard({ student }: { student: Student }) {
  const router = useRouter();

  const handleViewDetails = () => {
    // TODO EXAM: Check that the student has an id.
    if (student.id === undefined || student.id === null || !String(student.id).trim()) return;

    // TODO EXAM: Use Expo Router to navigate to /student/[id] with this student's id.
    router.push(`/student/${encodeURIComponent(String(student.id))}`);
  };

  const displayName = student.name || `${student.first_name || ''} ${student.last_name || ''}`.trim() || 'Name not available';

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{displayName}</Text>
      <Text style={styles.text}>{student.email || 'Email not available'}</Text>
      {student.course ? <Text style={styles.text}>{student.course}</Text> : null}
      <Pressable accessibilityRole="button" style={styles.button} onPress={handleViewDetails}>
        <Text style={styles.buttonText}>View Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 12, backgroundColor: '#ffffff', marginBottom: 12, gap: 8 },
  name: { color: '#17324d', fontSize: 18, fontWeight: '600' },
  text: { color: '#536579' },
  button: { paddingVertical: 12, alignSelf: 'flex-start' },
  buttonText: { color: '#245bb2', fontWeight: '600' },
});
