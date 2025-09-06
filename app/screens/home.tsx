import { collection, DocumentReference, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import QuestCard from "../components/QuestCard";
import { db } from "../firebaseConfig";

interface Quest {
  id: string;
  title: string;
  description: string;
  datetime: any; // Firestore Timestamp
  locationName: string;
  attendees: string[]; // array of attendee names
}

export default function HomeScreen({ navigation }: any) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const snapshot = await getDocs(collection(db, "quests"));
        const questsData: Quest[] = [];

        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();

          // Resolve attendee names
          let attendeeNames: string[] = [];
          if (data.attendees && Array.isArray(data.attendees)) {
            const names = await Promise.all(
              data.attendees.map(async (ref: DocumentReference) => {
                const userDoc = await getDoc(ref);
                return userDoc.exists() ? userDoc.data()?.firstName || "Unknown" : "Unknown";
              })
            );
            attendeeNames = names;
          }

          questsData.push({
            id: docSnap.id,
            title: data.title,
            description: data.description,
            datetime: data.datetime,
            locationName: data.locationName,
            attendees: attendeeNames,
          });
        }

        setQuests(questsData);
      } catch (error) {
        console.error("Error fetching quests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
              attendees={item.attendees}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
});
