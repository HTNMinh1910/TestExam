import {View, TextInput, Pressable, Image, TouchableOpacity, Platform, Text} from 'react-native';
import Checkbox from 'expo-checkbox';
import {useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {API_USER} from '../helpers/api';

export default function Form(props) {
   const {navigation: nav, route} = props;
   const edit = route.params?.edit;
   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [phone, setPhone] = useState("");
   const [status, setStatus] = useState(false);
   const [img, setImg] = useState(null);

   useEffect(() => {
    async  () => {
      if (Platform.OS !== "web") {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Từ chối truy cập !")
        }
      }
    }
    CheckImage();
  }, []);

   const PickerImage = async() => {
    const result = await  ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
    
   };
   const CheckImage = () => {
      if (img == null) {
        setImg("https://cdn-icons-png.flaticon.com/128/2659/2659360.png");
      }
   };

    useEffect(() => {
        if (edit) {
            setName(edit.name);
            setAddress(edit.address);
            setPhone(edit.phone);
            setStatus(edit.status);
            setImg(edit.img);
        }
    }, [edit?.id]);
    const onCancel=()=>{
      setName("");
      setAddress("");
      setPhone("");
      setStatus(false);
      setImg(null);
    };
    const onSave = () => {
        const newObj = {
                        name, 
                        address, 
                        phone, 
                        status, 
                        img
                      };
               fetch(!edit ? API_USER : `${API_USER}/${edit.id}`,
            {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, 
            method: !edit ? 'POST' : 'PUT', 
            body: JSON.stringify(newObj)}).then((res) => nav.goBack());
    };

    return (
      <View style={{alignSelf: "center", marginTop: 100}}>
        <TouchableOpacity onPress={PickerImage}>
        <Image style={{alignSelf: "center", width: 100, height: 100, borderRadius: 50}}
            source={{uri:img}}/>
      </TouchableOpacity>
      <TextInput placeholder="Name" 
        onChangeText={(text) => setName(text)} 
        value={name} style={{
        borderRadius: 5, 
        borderWidth: 1, 
        width: 250, 
        alignSelf: "center", 
        padding: 10, 
        marginTop: 10
      }}/>
      <TextInput placeholder="Address" 
        onChangeText={(text) => setAddress(text)} 
        value={address} style={{
        borderRadius: 5, 
        borderWidth: 1, 
        width: 250, 
        alignSelf: "center", 
        padding: 10, 
        marginTop: 10
      }}/>
      <TextInput placeholder="Phone" 
        keyboardType="numeric" 
        onChangeText={(text) => setPhone(text)} 
        value={phone} style={{
        borderRadius: 5, 
        borderWidth: 1, 
        width: 250, 
        alignSelf: "center", 
        padding: 10, 
        marginTop: 10
      }}/>

      <View style={{flexDirection: "row", margin: 5, alignSelf: "center"}}>
        <Text style={{marginRight: 10, fontSize: 20, fontWeight: "500"}}>Status</Text>
      <Checkbox
          value={status}
          onValueChange={setStatus}
          color={status ? '#FF509C' : undefined}
        />
      </View>
      
      <View style={{marginLeft: 50, flexDirection: "row", justifyContent: "space-around", width: "80%"}}>
            <Pressable onPress={onCancel}>
                <Text>Cancel</Text>
            </Pressable>
            <Pressable onPress={onSave}>
                <Text>Save</Text>
            </Pressable>
      </View>
    </View>
    );
};

 