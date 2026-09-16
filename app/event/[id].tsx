import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


const EVENTS = [
  { id: '1', title: 'ML tounament', date: 'Sept 20, 2026', location: 'VC Lab 1', description: 'ML competition for students.' },
  { id: '2', title: 'Music Fest', date: 'Sept 25, 2026', location: 'Gymnasium', description: 'Live campus bands and music performance.' },
  { id: '3', title: 'Tech Seminar', date: 'Nov 05, 2026', location: 'Auditorium', description: 'Seminar on modern mobile web development.' },
];

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(false);

  
  const event = EVENTS.find((e) => e.id === id);

  
  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found!</Text>
        <Pressable 
          style={({ pressed }) => [styles.button, styles.backBtn, { opacity: pressed ? 0.7 : 1 }]} 
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.detail}>{event.date} • {event.location}</Text>
      <Text style={styles.description}>{event.description}</Text>

      {/* Pressable Join / Leave Toggle Action using local state */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          isJoined ? styles.leaveBtn : styles.joinBtn,
          { opacity: pressed ? 0.7 : 1.0 }
        ]}
        onPress={() => setIsJoined(!isJoined)}
      >
        <Text style={styles.buttonText}>
          {isJoined ? 'Leave Event' : 'Join Event'}
        </Text>
      </Pressable>

      <Text style={styles.status}>
        Status: {isJoined ? 'You have joined this event' : 'Not Joined'}
      </Text>

      {/* Navigation Back */}
      <Pressable 
        style={({ pressed }) => [styles.backLink, { opacity: pressed ? 0.5 : 1 }]} 
        onPress={() => router.back()}
      >
        <Text style={styles.backLinkText}>← Back to Events</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  detail: { fontSize: 16, color: '#666', marginBottom: 16 },
  description: { fontSize: 15, textAlign: 'center', marginBottom: 24, color: '#333', lineHeight: 22 },
  errorText: { fontSize: 18, color: '#d9534f', marginBottom: 16, fontWeight: 'bold' },
  button: { paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginTop: 10, width: '80%', alignItems: 'center' },
  joinBtn: { backgroundColor: '#007AFF' },
  leaveBtn: { backgroundColor: '#FF3B30' },
  backBtn: { backgroundColor: '#6c757d' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  status: { marginTop: 16, fontSize: 14, fontStyle: 'italic', color: '#555' },
  backLink: { marginTop: 30, padding: 10 },
  backLinkText: { color: '#007AFF', fontSize: 15, fontWeight: '600' },
});