import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfileForm() {
  
  const [fullName, setFullName] = useState('Daniel Dave Soncio');
  const [email, setEmail] = useState('d.soncio.146482@umindanao.edu.ph');
  const [studentId, setStudentId] = useState('146482');
  const [professor, setProfessor] = useState('LJ Orcullo');
  
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setError('');
    setIsSaved(false);

   
    if (!fullName.trim() || !email.trim()) {
      setError('Full Name and Email are required.');
      return;
    }

    
    const emailParts = email.split('@');
    if (!email.includes('@') || emailParts.length < 2 || emailParts[1].trim() === '') {
      setError('Please enter a valid email structure (e.g., name@example.com).');
      return;
    }

    
    setIsSaved(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Image
        source={{ uri: 'https://api.dicebear.com/7.x/bottts/png?seed=Daniel' }}
        style={styles.avatar}
      />

     
      <Text style={styles.profileHeader}>{fullName}</Text>
      <Text style={styles.profileSubHeader}>ID: {studentId} • Prof: {professor}</Text>
      <Text style={styles.profileEmail}>{email}</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Student ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Student ID"
          value={studentId}
          onChangeText={setStudentId}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Professor</Text>
        <TextInput
          style={styles.input}
          placeholder="Professor Name"
          value={professor}
          onChangeText={setProfessor}
        />

       
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {isSaved ? <Text style={styles.successText}> Profile updated successfully!</Text> : null}

        
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.7 : 1.0 }
          ]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save Profile</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#fff', flexGrow: 1 },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#e1e8ed', marginBottom: 12 },
  profileHeader: { fontSize: 22, fontWeight: 'bold', color: '#111' },
  profileSubHeader: { fontSize: 14, color: '#555', marginTop: 2 },
  profileEmail: { fontSize: 14, color: '#007AFF', marginBottom: 20 },
  formGroup: { width: '100%', marginTop: 10 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 4 },
  input: { width: '100%', height: 46, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, marginBottom: 14, fontSize: 15, backgroundColor: '#fafafa' },
  errorText: { color: '#d9534f', marginBottom: 12, fontWeight: '600', textAlign: 'center' },
  successText: { color: '#28a745', marginBottom: 12, fontWeight: '600', textAlign: 'center' },
  button: { width: '100%', backgroundColor: '#007AFF', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});