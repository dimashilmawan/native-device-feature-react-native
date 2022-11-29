import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function PlaceItem({ place: { id, title, imageUri, address }, onSelect }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.item, pressed && styles.pressed]}
			onPress={onSelect.bind(this, id)}
		>
			<Image style={styles.image} source={{ uri: imageUri }} />
			<View style={styles.info}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.text}>{address}</Text>
			</View>
		</Pressable>
	);
}

export default PlaceItem;

const styles = StyleSheet.create({
	item: {
		flexDirection: "row",
		backgroundColor: "#f5f5f5",
		borderRadius: 8,
		elevation: 4,
		shadowColor: "black",
		marginHorizontal: 16,
		marginVertical: 8,
	},
	pressed: { opacity: 0.9, backgroundColor: Colors.primary400 },
	image: {
		flex: 1,
		height: 100,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
	},
	info: { flex: 2, padding: 8 },
	title: { fontWeight: "bold", fontSize: 18, color: "#131313" },
	text: { color: "#131313" },
});
