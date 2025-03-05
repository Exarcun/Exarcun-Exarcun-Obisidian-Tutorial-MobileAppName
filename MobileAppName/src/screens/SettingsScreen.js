import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Switch, 
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { getCurrentUser, logoutUser } from '../services/authService';
import { getUserPreferences, saveUserPreferences } from '../services/firestoreService';

const SettingsScreen = ({ navigation }) => {
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    dataUsage: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const user = getCurrentUser();

  // Carica le preferenze utente da Firestore
  useEffect(() => {
    const loadPreferences = async () => {
      if (user) {
        try {
          const userPrefs = await getUserPreferences(user.uid);
          setPreferences({
            notifications: userPrefs.notifications ?? true,
            darkMode: userPrefs.darkMode ?? false,
            dataUsage: userPrefs.dataUsage ?? false
          });
        } catch (error) {
          console.error('Errore nel caricamento delle preferenze:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPreferences();
  }, [user]);

  // Gestisce il cambio delle preferenze
  const handleTogglePreference = async (key, value) => {
    try {
      setSaving(true);
      
      // Aggiorna lo stato locale
      const newPreferences = { ...preferences, [key]: value };
      setPreferences(newPreferences);
      
      // Salva su Firestore
      if (user) {
        await saveUserPreferences(user.uid, newPreferences);
      }
    } catch (error) {
      // Ripristina lo stato in caso di errore
      setPreferences(preferences);
      Alert.alert('Errore', 'Non è stato possibile salvare le preferenze');
    } finally {
      setSaving(false);
    }
  };

  // Gestisce il logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      // La navigazione è gestita in App.js tramite onAuthStateChange
    } catch (error) {
      Alert.alert('Errore', 'Impossibile effettuare il logout');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4c84ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Impostazioni</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferenze</Text>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Notifiche</Text>
            <Text style={styles.settingDescription}>Ricevi aggiornamenti importanti</Text>
          </View>
          <Switch
            value={preferences.notifications}
            onValueChange={(value) => handleTogglePreference('notifications', value)}
            trackColor={{ false: '#d0d0d0', true: '#b0d0ff' }}
            thumbColor={preferences.notifications ? '#4c84ff' : '#f0f0f0'}
            disabled={saving}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Modalità Scura</Text>
            <Text style={styles.settingDescription}>Tema scuro per l'app</Text>
          </View>
          <Switch
            value={preferences.darkMode}
            onValueChange={(value) => handleTogglePreference('darkMode', value)}
            trackColor={{ false: '#d0d0d0', true: '#b0d0ff' }}
            thumbColor={preferences.darkMode ? '#4c84ff' : '#f0f0f0'}
            disabled={saving}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Risparmio Dati</Text>
            <Text style={styles.settingDescription}>Riduci l'utilizzo dei dati</Text>
          </View>
          <Switch
            value={preferences.dataUsage}
            onValueChange={(value) => handleTogglePreference('dataUsage', value)}
            trackColor={{ false: '#d0d0d0', true: '#b0d0ff' }}
            thumbColor={preferences.dataUsage ? '#4c84ff' : '#f0f0f0'}
            disabled={saving}
          />
        </View>
        
        {saving && (
          <View style={styles.savingIndicator}>
            <ActivityIndicator size="small" color="#4c84ff" />
            <Text style={styles.savingText}>Salvataggio...</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingTitle}>Email</Text>
          <Text style={styles.accountValue}>{user?.email}</Text>
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingTitle}>Nome</Text>
          <Text style={styles.accountValue}>{user?.displayName || 'Non impostato'}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Info App</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>Versione</Text>
          <Text style={styles.versionText}>1.0.0</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>Termini di Servizio</Text>
          <Text style={styles.linkText}>Visualizza</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingTitle}>Privacy Policy</Text>
          <Text style={styles.linkText}>Visualizza</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Disconnetti</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 15,
    backgroundColor: '#4c84ff',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ececec',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ececec',
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  accountValue: {
    fontSize: 14,
    color: '#666',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
  linkText: {
    fontSize: 14,
    color: '#4c84ff',
  },
  savingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  savingText: {
    marginLeft: 10,
    color: '#666',
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#ff6347',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;