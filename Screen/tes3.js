import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet } from "react-native";
import Notif from "../../assets/image/1from2.png";

class FormFirstStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: ""
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    saveState({ name: "samad" });

    // Go to next step
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps } = this.state;
    return(
      <View style={styles.root}>
        <View style={{ justifyContent:'center', alignItems:'center' }}>
          <Text>{`Step ${currentStep} of ${totalSteps}`}</Text>
        </View>
        <View>
        <Image
          source={require("../../assets/image/1from2.png")}
          style={{ marginBottom:8, width: '100%' }}
          resizeMode="cover"
        />
        <View>
            <View style={styles.form}>
            <Text style={{ marginLeft:24, marginTop:4 }}>Nama :</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                placeholder="Nama"
                style={styles.textInput}
                // onChangeText={handleChange('nama')}
                // onBlur={handleBlur('nama')}
                editable={true}
            />
            </View>
        </View>
        <View>
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
                // onChangeText={handleChange('email')}
                editable={true}
            />
            </View>
        </View>
        <View style={styles.border2}></View>
        {/* <Text type ={messageType} style={styles.message}>{message}</Text> */}
        <View>
            <View style={styles.form}>
            <Text style={{ marginLeft:24, marginTop:4 }}>No. Handphone:</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                keyboardType='numeric'
                // dataDetectorTypes={'phoneNumber'}
                placeholder="No. Handphone"
                style={styles.textInput}
                // onChangeText={handleChange('no_hp')}
            />
            </View>
        </View>
        <View>
            <View style={styles.form}>
            <Text style={{ marginLeft:24, marginTop:4 }}>Kontak Darurat:</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                keyboardType='numeric'
                placeholder="Kontak Darurat"
                style={styles.textInput}
                // onChangeText={handleChange('kontak_darurat')}
            />
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
                style={styles.textInput}
                // onChangeText={handleChange('alamat')}
            />
            </View>
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
                // onChangeText={handleChange('nama_kegiatan')}
            />
            </View>
        </View>
        <View>
            <View style={styles.form}>
            <Text style={{ marginLeft:24, marginTop:4 }}>Status Kegiatan :</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                placeholder="Status Kegiatan"
                style={styles.textInput}
                // onChangeText={handleChange('status_kegiatan')}
            />
            </View>
        </View>
        <View>
          <TouchableOpacity onPress={this.nextStep}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>LANJUTKAN</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* {!isSubmitting &&
        <View>
            <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>LANJUTKAN</Text>
            </View>
            </TouchableOpacity>
        </View>
        }
        {isSubmitting &&
            <View style={styles.button}>
            <ActivityIndicatorExample/>
            </View>
        } */}
      </View>
        {/* <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
            <Image
              source={require("../../assets/image/cart.png")}
              style={styles.btnImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View> */}
          {/* {!isSubmitting &&
          <View>
              <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.button}>
                  <Text style={styles.buttonTitle}>LANJUTKAN</Text>
              </View>
              </TouchableOpacity>
          </View>
          }
          {isSubmitting &&
              <View style={styles.button}>
              <ActivityIndicatorExample/>
              </View>
          } */}
      </View>
    )
  }
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
export default FormFirstStep;