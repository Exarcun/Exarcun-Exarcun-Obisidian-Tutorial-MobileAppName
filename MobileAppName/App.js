import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';

// Importiamo le componenti di autenticazione
import { onAuthStateChange } from './src/services/authService';

// Importiamo le schermate
import HomeScreen from './src/screens/HomeScreen';
import NewsScreen from './src/screens/NewsScreen';
import NewsDetailScreen from './src/screens/NewsDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Creiamo i navigatori
const Tab = createBottomTabNavigator();
const NewsStack = createStackNavigator();
const AuthStack = createStackNavigator();

// Definizione dello Stack delle News
function NewsStackScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen 
        name="NewsList" 
        component={NewsScreen} 
        options={{ headerShown: false }}
      />
      <NewsStack.Screen 
        name="NewsDetail" 
        component={NewsDetailScreen} 
        options={({ route }) => ({ title: route.params.title })}
      />
    </NewsStack.Navigator>
  );
}

// Definizione dello Stack di Autenticazione
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// Definizione del Tab Navigator principale
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Impostazioni') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4c84ff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="News" component={NewsStackScreen} />
      <Tab.Screen name="Impostazioni" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Gestione dello stato di autenticazione
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    // Pulizia al dismount del componente
    return unsubscribe;
  }, [initializing]);

  // Mostra lo splash screen durante l'inizializzazione
  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4c84ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {user ? <MainTabNavigator /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
});