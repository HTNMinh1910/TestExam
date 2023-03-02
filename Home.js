import {Text, View, Pressable} from 'react-native';

export default function Home(props) {
   const {navigation: nav} = props;
     return (
       <View style={{justifyContent: 'space-around', flexDirection: 'row', padding: 10, width: "100%"}}>
             <Pressable style={{alignItems: "center"}} onPress={() => nav.navigate('List')}>
                     <Text style={{fontWeight: "600", fontSize: 20}}>Manager</Text>
             </Pressable> 
             <Pressable style={{alignItems: "center"}} onPress={() => nav.navigate('Profile')}>
                     <Text style={{fontWeight: "600", fontSize: 20}}>Profile</Text>
             </Pressable>
       </View>
     );
};