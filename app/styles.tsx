import { StyleSheet } from "react-native";

export const dateTimeStyle = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

export const styles = StyleSheet.create({
  // General container used for centered content on login/signup screens
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  // Full-screen list container with no padding at bottom
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export const questCardStyles = StyleSheet.create({
  questCard: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, marginTop: 5 },
  datetime: { fontSize: 12, color: "#666", marginTop: 5 },
  location: { fontSize: 14, color: "#333", marginTop: 5 },
  coordinates: { fontSize: 12, color: "#555", marginTop: 3 },
  attendees: { fontSize: 12, color: "#444", marginTop: 5 },
});

export const viewToggleStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 85, 
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    margin: 0,
    padding: 0,
  },
  button: {
    flex: 1, // each button takes 50% automatically
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  activeButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  activeButtonText: {
    color: "#fff",
  },
});
