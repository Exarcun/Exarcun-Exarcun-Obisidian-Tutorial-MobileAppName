import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Card from '../components/Card';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>La Mia App</Text>
        </View>
        
        <Card style={styles.welcomeCard}>
          <Text style={styles.cardTitle}>Benvenuto!</Text>
          <Text style={styles.cardText}>
            Questa è la tua nuova app mobile creata con React Native e Expo.
          </Text>
          <Image 
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
            style={styles.logo}
          />
        </Card>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Funzionalità</Text>
          
          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => navigation.navigate('News')}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#FFD700' }]} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>News</Text>
              <Text style={styles.featureDescription}>Leggi le ultime notizie</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.featureItem}
            onPress={() => navigation.navigate('Impostazioni')}
          >
            <View style={[styles.featureIcon, { backgroundColor: '#FF6347' }]} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Impostazioni</Text>
              <Text style={styles.featureDescription}>Personalizza la tua app</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#4c84ff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeCard: {
    margin: 15,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
  featuresContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
});

export default HomeScreen;