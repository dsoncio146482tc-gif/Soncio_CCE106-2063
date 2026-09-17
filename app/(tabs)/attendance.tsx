import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Student {
  id: string;
  name: string;
  status: 'P' | 'A' | null; 
}

export default function Lab08() {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Daniel Dave Soncio', status: null },
    { id: '2', name: 'jake calamba', status: null },
    { id: '3', name: 'jhon dave ledesma', status: null },
    { id: '4', name: 'kent ryan villanosa', status: null },
  ]);

  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  
  useEffect(() => {
    const present = students.filter((s) => s.status === 'P').length;
    const absent = students.filter((s) => s.status === 'A').length;

    setPresentCount(present);
    setAbsentCount(absent);
  }, [students]);

  const toggleStatus = (id: string, status: 'P' | 'A') => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Attendance Tracker</Text>

      
      <View style={styles.summaryContainer}>
        <View style={[styles.card, styles.presentCard]}>
          <Text style={styles.cardLabel}>P</Text>
          <Text style={styles.cardValue}>{presentCount}</Text>
        </View>

        <View style={[styles.card, styles.absentCard]}>
          <Text style={styles.cardLabel}>A</Text>
          <Text style={styles.cardValue}>{absentCount}</Text>
        </View>
      </View>

      
      <Text style={styles.sectionHeader}>Names</Text>

      {students.map((student) => (
        <View key={student.id} style={styles.studentRow}>
          <Text style={styles.studentName}>{student.name}</Text>

          <View style={styles.buttonGroup}>
       
            <TouchableOpacity
              style={[
                styles.actionBtn,
                student.status === 'P' ? styles.btnPresentActive : styles.btnInactive,
              ]}
              onPress={() => toggleStatus(student.id, 'P')}
            >
              <Text style={styles.btnText}>✓</Text>
            </TouchableOpacity>

           
            <TouchableOpacity
              style={[
                styles.actionBtn,
                student.status === 'A' ? styles.btnAbsentActive : styles.btnInactive,
              ]}
              onPress={() => toggleStatus(student.id, 'A')}
            >
              <Text style={styles.btnText}>✗</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 0.48,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  presentCard: {
    backgroundColor: '#d4edda',
  },
  absentCard: {
    backgroundColor: '#f8d7da',
  },
  cardLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  studentName: {
    fontSize: 16,
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnInactive: {
    backgroundColor: '#e0e0e0',
  },
  btnPresentActive: {
    backgroundColor: '#28a745',
  },
  btnAbsentActive: {
    backgroundColor: '#dc3545',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});