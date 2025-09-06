import { Text, TouchableOpacity, View } from "react-native";
import { viewToggleStyles } from "../styles";

interface ViewToggleProps {
  viewMode: "list" | "map";
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "map">>;
}

export default function ViewToggle({ viewMode, setViewMode }: ViewToggleProps) {
  return (
    <View style={viewToggleStyles.container}>
      <TouchableOpacity
        style={[viewToggleStyles.button, viewMode === "list" && viewToggleStyles.activeButton]}
        onPress={() => setViewMode("list")}
      >
        <Text style={[viewToggleStyles.buttonText, viewMode === "list" && viewToggleStyles.activeButtonText]}>
          List
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[viewToggleStyles.button, viewMode === "map" && viewToggleStyles.activeButton]}
        onPress={() => setViewMode("map")}
      >
        <Text style={[viewToggleStyles.buttonText, viewMode === "map" && viewToggleStyles.activeButtonText]}>
          Map
        </Text>
      </TouchableOpacity>
    </View>
  );
}
