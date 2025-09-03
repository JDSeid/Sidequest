// login.tsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "./firebaseConfig";
import { styles } from "./styles";

export function getFriendlyErrorMessage(code: string) {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

// --- Login Screen ---
export default function LoginScreen({ navigation }: any) {
  //Use state has the following structure: [value, function to update value] = useState(initial value)
  //email can be updated by calling setEmail(newEmail)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      // TODO: Navigate to your home screen if needed
      alert('Logged in successfully!');
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Login" onPress={handleLogin} />

      <View style={styles.bottomText}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
