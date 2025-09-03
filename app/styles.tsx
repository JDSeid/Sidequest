// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 5 
  },
  error: { 
    color: 'red', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  bottomText: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 15 
  },
  link: { 
    color: 'blue', 
    textDecorationLine: 'underline' 
  },
});
