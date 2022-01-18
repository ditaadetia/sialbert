import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Button, ImageBackground, ScrollView, Dimensions, Picker } from 'react-native';
import Cart from "../assets/image/cart.png";
import Notif from "../assets/image/notif.png";
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
const win = Dimensions.get("window");
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function Detail({ navigation, route }) {
    const {alat} = route.params
    let data = [{
        value: 'Perjam',
    }, {
        value: 'Perhari',
    }];
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'android');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

  const showTimepicker = () => {
    showMode('time');
  };
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
                    <Text>Barang tersedia {alat.total} stok</Text>
                </View>
                <View style={{ padding:16}}>
                    <Text>Rp.{alat.harga_sewa_perjam.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')},-</Text>
                    <Text style={{ marginTop:4 }}>Rp.{alat.harga_sewa_perhari.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')},-</Text>
                </View>
            </View>
            <View style={{ borderBotomColor:'yellow', borderBottomWidth: 2 }} opacity={0.1}/>
            <View>
                {/* <Text style={{ fontSize: 16,fontWeight: 'bold', marginLeft:16, marginTop:16 }}>Atur rentang waktu sewa</Text> */}
                {/* <Dropdown style={{ backgroundColor:'#fff', margin: 8, }} label='Rentang Waktu' data={data} value={values.drop}/> */}
                {/* <View  style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Tanggal Mulai :</Text>
                        <View>
                            <Button onPress={showDatepicker} title="Show date picker!" />
                        </View>
                        <View>
                            <Button onPress={showTimepicker} title="Show time picker!" />
                        </View>
                            {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                />
                            )}
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>Tanggal Selesai :</Text>
                            { {data} == 'Perhari' ?
                            <View>
                                <Button onPress={showDatepicker} title="Show date picker!" />
                            </View> :
                            <View>
                                <Button onPress={showTimepicker} title="Show time picker!" />
                            </View>
                            }
                            {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                />
                            )}
                        </View>
                </View> */}

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