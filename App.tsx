import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import Home from './src/Pages/Home';
import Details from './src/Pages/Details'

type Movie = {
  id: string,
  title: string,
  rate: number
}

type RootStackParamList = {
  Home: undefined,
  Details: Movie,
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return(
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name = "Home"
          component={Home}
          options={{headerShown: false, title: "Movie List"}}
        />
        <RootStack.Screen
          name = 'Details'
          component={Details}
          options={{title: "", headerTransparent:true, headerTitleStyle: {color: '#fff'}, headerTintColor:'#fff'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
