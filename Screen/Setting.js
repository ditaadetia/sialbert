import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Dimensions, ImageBackground, Button } from "react-native";
import { useState, useEffect } from "react";

import FloatingTabBar from "../components/FloatingTabBar";
import { ScrollView } from "react-native-gesture-handler";
import { Asset } from 'expo-asset';
import { AntDesign } from '@expo/vector-icons'
import ActivityIndicatorExample  from "../components/ActivityIndicatorExample";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';

import Profil from "../assets/image/user.png";
import Logout from "../assets/image/logout.png";
const win = Dimensions.get("window");

export default function Refund({navigation}) {
  // const {nama, email} = route.params;
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [cari, setCari] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {nama, email} = storedCredentials;
  const clearLogin = () => {
    AsyncStorage
    .removeItem('sialbertCredentials')
    .then(() => {
      setStoredCredentials("");
    })
    .catch(error => console.log(error))
  }


  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit Profil')}>
          <View>
            <View>
              <Image source={Profil} style={styles.picture_item}></Image>
              <View style={styles.container}>
                <Text style={styles.text_item}>Edit Profil</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={clearLogin}>
          <View>
            <View>
              <Image source={Logout} style={styles.picture_item}></Image>
              <View style={styles.container}>
                <Text style={styles.text_item}>Keluar Akun</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
            {/* <View style={styles.greeting}>
                <Text>Setting </Text>
                <Text>Halo, </Text>
              <Text style={styles.greetingName}>{email}</Text>
            </View>
            <TouchableOpacity onPress={clearLogin}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Logout</Text>
              </View>
            </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop:'50%'
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    opacity:1,
    height:200,
    width: 200,
    backgroundColor:'#F1C40F',
    padding:16,
    marginBottom:16
  },
  picture_item: {
    opacity:1,
    height:120,
    width: 120
  },
  text_item: {
    fontSize:24,
    fontWeight: "bold"
  },
});
