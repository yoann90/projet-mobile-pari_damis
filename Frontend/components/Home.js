import React from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Image, StyleSheet, Text } from "react-native";
import nature from "../assets/nature.gif";

const Home = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      const delay = setTimeout(() => {
         
        navigation.navigate('Signup'); 
      }, 2000);
  
      return () => clearTimeout(delay);
    }, [navigation])
  );
    // useEffect(() => {
      
    //     const delay = setTimeout(() => {
         
    //       navigation.navigate('Signup'); 
    //     }, 2000);
    
    //     return () => clearTimeout(delay);
    //   }, [navigation]);

  return (
    <View
      style={{ backgroundColor: "black", flex: 1, justifyContent: "center" }}
    >
      <Image style={styles.Image} source={require("../assets/nature.gif")} />
      <View style={styles.overlay}>
        <Text
          style={{
            color: "red",
            fontSize: 50,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          pari amis
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Image: {
    resizeMode: "cover",
    position: "absolute",

    height: "100%",
    width: "100%",
  },
  splashScreenMasterInstance: {
    width: "auto",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, .95)",
    justifyContent: "center",
    alignItems: "center",
  },

});

export default Home;
