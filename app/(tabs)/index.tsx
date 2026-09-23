import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const TOKEN_KEY = 'user_auth_token';
const USER_PROFILE_KEY = 'user_profile_data';

export default function HomeScreen() {
  // --- STUDENT PORTAL STATES ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [studentProfile, setStudentProfile] = useState<any>(null);

  // INITIAL LOAD
  useEffect(() => {
    restoreSession();
  }, []);

  // --- STUDENT PORTAL FUNCTIONS ---
  const restoreSession = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      const savedProfile = await SecureStore.getItemAsync(USER_PROFILE_KEY);

      if (savedToken) {
        setToken(savedToken);
        if (savedProfile) {
          setStudentProfile(JSON.parse(savedProfile));
        } else {
          await fetchProtectedProfile(savedToken);
        }
      }
    } catch (e) {
      console.log('Failed to restore session', e);
    } finally {
      setIsRestoringSession(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setPortalError('Palihog isulod ang Username/Email ug Password.');
      return;
    }

    setPortalLoading(true);
    setPortalError(null);

    const isCustomUser =
      (email.toLowerCase() === 'daniel' ||
        email.toLowerCase() === 'daniel dave soncio' ||
        email.toLowerCase() === 'daniel dave' ||
        email.toLowerCase() === 'soncio') &&
      password === 'Soncio29';

    if (isCustomUser) {
      setTimeout(async () => {
        const mockToken = 'custom_secure_token_daniel_soncio_2026';
        const profileData = {
          firstName: 'Daniel Dave',
          lastName: 'Soncio',
          email: 'danieldavesoncio@student.edu.ph',
          role: 'Student (BSIT)',
        };

        await SecureStore.setItemAsync(TOKEN_KEY, mockToken);
        await SecureStore.setItemAsync(USER_PROFILE_KEY, JSON.stringify(profileData));

        setToken(mockToken);
        setStudentProfile(profileData);
        setPortalLoading(false);
      }, 800);
      return;
    }

    // Default DummyJSON API  
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Invalid credentials.');

      const userToken = data.accessToken || data.token;
      if (!userToken) throw new Error('Token is undefined.');

      await SecureStore.setItemAsync(TOKEN_KEY, userToken);
      setToken(userToken);
      setStudentProfile(data);
    } catch (err: any) {
      setPortalError(err.message || 'Invalid credentials.');
    } finally {
      setPortalLoading(false);
    }
  };

  const fetchProtectedProfile = async (authToken: string) => {
    setPortalLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.status === 401) {
        Alert.alert('Session Expired', 'Please log in again.');
        handleLogout();
        return;
      }

      const data = await response.json();
      setStudentProfile(data);
    } catch (err) {
      setPortalError('Unable to load the protected profile data.');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_PROFILE_KEY);
    setToken(null);
    setStudentProfile(null);
    setEmail('');
    setPassword('');
    setPortalError(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {isRestoringSession ? (
          <View style={styles.statusContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.statusText}>Checking Session...</Text>
          </View>
        ) : !token ? (
          // LOGIN FORM
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.header}>STUDENT PORTAL LOGIN</Text>

            {portalError && <Text style={styles.errorText}>{portalError}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Username / Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={portalLoading}
            >
              {portalLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>LOGIN</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          // PROTECTED PROFILE
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.header}>PROTECTED STUDENT PROFILE</Text>

            {portalLoading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : studentProfile ? (
              <View style={styles.profileContainer}>
                <Text style={styles.profileText}>
                  <Text style={styles.bold}>Name:</Text> {studentProfile.firstName}{' '}
                  {studentProfile.lastName}
                </Text>
                <Text style={styles.profileText}>
                  <Text style={styles.bold}>Email:</Text> {studentProfile.email}
                </Text>

                <Text style={styles.profileText}>
                  <Text style={styles.bold}>Role:</Text>{' '}
                  {studentProfile.role || 'Student'}
                </Text>
              </View>
            ) : null}

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#0d47a1',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    minHeight: 340,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    color: '#90caf9',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 16,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  statusText: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 14,
  },
  errorText: {
    color: '#ff8a80',
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  profileText: {
    color: '#ffffff',
    fontSize: 14,
    marginVertical: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#90caf9',
  },
}); 