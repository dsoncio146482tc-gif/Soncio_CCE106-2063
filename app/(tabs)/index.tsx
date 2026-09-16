import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

// Joined Events (Local Data)
const JOINED_EVENTS = [
  { id: '1', title: 'ML tournament', date: 'Sept 20, 2026', location: 'Lab 1', status: 'Confirmed' },
];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back, Daniel!</Text>
      <Text style={styles.subHeader}>Student ID: 146482</Text>

      <Text style={styles.sectionHeader}>My Joined Events ({JOINED_EVENTS.length})</Text>

      {JOINED_EVENTS.length > 0 ? (
        <FlatList
          data={JOINED_EVENTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/event/${item.id}`} asChild>
              <Pressable style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventSub}>{item.date} • {item.location}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
              </Pressable>
            </Link>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>You haven't joined any events yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  welcome: { fontSize: 24, fontWeight: 'bold', color: '#111' },
  subHeader: { fontSize: 14, color: '#666', marginBottom: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  card: { padding: 15, borderRadius: 10, backgroundColor: '#eaf5ff', marginBottom: 10, borderWidth: 1, borderColor: '#b8daff' },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#004085' },
  eventSub: { fontSize: 13, color: '#555', marginTop: 4 },
  status: { fontSize: 12, fontWeight: 'bold', color: '#28a745', marginTop: 8 },
  emptyText: { color: '#888', fontStyle: 'italic', marginTop: 10 },
});