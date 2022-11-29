import { useCallback, useState } from "react";
import { Text, View, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm({ onCreatePlace }) {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [selectedImage, setSelectedImage] = useState();
	const [pickedLocation, setPickedLocation] = useState();

	function changeTitleHandler(enteredText) {
		setEnteredTitle(enteredText);
	}

	function takeImageHandler(imageUri) {
		setSelectedImage(imageUri);
	}

	const pickLocationHandler = useCallback(location => {
		setPickedLocation(location);
	}, []);

	function savePlaceHandler() {
		const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
		onCreatePlace(placeData);
	}

	return (
		<ScrollView style={styles.form}>
			<View style={styles.innerContainer}>
				<View>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						onChangeText={changeTitleHandler}
						value={enteredTitle}
					/>
				</View>
				<ImagePicker onTakeImage={takeImageHandler} />
				<LocationPicker onPickLocation={pickLocationHandler} />
				<Button onPress={savePlaceHandler} style={{ marginTop: 24 }}>
					Add Place
				</Button>
			</View>
		</ScrollView>
	);
}

export default PlaceForm;

const styles = StyleSheet.create({
	form: { flex: 1 },
	innerContainer: { paddingVertical: 24, paddingHorizontal: 12 },
	label: { fontWeight: "bold", color: Colors.primary100, fontSize: 16 },
	input: {
		backgroundColor: Colors.primary100,
		color: Colors.primary700,
		paddingVertical: 4,
		paddingHorizontal: 8,
		marginTop: 8,
		borderRadius: 4,
	},
});
