import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Dimensions, ImageBackground, Button } from "react-native";
import { useState, useEffect } from "react";

import FloatingTabBar from "../components/FloatingTabBar";
import { ScrollView } from "react-native-gesture-handler";
import { Asset } from 'expo-asset';
import { AntDesign } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import Moment from 'moment';
import ActivityIndicatorExample  from "../components/ActivityIndicatorExample";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
const win = Dimensions.get("window");
import logo from "../assets/icon.png";

export default function DetailOrder({ navigation, route }) {
  const {order} = route.params
  const [data, setData] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [page, setPage] = useState(1);
  const [text, setText] = useState('');
  const [cari, setCari] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const alat = [...order.alat]
  const total_hari = order.total_hari
  const total_jam = order.total_jam
  const harga_perhari = alat?.[0]?.harga_sewa_perhari * total_hari
  const harga_perjam = alat?.[0]?.harga_sewa_perjam * total_jam
  const sum = harga_perhari + harga_perjam
  const nama = alat?.[0]?.nama
  const total_harga = alat.reduce((total,item)=>{
    const harga_sewa_perhari = total_hari * item.harga_sewa_perhari
    const harga_sewa_perjam = total_jam * item.harga_sewa_perjam
    const total_biaya = harga_sewa_perhari+harga_sewa_perjam
    return total + total_biaya;
  },0)

  useEffect(async() => {
    setIsLoading(true);
    fetch('http://74d6-2001-448a-6060-f025-4436-aa10-3308-85b4.ngrok.io/api/orders')
      .then((response) => response.json())
      .then((hasil) => {
        setData(hasil);
        setCari(hasil);
        setIsLoading(false);
      })
      // .finally(() => setLoading(false));
      .catch(error => { console.log; });

  }, []);

  useEffect(async() => {
    setIsLoading(true);
    fetch('http://74d6-2001-448a-6060-f025-4436-aa10-3308-85b4.ngrok.io/api/detail-orders')
      .then((response) => response.json())
      .then((hasil) => {
        setEquipments(hasil);
        setCari(hasil);
        setIsLoading(false);
      })
      // .finally(() => setLoading(false));
      .catch(error => { console.log; });

  }, []);
  var idLocale=require('moment/locale/id');
  Moment.locale('id', idLocale);
  var dtMulai = order.tanggal_mulai
  var dtSelesai = order.tanggal_selesai

  return (
    <View style={{ padding:8 }}>
      <Card style={{ backgroundColor: '#C4C4C4' }}>
        <View style={{ flexDirection:'row', justifyContent: "space-between", height: 48, backgroundColor: '#25185A'}}>
          <Image style={styles.icon} source={logo} />
          <Text style={{ marginRight:16, textAlignVertical: 'center', fontWeight:'bold', color: '#ffffff' }}>Kode Pemesanan ALB-{order.id}</Text>
        </View>
        <View style={{ padding:16 }}>
          <Card style={styles.card}>
            <View style={{ height: 48, textAlignVertical: 'center', backgroundColor: '#25185A', borderTopLeftRadius:15, borderTopRightRadius:15, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{ marginLeft:16, marginTop:14, textAlignVertical: 'center', fontWeight:'bold', color: '#ffffff' }}>Jangka Waktu Penyewaan</Text>
              <Text style={{ marginRight:16, marginTop:14, textAlignVertical: 'center', fontWeight:'bold', color: '#ffffff' }}>{Moment(order.created_at).format('d MMMM YYYY')}</Text>
            </View>
            <View style={{ flexDirection:'row', justifyContent: "space-between", padding:8}}>
              <Text>Tanggal Mulai:</Text>
              <Text>{Moment(dtMulai).format('dddd, d MMMM YYYY')}</Text>
            </View>
            <View style={{ flexDirection:'row', justifyContent: "space-between", padding:8}}>
              <Text>Tanggal Selesai:</Text>
              <Text>{Moment(dtSelesai).format('dddd, d MMMM YYYY')}</Text>
            </View>
            {order.total_hari > 0 ?
              <View style={{ flexDirection:'row', justifyContent: "space-between", padding:8}}>
                <Text>Total Hari:</Text>
                <Text>{order.total_hari} Hari</Text>
              </View>:
              <View style={{ flexDirection:'row', justifyContent: "space-between", padding:8}}>
                <Text>Total Jam:</Text>
                <Text>{order.total_jam} Jam</Text>
              </View>
            }
          </Card>
          <Card style={styles.card}>
            <View style={{ height: 48, textAlignVertical: 'center', backgroundColor: '#25185A', borderTopLeftRadius:15, borderTopRightRadius:15}}>
              <Text style={{ marginLeft:16, marginTop:14, textAlignVertical: 'center', fontWeight:'bold', color: '#ffffff' }}>Jangka Waktu Penyewaan</Text>
            </View>
            {alat.map((item)=>
              <Card key={item.id} {...item} >
                <View style={{ flexDirection:'row', justifyContent: "space-between", padding:8}}>
                  <View style={{ flexDirection:'row' }}>
                    <Image source={{ uri:'http://74d6-2001-448a-6060-f025-4436-aa10-3308-85b4.ngrok.io/storage/'+item.foto }} style={{ width:58, height:58, marginRight:8 }} />
                    <View style={{ justifyContent:'center', textAlignVertical:'center' }}>
                      <Text>{item.nama}</Text>
                      <Text>x1</Text>
                    </View>
                  </View>
                </View>
                {order.total_hari > 0 ?
                  <View style={{ flexDirection:'row', margin: 16, justifyContent:'space-between' }}>
                    <View style={{ flexDirection:'row' }}>
                      <Text style={{ justifyContent:'center', textAlignVertical:'center' }}>Rp.{item.harga_sewa_perhari.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')},-</Text>
                      <Text style={{ justifyContent:'center', textAlignVertical:'center', fontWeight:'bold' }}> X</Text>
                      <Text style={{ justifyContent:'center', textAlignVertical:'center' }}> {total_hari} Hari</Text>
                    </View>
                    <Text style={{ margin: 16 }}>Rp.{(item.harga_sewa_perhari * total_hari).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')},-</Text>
                  </View>:
                  <View style={{ flexDirection:'row', margin: 16, justifyContent:'space-between' }}>
                    <View style={{ flexDirection:'row' }}>
                      <Text style={{ justifyContent:'center', textAlignVertical:'center' }}>Rp.{item.harga_sewa_perjam.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')},-</Text>
                      <Text style={{ justifyContent:'center', textAlignVertical:'center', fontWeight:'bold' }}> X</Text>
                      <Text style={{ justifyContent:'center', textAlignVertical:'center' }}> {total_jam} Jam</Text>
                    </View>
                    <Text style={{ margin: 16 }}>Rp.{(item.harga_sewa_perjam * total_jam).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')},-</Text>
                  </View>
                }
                <View style={styles.border2}/>
              </Card>
            )}
            <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={{ fontWeight:'bold', fontSize:16, fontWeight:'bold', margin:16 }}> Total :</Text>
              <Text style={{ textAlign:'right', fontSize:16, fontWeight:'bold', margin:16 }}>Rp.{total_harga.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')},-</Text>
            </View>
          </Card>
        </View>
      </Card>
    </View>
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
    bottom: 170,
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
    margin: 8,
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
  border2: {
    backgroundColor: "#C4C4C4",
    height: "1%",
    opacity: 0.4,
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
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: '#364878'
  },
  btnSearch: {
    width: 18,
    height: 18,
    marginEnd: 8,
    marginVertical: 8,
  }, 
  progress: {
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop:0,
    textAlign: 'center',
    flex: 1,
    alignItems: 'center'
  },
  card: {
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.5,
    width: '100%',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    marginTop:16,
  },
  icon: {
    width: 32,
    height:32,
    marginLeft:16,
    marginTop:8,
  }
});
