import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from "firebase/auth";


import AppWrapper from './components/AppWrapper'; // import your wrapper
import HomeScreen from "./screens/home";
import LoginScreen from './screens/login';
import QuestScreen from "./screens/quest";
import SignupScreen from './screens/signup';

// --- Stack Navigator ---
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppWrapper>
      {(user: User | null) => (
        <Stack.Navigator initialRouteName={user ? "Home" : "Login"} >
          {!user && (
            <>
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
            </>
          )}
          {user && (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="Quest"
            component={QuestScreen}
            options={{
              headerShown: true,
              // title: "Quest Details",       // title in the middle
              headerBackTitle: "Back",      // text for the back button
            }}
          />
        </Stack.Navigator>
      )}
    </AppWrapper>
  );
}
