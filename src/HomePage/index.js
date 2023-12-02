import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomePage = () => {
  const navigation = useNavigation();

  const handleConsultarReceitas = () => {
    navigation.navigate('Receitas');
  };

  const handleInserirReceitas = () => {
    navigation.navigate('Inserir');
  };

  const handleSobre = () => {
    navigation.navigate('SobrePage');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sobreIcon} onPress={handleSobre}>
        <Icon name="question-circle" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Bem-vindo ao PalmirinhaBook 🥙</Text>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://mir-s3-cdn-cf.behance.net/projects/404/9936103.547f411491579.jpg' }}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Consultar Receita" onPress={handleConsultarReceitas} style={styles.button} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Inserir Receita" onPress={handleInserirReceitas} style={styles.button} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sobreIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
});

export default HomePage;
