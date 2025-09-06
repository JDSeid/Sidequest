import { collection, DocumentReference, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import QuestListView from "../components/QuestListView";
import QuestMapView from "../components/QuestMapView"; // new placeholder map component
import ViewToggle from "../components/ViewToggle";
import { db } from "../firebaseConfig";
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

export default function HomeScreen({ navigation }: any) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const snapshot = await getDocs(collection(db, "quests"));
        const questsData: Quest[] = [];

        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();

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
            locationCoordinates: {
              latitude: data.location.latitude,
              longitude: data.location.longitude,
            },
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
    <View style={{ flex: 1 }}>
      {/* Toggle between list and map */}
      {viewMode === "list" ? (
        <QuestListView quests={quests} navigation={navigation} />
      ) : (
        <QuestMapView />
      )}

      {/* Bottom ViewToggle */}
      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
    </View>
  );
}
