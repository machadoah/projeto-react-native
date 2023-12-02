import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/components/NavBar/index';
import SobrePage from './src/SobrePage/index';
import DetalhesSugestao from './src/tela03/indexDetalhes'
import AlterarReceitaPage from './src/tela05/indexEdit'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="SobrePage" component={SobrePage} options={{ headerShown: false }} />
        <Stack.Screen name="DetalhesSugestao" component={DetalhesSugestao} options={{ headerShown: false }} />
        <Stack.Screen name="AlterarReceitaPage" component={AlterarReceitaPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
