import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TouchableOpacity, Platform} from 'react-native';

export default function Profile(props) {
  const {navigation: nav, route} = props;
   const ShowData = (label, value) => (label + ':' + value);

  return (
    <View style={styles.container}>
      <StatusBar translucent={false}/>
        <TouchableOpacity style={{margin: 15}} onPress={() => nav.navigate("Manager")}>
        
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={PickerImage}>
        <Image style={{ width: 100, height: 100, borderRadius: 50}}
            source={{uri:image}}/>
      </TouchableOpacity> */}
      <Text style={styles.text}>{ShowData('Name',"Hà Trần Ngọc Minh")}</Text>
      <Text style={styles.text}>{ShowData('Id',"Ph27570")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 5,
   },
});