// DetalhesReceitaPage.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const DetalhesReceitaPage = ({ route }) => {
  const { receita } = route.params;
  const navigation = useNavigation();

  const ingredientesArray = receita.ingredientes.split(',').map((item) => item.trim());

  // Se o modo de preparo já está numerado, mantemos a formatação existente
  const modoPreparoArray = receita.modo_preparo.split('\n').filter(Boolean);

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{receita.receita}</Text>
      <Image source={{ uri: receita.link_imagem }} style={styles.imagemReceita} />
      
      <Text style={styles.sectionTitle}>Ingredientes</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={ingredientesArray}
        renderItem={({ item }) => <Text style={styles.info}>{'\u2022 ' + item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      
      <Text style={styles.sectionTitle}>Modo de Preparo</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={modoPreparoArray}
        renderItem={({ item, index }) => (
          <Text style={styles.info}>{`${item}`}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  imagemReceita: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
});

export default DetalhesReceitaPage;
