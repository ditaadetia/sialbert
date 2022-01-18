import React, {useState} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./../Screen/Login";
import Register from "./../Screen/Register";
import MenuUtama from "./../Screen/MenuUtama";
import Detail from "./../Screen/Detail";

import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
    return (
    <>
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                {storedCredentials ? (
                <>
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
    </>
    )
}