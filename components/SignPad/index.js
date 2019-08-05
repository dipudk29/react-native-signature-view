import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import injectedApplication from './utils/injectedApplication';
import injectedSignaturePad from './utils/injectedSignaturePad';
import htmlContent from './utils/htmlContent';

export default class Signature extends Component {
    
    constructor(props) {
        super(props);
        const { descriptionText, clearText, confirmText, emptyText, webStyle } = props;
        this.state = {base64DataUrl: props.dataURL || null};
        const injectedJavaScript = injectedSignaturePad + injectedApplication;
        let html = htmlContent(injectedJavaScript);
        html = html.replace('<%style%>', webStyle);
        html = html.replace('<%description%>', descriptionText);
        html = html.replace('<%confirm%>', confirmText);
        html = html.replace('<%clear%>', clearText);
        this.source = { html };
        this.DOMevents = `
          clearButton.addEventListener("click", function (event) {clearScreen();});
          saveButton.addEventListener("click", function (event) {saveScreen()});`
    }
    
    static defaultProps = {
        clear: false,
        save: false,
        webStyle: '',
        onSave: () => {},
        onEmpty: () => {},
        descriptionText: 'Sign above',
        clearText: 'Clear',
        confirmText: 'Save',
    };

    clearScreen = () => {this.handleEvents("clear")}

    saveScreen = () => {this.handleEvents("save")}

    handleEvents = (eventName) => {
      console.log("Handle Events")
      switch(eventName) {
        case "clear": this.webref.injectJavaScript(`clearScreen();`); return;
        case "save": this.webref.injectJavaScript(`saveScreen()`); return;
        default: return;
      }
    }

    componentDidUpdate(prevState, prevProps) {
      if((prevProps.clear !== this.props.clear) && this.props.clear)
        this.clearScreen();
      if((prevProps.save !== this.props.save) && this.props.save)
        this.saveScreen();
    }

    getSignature = e => {
        const { onSave, onEmpty } = this.props;
        let resp = e.nativeEvent.data ? JSON.parse(e.nativeEvent.data) : {};
        if (resp.event === "save") {
          onSave(resp.data);
          return
        }
        if (resp.event === "clear") {
          onEmpty();
          return
        }
      };
    
      _renderError = args => {
        console.log("error", args);
      };
    
    render() {
      console.log("Render Screen")
      return (
        <View style={styles.webBg}>
            <WebView
              ref={r => (this.webref = r)}
              useWebKit={true}
              style={styles.webView}
              source={this.source}
              injectedJavaScript={this.DOMevents}
              onMessage={this.getSignature}
              javaScriptEnabled={true}
              onError={this._renderError}
            />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  signature: {
    width: 200,
    height: 110,
    borderWidth: 2,
    borderColor: 'grey'
  },
  signaturBg: {
    alignItems: 'center',
    marginTop: 20
  },
  webView: {},
  webBg: {
    flex: 1
  }
});
