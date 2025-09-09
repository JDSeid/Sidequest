import MapView, { Callout, Marker } from "react-native-maps";
import { mapStyles } from "../styles";
import QuestCallout from "./QuestCallout";

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
}

interface QuestMapViewProps {
    quests: Quest[];
    navigation: any; // pass from HomeScreen
}

export default function QuestMapView({ quests, navigation }: QuestMapViewProps) {
    const initialRegion = {
        latitude: 40.7527,
        longitude: -73.9772,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    return (
        <MapView
            style={mapStyles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}
        >
            {quests.map((quest) => (
                <Marker key={quest.id} coordinate={quest.locationCoordinates}>
                    <Callout
                        onPress={() => {
                            // Navigate to Quest screen with the quest ID
                            navigation.navigate("Quest", { questId: quest.id });
                        }}
                    >
                        <QuestCallout
                            id={quest.id}
                            title={quest.title}
                            locationName={quest.locationName}
                            description={quest.description}
                            datetime={quest.datetime}
                        />
                    </Callout>
                </Marker>
            ))}
        </MapView>
    );
}
