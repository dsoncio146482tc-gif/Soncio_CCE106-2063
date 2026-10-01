import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

function RootLayoutNav() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(app)' || segments[0] === 'student';

    // TODO EXAM: Protect (app) AND student/[id]; redirect unauthenticated users to /sign-in.
    if (!token && inAuthGroup) {
      router.replace('/sign-in');
    } else if (token && segments[0] === 'sign-in') {
      router.replace('/(app)');
    }
  }, [token, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerTintColor: '#17324d' }}>
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="student/[id]" options={{ title: 'Student Details' }} />
    </Stack>
  );
}

export default function RootLayout() {
  // TODO EXAM: Check authentication state and wait for session restoration.
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}