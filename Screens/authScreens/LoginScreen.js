import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { useDispatch } from "react-redux";
import { authLogin } from "../../redux/auth/authOperations";

import React, { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const user = await dispatch(authLogin(state));
      setState(initialState);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../images/Photo-BG.jpg")}
        />

        <View
          style={{ ...styles.form, paddingBottom: isShowKeyboard ? 32 : 78 }}
        >
          <View style={styles.photoWrapper}>
            <Image
              style={styles.addedFoto}
              source={require("../../images/Rectangle22.jpg")}
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.addBtn}>
            <Text style={styles.addBtnTitle}>x</Text>
          </TouchableOpacity>
          <Text style={styles.formTitle}>Log in</Text>
          <View>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isShowKeyboard ? "#FF6C00" : "#E8E8E8",
                backgroundColor: isShowKeyboard ? "#FFFFFF" : "#F6F6F6",
              }}
              placeholder={"Email"}
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onBlur={() => setIsShowKeyboard(false)}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <View style={styles.passwordWrapper}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.showBtn}
                onPress={toggleShowPassword}
              >
                <Text style={styles.showBtnTitle}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={{
                  ...styles.input,
                  borderColor: isShowKeyboard ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isShowKeyboard ? "#FFFFFF" : "#F6F6F6",
                }}
                placeholder={"Password"}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                secureTextEntry={!showPassword}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onBlur={() => setIsShowKeyboard(false)}
              />
            </View>
          </View>
          {!isShowKeyboard && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTitle}>Log in</Text>
            </TouchableOpacity>
          )}
          {!isShowKeyboard && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.msg}>
                No account?{" "}
                <Text style={{ ...styles.msg, marginLeft: 5 }}>Register</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    position: "absolute",
    top: 0,
    resizeMode: "cover",
    width: "100%",
  },

  input: {
    position: "relative",
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    paddingLeft: 16,
    fontSize: 16,
    width: "100%",
  },
  passwordWrapper: {
    flexDirection: "row",
    position: "relative",
  },
  showBtn: {
    position: "absolute",
    zIndex: 999,
    alignSelf: "center",
    right: 15,
    backgroundColor: "transparent",
  },
  showBtnTitle: {
    color: "#1B4371",
    fontSize: 16,
  },

  addBtn: {
    position: "absolute",
    zIndex: 999,
    top: 21,
    right: 125,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#E8E8E8",
    backgroundColor: "#FFFF",
  },
  addBtnTitle: {
    color: "#E8E8E8",
    textAlign: "center",
  },

  photoWrapper: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -60,
    alignSelf: "center",
  },

  addedFoto: {
    resizeMode: "cover",
    width: "100%",
    borderRadius: 16,
  },

  form: {
    position: "relative",
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  formTitle: {
    marginBottom: 33,
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
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

export default LoginScreen;
