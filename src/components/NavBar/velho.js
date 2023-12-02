import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Page1 from '../../HomePage/index';
import Page2 from '../../tela02/index';
import Page3 from '../../tela03/index';
import Page4 from '../../tela04/index';
import Page5 from '../../tela05/index';



const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
    tabBarStyle: { position: 'absolute' },
  }} >
      <Tab.Screen  name="Home" component={Page1}  />
      <Tab.Screen name="Minhas receitas " component={Page2} />
      <Tab.Screen name="Sugestões" component={Page3} />
      <Tab.Screen name="Form" component={Page4} /> 
      <Tab.Screen name="Cadastrar receitas" component={Page5} />
    </Tab.Navigator>
  );
}


