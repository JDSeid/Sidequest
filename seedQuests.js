const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  GeoPoint,
  Timestamp,
  doc,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAwg_emwZGk7tD6TRXd5OulWs0_QaFC7tw",
  authDomain: "side-quest-1.firebaseapp.com",
  projectId: "side-quest-1",
  storageBucket: "side-quest-1.firebasestorage.app",
  messagingSenderId: "433050241838",
  appId: "1:433050241838:web:07218ee229babaa27848bf",
  measurementId: "G-HTWQPHKQZY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Array of user IDs
const userIds = [
  "SsSLQziVQwP18LiWlyI1V1W0ALK2",
  "SncEjDE4KqWJMaGEI8TcylQqubV2",
  "JSRlYw0zoTQWcqIyUkPnrHSy77s1",
  "YzlZ5hx3r3VmUZnrVxMElLz33a12",
  "kAipwrNoHpgFURTEgb0wTb9AmJa2",
];

// Helper to randomly pick some attendees
function getRandomAttendees() {
  const shuffled = userIds.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.floor(Math.random() * userIds.length) + 1);
  return selected.map((id) => doc(db, "users", id));
}

async function seedQuests() {
  const questsRef = collection(db, "quests");

  const sampleQuests = [
    {
      title: "Central Park Quest",
      description: "Explore the park and find hidden treasures.",
      datetime: Timestamp.fromDate(new Date("2025-09-10T10:00:00")),
      location: new GeoPoint(40.785091, -73.968285),
      locationName: "Central Park, NYC",
    },
    {
      title: "Times Square Quest",
      description: "Take photos at the iconic Times Square.",
      datetime: Timestamp.fromDate(new Date("2025-09-11T14:00:00")),
      location: new GeoPoint(40.758896, -73.985130),
      locationName: "Times Square, NYC",
    },
    {
      title: "Brooklyn Bridge Quest",
      description: "Walk across the bridge and enjoy views of the city.",
      datetime: Timestamp.fromDate(new Date("2025-09-12T09:00:00")),
      location: new GeoPoint(40.706086, -73.996864),
      locationName: "Brooklyn Bridge, NYC",
    },
    {
      title: "Statue of Liberty Quest",
      description: "Visit the Statue of Liberty and take a selfie.",
      datetime: Timestamp.fromDate(new Date("2025-09-13T11:00:00")),
      location: new GeoPoint(40.689247, -74.044502),
      locationName: "Statue of Liberty, NYC",
    },
    {
      title: "Met Museum Quest",
      description: "Explore art at the Metropolitan Museum of Art.",
      datetime: Timestamp.fromDate(new Date("2025-09-14T13:00:00")),
      location: new GeoPoint(40.779437, -73.963244),
      locationName: "The Met, NYC",
    },
    {
      title: "High Line Quest",
      description: "Walk the elevated park and enjoy city views.",
      datetime: Timestamp.fromDate(new Date("2025-09-15T15:00:00")),
      location: new GeoPoint(40.748, -74.0048),
      locationName: "High Line, NYC",
    },
    {
      title: "Grand Central Quest",
      description: "Discover hidden gems inside Grand Central Terminal.",
      datetime: Timestamp.fromDate(new Date("2025-09-16T12:00:00")),
      location: new GeoPoint(40.7527, -73.9772),
      locationName: "Grand Central Terminal, NYC",
    },
  ];

  try {
    for (const quest of sampleQuests) {
      await addDoc(questsRef, {
        ...quest,
        attendees: getRandomAttendees(),
        createdAt: Timestamp.fromDate(new Date()),
      });
    }
    console.log("Test quests added successfully with attendees!");
  } catch (error) {
    console.error("Error adding test quests:", error);
  }
}

// Run the script
seedQuests().then(() => process.exit());
