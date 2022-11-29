import { useState, useLayoutEffect, useCallback } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }) {
	const initialLocation = route.params && {
		latitude: route.params.latitude,
		longitude: route.params.longitude,
	};
	const [selectedLocation, setSelectedLocation] = useState(initialLocation);

	const region = {
		latitude: initialLocation ? initialLocation.latitude : -6.243179,
		longitude: initialLocation ? initialLocation.longitude : 106.919094,
		latitudeDelta: 0.1,
		longitudeDelta: 0.1,
	};

	function selectLocationHandler(event) {
		if (initialLocation) return;

		const { latitude, longitude } = event.nativeEvent.coordinate;
		setSelectedLocation({ latitude, longitude });
	}

	const savePickedLocation = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert(
				"No Location Picked !",
				"Please tap location to pick a location"
			);
			return;
		}

		navigation.navigate("AddPlace", {
			pickedLatitude: selectedLocation.latitude,
			pickedLongitude: selectedLocation.longitude,
		});
	}, [navigation, selectedLocation]);

	useLayoutEffect(() => {
		if (initialLocation) return;

		navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton
					iconName="save"
					color={tintColor}
					size={24}
					onPress={savePickedLocation}
				/>
			),
		});
	}, [navigation, selectedLocation, initialLocation]);

	return (
		<MapView
			style={styles.map}
			initialRegion={region}
			onPress={selectLocationHandler}
		>
			{selectedLocation && (
				<Marker
					title="Picked Location"
					coordinate={{
						latitude: selectedLocation.latitude,
						longitude: selectedLocation.longitude,
					}}
				/>
			)}
		</MapView>
	);
}

export default Map;

const styles = StyleSheet.create({ map: { flex: 1 } });
