import { StyleSheet, Text, View, FlatList, Alert, Pressable, Image} from "react-native";
import {useState, useEffect} from 'react';
import {useIsFocused} from "@react-navigation/native";
import { API_USER } from "./src/helpers/api";

export default function List(props) {
  const {navigation: nav, route} = props;
  const check = route.params?.check;
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const getUsers = () => {
    fetch(API_USER)
    .then(res => res.json())
    .then(data => {
        setList(data);
        setLoading(false);
    });
  };

  useEffect(() => { 
        getUsers(); 
      }, [isFocused]);

  const onEdit = (editId) => {
    fetch(`${API_USER}/${editId}`)
        .then(res => res.json())
        .then(data => nav.navigate('Form',
        {edit: data}
        ))
  };

  const onDelete = (deleteId) => {
      fetch(`${API_USER}/${deleteId}`, {
          method: 'DELETE'
      }).then(res => getUsers());
  };
  return (
      <View style={styles.container}>
          <Pressable style={{alignItems: "center",alignSelf: "flex-end"}} onPress={()=>nav.navigate('Form')}>
            <Text>Thêm mới</Text>
          </Pressable>
    
          {isLoading ? 
            <Text>Loading...</Text>
            :<FlatList
            data={list}
            renderItem={({item}) => 
            <View style={styles.ContainerList}>
              <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
              <Image
                style={{ width: 60, height: 60, borderRadius: 999, margin: 5}}
                source={{uri: item.img}}/>
            <View style={{marginLeft: 10}}>
              <Text style={{color: "black", fontSize: 14}}>Name: {item.name}</Text>
              <Text style={{color: "black", fontSize: 12}}>Address: {item.address}</Text>
              <Text style={{color: "black", fontSize: 12}}>Phone: {item.phone}</Text>
              <Text style={{color: "black", fontSize: 12}}>Status: {item.status==true? "Hoạt động":"Không hoạt động"}</Text>
            </View>
              </View>
              <View style={{flexDirection: "column", justifyContent: "space-around",marginLeft: 100 }}>
                <Pressable onPress={()=> {Alert.alert("Xác Nhận Xóa", "Bạn chắc chắn muốn xóa: "+item.name, 
                [{text: 'Cancel', onPress: () => {}, style: 'cancel', },
                  {text: 'OK', onPress: () => onDelete(item.id)},])}}>
                  <Text>Xóa</Text>
              </Pressable>
              <Pressable onPress={()=> onEdit(item.id)}>
                  <Text>Sửa</Text>
              </Pressable>
              </View>
            </View>} keyExtractor={(item) => item.id}/>
            }
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    padding: 5,
  },
  ContainerList: {
    width: "95%",
    marginTop: 5, 
    marginLeft:10,
    flexDirection: "row", 
    justifyContent: "space-around",
    borderWidth: 2, 
    borderRadius: 10, 
    // borderColor: "green", 
    padding: 5,
  },
});
