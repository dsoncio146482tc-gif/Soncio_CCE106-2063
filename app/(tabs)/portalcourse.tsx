
import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const handleProgrammaticNavigate = (courseId: string) => {

    router.push(`/course/${courseId}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>CCE106 Portal</Text>
      <Text style={styles.subheader}>Welcome, Daniel Dave Soncio</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Declarative Navigation </Text>
       
        <Link href="/course/CCE106" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Open Course </Text>
          </Pressable>
        </Link>
        
        
        <Link href="/student/146482" asChild>
          <Pressable style={{ ...styles.button, ...styles.secondaryButton }}>
            <Text style={styles.buttonText}>Open Student </Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Programmatic Navigation </Text>
        
        <Pressable
          style={styles.button}
          onPress={() => handleProgrammaticNavigate('CS101')}
        >
          <Text style={styles.buttonText}> Course IT/11</Text>
        </Pressable>

        
        
        <Pressable
          style={{ ...styles.button, ...styles.invalidButton }}
          onPress={() => handleProgrammaticNavigate('INVALID_ID')}
        >
          <Text style={styles.buttonText}>Test Invalid Parameter</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F8FAFC', flexGrow: 1 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A' },
  subheader: { fontSize: 16, color: '#64748B', marginBottom: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#0F172A', marginBottom: 6 },
  cardDescription: { fontSize: 14, color: '#475569', marginBottom: 12 },
  button: {
    backgroundColor: '#1E3A8A',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 4,
  },
  secondaryButton: { backgroundColor: '#2563EB' },
  invalidButton: { backgroundColor: '#DC2626' },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
});