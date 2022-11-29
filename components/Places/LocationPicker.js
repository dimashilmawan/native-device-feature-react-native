import { Image, StyleSheet, Text, View } from "react-native";
import {
	Accuracy,
	getCurrentPositionAsync,
	PermissionStatus,
	useForegroundPermissions,
} from "expo-location";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

function LocationPicker({ onPickLocation }) {
	const [pickedLocation, setPickedLocation] = useState(null);

	const [locationPermissionInfo, requestPermissions] =
		useForegroundPermissions();

	const navigation = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();

	async function verifyPermissions() {
		if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermissions();
			return permissionResponse.granted;
		}
		if (locationPermissionInfo.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient permissions",
				"You need to grant location permissions to use this app"
			);

			return false;
		}

		return true;
	}

	async function getLocationHandler() {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) return;

		const location = await getCurrentPositionAsync({
			accuracy: Accuracy.Highest,
		});
		setPickedLocation({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		});
	}

	function pickOnMapHandler() {
		navigation.navigate("Map");
	}

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = {
				latitude: route.params.pickedLatitude,
				longitude: route.params.pickedLongitude,
			};
			setPickedLocation(mapPickedLocation);
		}
	}, [isFocused, route.params]);

	useEffect(() => {
		async function handleLocation() {
			if (pickedLocation) {
				const address = await getAddress(
					pickedLocation.latitude,
					pickedLocation.longitude
				);
				onPickLocation({ ...pickedLocation, address: address });
			}
		}
		handleLocation();
	}, [pickedLocation, onPickLocation]);

	let locationPreview = <Text>No Location Picked yet..</Text>;

	// if (pickedLocation)
	// 	locationPreview = (
	// 		<Image
	// 			style={styles.image}
	// 			source={{
	// 				uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
	// 			}}
	// 		/>
	// 	);

	if (pickedLocation) {
		locationPreview = (
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: pickedLocation.latitude,
					longitude: pickedLocation.longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}
			>
				<Marker
					title="Picked Location"
					coordinate={{
						latitude: pickedLocation.latitude,
						longitude: pickedLocation.longitude,
					}}
				/>
			</MapView>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton
					onPress={getLocationHandler}
					iconName="location"
					size={24}
					color={Colors.primary500}
					style={{ flex: 1, marginRight: 4 }}
				>
					Current Location
				</OutlinedButton>
				<OutlinedButton
					onPress={pickOnMapHandler}
					iconName="map"
					size={24}
					color={Colors.primary500}
					style={{ flex: 1, marginLeft: 4 }}
				>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
}

export default LocationPicker;

const styles = StyleSheet.create({
	container: { marginTop: 24 },
	mapPreview: {
		width: "100%",
		height: 200,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		backgroundColor: Colors.primary200,
		overflow: "hidden",
	},
	map: { width: "100%", height: "100%" },
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
	},
});
