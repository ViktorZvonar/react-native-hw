import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import { Icon, Input } from "react-native-elements";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";

export default function CreatePostsScreen({ navigation }) {
  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } =
        await MediaLibrary.requestPermissionsAsync();
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === "granted");
      setHasCameraPermission(status === "granted");
      setHasMediaLibraryPermission(mediaLibraryStatus === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    console.log("Taking picture...");
    const photo = await cameraRef.takePictureAsync();
    console.log("Photo taken:", photo.uri);
    await MediaLibrary.createAssetAsync(photo.uri);
    setPhoto(photo.uri);
  };

  const publishPicture = async () => {
    if (hasLocationPermission) {
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      console.log(location);

      navigation.navigate("Posts", {
        photo,
        location,
        photoName,
        photoLocation,
      });
    } else {
      alert(
        "Location not available. Please ensure location permissions are granted and try again."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View>
          <View style={styles.cameraWrapper}>
            <Camera
              style={styles.camera}
              ref={(ref) => {
                setCameraRef(ref);
              }}
            >
              <TouchableOpacity
                onPress={takePicture}
                style={styles.snapContainer}
              >
                <Text style={styles.snap}>
                  <Icon
                    name="camera"
                    type="font-awesome"
                    color="#fff"
                    size={20}
                  />
                </Text>
              </TouchableOpacity>
            </Camera>
          </View>

          <View style={styles.inputContainer}>
            <Input
              inputStyle={styles.textInput}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder="Title"
              onChangeText={(text) => setPhotoName(text)}
              value={photoName}
              leftIcon={{
                type: "font-awesome",
                name: "camera",
                color: "#E8E8E8",
                size: 18,
              }}
              placeholderTextColor="#BDBDBD"
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => setIsShowKeyboard(false)}
            />

            <Input
              inputStyle={styles.textInput}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder="Location"
              onChangeText={(text) => setPhotoLocation(text)}
              value={photoLocation}
              leftIcon={{
                type: "font-awesome",
                name: "map-pin",
                color: "#E8E8E8",
                size: 18,
              }}
              placeholderTextColor="#BDBDBD"
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => setIsShowKeyboard(false)}
            />
          </View>
          <TouchableOpacity
            style={styles.publishButton}
            onPress={publishPicture}
          >
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    flex: 1,
  },
  cameraWrapper: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  snap: {
    color: "#ffff",
  },
  snapContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  publishButton: {
    width: "100%",
    height: 51,
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 32,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
  publishButtonText: {
    color: "#fff",
  },
  inputContainer: {
    marginTop: 48,
  },
  textInput: {
    height: 40,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    color: "#000000",
  },

  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
});
