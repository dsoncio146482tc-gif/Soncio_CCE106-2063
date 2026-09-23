import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      
      if (!response.ok) {
        throw new Error('Nagloko ang network/server.');
      }
      
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError('The quote couldn’t be fetched. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>QUOTE OF THE DAY</Text>

        {loading && (
          <View style={styles.statusContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.statusText}>Loading</Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.statusContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && quote && (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>"{quote.quote}"</Text>
            <Text style={styles.authorText}>— {quote.author}</Text>
          </View>
        )}

        {!loading && !error && !quote && (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>There’s no quote available..</Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.button} 
          onPress={fetchQuote}
          disabled={loading}
        >
          <Text style={styles.buttonText}>NEW QUOTE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#0d47a1',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 350,
    minHeight: 320,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    color: '#90caf9',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 20,
  },
  quoteContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  quoteText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 12,
  },
  authorText: {
    color: '#e0e0e0',
    fontSize: 14,
    fontStyle: 'italic',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  statusText: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 14,
  },
  errorText: {
    color: '#ff8a80',
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});