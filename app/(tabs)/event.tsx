import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const ALL_EVENTS = [
  { id: '1', title: 'ML tournament', category: 'Tech', date: 'Sept 20, 2026', location: 'VC Lab 1' },
  { id: '2', title: 'Music Fest', category: 'Arts', date: 'Sept 25, 2026', location: 'Main Campus Gymnasium' },
  { id: '3', title: 'Tech Seminar', category: 'Tech', date: 'Nov 05, 2026', location: 'New Building 101' },
  { id: '4', title: 'Sports Fest', category: 'Sports', date: 'Nov 12, 2026', location: 'Oval' },
];

export default function EventsScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech', 'Arts', 'Sports'];

  const filteredEvents = ALL_EVENTS.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse & Filter Events</Text>

   
      <TextInput
        style={styles.searchInput}
        placeholder="Search event title..."
        value={search}
        onChangeText={setSearch}
      />

     
      <View style={styles.filterContainer}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.chip, selectedCategory === cat && styles.activeChip]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.chipText, selectedCategory === cat && styles.activeChipText]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Event List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/event/${item.id}`} asChild>
            <Pressable style={({ pressed }) => [styles.card, { opacity: pressed ? 0.7 : 1 }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.categoryBadge}>{item.category}</Text>
              </View>
              <Text style={styles.eventSub}>{item.date} • {item.location}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  searchInput: { height: 45, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
  filterContainer: { flexDirection: 'row', marginBottom: 15 },
  chip: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 8 },
  activeChip: { backgroundColor: '#007AFF' },
  chipText: { color: '#333', fontSize: 13, fontWeight: '600' },
  activeChipText: { color: '#fff' },
  card: { padding: 15, borderRadius: 10, backgroundColor: '#f9f9f9', marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventTitle: { fontSize: 16, fontWeight: 'bold' },
  categoryBadge: { fontSize: 11, color: '#007AFF', backgroundColor: '#e6f0ff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  eventSub: { color: '#666', marginTop: 5, fontSize: 13 },
});