import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, StyleSheet } from "react-native";

class FormSecondStep extends Component {
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
      currentStep: getCurrentStep(),
    };
  };


  // nextStep = () => {
  //   const { next, saveState } = this.props;
  //   // Save state for use in other steps
  //   saveState({ name: "samad" });

  //   // Go to next step
  //   next();
  // };
// console.log(nextStep);

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps } = this.state;
    // console.log(this.props.nextStep.nama)
    return(
      <View style={styles.root}>
        <View>
          <View style={{ justifyContent:'center', alignItems:'center' }}>
            <Text style={styles.currentStepText}>{`Step ${currentStep} of ${totalSteps}`}
            </Text>
          </View>
          <Image
            source={require("../../assets/image/2-2.png")}
            style={{ marginBottom: 8, width: '100%' }}
            resizeMode="cover"
          />
          <View>
            <View style={styles.form}>
            <Text style={{ marginLeft:24, marginTop:4 }}>Metode Pembayaran :</Text>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                placeholder="Metode Pembayaran"
                style={styles.textInput}
                // onChangeText={handleChange('nama')}
                // onBlur={handleBlur('nama')}
                editable={true}
            />
            </View>
          </View>
          <View>
            <TouchableOpacity>
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
export default FormSecondStep;