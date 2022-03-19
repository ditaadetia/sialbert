import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableHighlightComponent, TouchableOpacity, Dimensions, ImageBackground, Button } from "react-native";
import { useState, useEffect } from "react";

import FloatingTabBar from "../components/FloatingTabBar";
import { ScrollView } from "react-native-gesture-handler";
import { Asset } from 'expo-asset';
import { AntDesign } from '@expo/vector-icons'
import ActivityIndicatorExample  from "../components/ActivityIndicatorExample";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { Formik, useFormik, Form } from 'formik';
import Step1 from "./forms/FormFirstStep";
import Step2 from "./forms/FormSecondStep";
// import AnimatedMultistep from "react-native-animated-multistep";
import { Stepper } from 'react-form-stepper';
import borderdark from "../assets/image/borderdark.png";
import borderlight from "../assets/image/borderlight.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// import { FormSuccess } from "./forms/FormSuccess";
import * as yup from 'yup';
import { makeStyles } from "@material-ui/core/styles";

const win = Dimensions.get("window");

export default function FormulirOrder({navigation, route}) {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [cari, setCari] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {nama, email, no_hp, foto, kontak_darurat, alamat, id} = storedCredentials;

  const handleSubmit = (values) => {
    Alert.alert("Edit Profil", "Edit Profil Berhasil!", [
      {
        text:"OK",
        onPress: () => {},
      },
    ]);
    console.log(values);
  }

  const editProfilValidationSchema = yup.object().shape({
    nama_penyewa: yup
      .string()
      .required('Nama wajib diisi!'),
    email: yup
      .string()
      .email("Harap masukkan email yang valid!")
      .required('Alamat email wajib diisi!'),
    nama_instansi: yup
      .string()
      .required('Nama wajib diisi!'),
    nama_instansi: yup
      .string()
      .required('Nama wajib diisi!'),
    jabatan: yup
      .string()
      .required('Nama wajib diisi!'),
    no_hp: yup
      .number()
      .required('No. Handphone wajib diisi!'),
    kontak_darurat: yup
      .number()
      .required('Kontak Darurat wajib diisi!'),
    alamat: yup
      .string()
      .required('Alamat wajib diisi!'),
    nama_kegiatan: yup
      .string()
      .required('Nama Kegiatan wajib diisi!'),
    status_kegiatan: yup
      .string()
      .required('Status Kegiatan wajib diisi!'),
    metode_pembayaran: yup
      .string()
      .required('Metode Pembayaran Kegiatan wajib diisi!'),
  })

  const submit = () => {
    async (values) => alert(JSON.stringify(values, null, 2))
  }
  return (
    <View style={styles.root}>
      <View style={{ justifyContent:'center', alignItems:'center' }}>
        <Text style={{ fontWeight: 'bold', margin: 16 }}>Isi Formulir Pengajuan</Text>
      </View>
      <Formik
        validationSchema={editProfilValidationSchema}
        enableReinitialize={true}
        initialValues={{  nama_penyewa: nama, email: email, nama_instansi: '', jabatan:'', no_hp: no_hp, kontak_darurat: kontak_darurat, alamat: alamat, nama_kegiatan: '', status_kegiatan:'', metode_pembayaran:''}}
        onSubmit={values  => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, validateForm, touched, values, isSubmitting, errors }) => (
          <View style={styles.root}>
            <View>
            <View style={{ margin:16, flexDirection: 'row' }}>
              <View style={{justifyContent:'center', alignItems:'center' }}>
                <View style={{ borderColor:'#C4C4C4', backgroundColor:'#C4C4C4', borderWidth:1, height:24, width: 24, borderRadius:20 }}>
                  <Text style={{textAlign: 'center' }}>1</Text>
                </View>
                <Text style={{textAlign: 'center' }}>Step 1</Text>
              </View>
              <View style={{ backgroundColor: '#ffd700', height: 1, width: '33%', marginVertical:12}}/>
              <TouchableOpacity onPress={() => navigation.navigate('FormSecondStep', {value: values})}>
                <View style={{ justifyContent:'center', alignItems:'center' }}>
                  <View style={{ borderColor:'#ffd700', backgroundColor:'#ffd700', borderWidth:1, height:24, width: 24, borderRadius:20 }}>
                    <Text style={{textAlign: 'center' }}>2</Text>
                  </View>
                  <Text style={{textAlign: 'center' }}>Step 2</Text>
                </View>
              </TouchableOpacity>
              <View style={{ backgroundColor: '#ffd700', height: 1, width: '33%', marginVertical:12}}/>
              <TouchableOpacity onPress={() => navigation.navigate('FormSecondStep', {value: values})}>
                <View style={{ justifyContent:'center', alignItems:'center' }}>
                  <View style={{ borderColor:'#ffd700', backgroundColor:'#ffd700', borderWidth:1, height:24, width: 24, borderRadius:20 }}>
                    <Text style={{textAlign: 'center' }}>3</Text>
                  </View>
                  <Text style={{textAlign: 'center' }}>Step 3</Text>
                </View>
              </TouchableOpacity>
            </View>
              {/* <View style={{ justifyContent:'center', alignItems:'center' }}>
                <Text style={styles.currentStepText}>1 of 2
                </Text>
              </View>
              <View style={{ marginBottom: 8, flexDirection:'row' }}>
                <Image source={borderdark} style={{ marginBottom: 8, width: '50%' }} resizeMode="cover"/>
                <Image source={borderlight} style={{ marginBottom: 8, width: '50%' }} resizeMode="cover"/>
              </View>
              <Image source={from1} style={{ marginBottom: 8, width: '100%' }} resizeMode="cover"/> */}
              <View style={{ flexDirection:'row' }}>
                <View style={{ width: '50%' }}>
                  <View style={styles.form}>
                    <Text style={{ marginLeft:24, marginTop:4 }}>Nama Penyewa:</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      placeholder="Nama Penyewa"
                      style={styles.textInput}
                      onChangeText={handleChange('nama_penyewa')}
                      onBlur={handleBlur('nama_penyewa')}
                      defaultValue={nama}
                      editable={true}
                    />
                  </View>
                  {(errors.nama_penyewa && touched.nama_penyewa) &&
                    <Text style={{ fontSize: 10, color: 'red', marginLeft:24 }}>{errors.nama_penyewa}</Text>
                  }
                </View>
                <View style={{ width: '50%' }}>
                  <View style={styles.form}>
                    <Text style={{ marginLeft:24, marginTop:4 }}>Email :</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCompleteType="email"
                      autoCorrect={false}
                      keyboardType="email-address"
                      returnKeyType="next"
                      placeholder="Email"
                      style={styles.textInput}
                      onChangeText={handleChange('email')}
                      defaultValue={email}
                      editable={true}
                    />
                  </View>
                  {(errors.email && touched.email) &&
                    <Text style={{ fontSize: 10, color: 'red', marginLeft:24 }}>{errors.email}</Text>
                  }
                </View>
              </View>
              <View style={{ flexDirection:'row' }}>
                <View style={{ width: '50%' }}>
                  <View style={styles.form}>
                    <Text style={{ marginLeft:24, marginTop:4 }}>Nama Instansi :</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      placeholder="Nama Instansi"
                      style={styles.textInput}
                      onChangeText={handleChange('nama_instansi')}
                      editable={true}
                    />
                  </View>
                  {(errors.nama_instansi && touched.nama_instansi) &&
                    <Text style={{ fontSize: 10, color: 'red', marginLeft:24 }}>{errors.nama_instansi}</Text>
                  }
                </View>
                <View style={{ width: '50%' }}>
                  <View style={styles.form}>
                    <Text style={{ marginLeft:24, marginTop:4 }}>Jabatan :</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      placeholder="Jabatan"
                      style={styles.textInput}
                      onChangeText={handleChange('jabatan')}
                      editable={true}
                    />
                  </View>
                  {(errors.jabatan && touched.jabatan) &&
                    <Text style={{ fontSize: 10, color: 'red', marginLeft:24 }}>{errors.jabatan}</Text>
                  }
                </View>
              </View>
              <View style={styles.border}></View>
              {/* <Text type ={messageType} style={styles.message}>{message}</Text> */}
              <View style={{ flexDirection:'row' }}>
                <View style={{ width:'50%' }}>
                  <View style={styles.form}>
                    <Text style={{ marginLeft:24, marginTop:4 }}>No. Handphone:</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      keyboardType='numeric'
                      // dataDetectorTypes={'phoneNumber'}
                      placeholder="No. Handphone"
                      defaultValue={no_hp}
                      style={styles.textInput}
                      onChangeText={handleChange('no_hp')}
                    />
                  </View>
                  {(errors.no_hp && touched.no_hp) &&
                    <Text style={{ fontSize: 10, color: 'red', marginLeft:24 }}>{errors.no_hp}</Text>
                  }
                </View>
                <View style={{ width:'50%' }}>
                  <View style={styles.form}>
                    <Text style={{ marginLeft:24, marginTop:4 }}>Kontak Darurat:</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      keyboardType='numeric'
                      placeholder="Kontak Darurat"
                      style={styles.textInput}
                      defaultValue={kontak_darurat}
                      onChangeText={handleChange('kontak_darurat')}
                    />
                  </View>
                  {(errors.kontak_darurat && touched.kontak_darurat) &&
                    <Text style={{ fontSize: 10, color: 'red', marginLeft:24 }}>{errors.kontak_darurat}</Text>
                  }
                </View>
              </View>
              <View>
                <View style={styles.form}>
                  <Text style={{ marginLeft:24, marginTop:4 }}>Alamat :</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Alamat"
                    defaultValue={alamat}
                    style={styles.textInputAlamat}
                    onChangeText={handleChange('alamat')}
                  />
                </View>
                {(errors.alamat && touched.alamat) &&
                  <Text style={{ fontSize: 10, color: 'red', marginLeft:24 }}>{errors.alamat}</Text>
                }
              </View>
              <View style={styles.border}></View>
              <View>
                <View style={styles.form}>
                  <Text style={{ marginLeft:24, marginTop:4 }}>Nama Kegiatan :</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Nama Kegiatan"
                    style={styles.textInput}
                    onChangeText={handleChange('nama_kegiatan')}
                  />
                </View>
                {(errors.nama_kegiatan && touched.nama_kegiatan) &&
                  <Text style={{ fontSize: 10, color: 'red', marginLeft:24 }}>{errors.nama_kegiatan}</Text>
                }
              <View>
                <View style={styles.form}>
                  <Text style={{ marginLeft:24, marginTop:4 }}>Status Kegiatan :</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Status Kegiatan"
                    style={styles.textInput}
                    onChangeText={handleChange('status_kegiatan')}
                  />
                  </View>
                </View>
                {(errors.status_kegiatan && touched.status_kegiatan) &&
                  <Text style={{ fontSize: 10, color: 'red', marginLeft:24 }}>{errors.status_kegiatan}</Text>
                }
              </View>
              <View>
              {/* <TouchableOpacity onPress={() => navigation.navigate('FormSecondStep', {value: values})}>
                <View style={styles.button}>
                    <Text style={styles.buttonTitle}>LANJUTKAN</Text>
                </View>
              </TouchableOpacity> */}
              {!isSubmitting && (
                <TouchableOpacity
                  onPress={() => {
                    console.log("validate dulu");
                    {
                      values.nama_instansi == '' || values.email == '' || values.jabatan == '' || values.repassword == '' &&
                      (
                        <View style={styles.button}>
                          <Text style={styles.buttonTitle}>isi dulu</Text>
                        </View>
                      );
                      console.log('isi dulu')}
                    // validateForm().then(() => {
                    //   console.log("let submit");
                    //   navigation.navigate("FormSecondStep", {
                    //     value: values,
                    //   });
                    // });
                  }}
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonTitle}>LANJUTKAN</Text>
                  </View>
                </TouchableOpacity>
              )}
              {isSubmitting && (
                <View style={styles.button}>
                  <ActivityIndicatorExample />
                </View>
              )}
            </View>
        </View>
      </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
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
  border: {
    backgroundColor: "#C4C4C4",
    height: "2%",
    opacity: 0.7,
    marginVertical: 4
  },
  border2: {
    backgroundColor: "#C4C4C4",
    height: "3%",
    opacity: 0.3,
    marginVertical: 4
  },
  line:{
    borderBottomColor: 'black',
    height: 1,
    width:'5%'
  },
  borderdark: {
    backgroundColor: "#787171",
    height: "2%",
  },
  borderlight: {
    backgroundColor: "#C4C4C4",
    height: "2%",
  },
  textInput: {
    elevation: 12,
    flexDirection: "row",
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: '#364878'
  },
  textInputAlamat: {
    elevation: 12,
    height: 60,
    flexDirection: "row",
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: '#364878'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffd700',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    textAlign: 'center',
    margin: 16
  },
  btn: {
    backgroundColor: '#25185A',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop:16,
    padding:8,
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
  root: {
    flex: 1,
    backgroundColor:'#ffffff'
  },
});
