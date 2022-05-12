import React, { useRef, useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import PDFReader from "rn-pdf-reader-js";
import SignatureScreen from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";
import { CredentialsContext } from "../components/CredentialsContext";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import FormData from "form-data";

export default function pdfFormulirOrder({ navigation, text, onOK }) {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { nama, email, id } = storedCredentials;
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

  const uploadBase64 = async (base64String) => {
    // this.setState({ uploading: true });

    //Without this the FilySystem crashes with 'bad base-64'
    const base64Data = base64String.replace("data:image/png;base64,", "");

    try {
      //This creates a temp uri file so there's no neeed to download an image_source to get a URI Path
      const uri = FileSystem.cacheDirectory + "ttd_pemohon-temp.png";
      await FileSystem.writeAsStringAsync(uri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const result = await uploadImageAsync(uri).then((res) => res.json());
      return result;
      // this.setState({ uploading: false });
    } catch (e) {
      // this.setState({ uploading: false });
      console.log("*Error*");
      console.log(e);
    }
  };

  //Just and ordinary upload fetch function
  const uploadImageAsync = (uri) => {
    let apiUrl = `http://311c-2001-448a-6060-f025-e5cf-8ee-86e5-f879.ngrok.io/api/orders/post/ttdPemohon/1`;

    let formData = new FormData();

    formData.append("ttd_pemohon", {
      name: "ttd_pemohon.png",
      type: "image/png",
      uri,
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    return fetch(apiUrl, options);
  };

  const handleOK = async (signature) => {
    // const permission = await MediaLibrary.requestPermissionsAsync();
    // console.log("permission", permission);
    setSign(signature);
    await uploadBase64(signature)
      .then((response) => {
        console.log("response: ", response);
        Alert.alert("Berhasil", "Pendatanganan formulir pengajuan berhasil!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Penyewaan"),
          },
        ]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleMessage = (message, type = "failed") => {
    setMessage(message);
    setMessageType(type);
  };

  const imgWidth = 240;
  const imgHeight = 190;
  const style = `.m-signature-pad {box-shadow: none; border: none; }
                .m-signature-pad--body {border: none;}
                .m-signature-pad--footer {display: none; margin: 0px;}
                body,html {
                width: ${imgWidth}px; height: ${imgHeight}px;}`;
  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", margin: 16 }}>
          Tanda Tangan Formulir Pengajuan
        </Text>
      </View>
      <View style={{ margin: 16, flexDirection: "row" }}>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                borderColor: "#C4C4C4",
                backgroundColor: "#C4C4C4",
                borderWidth: 1,
                height: 24,
                width: 24,
                borderRadius: 20,
              }}
            >
              <Text style={{ textAlign: "center" }}>1</Text>
            </View>
            <Text style={{ textAlign: "center" }}>Step 1</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#ffd700",
            height: 1,
            width: "33%",
            marginVertical: 12,
          }}
        />
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                borderColor: "#C4C4C4",
                backgroundColor: "#C4C4C4",
                borderWidth: 1,
                height: 24,
                width: 24,
                borderRadius: 20,
              }}
            >
              <Text style={{ textAlign: "center" }}>2</Text>
            </View>
            <Text style={{ textAlign: "center" }}>Step 2</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#ffd700",
            height: 1,
            width: "33%",
            marginVertical: 12,
          }}
        />
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                borderColor: "#ffd700",
                backgroundColor: "#ffd700",
                borderWidth: 1,
                height: 24,
                width: 24,
                borderRadius: 20,
              }}
            >
              <Text style={{ textAlign: "center" }}>3</Text>
            </View>
            <Text style={{ textAlign: "center" }}>Step 3</Text>
          </View>
        </View>
      </View>
      <View style={{ height: "50%" }}>
        <PDFReader
          source={{
            uri: `http://311c-2001-448a-6060-f025-e5cf-8ee-86e5-f879.ngrok.io/api/lihat-formulir-order/${id}`,
          }}
        />
      </View>
      <ScrollView scrollEnabled={false}>
        <View
          style={{
            marginBottom: 28,
            marginTop: 8,
            alignItems: "center",
            // borderWidth: 1,
            // borderBottomColor: "red",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Tanda tangani Surat Permohonan!
          </Text>
          <View
            style={{
              width: imgWidth,
              height: imgHeight,
              // borderWidth: 1,
              // borderBottomColor: "blue",
            }}
          >
            {/* <View style={styles.preview}>
              {signature ? (
                <Image
                  resizeMode={"contain"}
                  style={{ width: 335, height: 114 }}
                  source={{ uri: signature }}
                />
              ) : null}
            </View> */}
            <SignatureScreen
              ref={ref}
              bgSrc="https://www.stokestiles.co.uk/images/ww/merlin/150x150_Plain_Grey_SWT6.jpg"
              bgWidth={imgWidth}
              bgHeight={imgHeight}
              webStyle={style}
              onOK={handleOK}
            />
            <View style={styles.row}>
              <TouchableOpacity
                onPress={handleClear}
                style={{ width: "45%", marginTop: 8 }}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Clear</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                style={{ width: "45%", marginTop: 8 }}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Confirm</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ffd700",
    borderRadius: 8,
    height: 36,
    justifyContent: "center",
    textAlign: "center",
    padding: 4,
    width: "100%",
  },
  buttonTitle: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 0,
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
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
