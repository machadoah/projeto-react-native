import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MyTabs from '../components/NavBar/index';

const SobrePage = () => {
  const [dadosUsuarios, setDadosUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDadosUsuarios = async () => {
      try {

        const usuarios = ['machadoah', 'cabralPorto', 'VictorRochadosSantos'];


        const promessas = usuarios.map(async (usuario) => {
          const response = await axios.get(`https://api.github.com/users/${usuario}`);
          return response.data;
        });

        const resultados = await Promise.all(promessas);

        setDadosUsuarios(resultados);
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        setCarregando(false);
      }
    };

    fetchDadosUsuarios();
  }, []);

  const handlePerfilClick = (perfilUrl) => {
    Linking.openURL(perfilUrl);
  };

  return (
    <>
      <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

        <Text style={styles.title}>Membros do projeto</Text>
        {carregando ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <View>
            {dadosUsuarios.map((usuario) => (
              <View key={usuario.id} style={styles.usuarioContainer}>
                <Image style={styles.usuarioFoto} source={{ uri: usuario.avatar_url }} />
                <Text style={styles.usuarioNome}>{usuario.name}</Text>
                <TouchableOpacity onPress={() => handlePerfilClick(usuario.html_url)}>
                  <Text style={styles.botaoPerfil}>Ver Perfil</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <MyTabs/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     marginTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  usuarioContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  usuarioFoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  usuarioNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  botaoPerfil: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
});

export default SobrePage;