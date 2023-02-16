import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useState } from "react";
import React from "react";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const onLogin = () => {
    Alert.alert(
      "Credentials",
      `Your login: ${state.login}, your email: ${state.email}`
    );
    console.log(state);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../images/Photo-BG.jpg")}
      ></Image>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 0 : 32,
            }}
            // style={styles.form}
          >
            <Text style={styles.formTitle}>Registration</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder={"Login"}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  console.log("hello");
                }}
                value={state.login}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, login: value }))
                }
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={styles.input}
                placeholder={"Email"}
                value={state.email}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
                }
                // onFocus={() => {
                //   setIsShowKeyboard(true);
                // }}
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <TextInput
                style={styles.input}
                placeholder={"Password"}
                value={state.password}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
                secureTextEntry={true}
                // onFocus={() => {
                //   setIsShowKeyboard(true);
                // }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={onLogin}
            >
              <Text style={styles.btnTitle}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.msg}>Have an account? Log in</Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 8,
    paddingLeft: 16,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
  },
  form: {
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 78,
  },
  formTitle: {
    marginBottom: 33,
    fontSize: 30,
    marginHorizontal: 95,
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "#ffff",
    fontSize: 16,
  },
  msg: {
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#fff",
    marginTop: 16,
  },
});

export default RegistrationScreen;
