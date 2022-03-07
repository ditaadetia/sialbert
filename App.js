import React, {useState} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, style } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Screen/Login";
import Register from "./Screen/Register";
import Register2 from "./Screen/Register2";
import Setting from "./Screen/Setting";
import EditProfil from "./Screen/EditProfil";
import MenuUtama from "./Screen/MenuUtama";
import Detail from "./Screen/Detail";
import Alat from "./Screen/Alat";
import Penyewaan from "./Screen/Penyewaan";
import DetailOrder from "./Screen/DetailOrder";
import DetailRefund from "./Screen/DetailRefund";
import DetailReschedule from "./Screen/DetailReschedule";
import Refund from "./Screen/Refund";
import Reschedule from "./Screen/Reschedule";

import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FloatingTabBar from './components/FloatingTabBar';
import Icon from 'react-native-vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';


const Stack = createNativeStackNavigator();

// function MenuUtama() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Detail" component={Detail} />
//     </Tab.Navigator>
//   );
// }
const Tab = createBottomTabNavigator();
function nav() {
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
    <>
    <StatusBar hidden/>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({focused, color, size}) => {
          let activeIcon, iconStyle;

          if (route.name === 'Home') {
            activeIcon = focused
            ? require("./assets/image/home-active.png")
            : require("./assets/image/home-inactive.png")
          } else if (route.name === 'Penyewaan') {
            activeIcon = focused
            ? require("./assets/image/rent-active.png")
            : require("./assets/image/rent-inactive.png")
          } else if (route.name === 'Refund') {
            activeIcon = focused
            ? require("./assets/image/refund-active.png")
            : require("./assets/image/refund-inactive.png")
          } else if (route.name === 'Reschedule') {
            activeIcon = focused
            ? require("./assets/image/reschedule-active.png")
            : require("./assets/image/reschedule-inactive.png")
          } else if (route.name === 'Setting') {
            activeIcon = focused
            ? require("./assets/image/setting-active.png")
            : require("./assets/image/setting-inactive.png")
          }
          return <Image style = {{ height: 32, width: 32 }}
            source={activeIcon}
            // style={iconStyle}
          />;
        },
        backgroundColor: 'tomato',
        tabBarActiveTintColor: '#FBCB33',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Home' component={MenuUtama} options={{ headerShown: false }}/>
      <Tab.Screen name='Penyewaan' component={Penyewaan} options={{ headerShown: false }}/>
      <Tab.Screen name='Refund' component={Refund} options={{ headerShown: false }}/>
      <Tab.Screen name='Reschedule' component={Reschedule} options={{ headerShown: false }}/>
      <Tab.Screen name='Setting' component={Setting} options={{ headerShown: false }}/>
      {/* <Tab.Screen
        name='Setting'
        component={Setting}
        options={{
          headerRight: () => (
            <Button
              onPress={ () => alert ('This is a button!') }
              title="info"
              color='#fff'
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
    </>
  );
}
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
    <>
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <CredentialsContext.Consumer>
            {({storedCredentials}) => (
            <>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName="nav">
                  {storedCredentials ? (
                  <>
                    {/* <Stack.Screen
                    name="EditProfil"
                    component={EditProfil}
                    options={{ headerShown: false }}
                    /> */}
                    <Stack.Screen
                    name="nav"
                    component={nav}
                    options={{ headerShown: false }}
                    />
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
                    <Stack.Screen
                    name="Alat"
                    component={Alat}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen
                    name="Edit Profil"
                    component={EditProfil}
                    options={{ headerShown: true }}
                    />
                    <Stack.Screen
                    name="Detail Order"
                    component={DetailOrder}
                    options={{ headerShown: true }}
                    />
                     <Stack.Screen
                    name="Detail Refund"
                    component={DetailRefund}
                    options={{ headerShown: true }}
                    />
                    <Stack.Screen
                    name="Detail Reschedule"
                    component={DetailReschedule}
                    options={{ headerShown: true }}
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
                      <Stack.Screen
                      name="Register2"
                      component={Register2}
                      options={{ headerShown: false }}
                      />
                  </>
                  )}
                  </Stack.Navigator>
              </NavigationContainer>
              <StatusBar hidden />
            </>
            )}
        </CredentialsContext.Consumer>
    </CredentialsContext.Provider>
    {/* <NavigationContainer>
        <FloatingTabBar/>
    </NavigationContainer> */}
    </>
  );
}
