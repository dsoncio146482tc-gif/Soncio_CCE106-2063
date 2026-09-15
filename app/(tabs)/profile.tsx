
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>DS</Text>
      </View>
      <Text style={styles.name}>Daniel Dave Soncio</Text>
      <Text style={styles.info}>Student ID: 146482</Text>
      <Text style={styles.info}>Course: CCE106</Text>
      <Text style={styles.info}>Professor: LJ Orcullo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#F8FAFC' },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  avatarText: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#0F172A', marginBottom: 4 },
  info: { fontSize: 16, color: '#475569', marginVertical: 2 },
});