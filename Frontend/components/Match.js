import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Dimensions} from 'react-native';
import Fightersjson from "../allFighters.json"

const windowWidth = Dimensions.get('window').width;

const Match = ({route, navigation}) => {
  const [matchs, setMatchs] = useState(null)
  const UfcSilhouetteRightStance = "https://www.ufc.com/themes/custom/ufc/assets/img/standing-stance-right-silhouette.png"
  const UfcSilhouetteLeftStance = "https://www.ufc.com/themes/custom/ufc/assets/img/standing-stance-left-silhouette.png"
  const groupID = route.params.ID

  useEffect(()=>{
      try {
        fetch(`https://api.sportradar.com/mma/trial/v2/fr/schedules/2024-02-04/summaries.json?api_key=nrmu6fxvt5e5bzdzhx2845fq`, {
          method: "GET",
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => response.json())
        .then(json => {
          setMatchs(json.summaries)
        })
      } catch (error) {
        console.log("Error message", error);
      }
  },[])
  return (
    <ScrollView style={styles.container}>
      {
        matchs?.reverse().map((match, idx)=>{
          const nameOfFirstFighter = match.sport_event.competitors[0].name.split(",").reverse().join(" ")
          const nameOfsecondFighter = match.sport_event.competitors[1].name.split(",").reverse().join(" ")
          const indexOfFirstFigther = Fightersjson.map(fighter => fighter.NomCombattant).indexOf(nameOfFirstFighter.trim())
          const indexOfSecondFigther = Fightersjson.map(fighter => fighter.NomCombattant).indexOf(nameOfsecondFighter.trim())
          return  <TouchableOpacity key={idx} style={styles.matchBox} onPress={()=> navigation.navigate("CreateBet", groupID)}>
            <View>
              <Image style={styles.Image} source={{uri: indexOfFirstFigther !== -1 ? Fightersjson[indexOfFirstFigther].ImagePath : UfcSilhouetteRightStance}}/>
            </View>
            <View style={styles.infosBox}>
            <Text>{nameOfFirstFighter}</Text>
            <Text>VS</Text>
            <Text>{nameOfsecondFighter}</Text>
            </View>
            <View>
            <Image style={styles.Image} source={{uri: indexOfSecondFigther !== -1 ? Fightersjson[indexOfSecondFigther].ImagePath : UfcSilhouetteLeftStance}}/>
            </View>
      </TouchableOpacity>
        })
      }
    </ScrollView>
  )
}

export default Match

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "black",
    width: windowWidth,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  matchBox:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    width: "100%",
    height: 150,
    backgroundColor: "red",
    padding: 5,
    marginBottom: 30,
    borderRadius: 20,
  },
  infosBox:{
    flexDirection: "column",
    alignItems: "center",
    gap: 15
  },
  Image:{
    width: 90,
    height: 90,
    objectFit: "contain"
  }
})