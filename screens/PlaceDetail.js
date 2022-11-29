import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetail } from "../util/database";

function PlaceDetail({ navigation, route }) {
	const [loadedPlace, setLoadedPlace] = useState();

	const selectedPlaceId = route.params.placeId;

	function showOnMapHandler() {
		navigation.navigate("Map", {
			latitude: loadedPlace.location.latitude,
			longitude: loadedPlace.location.longitude,
		});
	}

	useEffect(() => {
		async function loadPlaceData() {
			const place = await fetchPlaceDetail(selectedPlaceId);
			setLoadedPlace(place);
			navigation.setOptions({
				title: place.title,
			});
		}
		loadPlaceData();
	}, [selectedPlaceId]);

	if (!loadedPlace)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: loadedPlace.imageUri }} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{loadedPlace.address}</Text>
				</View>
				<OutlinedButton
					iconName="map"
					size={24}
					color={Colors.primary500}
					onPress={showOnMapHandler}
					style={{ marginTop: 16 }}
				>
					Map
				</OutlinedButton>
			</View>
		</ScrollView>
	);
}

export default PlaceDetail;

const styles = StyleSheet.create({
	image: { minHeight: 300, height: "30%", width: "100%" },
	locationContainer: {
		padding: 24,
		alignItems: "center",
	},
	addressContainer: {},
	address: { color: "black", fontSize: 16 },
});
