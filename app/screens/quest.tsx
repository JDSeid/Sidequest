import { doc, DocumentReference, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { db } from "../firebaseConfig";

export default function QuestScreen({ route }: any) {
  const { questId } = route.params;
  const [quest, setQuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const docSnap = await getDoc(doc(db, "quests", questId));
        if (!docSnap.exists()) return;

        const data = docSnap.data();

        // Resolve attendee names if stored as DocumentReferences
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

        setQuest({ ...data, attendees: attendeeNames });
      } catch (error) {
        console.error("Error fetching quest:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuest();
  }, [questId]);

  if (loading || !quest) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formattedDatetime = quest.datetime.toDate().toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{quest.title}</Text>
      <Text style={styles.datetime}>{formattedDatetime}</Text>
      <Text style={styles.location}>{quest.locationName}</Text>
      <Text style={styles.description}>{quest.description}</Text>
      <Text style={styles.attendees}>
        Attendees: {quest.attendees.join(", ")}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  datetime: { fontSize: 16, marginBottom: 5 },
  location: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 18, marginVertical: 10 },
  attendees: { fontSize: 16, fontStyle: "italic", marginTop: 10 },
});
