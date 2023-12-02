// - Utilização de componentes de UI como Text, Text Input, Button, Pressable, Touchble Opacity, Switch, Slider, Picker, Flat List, etc (1 ponto)
// - Desenvolver o app dividindo o máximo possível em pequenos componentes. Utilizando props e hooks (1,5 pontos)
// - Ter no mínimo 5 telas com navegação entre elas com Stack Navigator, Bottom Tab Navigator ou Top Tab Navigator (2 pontos)
// - Ter armazenamento interno com Async Storage (1 ponto)
// - Consumo de APIs GET próprias ou públicas (2 pontos)
// - Consumo de APIs POST, PUT e DELETE próprias ou públicas (1,5 pontos)
// - Apresentação, clareza e objetivo do trabalho (1 ponto)


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Page1 from '../../HomePage/index';
import Page2 from '../../tela02/index';
import Page3 from '../../tela03/index-copy';
import Page4 from '../../tela04/index';
import Page5 from '../../tela05/index';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#a6d8ff"
      labelStyle={{ fontSize: 1 }}
      barStyle={{ backgroundColor: '#000' }}
    >
      <Tab.Screen
        name="Home"
        component={Page1}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Receitas"
        component={Page2}
        options={{
          tabBarLabel: 'Receitas',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Sugestões"
        component={Page3}
        options={{
          tabBarLabel: 'Sugestões',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="note" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Inserir"
        component={Page4}
        options={{
          tabBarLabel: 'Inserir',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="send" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Item"
        component={Page5}
        options={{
          tabBarLabel: 'Item',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cup" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

