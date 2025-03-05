import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { registerUser } from '../services/authService';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validazione
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Errore', 'Compila tutti i campi');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Errore', 'Le password non corrispondono');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Errore', 'La password deve contenere almeno 6 caratteri');
      return;
    }

    try {
      setLoading(true);
      await registerUser(email, password, name);
      // La registrazione è riuscita, la navigazione sarà gestita in App.js
    } catch (error) {
      let errorMessage = 'Si è verificato un errore durante la registrazione';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email già in uso';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email non valida';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password troppo debole';
      }
      
      Alert.alert('Errore', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Crea Account</Text>
              <Text style={styles.subHeader}>Registrati per iniziare</Text>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Inserisci il tuo nome"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Inserisci la tua email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Crea una password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Conferma Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Conferma la tua password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
              
              <CustomButton
                title={loading ? "Registrazione in corso..." : "Registrati"}
                onPress={handleRegister}
                disabled={loading}
              />
              
              {loading && <ActivityIndicator style={styles.loader} />}
            </View>
            
            <View style={styles.footer}>
              <Text>Hai già un account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Accedi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Stili identici a LoginScreen, cambia solo loginLink con registerLink
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardAvoidContainer: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  loader: {
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#4c84ff',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;