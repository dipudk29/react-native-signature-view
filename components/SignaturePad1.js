import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import SignaturePad from 'react-native-signature-pad';


export default class SignaturePad1 extends Component {
    constructor() {
        super()
    }

    _signaturePadChange = ({base64DataUrl}) => {
        console.log("signature url -> ", base64DataUrl);
    }

    _signaturePadError = (error) => {
        console.log("error -> ", error)
    }

    render() {
        return (
            <View style={this.styles.container}>
                <SignaturePad 
                    onError={this._signaturePadError}
                    onChange={this._signaturePadChange}
                    style={{flex: 1, backgroundColor: 'white'}}
                />
                <View>
                    <Button 
                        title="Save"
                        onPress={() => false}
                    />
                    <Button 
                        title="Clear"
                        onPress={() => false}
                    />
                </View>
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
