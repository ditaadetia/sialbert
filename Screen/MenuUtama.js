import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, Dimensions, } from "react-native";
import { useState, useEffect } from "react";

import Notif from "../assets/image/notif.png";
import Cart from "../assets/image/cart.png";
import Search from "../assets/image/search_icon.png";
import illus from "../assets/image/illustrasi.png";
import FloatingTabBar from "../components/FloatingTabBar";
import { ScrollView } from "react-native-gesture-handler";
import { Asset } from 'expo-asset';
import { AntDesign } from '@expo/vector-icons'
const win = Dimensions.get("window");


export default function MenuUtama({navigation}) {
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
        <View style={styles.section2Container}>
          <View style={styles.sectionNavContainer}>
            <View style={styles.mybookItem}>
              <Image source={{uri: item.foto}} style={styles.mybookImage} />
              <Text style={styles.mybookAuthor}>{item.nama}</Text>
              <Text style={styles.mybookTitle}>{item.harga_sewa_perhari}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Image source={Notif} />
        <Text style={styles.textHeader}>SI-ALBERT</Text>
        <Image source={Cart} />
      </View>
      <View style={styles.container}>
        <View style={styles.greeting}>
        <Text>Selamat Pagi, </Text>
          <Text style={styles.greetingName}>User</Text>
        </View>
        <View style={styles.textInput}>
          <Image style={styles.btnSearch} source={Search} />
          <TextInput
            onChangeText={(text) => cariData(text)}
            value={text}
            placeholder="Cari nama alat..."
          />
        </View>
        <View style={{ alignItems:'center', justifyContent: 'center' }}>
          {isLoading ? <AntDesign name="loading1" size={36} color='#25185A' /> : (
            <FlatList
              data={data}
              horizontal
              fadingEdgeLength={80}
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
  section2Container: {
    marginTop: 16,
    marginBottom: 8,
  },

  sectionNavContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  mybookItemContainer: {
    borderRadius: 30,
    elevation: 16,
    marginRight: 16,
    marginBottom: 36,
    marginTop: 16,
    overflow: "hidden",
  },
  mybookItem: {
    backgroundColor: "#FAD603",
    borderRadius: 30,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  mybookImage: {
    width: 137,
    height: 155,
    borderRadius: 30,
  },
  mybookAuthor: {
    marginTop: 12,
    color: "#8D8D8D",
    fontSize: 14,
  },
  mybookTitle: {
    color: "#212121",
    fontSize: 14,
  },
  textInput: {
    elevation: 12,
    flexDirection: "row",
    margin: 16,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 36,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: '#364878'
  },
  btnSearch: {
    width: 18,
    height: 18,
    marginEnd: 8,
    marginVertical: 8,
  }
});
