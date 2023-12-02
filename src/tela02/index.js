import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const VisualizarReceitasPage = () => {
  const [receitas, setReceitas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarReceitas = async () => {
      try {
        const resposta = await axios.get('https://6558d622e93ca47020a9cc9b.mockapi.io/api/receitas');
        setReceitas(resposta.data);
      } catch (error) {
        console.error('Erro ao carregar receitas:', error);
      }
    };

    carregarReceitas();
  }, []);

  const handleSugestoes = () => {
    navigation.navigate('Sugestões');
  };

  const handleVerMais = (receita) => {
    navigation.navigate('Item', { receitaId: receita.id });
  };

  const renderizarReceita = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nomeReceita}>{item.nome}</Text>
      <TouchableOpacity onPress={() => handleVerMais(item)} style={styles.verMaisButton}>
        <Text style={styles.verMaisButtonText}>Ver Mais</Text>
      </TouchableOpacity>
    </View>
  );

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return data.toLocaleDateString('pt-BR', options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Receitas!</Text>
      <FlatList
        data={receitas}
        renderItem={renderizarReceita}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Sugestões" onPress={handleSugestoes} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  ingredientes: {
    marginBottom: 8,
  },
  modoPreparo: {
    marginBottom: 8,
  },
  createdAt: {
    color: '#555',
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
  buttonWrapper: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default VisualizarReceitasPage;
