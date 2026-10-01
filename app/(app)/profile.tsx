import { getApiUrl } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();
  const [profileData, setProfileData] = useState<any>(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    // TODO EXAM: Add loading/error state with useState and call the loader using useEffect.
    setLoading(true);
    setError('');

    try {
      // TODO EXAM: Load the signed-in user from GET /users/{id} with fetch() and async/await.
      if (user?.id === undefined || user.id === null) {
        throw new Error('No user is available for this session.');
      }

      const response = await fetch(getApiUrl(`/users/${encodeURIComponent(String(user.id))}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // TODO EXAM: Check response.ok, handle a missing user, and display the returned profile data.
      if (response.status === 401) {
        await logout();
        throw new Error('Session expired. Please sign in again.');
      }

      if (!response.ok) {
        throw new Error('Failed to load profile data.');
      }

      const data = await response.json();
      setProfileData(data.data || data || user);
    } catch (err: any) {
      setError(err.message || 'An error occurred while loading profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const displayUser = profileData || user;
  const displayName = displayUser?.name ||
    `${displayUser?.first_name || ''} ${displayUser?.last_name || ''}`.trim() ||
    '—';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>
      
      {loading ? (
        <View style={styles.card}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.note}>Loading profile data…</Text>
        </View>
      ) : error ? (
        <View style={styles.card}>
          <Text style={styles.error}>{error}</Text>
          <Pressable accessibilityRole="button" onPress={loadProfile}>
            <Text style={styles.link}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.text}>Name: {displayName}</Text>
          <Text style={styles.text}>Email: {displayUser?.email || '—'}</Text>
          <Text style={styles.text}>Role: {displayUser?.role || 'Student'}</Text>
          {!displayUser && <Text style={styles.note}>No profile loaded yet.</Text>}
        </View>
      )}

      <Text style={styles.text}>Session Status: {token ? 'Authenticated' : 'Not Available'}</Text>
      <Pressable accessibilityRole="button" style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 20, backgroundColor: '#f2f5fa' },
  title: { color: '#17324d', fontSize: 24, fontWeight: '700' },
  card: { backgroundColor: '#ffffff', padding: 20, gap: 16, borderRadius: 12 },
  text: { color: '#536579', fontSize: 16 },
  note: { color: '#536579', fontSize: 12, textAlign: 'center' },
  error: { color: '#b42318' },
  link: { color: '#245bb2', textAlign: 'center', fontWeight: '600' },
  button: { backgroundColor: '#245bb2', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
});
