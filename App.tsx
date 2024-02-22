import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import Home from './src/Pages/Home';
import Details from './src/Pages/Details'

type RootStackParamList = {
  Home: { movie: Movie };
  Details: { movie: Movie };
};

interface Movie {
  id: number,
  backdrop_path: string,
  title: string,
  vote_average: number,
  release_date: string,
  poster_path: string,
  overview: string
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

export default App;
