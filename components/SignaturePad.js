import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Signature from 'react-native-signature-canvas';

export default class SignaturePad extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={this.styles.container}>
            <Signature
            // handle when you click save button
            onOK={(img) => console.log(img)}
            // description text for signature
            descriptionText="Sign"
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
                <Text>SignaturePad</Text>
            </View>
        )
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            margin: 5,
            borderWidth: 2,
            backgroundColor: "#eee"
        }
    })
}
