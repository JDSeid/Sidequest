import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './login';
import SignupScreen from './signup';





// // --- Login Screen ---
// function LoginScreen({ navigation }: any) {
//   //Use state has the following structure: [value, function to update value] = useState(initial value)
//   //email can be updated by calling setEmail(newEmail)
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       setError('');
//       // TODO: Navigate to your home screen if needed
//       alert('Logged in successfully!');
//     } catch (err: any) {
//       setError(getFriendlyErrorMessage(err.code));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       <Button title="Login" onPress={handleLogin} />

//       <View style={styles.bottomText}>
//         <Text>Don't have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//           <Text style={styles.link}>Sign up</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// --- Signup Screen ---
// function SignupScreen({ navigation }: any) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignup = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       setError('');
//       alert('Account created successfully!');
//       navigation.goBack(); // back to login
//     } catch (err: any) {
//       setError(getFriendlyErrorMessage(err.code));
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       <Button title="Sign Up" onPress={handleSignup} />
//     </View>
//   );
// }

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
    </Stack.Navigator>
  );
}

// // --- Styles ---
// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     justifyContent: 'center', 
//     padding: 20, 
//     backgroundColor: '#fff' 
//   },
//   title: { 
//     fontSize: 32, 
//     fontWeight: 'bold', 
//     marginBottom: 20, 
//     textAlign: 'center' 
//   },
//   input: { 
//     borderWidth: 1, 
//     borderColor: '#ccc', 
//     padding: 10, 
//     marginBottom: 15, 
//     borderRadius: 5 
//   },
//   error: { 
//     color: 'red', 
//     marginBottom: 10, 
//     textAlign: 'center' 
//   },
//   bottomText: { 
//     flexDirection: 'row', 
//     justifyContent: 'center', 
//     marginTop: 15 
//   },
//   link: { 
//     color: 'blue', 
//     textDecorationLine: 'underline' 
//   },
// });
