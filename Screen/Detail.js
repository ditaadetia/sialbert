import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Button, ImageBackground, ScrollView, Dimensions} from 'react-native';
import Cart from "../assets/image/cart.png";
import Notif from "../assets/image/notif.png";
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
const win = Dimensions.get("window");
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function LoginPage({ navigation, route }) {
    const {alat} = route.params
    let data = [{
        value: 'Perjam',
    }, {
        value: 'Perhari',
    }];
    const [tglMulai, setTglMulai] = useState('');
    const [tglSelesai, setTglSelesai] = useState('');
    const [value, onChange] = useState('10:00');
    const today = new Date();
    return (
        <View style={{ backgroundColor:'#fff' }}>
            <View style={styles.headerContainer}>
                <AntDesign name="leftcircle" size={36} color='#25185A'/>
                <MaterialCommunityIcons name="cart" size={36} color='#25185A'/>
            </View>
            <View style={{ height:300, width: '100%' }}>
                <Image source={{uri: alat.foto}} style={styles.equipmentImage}/>
            </View>
            <View style= {{ flexDirection:'row', justifyContent: 'space-between' }}>
                <View style={{ padding:16 }}>
                    <Text style={styles.textHeader}>{alat.nama}</Text>
                    <Text>Barang tersedia 1 stok</Text>
                </View>
                <View style={{ padding:16}}>
                    <Text>Rp.{alat.harga_sewa_perjam.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')},-</Text>
                    <Text style={{ marginTop:4 }}>Rp.{alat.harga_sewa_perhari.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')},-</Text>
                </View>
            </View>
            <View style={{ borderBotomColor:'yellow', borderBottomWidth: 2 }} opacity={0.1}/>
            <View>
                <Text style={{ fontSize: 16,fontWeight: 'bold', marginLeft:16, marginTop:16 }}>Atur rentang waktu sewa</Text>
                <Dropdown style={{ backgroundColor:'#fff', margin: 8, }} label='Rentang Waktu' data={data}/>
                <View  style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Tanggal Mulai :</Text>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={tglMulai} // Initial date from state
                            mode="date" // The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate={today}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                //display: 'none',
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                                },
                                dateInput: {
                                marginLeft: 36,
                                borderRadius: 30,
                                },
                            }}
                            onDateChange={(date) => {
                                setTglMulai(date);
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Tanggal Selesai :</Text>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={tglSelesai} // Initial date from state
                            mode="date" // The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate={tglMulai}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                //display: 'none',
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                                },
                                dateInput: {
                                marginLeft: 36,
                                borderRadius: 30
                                },
                            }}
                            onDateChange={(date) => {
                                setTglSelesai(date);
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    equipmentImage: {
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: 'white',
        padding: 16
    },
    textHeader: {
        fontSize: 20,
        fontWeight: "bold",
    },
})