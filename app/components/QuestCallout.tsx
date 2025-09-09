import { Text, View } from "react-native";
import { dateTimeStyle } from "../styles";

interface QuestCalloutProps {
    id: string;
    title: string;
    locationName: string;
    description: string;
    datetime: any; // Firestore Timestamp
}

export default function QuestCallout({
    id,
    title,
    locationName,
    description,
    datetime,
}: QuestCalloutProps) {
    return (
        <View style={{ maxWidth: 250 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
            <Text style={{ fontStyle: "italic", color: "#555" }}>{locationName}</Text>
            <Text>{description}</Text>
            <Text style={{ color: "#666", fontSize: 12 }}>
                {datetime.toDate().toLocaleString(undefined, dateTimeStyle)}
            </Text>
        </View>
    );
}
