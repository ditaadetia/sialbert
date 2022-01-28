import React, {useState} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./../Screen/Login";
import Register from "./../Screen/Register";
import MenuUtama from "./../Screen/MenuUtama";
import Detail from "./../Screen/Detail";

import TabNavigator from '../components/FloatingTabBar';

import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
    return (
            <TabNavigator/>
    );
};

export default RootStack;