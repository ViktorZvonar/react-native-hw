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
import { authRegister } from "../../redux/auth/authOperations";
import { updateUserProfile } from "../../redux/auth/authReducer";

import React, { useState } from "react";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const user = await dispatch(authRegister(state));
      dispatch(
        updateUserProfile({
          id: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
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
          <View style={styles.photoWrapper}></View>
          <TouchableOpacity activeOpacity={0.8} style={styles.addBtn}>
            <Text style={styles.addBtnTitle}>+</Text>
          </TouchableOpacity>
          <Text style={styles.formTitle}>Registration</Text>
          <View>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isShowKeyboard ? "#FF6C00" : "#E8E8E8",
                backgroundColor: isShowKeyboard ? "#FFFFFF" : "#F6F6F6",
              }}
              placeholder={"Login"}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onBlur={() => setIsShowKeyboard(false)}
              value={state.login}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
            />
          </View>
          <View style={{ marginTop: 16 }}>
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
              onFocus={() => setIsShowKeyboard(true)}
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
              <Text style={styles.btnTitle}>Register</Text>
            </TouchableOpacity>
          )}
          {!isShowKeyboard && (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.msg}>
                Have an account?{" "}
                <Text style={{ ...styles.msg, paddingLeft: 5 }}>Log in</Text>
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
    borderColor: "#FF6C00",
    backgroundColor: "#FFFF",
  },
  addBtnTitle: {
    color: "#FF6C00",
    textAlign: "center",
  },

  photoWrapper: {
    position: "absolute",
    width: 120,
    height: 120,

    top: -60,
    alignSelf: "center",

    backgroundColor: "#F6F6F6",
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
    marginHorizontal: 95,
    fontWeight: "500",
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
