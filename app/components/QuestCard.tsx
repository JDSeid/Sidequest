import { Text, View } from "react-native";
import { dateTimeStyle, questCardStyles } from "../styles";

interface QuestCardProps {
  title: string;
  description: string;
  datetime: any; // Firestore Timestamp
  locationName: string;
  locationCoordinates: {
    latitude: number;
    longitude: number;
  };
  attendees: string[];
}

// A quest card component to display quest details
export default function QuestCard({
  title,
  description,
  datetime,
  locationName,
  locationCoordinates,
  attendees,
}: QuestCardProps) {
  return (
    <View style={questCardStyles.questCard}>
      <Text style={questCardStyles.title}>{title}</Text>
      <Text style={questCardStyles.description}>{description}</Text>
      <Text style={questCardStyles.datetime}>
        {datetime.toDate().toLocaleString(undefined, dateTimeStyle)}
      </Text>
      <Text style={questCardStyles.location}>{locationName}</Text>
      <Text style={questCardStyles.coordinates}>
        Lat: {locationCoordinates.latitude.toFixed(4)}, Lng:{" "}
        {locationCoordinates.longitude.toFixed(4)}
      </Text>
      {attendees.length > 0 && (
        <Text style={questCardStyles.attendees}>
          Attendees: {attendees.join(", ")}
        </Text>
      )}
    </View>
  );
}
