import React, {useContext} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity, Dimensions, ImageBackground, Button } from "react-native";
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
import AnimatedMultistep from "react-native-animated-multistep";

// import { FormSuccess } from "./forms/FormSuccess";
import * as yup from 'yup';
import { makeStyles } from "@material-ui/core/styles";

const win = Dimensions.get("window");

const allSteps = [
  { name: "step 1", component: Step1 },
  { name: "step 1", component: Step2 },
];

export default function FormulirOrder({navigation}) {
  // const {nama, email} = route.params;
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [cari, setCari] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {nama, email} = storedCredentials;

  onNext = () => {
    console.log("Next");
  };

  /* define the method to be called when you go on back step */

  onBack = () => {
    console.log("Back");
  };

/* define the method to be called when the wizard is finished */

  finish = finalState => {
    console.log(finalState);
  };

  const handleSubmit = () => setStep(step => step + 1);

  const editProfilValidationSchema = yup.object().shape({
    nama: yup
      .string()
      .required('Nama wajib diisi!'),
    email: yup
      .string()
      .email("Harap masukkan email yang valid!")
      .required('Alamat email wajib diisi!'),
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
      .number()
      .required('Nama Kegiatan wajib diisi!'),
    status_kegiatan: yup
      .string()
      .required('Status Kegiatan wajib diisi!'),
    metode_pembayaran: yup
      .string()
      .required('Metode Pembayaran Kegiatan wajib diisi!'),
  })

  return (
    <View style={styles.root}>
      <View style={{ justifyContent:'center', alignItems:'center' }}>
        <Text style={{ fontWeight: 'bold', margin: 16 }}>Isi Formulir Pengajuan</Text>
      </View>
      <Formik
        validationSchema={editProfilValidationSchema}
        enableReinitialize={true}
        initialValues={{  nama: '', email: '', no_hp: '', kontak_darurat: '', alamat: '', nama_kegiatan: '', status_kegiatan:''}}
        // initialValues={data}
        onSubmit={(values, {setSubmitting})  => {
          handleEditProfil(values, setSubmitting);
        }}
        // onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, values, isSubmitting, errors }) => (
          <View style={{ flex: 1 }}>
            <AnimatedMultistep
              steps={allSteps}
              // onFinish={this.finish}
              // onBack={this.onBack}
              // onNext={this.onNext}
              comeInOnNext="bounceInUp"
              OutOnNext="bounceOutDown"
              comeInOnBack="bounceInDown"
              OutOnBack="bounceOutUp"
            />
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
    opacity: 0.7
  },
  border2: {
    backgroundColor: "#C4C4C4",
    height: "3%",
    opacity: 0.3
  },
  textInput: {
    elevation: 12,
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    padding: 4,
    paddingHorizontal: 4,
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
  },
});
