import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  isWide: boolean;
  onPress: () => void;
};

// Reusable Metric Card Component
const MetricCard = ({ title, value, change, isWide, onPress }: MetricCardProps) => {
  return (
    <TouchableOpacity 
      style={[styles.metricCard, isWide && styles.metricCardWide]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricChange}>{change}</Text>
    </TouchableOpacity>
  );
};

export default function IndexScreen() {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 600;

  // State setup
  const [revenue, setRevenue] = useState(45200);
  const [activities, setActivities] = useState([
    { id: 1, title: 'Payment to Store ABC', time: 'Today, 2:15 PM', amount: '-₱1,250.00', tag: 'OUT', isIncome: false },
    { id: 2, title: 'Received Cashback', time: 'Yesterday, 6:30 PM', amount: '+₱150.00', tag: 'IN', isIncome: true },
  ]);

  const handleSendMoney = () => {
    const newAmount = 500;
    setRevenue(prev => prev - newAmount);

    const newActivity = {
      id: Date.now(),
      title: 'Money Transfer',
      time: 'Just Now',
      amount: `-₱${newAmount}.00`,
      tag: 'OUT',
      isIncome: false,
    };

    setActivities([newActivity, ...activities]);
    Alert.alert('Transaction Complete', `Successfully sent ₱${newAmount}.00`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.headerTitle}>Daniel Soncio</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => Alert.alert('Account Settings', 'User Profile Details')}
          >
            <Text style={styles.profileInitials}>DS</Text>
          </TouchableOpacity>
        </View>

        {/* METRICS SECTION */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={[styles.metricsContainer, isWideScreen && styles.metricsRow]}>
          <MetricCard 
            title="Total Revenue" 
            value={`₱${revenue.toLocaleString()}`} 
            change="+12.5% this week" 
            isWide={isWideScreen} 
            onPress={() => setRevenue(prev => prev + 1000)}
          />
          <MetricCard 
            title="Active Users" 
            value="1,240" 
            change="+8% new accounts" 
            isWide={isWideScreen} 
            onPress={() => Alert.alert('Active Users', 'Total 1,240 active users')}
          />
          <MetricCard 
            title="Pending Orders" 
            value="18" 
            change="Requires action" 
            isWide={isWideScreen} 
            onPress={() => Alert.alert('Pending Orders', '18 orders waiting for delivery')}
          />
        </View>

        {/* QUICK ACTIONS SECTION */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSendMoney}>
            <Text style={styles.actionButtonText}>Send ₱500</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => Alert.alert('Action', 'Pay Bills selected')}
          >
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Pay Bills</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => Alert.alert('Action', 'Reports selected')}
          >
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Reports</Text>
          </TouchableOpacity>
        </View>

       
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          {activities.map((item, index) => (
            <React.Fragment key={item.id}>
              <View style={styles.activityItem}>
                
                <View style={[styles.tagBadge, item.isIncome ? styles.tagIncome : styles.tagExpense]}>
                  <Text style={[styles.tagText, item.isIncome ? styles.tagTextIncome : styles.tagTextExpense]}>
                    {item.tag}
                  </Text>
                </View>

                <View style={styles.activityTextContainer}>
                  <Text style={styles.activityMainText}>{item.title}</Text>
                  <Text style={styles.activitySubText}>{item.time}</Text>
                </View>
                
                <Text style={[styles.activityAmount, item.isIncome && styles.incomeText]}>
                  {item.amount}
                </Text>
              </View>
              {index < activities.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#4F46E5',
    padding: 20,
    borderRadius: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#C7D2FE',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3730A3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
    marginTop: 8,
  },
  metricsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  metricsRow: {
    flexDirection: 'row',
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  metricCardWide: {
    flex: 1,
  },
  metricTitle: {
    fontSize: 13,
    color: '#64748B',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginVertical: 4,
  },
  metricChange: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#E0E7FF',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  secondaryButtonText: {
    color: '#4F46E5',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
 
  tagBadge: {
    width: 38,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tagExpense: {
    backgroundColor: '#FEE2E2',
  },
  tagIncome: {
    backgroundColor: '#D1FAE5',
  },
  tagText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  tagTextExpense: {
    color: '#EF4444',
  },
  tagTextIncome: {
    color: '#10B981',
  },

  activityTextContainer: {
    flex: 1,
  },
  activityMainText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  activitySubText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  incomeText: {
    color: '#10B981',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
});