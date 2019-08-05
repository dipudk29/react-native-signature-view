import React, { Component } from 'react';
import { ToastAndroid, Image, View, Button, StyleSheet } from 'react-native';
import Signature from './components/SignPad';
// import Signature from './components/SignaturePad';
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      signature: null,
      clear: false,
      save: false,
    }
  }

  saveSignature = (data) => {
    console.log("response", data);
    let resp = {}
    resp.data = data;
    // if (resp.event == "save") {
      if (!resp.data) {
        ToastAndroid.show('Please Sign Above' , ToastAndroid.SHORT);
        return;
      }
      this.setState({ signature: resp.data }, ()=> {
        ToastAndroid.show('Saved Successfully', ToastAndroid.SHORT);
      });
  } 

  render() {
      return (
        <View style={styles.container}>
          <View style={styles.canvas}>
            <Signature
              clear={this.state.clear}
              save={this.state.save}
              onSave={this.saveSignature}
              onEmpty={() => ToastAndroid.show('Cleared', ToastAndroid.SHORT)}
              // description text for signature
              descriptionText="Sign Above"
              // clear button text
              clearText="Clear"
              // save button text
              confirmText="Save"
              // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
              webStyle={`.m-signature-pad--footer
                  .button {
                  background-color: red;
                  color: #FFF;
              }`}
            />
          </View>
          <View style={styles.btnGrp}>
            <Button
              style={styles.btn}
              title="Clear"
              onPress={() => this.setState({ clear: true}, () => {
                this.setState({clear: false});
              })}
            />
            <Button
              style={styles.btn}
              title="Save"
              onPress={() => this.setState({ save: true}, () => {
                this.setState({save: false});
              })}
            />
          </View>
        </View>
        )
    // } else {
    //   return (<Image
    //       style={{flex: 1}}
    //       source={{uri: this.state.signature}}
    //     />)
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
    borderWidth: 2,
    borderColor: "black"
  },
  canvas: {
    height: "90%",
    zIndex: 1
  },
  btnGrp: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-around"
  },
  btn: {
    margin: 5,
    height: "10",
    flexDirection: "row",
  }
})
