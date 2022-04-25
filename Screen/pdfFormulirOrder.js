import React, {useRef, useState, useContext} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import SignatureScreen from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";
import { CredentialsContext } from '../components/CredentialsContext';
import axios from 'axios';
import FormData from 'form-data';

export default function pdfFormulirOrder({ text, onOK }) {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {nama, email, id} = storedCredentials;
    const ref = useRef();
    const [signature, setSign] = useState(null);

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
    console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        ref.current.clearSignature();
    };

    // Called after end of stroke
    const handleEnd = () => {
    ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
        console.log(data);
    };

    const handleConfirm = () => {
        console.log("end");
        ref.current.readSignature();
    };

    const handleOK = (signature) => {
        setSign(signature);
        const path = FileSystem.cacheDirectory + "sign.png";
        // FileSystem.writeAsStringAsync(
        //   path,
        //   signature.replace("data:image/png;base64,", ""),
        //   { encoding: FileSystem.EncodingType.Base64 }
        // )
        // .then(() => {
        //     FileSystem.getInfoAsync(path)
        // })
        // .then(console.log)
        // .catch(console.error);
        const datasTtdPemohon = new FormData();
        console.log(path)

        datasTtdPemohon.append('ttd_pemohon', {
        name: 'ttd_pemohon.png',
        type: 'image/png',
        uri:  path,
        });

        axios({
            url:`http://9e8b-2001-448a-6060-f025-917c-c7cc-a4cf-490e.ngrok.io/api/orders/post/ttdPemohon/1`,
            method:"POST",
            data:
            {
                ttd_pemohon: datasTtdPemohon
            },
        })
        // console.log(datasTtdPemohon)
        .then((response) => {
            const result = response.data;
            const { message, success, status, data } = result;
            console.log(response.data);
            Alert.alert("Berhasil", "Pendatanganan formulir pengajuan berhasil!", [
            {
                text:"OK",
                onPress: () => navigation.navigate('penyewaan'),
            },
            ]);
            console.log(response.data);
        })
        .catch((error)=> {
            // console.error('error', error);
            console.log(error.response)
            handleMessage("Tidak ada koneksi internet!");
        });
    };

    const handleMessage = (message, type = 'failed') => {
        setMessage(message);
        setMessageType(type);
    }

    const imgWidth = 240;
    const imgHeight = 190;
    const style = `.m-signature-pad {box-shadow: none; border: none; }
                .m-signature-pad--body {border: none;}
                .m-signature-pad--footer {display: none; margin: 0px;}
                body,html {
                width: ${imgWidth}px; height: ${imgHeight}px;}`;
    return (
        <>
            <View style={{ justifyContent:'center', alignItems:'center' }}>
                <Text style={{ fontWeight: 'bold', margin: 16 }}>Tanda Tangan Formulir Pengajuan</Text>
            </View>
            <View style={{ margin:16, flexDirection: 'row' }}>
                <View>
                    <View style={{justifyContent:'center', alignItems:'center' }}>
                    <View style={{ borderColor:'#C4C4C4', backgroundColor:'#C4C4C4', borderWidth:1, height:24, width: 24, borderRadius:20 }}>
                        <Text style={{textAlign: 'center' }}>1</Text>
                    </View>
                    <Text style={{textAlign: 'center' }}>Step 1</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#ffd700', height: 1, width: '33%', marginVertical:12}}/>
                <View>
                    <View style={{ justifyContent:'center', alignItems:'center' }}>
                    <View style={{ borderColor:'#C4C4C4', backgroundColor:'#C4C4C4', borderWidth:1, height:24, width: 24, borderRadius:20 }}>
                        <Text style={{textAlign: 'center' }}>2</Text>
                    </View>
                    <Text style={{textAlign: 'center' }}>Step 2</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#ffd700', height: 1, width: '33%', marginVertical:12}}/>
                <View>
                    <View style={{ justifyContent:'center', alignItems:'center' }}>
                        <View style={{ borderColor:'#ffd700', backgroundColor:'#ffd700', borderWidth:1, height:24, width: 24, borderRadius:20 }}>
                            <Text style={{textAlign: 'center' }}>3</Text>
                        </View>
                        <Text style={{textAlign: 'center' }}>Step 3</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: '60%'}}>
                <PDFReader
                    source={{
                    uri: `http://9e8b-2001-448a-6060-f025-917c-c7cc-a4cf-490e.ngrok.io/api/lihat-formulir-order/${id}`,
                    }}
                />
            </View>
            <ScrollView>
                <View style={{ marginBottom: 28, marginTop: 8, alignItems:'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Tanda tangani Surat Permohonan!</Text>
                    <View style={{ width: imgWidth, height: imgHeight }}>
                        <View style={styles.preview}>
                            {signature ? (
                            <Image
                                resizeMode={"contain"}
                                style={{ width: 335, height: 114 }}
                                source={{ uri: signature }}
                            />
                            ) : null}
                        </View>
                        <SignatureScreen
                            ref={ref}
                            bgSrc="https://www.stokestiles.co.uk/images/ww/merlin/150x150_Plain_Grey_SWT6.jpg"
                            bgWidth={imgWidth}
                            bgHeight={imgHeight}
                            webStyle={style}
                            onOK={handleOK}
                        />
                        <View style={styles.row}>
                            <TouchableOpacity onPress={handleClear} style={{ width: '45%', marginTop: 8 }}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonTitle}>Clear</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleConfirm} style={{ width: '45%', marginTop: 8 }}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonTitle}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 250,
      padding: 10,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: 'space-between',
      alignItems: "center",
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#ffd700',
        borderRadius: 8,
        height: 36,
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
        width: '100%'
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
    preview: {
        width: 335,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
  });