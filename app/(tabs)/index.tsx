import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getCurrentUser, loginUser } from '../../src/services/authService';
import { deleteToken, getToken, saveToken } from '../../src/storage/tokenStorage';

export default function SecureProfileScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [initialCheckLoading, setInitialCheckLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          const userProfile = await getCurrentUser(storedToken);
          setProfile(userProfile);
        }
      } catch (err) {
        await deleteToken();
        setProfile(null);
      } finally {
        setInitialCheckLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function handleLogin() {
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(username, password);
      await saveToken(data.accessToken);
      
      const userProfile = await getCurrentUser(data.accessToken);
      setProfile(userProfile);
    } catch (err) {
      setError('Login failed. Check your username and password.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await deleteToken();
    setProfile(null);
    setError('');
  }

  if (initialCheckLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Checking session...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Secure Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <View style={styles.profileCard}>
        {profile.image && (
          <Image source={{ uri: profile.image }} style={styles.avatar} />
        )}
        <Text style={styles.profileText}>
          <Text style={styles.label}>Name: </Text>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.profileText}>
          <Text style={styles.label}>Username: </Text>
          {profile.username}
        </Text>
        <Text style={styles.profileText}>
          <Text style={styles.label}>Email: </Text>
          {profile.email}
        </Text>
        <Text style={styles.profileText}>
          <Text style={styles.label}>User ID: </Text>
          {profile.id}
        </Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginBottom: 12 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonDisabled: { backgroundColor: '#a0c8ff' },
  logoutButton: { backgroundColor: '#FF3B30', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  errorText: { color: '#FF3B30', marginBottom: 10, textAlign: 'center' },
  profileCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', elevation: 2 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  profileText: { fontSize: 16, marginBottom: 8 },
  label: { fontWeight: 'bold' },
});