import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Image, Button, ImageBackground, SafeAreaView, ScrollView, Dimensions, Picker, TouchableOpacity } from 'react-native';
import Cart from "../assets/image/cart.png";
import Notif from "../assets/image/notif.png";
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
const win = Dimensions.get("window");
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// import DateRangePicker from "react-native-daterange-picker";
// import * as Calendar from 'expo-calendar';
// import EventCalendar from 'react-native-events-calendar';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Calendar } from 'react-native-calendario';
import DateRangePicker from "rnv-date-range-picker";
let {width} = Dimensions.get('window');
// import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function Detail({ navigation, route }) {
    const {alat} = route.params
    const [selectedRange, setRange] = useState({});
    const [date1, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [mode2, setMode2] = useState('date');
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [currentDate, setCurrentDate] = useState();


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onChange2 = (event, selectedDate2) => {
        const currentDate2 = selectedDate2 || date;
        setShow(Platform.OS === 'ios');
        setDate2(currentDate2);
    };

    const onChange3 = (event, selectedDate2) => {
        const currentDate2 = selectedDate2 || date;
        setShow(Platform.OS === 'ios');
        setDate2(currentDate2);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showMode2 = (currentMode2) => {
        setShow2(true);
        setMode2(currentMode2);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const showDatepicker2 = () => {
        showMode2('date');
    };

    const showTimepicker2 = () => {
        showMode2('time');
    };

    // const [events, setEvents] = useState([
    //     {
    //       start: '2020-01-01 00:00:00',
    //       end: '2020-01-03 02:00:00',
    //       title: 'New Year Party',
    //       summary: 'xyz Location',
    //     },
    //     {
    //       start: '2020-01-01 01:00:00',
    //       end: '2020-01-01 02:00:00',
    //       title: 'New Year Wishes',
    //       summary: 'Call to every one',
    //     },
    //     {
    //       start: '2020-01-02 00:30:00',
    //       end: '2020-01-02 01:30:00',
    //       title: 'Parag Birthday Party',
    //       summary: 'Call him',
    //     },
    //     {
    //       start: '2020-01-03 01:30:00',
    //       end: '2020-01-03 02:20:00',
    //       title: 'My Birthday Party',
    //       summary: 'Lets Enjoy',
    //     },
    //     {
    //       start: '2020-02-04 04:10:00',
    //       end: '2020-02-04 04:40:00',
    //       title: 'Engg Expo 2020',
    //       summary: 'Expoo Vanue not confirm',
    //     },
    //   ]);

      const eventClicked = (event) => {
        //On Click of event showing alert from here
        alert(JSON.stringify(event));
      };
      setDates = (dates) => {
        this.setState({
          ...dates,
        });
      };

    return (
        <ScrollView>
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
                <View style={{ borderBotomColor:'yellow', borderBottomWidth: 2 }} opacity={0.5}/>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                        <View>
                            <Text style={{ fontWeight:"bold", textAlign:"center", marginBottom:4 }}>Tanggal Mulai</Text>
                            <View style={styles.pickedDateContainer}>
                                <Text style={styles.pickedDate}>{date1.toLocaleString()}</Text>
                            </View>
                            <TouchableOpacity onPress={showDatepicker}>
                                <View style={styles.pickButton}>
                                    <Text style={styles.buttonTitle}>Atur Tanggal Ambil!</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showTimepicker}>
                                <View style={styles.pickButton}>
                                    <Text style={styles.buttonTitle}>Atur Jam Ambil!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{ fontWeight:"bold", alignItems:'center', textAlign:"center", marginBottom:4 }}>Tanggal Selesai</Text>
                            <View style={styles.pickedDateContainer}>
                                <Text style={styles.pickedDate}>{date2.toLocaleString()}</Text>
                            </View>
                            <TouchableOpacity onPress={showDatepicker}>
                                <View style={styles.pickButton}>
                                    <Text style={styles.buttonTitle}>Atur Tanggal Kembali!</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showTimepicker}>
                                <View style={styles.pickButton}>
                                    <Text style={styles.buttonTitle}>Atur Jam Kembali!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date1}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        minimumDate={new Date()}
                        locale='id'
                        display="spinner"
                        />
                    )}
                    {show2 && (
                        <DateTimePicker
                        testID="dateTimePicker2"
                        value={date2}
                        mode={showMode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange2}
                        minimumDate={new Date()}
                        locale='id'
                        />
                    )}
                </View>
            </View>
            <SafeAreaView>
                {/* <View style={styles.container}>
                    <EventCalendar
                    eventTapped={eventClicked}
                    // Function on event press
                    events={events}
                    // Passing the Array of event
                    width={width}
                    // Container width
                    size={30}
                    // number of date will render before and after initDate
                    // (default is 30 will render 30 day before initDate
                    // and 29 day after initDate)
                    initDate={'2020-01-01'}
                    // Show initial date (default is today)
                    scrollToFirst
                    // Scroll to first event of the day (default true)
                    />
                </View> */}
                {/* <Calendar
                    markingType={'period'}
                    current={'2012-03-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2012-05-30'}
                    startDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    endDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={day => {
                        console.log('selected day', day);
                    }}
                    // markedDates={{
                    //     '2012-05-20': {textColor: 'green'},
                    //     '2012-05-22': {startingDay: true, color: 'green'},
                    //     '2012-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                    //     '2012-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                    // }}
                /> */}
                <View>
                    <DateRangePicker
                    onSelectDateRange={(range) => {
                        setRange(range);
                    }}
                    responseFormat="YYYY-MM-DD"
                    maxDate={moment()}
                    minDate={moment().subtract(100, "days")}
                    />
                    <View style={styles.container}>
                    <Text>first date: {selectedRange.firstDate}</Text>
                    <Text>second date: {selectedRange.secondDate}</Text>
                    </View>
                </View>
                {/* <Calendar
                    onChange={(range) => console.log(range)}
                    startDate={new Date(2022, 3, 1)}
                    endDate={new Date(2022, 3, 5)}
                    theme={{
                        activeDayColor: {},
                        monthTitleTextStyle: {
                        color: '#6d95da',
                        fontWeight: '300',
                        fontSize: 16,
                        },
                        emptyMonthContainerStyle: {},
                        emptyMonthTextStyle: {
                        fontWeight: '200',
                        },
                        weekColumnsContainerStyle: {},
                        weekColumnStyle: {
                        paddingVertical: 10,
                        },
                        weekColumnTextStyle: {
                        color: '#b6c1cd',
                        fontSize: 13,
                        },
                        nonTouchableDayContainerStyle: {},
                        nonTouchableDayTextStyle: {},
                        startDateContainerStyle: {},
                        endDateContainerStyle: {},
                        dayContainerStyle: {},
                        dayTextStyle: {
                        color: '#2d4150',
                        fontWeight: '200',
                        fontSize: 15,
                        },
                        dayOutOfRangeContainerStyle: {},
                        dayOutOfRangeTextStyle: {},
                        todayContainerStyle: {},
                        todayTextStyle: {
                        color: '#6d95da',
                        },
                        activeDayContainerStyle: {
                        backgroundColor: '#6d95da',
                        },
                        activeDayTextStyle: {
                        color: 'white',
                        },
                        nonTouchableLastMonthDayTextStyle: {},
                    }}
                /> */}
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    equipmentImage: {
        width: '100%',
        height: '100%',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: 'white',
        padding: 16,
        marginTop: 16
    },
    textHeader: {
        fontSize: 20,
        fontWeight: "bold",
    },
    pickedDateContainer: {
        padding: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    pickedDate: {
        color: 'yellow',
        fontSize: 14,
        textAlign: 'center',
    },
    btnContainer: {
        padding: 30,
    },
    pickButton: {
        alignItems: 'center',
        backgroundColor: '#ffd700',
        borderRadius: 8,
        height: 36,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 8,
        padding: 8
    },
    buttonTitle: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 0,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    },
})