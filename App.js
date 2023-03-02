import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './List';
import Profile from './Profile';
import Form from "./src/screens/form";
import Home from './Home';

const Stack = createNativeStackNavigator();
const App=()=> {
   return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name='Home' component={Home}
            />
            <Stack.Screen
                name='Form' component={Form}
            />
             <Stack.Screen
                name='List' component={List}
            />
            <Stack.Screen
                name='Profile' component={Profile}
            />
        </Stack.Navigator>
    </NavigationContainer>
    );
};
export default App;
