import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DetalhesReceita = ({ route }) => {
  const [receita, setReceita] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarDetalhesReceita = async () => {
      try {
 
        if (route.params?.receitaId) {
          const resposta = await axios.get(`https://6558d622e93ca47020a9cc9b.mockapi.io/api/receitas/${route.params.receitaId}`);
          setReceita(resposta.data);
        } else if (route.params?.sugestao) {

          setReceita(route.params.sugestao);
        } else {

          setReceita({});
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes da receita:', error);
      }
    };

    carregarDetalhesReceita();
  }, [route.params?.receitaId, route.params?.sugestao]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Receita</Text>
      {receita && receita.nome ? (
        <>
          <Text style={styles.nomeReceita}>{receita.nome}</Text>
          {receita.link_imagem && <Image source={{ uri: receita.link_imagem }} style={styles.imagemReceita} />}
          {receita.ingredientes && <Text style={styles.ingredientes}>{receita.ingredientes}</Text>}
          {receita.modoPreparo && <Text style={styles.modoPreparo}>{receita.modoPreparo}</Text>}
          {receita.createdAt && <Text style={styles.createdAt}>Criado em: {formatarData(receita.createdAt)}</Text>}
          <View style={styles.buttonWrapper}>
          <Button title="Voltar" onPress={() => navigation.navigate('Receitas')} />
          </View>

          <View style={styles.buttonWrapper}>
          <Button
            title="Realizar alteração"
            onPress={() => navigation.navigate('AlterarReceitaPage', { receita })}
          />
          </View>

        </>
      ) : (
        <Text style={styles.xEmoji}>❌</Text>
      )}
    </View>
  );
};

const formatarData = (dataString) => {
  const data = new Date(dataString);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return data.toLocaleDateString('pt-BR', options);
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
  ingredientes: {
    marginBottom: 8,
  },
  modoPreparo: {
    marginBottom: 8,
  },
  createdAt: {
    color: '#555',
    marginBottom: 16,
  },
  xEmoji: {
    fontSize: 50,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginBottom: 10,
  },
});

export default DetalhesReceita;
