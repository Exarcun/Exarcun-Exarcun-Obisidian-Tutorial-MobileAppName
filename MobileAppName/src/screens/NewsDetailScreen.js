import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import CustomButton from '../components/CustomButton';

const NewsDetailScreen = ({ route, navigation }) => {
  // Estraiamo i dati passati tramite la navigazione
  const { title, summary, content, date, image } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image 
          source={{ uri: image }} 
          style={styles.headerImage}
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          
          <Text style={styles.summary}>{summary}</Text>
          
          <Text style={styles.body}>
            {content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl."}
          </Text>
          
          <CustomButton 
            title="Torna alle News" 
            onPress={() => navigation.goBack()}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },
  summary: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
  },
});

export default NewsDetailScreen;