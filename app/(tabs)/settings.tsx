
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Bag-ong state para sa Dark Mode

  
  const backgroundColor = isDarkMode ? '#0F172A' : '#F8FAFC';
  const textColor = isDarkMode ? '#F8FAFC' : '#0F172A';
  const subTextColor = isDarkMode ? '#CBD5E1' : '#334155';
  const borderColor = isDarkMode ? '#334155' : '#E2E8F0';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Preferences</Text>

     
      <View style={[styles.settingRow, { borderBottomColor: borderColor }]}>
        <Text style={[styles.settingText, { color: subTextColor }]}>Enable Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

     
      <View style={[styles.settingRow, { borderBottomColor: borderColor }]}>
        <Text style={[styles.settingText, { color: subTextColor }]}>Dark Mode</Text>
        <Switch 
          value={isDarkMode} 
          onValueChange={setIsDarkMode} 
          trackColor={{ false: '#767577', true: '#2563EB' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingText: { fontSize: 16 },
});