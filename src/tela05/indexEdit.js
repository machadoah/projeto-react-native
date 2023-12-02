// AlterarReceitaPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AlterarReceitaPage = ({ route }) => {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.receita) {
      const { nome, ingredientes, modoPreparo } = route.params.receita;
      setNome(nome);
      setIngredientes(ingredientes);
      setModoPreparo(modoPreparo);
    }
  }, [route.params?.receita]);

  const carregarReceitas = async () => {
      try {
        const resposta = await axios.get('https://6558d622e93ca47020a9cc9b.mockapi.io/api/receitas');
        setReceitas(resposta.data);
      } catch (error) {
        console.error('Erro ao carregar receitas:', error);
      }
    };

  const handleSalvarAlteracoes = async () => {
    try {
      setLoading(true);
      const resposta = await axios.put(`https://6558d622e93ca47020a9cc9b.mockapi.io/api/receitas/${route.params.receita.id}`, {
        nome,
        ingredientes,
        modoPreparo,
      });
    carregarReceitas();

      console.log('Receita atualizada:', resposta.data);

      // Navegar de volta para a página de detalhes
      navigation.navigate('DetalhesReceita', { receita: resposta.data });
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    } finally {
      setLoading(false);
    }

  };

  const handleDeletarReceita = async () => {
    try {
      const confirmacao = await new Promise((resolve) =>
        Alert.alert(
          'Confirmação',
          'Tem certeza que deseja deletar esta receita?',
          [
            { text: 'Cancelar', onPress: () => resolve(false), style: 'cancel' },
            { text: 'Confirmar', onPress: () => resolve(true) },
          ],
          { cancelable: false }
        )
      );

      if (confirmacao) {
        setLoading(true);
        await axios.delete(`https://6558d622e93ca47020a9cc9b.mockapi.io/api/receitas/${route.params.receita.id}`);
        carregarReceitas();
        navigation.navigate('Receitas'); // Navegar de volta para a lista de receitas após deletar
      }
    } catch (error) {
      console.error('Erro ao deletar receita:', error);
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Receita</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredientes"
        value={ingredientes}
        onChangeText={setIngredientes}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Modo de Preparo"
        value={modoPreparo}
        onChangeText={setModoPreparo}
        multiline
      />
      <View style={styles.buttonWrapper}>
      <Button title="Salvar Alterações" onPress={handleSalvarAlteracoes} disabled={loading} />
      </View>
      <View style={styles.buttonWrapper}>
      <Button title="Deletar Receita" onPress={handleDeletarReceita} color="red" disabled={loading} />
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
});

export default AlterarReceitaPage;