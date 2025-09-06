import { StyleSheet, Text, View } from "react-native";
import { dateTimeStyle } from "../styles";
interface QuestCardProps {
  title: string;
  description: string;
  datetime: any;
  locationName: string;
  attendees: string[];
}

//A quest card component to display quest details
export default function QuestCard({ title, description, datetime, locationName, attendees }: QuestCardProps) {
  return (
    <View style={styles.questCard}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.datetime}>
        {datetime.toDate().toLocaleString(undefined, dateTimeStyle)}
      </Text>
      <Text style={styles.location}>{locationName}</Text>
      {attendees.length > 0 && (
        <Text style={styles.attendees}>Attendees: {attendees.join(", ")}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  attendees: { fontSize: 12, color: "#444", marginTop: 5 },
});
