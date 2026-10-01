/* eslint-disable @typescript-eslint/no-unused-vars -- State setters and loader are exam placeholders. */
import { type Student } from '@/components/StudentCard';
import { getApiUrl } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token, logout } = useAuth();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = async () => {
    // TODO EXAM: Validate the id read from useLocalSearchParams().
    if (typeof id !== 'string' || !id.trim()) {
      setError('Invalid student ID.');
      setLoading(false);
      return;
    }

    // TODO EXAM: Set loading and clear previous errors.
    setLoading(true);
    setError('');

    try {
      // TODO EXAM: GET /students/{id} with fetch(), async/await, and a Bearer token.
      const response = await fetch(getApiUrl(`/users/${encodeURIComponent(id.trim())}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // TODO EXAM: Check response.ok; handle 401 Unauthorized and missing records.
      if (response.status === 401) {
        await logout();
        throw new Error('Session expired. Please sign in again.');
      }

      if (response.status === 404) {
        throw new Error('Student record not found.');
      }

      if (!response.ok) {
        throw new Error('Failed to load student details.');
      }

      // TODO EXAM: Parse JSON and update student state.
      const data = await response.json();
      const studentData = data.data || data;
      setStudent(studentData);
    } catch (err: any) {
      // TODO EXAM: Handle errors and stop loading in finally.
      setError(err.message || 'An error occurred while fetching student details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // TODO EXAM: Call loadStudent() when id changes.
    loadStudent();
  }, [id]);

  const studentName = student
    ? student.name || `${student.first_name || ''} ${student.last_name || ''}`.trim()
    : '—';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.text}>Loading student…</Text>
        </View>
      ) : error ? (
        <View style={styles.state}>
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {error}
          </Text>
          <Pressable accessibilityRole="button" onPress={loadStudent}>
            <Text style={styles.link}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.text}>ID: {id || 'Not available'}</Text>
          <Text style={styles.text}>Name: {studentName}</Text>
          <Text style={styles.text}>Email: {student?.email || '—'}</Text>
          <Text style={styles.text}>Course: {student?.course || '—'}</Text>
        </View>
      )}

      <Pressable accessibilityRole="button" style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 20, backgroundColor: '#f2f5fa' },
  title: { color: '#17324d', fontSize: 28, fontWeight: '700' },
  state: { gap: 12, alignItems: 'center', paddingVertical: 20 },
  card: { backgroundColor: '#ffffff', padding: 20, gap: 16, borderRadius: 12 },
  text: { color: '#536579', fontSize: 16 },
  error: { color: '#b42318' },
  link: { color: '#245bb2', fontWeight: '600' },
  button: { backgroundColor: '#245bb2', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
});
