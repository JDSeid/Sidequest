// signup.tsx
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { auth, db } from "../firebaseConfig";
import { styles } from "../styles";


function getFriendlyErrorMessage(code: string) {
    console.log(code);
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
    case 'auth/invalid-phone-number-required':
      return 'Please enter a valid phone number.';
    case 'auth/invalid-phone-number-no-digits':
      return 'Phone number must contain digits.';
    case 'auth/invalid-phone-number-length':
      return 'Phone number is too short.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

async function addUserToDatabase(user: any, firstName?: string, phoneNumber?: string) {
  if (!user || !user.uid) {
    throw new Error("Invalid user object");
  }

  try {
    await setDoc(doc(db, "users", user.uid), {
      firstName: firstName || "", // default to empty string
      email: user.email || "",
      createdAt: new Date(),
      phoneNumber: phoneNumber || "", 
    });
    console.log("User added to Firestore:", user.uid);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error;
  }
}

const VALID_COUNTRY_CODES = ["1", "44", "33", "61", "49"]; // Example: US, UK, FR, AU, DE

/**
 * Formats and validates a phone number.
 * @param phoneNumber Raw phone number string
 * @returns E.164 formatted phone number string
 * @throws Error if the phone number is invalid
 */

//TODO: This funciton isn't throwing errors properly come back to this!!!
export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) throw new Error("auth/invalid-phone-number-required");

  // Remove all non-numeric characters
  let digits = phoneNumber.replace(/\D/g, "");

  if (digits.length === 0) throw new Error("auth/invalid-phone-number-no-digits");

  // Check for country code (starts with 1-3 digits)
  let countryCode = "";
  let nationalNumber = "";

  // If starts with 1-3 digits and matches a valid country code
  for (let i = 1; i <= 3; i++) {
    const code = digits.slice(0, i);
    if (VALID_COUNTRY_CODES.includes(code)) {
      countryCode = code;
      nationalNumber = digits.slice(i);
      break;
    }
  }

  // If no valid country code, assume +1 (US)
  if (!countryCode) {
    countryCode = "1";
    nationalNumber = digits;
  }

  // Basic validation: national number must be at least 7 digits
  if (nationalNumber.length < 7) throw new Error("auth/invalid-phone-number-length");

  return `+${countryCode}${nationalNumber}`;
}

export default function SignupScreen({ navigation }: any) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = async () => {
    if (!firstName.trim()) {
      setError('Please enter your first name.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      //TODO: Add phone number verification here. This well let phonenumber be stored in firebase auth
      //For now, we will just store it in firestore


      //This object contains user information (only email and uid))
      const user = userCredential.user;
      let formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      addUserToDatabase(user, firstName, formattedPhoneNumber); // Add user to your database
      //This code only runs if signup was successful
      setError('');
      alert('Account created successfully!');
      //Navigate to home screen
      navigation.replace("Home");
      //This code runs if there was an error during signup
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err.code));
    }
  };
  return (
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : undefined}
>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
  
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Re-enter Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
    <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="number-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        // onSubmitEditing={() => Keyboard.dismiss()} // hides keyboard when user presses "done"
    />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Sign Up" onPress={handleSignup} />

      {/* New Back to Login button */}
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
