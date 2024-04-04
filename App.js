import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './assets/screens/Home'; // !
import Login from './assets/screens/Login'; // !
import Register from './assets/screens/Register'; // !
import RegisterII from './assets/screens/RegisterII'; // !
import RegisterIII from './assets/screens/RegisterIII'; // !
import RegisterIV from './assets/screens/RegisterIV'; // !
import Menu from './assets/screens/Menu'; // !
import TestAll from './assets/screens/TestAll'; //!


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TestAll" // TestAll
        screenOptions={{
          cardStyle: { flex: 1 },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: {
              animation: 'spring',
              config: { duration: 350 },
            },
            close: {
              animation: 'spring',
              config: { duration: 350 },
            },
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}>
        <Stack.Screen name="TestAll" component={TestAll} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterII" component={RegisterII} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterIII" component={RegisterIII} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterIV" component={RegisterIV} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
