import React, {useContext} from 'react';
import { StyleSheet, Alert, Text, View, Image, FlatList, TextInput, TouchableOpacity, Dimensions, ImageBackground, Button } from "react-native";
import { useState, useEffect } from "react";

import { ScrollView } from "react-native-gesture-handler";
import { Asset } from 'expo-asset';
import { AntDesign } from '@expo/vector-icons'
import ActivityIndicatorExample  from "../components/ActivityIndicatorExample";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';

import Notif from "../assets/image/notif.png";
import Cart from "../assets/image/cart.png";
import Search from "../assets/image/search_icon.png";
import illus from "../assets/image/illustrasi.png";
import FloatingTabBar from "../components/FloatingTabBar";
import More from "../assets/image/more.png";

const win = Dimensions.get("window");

export default function MenuUtama({navigation}) {
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

    Alert.alert("Logout", "Anda berhasil logout!", [
      {
        text:"OK",
        onPress: () => {clearLogin},
      },
    ]);
  }

  useEffect(async() => {
    setIsLoading(true);
    fetch('http://c526-2001-448a-6060-f025-94ac-422e-54f9-5ed6.ngrok.io/api/equipments')
      .then((response) => response.json())
      .then((hasil) => {
        setData(hasil);
        setCari(hasil);
        setIsLoading(false);
      })
      // .finally(() => setLoading(false));
      .catch(error => { console.log; });
      let isMounted = true

  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   getEquipments();
  // }, []);

  const cariData = (text) => {
    const newData = cari.filter((item) => {
      const itemData = item.nama.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
    setText(text);
  };

  const handleLoadMore = () => {
    console.warn('hanlemore')
  }

  const listEquipments = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', {alat: item}
          )}
        >
          <View style={styles.sectionNavContainer}>
            <View style={styles.myequipemntItem}>
              <Image source={{uri: item.foto}} style={styles.myequipmentImage} />
              <Text>{item.nama}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <View style={styles.headerContainer}>
          <Image source={Notif} />
          <Text style={styles.textHeader}>SI-ALBERT</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={Cart} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.textInput}>
            <Image style={styles.btnSearch} source={Search} />
            <TextInput
              onChangeText={(text) => cariData(text)}
              value={text}
              placeholder="Cari nama alat..."
            />
          </View>
          <View style={{ alignItems:'center', textAlignVertical: 'center', marginTop: 0, justifyContent: 'center'}}>
            {isLoading ?
              <View style={{
                justifyContent: 'center',
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop:0,
                textAlign: 'center',
                flex: 1,
                alignItems: 'center'
              }}>
                <ActivityIndicatorExample style={ styles.progress }/>
              </View> : (
              <>
                <View style={{ alignItems:'center', textAlignVertical: 'center', marginTop: 0, justifyContent: 'center', flexDirection: "row", }}>
                  <FlatList
                    style={{ margin:8 }}
                    data={data}
                    vertical
                    // key={4}
                    numColumns={4}
                    fadingEdgeLength={10}
                    keyExtractor={item=>item.id}
                    renderItem={listEquipments}
                    showsHorizontalScrollIndicator
                    // onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                  />
                </View>
                <View style={{ alignItems:'center', textAlignVertical: 'center', marginTop: '-4%', justifyContent: 'center', flexDirection: "row", }}>
                  <TouchableOpacity style={{ alignItems:'center', textAlignVertical: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('Alat')}>
                    <Image source={More} style={styles.myequipmentImage}/>
                    <Text>Lihat alat lainnya</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
          <View style={styles.perda}>
            <Image style={styles.illus} source={illus} />
            <Text style={styles.perdaText}>Sesuai Perda No 15 Tahun 2015 UPTD Alat Berat PUPR Kota Pontianak menyewakan alat berat sesuai tarif yang berlaku</Text>
          </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: "#25185A",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop:-36,
    height: '100%'
  },
  perda: {
    // flex: 1,
    position: "absolute",
    bottom: 80,
    width: '100%',
  },
  illus: {
    width: "100%"
  },
  perdaText: {
    position:"absolute",
    marginTop: 105,
    margin: 8
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 24,
    height:108,
    paddingHorizontal: 29,
    backgroundColor: "#FAD603",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  greeting: {
    flexDirection: "row",
    marginTop: 24,
    marginStart: 24
  },
  greetingName: {
    fontSize: 20,
    marginTop: -4,
    fontWeight: "bold",
  },
  sectionHeading: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
  },
  moreNav: {
    color: "#8D8D8D",
    fontSize: 14,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontFamily: "DMSans_400Regular",
  },
  sectionNavContainer: {
    justifyContent:'space-between',
    marginBottom: 24,
    marginTop: 4,
    marginLeft:8,
    marginRight:8,
    width:75,
    justifyContent: 'center',
    borderRadius: 75,
    alignItems:'center',
  },
  myequipmentItem: {
    alignItems:'center',
    elevation: 16,
    width: 75,
    borderRadius: 75,
    borderWidth: 1,
    height: 75,
  },

  myequipmentImage: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 75,
  },
  // myequipmentImage: {
  //   flex:1,
  //   width: '80%',
  //   height: '80%',
  //   borderWidth: 2,
  //   borderRadius: 20,
  //   resizeMode: 'contain',
  //   justifyContent: 'center',
  //   alignItems:'center'
  // },
  myequipmentName: {
    marginTop: 4,
    color: "#8D8D8D",
    fontSize: 14,
  },
  mybookTitle: {
    width:65,
    color: "#212121",
  },
  textInput: {
    elevation: 12,
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: '#e9e9e9',
    padding: 10,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  btnSearch: {
    width: 18,
    height: 18,
    marginEnd: 8,
    marginVertical: 8,
  }, 
  progress: {
    textAlign: 'center',
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginTop: 0,
    justifyContent: 'center',
    flexDirection: "row",
  },
  lainnya: {
    justifyContent: 'center',
    textAlign: 'center',
  }
});
