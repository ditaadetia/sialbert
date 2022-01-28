import React, {useContext} from 'react';
import { StyleSheet, KeyboardAvoidingView, SafeAreaView, Alert, Text, View, Image, FlatList, TextInput, TouchableOpacity, Dimensions, ImageBackground, Button } from "react-native";
import { useState, useEffect } from "react";

import FloatingTabBar from "../components/FloatingTabBar";
import { ScrollView } from "react-native-gesture-handler";
import { Asset } from 'expo-asset';
import { AntDesign } from '@expo/vector-icons'
import ActivityIndicatorExample  from "../components/ActivityIndicatorExample";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
import { Formik } from 'formik';
import * as yup from 'yup'
const win = Dimensions.get("window");

import picture_account from "../assets/image/acount-inactive.png";

export default function EditProfil({navigation}) {
  // const {nama, email} = route.params;
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [cari, setCari] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {nama, email} = storedCredentials;
  const clearLogin = () => {
    AsyncStorage
    .removeItem('sialbertCredentials')
    .then(() => {
      setStoredCredentials("");
    })
    .catch(error => console.log(error))
    Alert.alert("Logout", "Anda berhasil Logout!", [
      {
        text:"OK",
        onPress: () => {clearLogin},
      },
    ]);
  }

  const editProfilValidationSchema = yup.object().shape({
    nama: yup
      .string()
      .required('Nama wajib diisi!'),
    email: yup
      .string()
      .email("Harap masukkan email yang valid!")
      .required('Alamat email wajib diisi!'),
    nohp: yup
      .number()
      .required('No. HP wajib diisi!'),
    kontak: yup
      .number()
      .required('Kontak Darurat wajib diisi!'),
    alamat: yup
      .string()
      .required('Alamat wajib diisi!'),
  })

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
            <View style={{ backgroundColor: '#FFFFFF', flex:1 }}>
                {/* <View style={styles.greeting}>
                    <Text>Halo, </Text>
                  <Text style={styles.greetingName}>{nama}</Text>
                </View> */}
                <TouchableOpacity onPress={clearLogin}>
                  <View style={styles.button}>
                    <Text style={styles.buttonTitle}>Logout</Text>
                  </View>
                </TouchableOpacity>
            </View>
            <View opacity={0.5} style={styles.banner}>
              <Image source={picture_account} style={picture_account}></Image>
              <Text style={{ fontWeight: "bold" }}>Ubah</Text>
              <Text>Tekan untuk ubah</Text>
            </View>
            <View style={styles.border}></View>
            <View>
              <Formik
                validationSchema={editProfilValidationSchema}
                initialValues={{  nama: '', email: '', nohp: '', kontak: '', alamat: ''}}
                onSubmit={(values, {setSubmitting})  => {
                  handleProfil(values, setSubmitting);
                }}
              >
                {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
                  <View>
                    <View>
                      <View style={styles.form}>
                        <TextInput
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder="Nama"
                          style={styles.textInput}
                          onChangeText={handleChange('nama')}
                          value={values.nama}
                        />
                      </View>
                      {errors.nama &&
                        <Text style={{ fontSize: 10, color: 'red', marginLeft:16 }}>{errors.nama}</Text>
                      }
                    </View>
                    <View>
                      <View style={styles.form}>
                        <TextInput
                          autoCapitalize="none"
                          autoCompleteType="email"
                          autoCorrect={false}
                          keyboardType="email-address"
                          returnKeyType="next"
                          placeholder="Email"
                          style={styles.textInput}
                          onChangeText={handleChange('email')}
                          value={values.email}
                        />
                      </View>
                      {errors.email &&
                        <Text style={{ fontSize: 10, color: 'red', marginLeft:16 }}>{errors.email}</Text>
                      }
                    </View>
                    <View style={styles.border2}></View>
                    {/* <Text type ={messageType} style={styles.message}>{message}</Text> */}
                    <View>
                      <View style={styles.form}>
                          <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            placeholder="No. Handphone"
                            style={styles.textInput}
                            onChangeText={handleChange('nohp')}
                            value={values.nohp}
                          />
                        </View>
                      {errors.nohp &&
                        <Text style={{ fontSize: 10, color: 'red', marginLeft:16 }}>{errors.nohp}</Text>
                      }
                    </View>
                    <View>
                      <View style={styles.form}>
                        <TextInput
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder="Kontak Darurat"
                          style={styles.textInput}
                          onChangeText={handleChange('kontak')}
                          value={values.kontak}
                        />
                      </View>
                      {errors.kontak &&
                        <Text style={{ fontSize: 10, color: 'red', marginLeft:16 }}>{errors.kontak}</Text>
                      }
                    </View>
                    <View>
                      <View style={styles.form}>
                        <TextInput
                          autoCapitalize="none"
                          autoCorrect={false}
                          returnKeyType="next"
                          placeholder="Alamat"
                          style={styles.textInput}
                          onChangeText={handleChange('alamat')}
                          value={values.alamat}
                        />
                      </View>
                      {errors.alamat &&
                        <Text style={{ fontSize: 10, color: 'red', marginLeft:16 }}>{errors.alamat}</Text>
                      }
                    </View>
                    {!isSubmitting &&
                    <View>
                      <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.button}>
                          <Text style={styles.buttonTitle}>SIMPAN</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    }
                    {isSubmitting &&
                      <View style={styles.button}>
                        <ActivityIndicatorExample/>
                      </View>
                    }
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#FAD603",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  picture_account: {
    alignItems: "center",
    justifyContent: "center"
  },
  border: {
    backgroundColor: "#C4C4C4",
    height: "2%",
    opacity: 0.7
  },
  border2: {
    backgroundColor: "#C4C4C4",
    height: "5%",
    opacity: 0.3
  },
  back: {
    backgroundColor: "#25185A",
  },
  textInput: {
    elevation: 12,
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: '#364878'
  },
  safeAreaView: {
    flex: 1,
    height:'100%'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 32,
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
  buttonTitle: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 0,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
});
