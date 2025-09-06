import { FlatList, TouchableOpacity, View } from "react-native";
import QuestCard from "../components/QuestCard";
import { styles } from "../styles";

interface Quest {
  id: string;
  title: string;
  description: string;
  datetime: any;
  locationName: string;
  locationCoordinates: {
    latitude: number;
    longitude: number;
  };
  attendees: string[];
}

interface QuestListViewProps {
  quests: Quest[];
  navigation: any;
}

export default function QuestListView({ quests, navigation }: QuestListViewProps) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={quests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Quest", { questId: item.id })}
          >
            <QuestCard
              title={item.title}
              description={item.description}
              datetime={item.datetime}
              locationName={item.locationName}
              locationCoordinates={item.locationCoordinates}
              attendees={item.attendees}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
