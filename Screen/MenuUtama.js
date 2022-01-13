import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Dimensions, ImageBackground, } from "react-native";
import { useState, useEffect } from "react";

import Notif from "../assets/image/notif.png";
import Cart from "../assets/image/cart.png";
import Search from "../assets/image/search_icon.png";
import illus from "../assets/image/illustrasi.png";
import FloatingTabBar from "../components/FloatingTabBar";
import { ScrollView } from "react-native-gesture-handler";
import { Asset } from 'expo-asset';
import { AntDesign } from '@expo/vector-icons'
import ActivityIndicatorExample  from "../components/ActivityIndicatorExample";
const win = Dimensions.get("window");


export default function MenuUtama({navigation, route}) {
  const {nama, email} = route.params;
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [cari, setCari] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async() => {
    setIsLoading(true);
    fetch('http://c9d1-2001-448a-6060-6dc0-9d8f-d267-4f6e-a658.ngrok.io/api/equipments')
      .then((response) => response.json())
      .then((hasil) => {
        setData(hasil);
        setCari(hasil);
        setIsLoading(false);
      })
      // .finally(() => setLoading(false));
      .catch(error => { console.log; });

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

  const listEquipments = ({item}) => {
    return (
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
    );
  }

  return (
    <View style={{ backgroundColor: '#FFFFFF' }}>
      <View style={styles.headerContainer}>
        <Image source={Notif} />
        <Text style={styles.textHeader}>SI-ALBERT</Text>
        <Image source={Cart} />
      </View>
      <View style={styles.container}>
        <View style={styles.greeting}>
        <Text>Halo, </Text>
          <Text style={styles.greetingName}>{nama}</Text>
        </View>
        <View style={styles.textInput}>
          <Image style={styles.btnSearch} source={Search} />
          <TextInput
            onChangeText={(text) => cariData(text)}
            value={text}
            placeholder="Cari nama alat..."
          />
        </View>
        <View style={{ alignItems:'center', textAlignVertical: 'center', marginTop: 0, justifyContent: 'center', flexDirection: "row", }}>
          {isLoading ? <ActivityIndicatorExample style={"styles.progress"}/> : (
            <FlatList
              style={{ margin:4 }}
              data={data}
              vertical
              key={4}
              numColumns={4}
              fadingEdgeLength={10}
              keyExtractor={item=>item.id}
              renderItem={listEquipments}
            />
          )}
          </View>
        </View>
        <View style={styles.perda}>
          <Image style={styles.illus} source={illus} />
          <Text style={styles.perdaText}>Sesuai Perda No 15 Tahun 2015 UPTD Alat Berat PUPR Kota Pontianak menyewakan alat berat sesuai tarif yang berlaku</Text>
        </View>
      <FloatingTabBar />
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
  }
});
