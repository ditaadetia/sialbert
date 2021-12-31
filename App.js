import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Screen/Login";
import Register from "./Screen/Register";
import MenuUtama from "./Screen/MenuUtama";
import Detail from "./Screen/Detail";
import DetailTest from "./Screen/DetailTest";
const Stack = createNativeStackNavigator();

// function MenuUtama() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Detail" component={Detail} />
//     </Tab.Navigator>
//   );
// }

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="DetailTest"
            component={DetailTest}
            options={{ headerShown: false }}
          /> */}
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
            name="MenuUtama"
            component={MenuUtama}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
