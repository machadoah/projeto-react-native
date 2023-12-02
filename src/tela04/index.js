
import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const FormPage = () => {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');


  
    const carregarReceitas = async () => {
      try {
        const resposta = await axios.get('https://6558d622e93ca47020a9cc9b.mockapi.io/api/receitas');
        setReceitas(resposta.data);
      } catch (error) {
        console.error('Erro ao carregar receitas:', error);
      }
    };

    
  

  const handleEnviar = async () => {
    try {
      
      if (!nome || !ingredientes || !modoPreparo) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      const dados = {
        nome,
        ingredientes,
        modoPreparo,
      };

      await axios.post('https://6558d622e93ca47020a9cc9b.mockapi.io/api/receitas', dados);

      setNome('');
      setIngredientes('');
      setModoPreparo('');
      carregarReceitas();
      alert('Receita enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar receita:', error);
      alert('Erro ao enviar receita. Tente novamente.');
    }

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Receita</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Receita"
        value={nome}
        onChangeText={(texto) => setNome(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredientes"
        multiline
        numberOfLines={3}
        value={ingredientes}
        onChangeText={(texto) => setIngredientes(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Modo de Preparo"
        multiline
        numberOfLines={3}
        value={modoPreparo}
        onChangeText={(texto) => setModoPreparo(texto)}
      />
      <Button title="Enviar" onPress={handleEnviar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default FormPage;
