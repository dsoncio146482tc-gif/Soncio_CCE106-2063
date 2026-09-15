// app/student/[id].tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const isValidStudent = id === '146482';

  if (!isValidStudent) {
    return (
      <View style={styles.container}>
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Student Not Found</Text>
          <Text style={styles.errorText}>No record exists for Student ID: "{id}"</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Record</Text>
      <Text style={styles.detail}>ID: {id}</Text>
      <Text style={styles.detail}>Name: Daniel Dave Soncio</Text>
      <Text style={styles.detail}>Course: CCE106</Text>
      <Pressable style={[styles.backButton, { marginTop: 20 }]} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#0F172A', marginBottom: 12 },
  detail: { fontSize: 16, color: '#475569', marginVertical: 4 },
  errorCard: { backgroundColor: '#FEF2F2', padding: 20, borderRadius: 8, alignItems: 'center' },
  errorTitle: { fontSize: 18, fontWeight: 'bold', color: '#991B1B', marginBottom: 6 },
  errorText: { fontSize: 14, color: '#7F1D1D', marginBottom: 16 },
  backButton: { backgroundColor: '#1E3A8A', padding: 12, borderRadius: 6 },
  backButtonText: { color: '#FFFFFF', fontWeight: '600' },
});