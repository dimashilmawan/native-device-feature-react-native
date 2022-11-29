import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onTakeImage }) {
	const [pickedImage, setPickedImage] = useState();
	const [cameraPermissionInfo, requestPermissions] = useCameraPermissions();

	async function verifyPermissions() {
		if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermissions();

			return permissionResponse.granted;
		}
		if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
			// Alert.alert(
			// 	"Insufficient permissions",
			// 	"You need to grant camera permissions to use this app"
			// );

			// return false;
			const permissionResponse = await requestPermissions();

			return permissionResponse.granted;
		}

		return true;
	}

	async function takeImageHandler() {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) return;

		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});

		setPickedImage(image.assets[0].uri);
		onTakeImage(image.assets[0].uri);
	}

	let imagePreview = <Text>No image taken yet..</Text>;

	if (pickedImage)
		imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;

	return (
		<View style={styles.container}>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<OutlinedButton
				iconName="camera"
				size={24}
				color={Colors.primary500}
				style={{ marginTop: 16 }}
				onPress={takeImageHandler}
			>
				Take Image
			</OutlinedButton>
		</View>
	);
}

export default ImagePicker;

const styles = StyleSheet.create({
	container: { marginTop: 24 },
	imagePreview: {
		width: "100%",
		height: 200,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		backgroundColor: Colors.primary200,
	},
	image: { width: "100%", height: "100%", borderRadius: 4 },
});
