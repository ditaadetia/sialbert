import React, {useState} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Screen/Login";
import Register from "./Screen/Register";
import EditProfil from "./Screen/EditProfil";
import MenuUtama from "./Screen/MenuUtama";
import Detail from "./Screen/Detail";

import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';

const Stack = createNativeStackNavigator();

// function MenuUtama() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Detail" component={Detail} />
//     </Tab.Navigator>
//   );
// }

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('sialbertCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error))
  }

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <CredentialsContext.Consumer>
            {({storedCredentials}) => (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                {storedCredentials ? (
                <>
                  {/* <Stack.Screen
                  name="EditProfil"
                  component={EditProfil}
                  options={{ headerShown: false }}
                  /> */}
                  <Stack.Screen
                  name="MenuUtama"
                  component={MenuUtama}
                  options={{ headerShown: false }}
                  />
                  <Stack.Screen
                  name="Detail"
                  component={Detail}
                  options={{ headerShown: false }}
                  />
                </>
                ) : (
                <>
                    <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                    />
                </>
                )}
                </Stack.Navigator>
            </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    </CredentialsContext.Provider>
  );
}
