import React, {useContext} from 'react';
import { StyleSheet, Alert, Text, View, Image, FlatList, TextInput, SafeAreaView, ActivityIndicator, TouchableOpacity, Dimensions, ImageBackground, Button } from "react-native";
import { useState, useEffect } from "react";

import { ScrollView } from "react-native-gesture-handler";
import { Asset } from 'expo-asset';
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import Moment from 'moment';
import ActivityIndicatorExample  from "../components/ActivityIndicatorExample";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { StatusBar } from 'expo-status-bar';

import Rent from "../assets/image/rent-active.png";

const win = Dimensions.get("window");

export default function MenuUtama({navigation}) {
  // const {nama, email} = route.params;
  const [data, setData] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [page, setPage] = useState(1);
  const [text, setText] = useState('');
  const [cari, setCari] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {nama, email, id} = storedCredentials;
  const [refreshing, setRefreshing] = useState(true);


  useEffect(async() => {
    setIsLoading(true);
    fetch(`http://311c-2001-448a-6060-f025-e5cf-8ee-86e5-f879.ngrok.io/api/reschedules/${id}`)
      .then((response) => response.json())
      .then((hasil) => {
        setData([...hasil]);
        setCari([...hasil]);
        setIsLoading(false);
      })
      // .finally(() => setLoading(false));
      .catch(error => { console.log; });
      let isMounted = true
  }, []);

  const listOrders = ({item}) => {
    const alat = [...item.alat]
    // const sum = total.reduce(
    //   (tot, jumlah) => tot +jumlah,
    //   inisialValue
    // )
    var idLocale=require('moment/locale/id');
    Moment.locale('id');
    var dt = item.created_at
    return (
      <>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail Reschedule', {reschedule: item})}
          >
            <View style={{ flexDirection:'row', textAlign:'center', textAlignVertical: 'center'}}>
              <View style={{ flexDirection:'row', margin:16, textAlign:'center', textAlignVertical: 'center',justifyContent: 'center' }}>
                {/* <Image source={{uri: item.foto}} style={styles.myequipmentImage} /> */}
                <Card style={styles.card}>
                  <View style={{ margin:16, flexDirection:'row', justifyContent: "space-between"}}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={Rent} style={{ width:24, height:24, marginRight:8 }} />
                      <Text style={{ fontWeight:'bold'}}>{Moment(dt).format('DD MMMM YYYY')}</Text>
                    </View>
                    {(() => {
                    if(item.ket_persetujuan_kepala_uptd === 'setuju'){
                      return(
                        <View style={{ borderWidth:2, borderRadius:8, borderColor: '#11CF00', alignItems:'center', padding:2}}>
                          <Text style={{ textAlign:'right', color:'#11CF00', alignItems: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end'}}>Pengajuan telah disetujui</Text>
                        </View>
                      )
                    }
                    if(item.ket_persetujuan_kepala_uptd !== 'tolak' && item.ket_verif_admin !== 'tolak'){
                      if(item.ket_persetujuan_kepala_uptd === 'belum' && item.ket_verif_admin === 'verif'){
                        return(
                          <View style={{ borderWidth:2, borderRadius:8, borderColor: '#FAD603', alignItems:'center', padding:2}}>
                            <Text style={{ textAlign:'right', color:'#FAD603', alignItems: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end'}}>Menunggu persetujuan</Text>
                          </View>
                        )
                      }
                      else if(item.ket_persetujuan_kepala_uptd === 'belum' && item.ket_verif_admin === 'belum'){
                        return(
                          <View style={{ borderWidth:2, borderRadius:8, borderColor: '#FAD603', alignItems:'center', padding:2}}>
                            <Text style={{ textAlign:'right', color:'#FAD603', alignItems: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end'}}>Menunggu verifikasi</Text>
                          </View>
                        )
                      }
                    }
                    if(item.ket_verif_admin === 'tolak' || item.ket_persetujuan_kepala_uptd === 'tolak'){
                      return(
                        <View style={{ borderWidth:2, borderRadius:8, borderColor: '#FB1313', alignItems:'center', padding:2}}>
                          <Text style={{ textAlign:'right', color:'#FB1313', alignItems: 'flex-end', justifyContent: 'flex-end', alignContent: 'flex-end'}}>Pengajuan Ditolak</Text>
                        </View>
                      )
                    }
                    return null;
                    })()}
                  </View>
                  <View style={styles.border2}/>
                  <View style={{ margin:16 }}>
                    <View style={{ flexDirection:'row', justifyContent: "space-between" }}>
                      <View>
                        <Image source={{ uri:'http://311c-2001-448a-6060-f025-e5cf-8ee-86e5-f879.ngrok.io/storage/'+alat?.[0]?.foto }} style={{ width:58, height:58, marginRight:8 }} />
                        <Text style={{ fontWeight:'100', marginBottom:4, fontSize:12 }}>{alat?.[0]?.nama}</Text>
                      </View>
                      <View>
                        <Text style={{ opacity: 0.4, fontSize:12 }}>Tanggal Mulai</Text>
                        <Text style={{ fontWeight:'bold', marginBottom:8, fontSize:12 }}>{Moment(alat?.[0]?.waktu_mulai).format('dddd, DD MMMM YYYY')}</Text>
                        <Text style={{ opacity: 0.4, fontSize:12 }}>Tanggal Selesai</Text>
                        <Text style={{ fontWeight:'bold', marginBottom:4, fontSize:12 }}>{Moment(alat?.[0]?.waktu_selesai).format('dddd, DD MMMM YYYY')}</Text>
                      </View>
                      <View>
                        <Text style={{ opacity: 0.4, fontSize:12 }}>Jam Mulai</Text>
                        <Text style={{ fontWeight:'bold', marginBottom:8, fontSize:12 }}>{Moment(alat?.[0]?.waktu_mulai).format('H:mm')}</Text>
                        <Text style={{ opacity: 0.4, fontSize:12 }}>Jam Selesai</Text>
                        <Text style={{ fontWeight:'bold', marginBottom:4, fontSize:12 }}>{Moment(alat?.[0]?.waktu_selesai).format('H:mm')}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.border2}/>
                  <Text style={{ textAlign:'center', margin: 4, color: "#C4C4C4"}}>Lihat Detail</Text>
                  <View style={styles.border2}/>
                  {/* <View style={{ flexDirection:'row', margin:4 }}>
                    <TouchableOpacity>
                      <View style={styles.btn}>
                        <Text style={styles.buttonTitle}>Download Bukti Bayar</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.btn}>
                        <Text style={styles.buttonTitle}>Download Perjanjian Sewa</Text>
                      </View>
                    </TouchableOpacity>
                  </View> */}
                  {/* <Text>{item.alat}</Text> */}
                  {/* {alat.map((item)=>
                    <Card key={item.id} {...item} >
                    <Text>{item.alat}</Text>
                    </Card>
                  )} */}
                    {/* <View>
                      <FlatList
                        data={equipments}
                        horizontal
                        key={1}
                        numColumns={1}
                        nestedScrollEnabled
                        // fadingEdgeLength={10}
                        keyExtractor={item=>item.id}
                        // {item.id === item.order_id

                        // }
                        renderItem={listEquipments}
                        onEndReachedThreshold={0.5}
                        // getItemCount={getItemCount}
                        // getItem={getItem}
                      />
                    </View> */}
                </Card>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <View>
      <View style={{ height: 48, textAlignVertical: 'center', backgroundColor: '#ffcd04', borderTopLeftRadius:15, borderTopRightRadius:15}}>
        <Text style={{ marginLeft:16, marginTop:14, textAlignVertical: 'center', fontWeight:'bold', color: '#ffffff' }}>Riwayat Perubahan Jadwal</Text>
      </View>
      {refreshing ? <ActivityIndicator /> : null}
        <View style={styles.container}>
          <SafeAreaView style={{ marginBottom: 120, justifyContent: 'center', flexDirection: "row", flex:1}}>
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
              <View>
                <FlatList
                  style={{ margin:0 }}
                  data={data}
                  vertical
                  key={1}
                  numColumns={1}
                  nestedScrollEnabled
                  // fadingEdgeLength={10}
                  keyExtractor={item=>item.id}
                  renderItem={listOrders}
                  onEndReachedThreshold={0.5}
                  extraData={data}
                  // getItemCount={getItemCount}
                  // getItem={getItem}
                />
              </View>
            )}
          </SafeAreaView>
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
    flexDirection:'row'
  },
  myequipmentItem: {
    alignItems:'center',
    elevation: 16,
    borderRadius: 75,
    borderWidth: 1,
    margin:16,
    flexDirection:'row'
  },

  myequipmentImage: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 75,
    margin:8
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
    margin: 8
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
  lainnya: {
    marginLeft:-90,
    marginTop:196
  },
  border1: {
    backgroundColor: "#C4C4C4",
    height: "1%",
    opacity: 0.4,
    marginTop:8
  },
  border2: {
    backgroundColor: "#C4C4C4",
    height: "1%",
    opacity: 0.4,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    margin:4,
    backgroundColor: '#ffd700',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    textAlign: 'center',
    padding:8
  },
  buttonTitle: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 0,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 22,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  card: {
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.5,
    width: '100%',
    height: 220,
    borderColor:'#2196F3',
    borderWidth:2
  }
});
