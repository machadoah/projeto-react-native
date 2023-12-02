// VisualizarReceitasPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const VisualizarReceitasPage = () => {
  const [receitas, setReceitas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarReceitas = async () => {
      try {
        const resposta = await axios.get('https://gold-anemone-wig.cyclic.app/receitas/todas');
        setReceitas(resposta.data);
      } catch (error) {
        console.error('Erro ao carregar receitas:', error);
      }
    };

    carregarReceitas();
  }, []);

  const handleVerMais = (receita) => {
    navigation.navigate('DetalhesSugestao', { receita });
  };

  const renderizarReceita = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nomeReceita}>{item.receita}</Text>
      <Image source={{ uri: item.link_imagem }} style={styles.imagemReceita} />
      <TouchableOpacity onPress={() => handleVerMais(item)} style={styles.verMaisButton}>
        <Text style={styles.verMaisButtonText}>Ver Mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sugestões da Vovó 🧑🏽‍🦳</Text>
      <FlatList
        data={receitas}
        renderItem={renderizarReceita}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaContainer}
        showsVerticalScrollIndicator={false}
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
  listaContainer: {
    paddingBottom: 60,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  nomeReceita: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  imagemReceita: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 4,
  },
  verMaisButton: {
    backgroundColor: '#2494f4',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  verMaisButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default VisualizarReceitasPage;
