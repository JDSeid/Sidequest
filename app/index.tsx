import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./screens/home";
import LoginScreen from './screens/login';
import QuestScreen from "./screens/quest";
import SignupScreen from './screens/signup';




// --- Stack Navigator ---
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="Quest" component={QuestScreen} />
      </Stack.Navigator>
  );
}

