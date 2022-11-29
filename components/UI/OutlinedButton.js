import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function OutlinedButton({ children, onPress, iconName, size, color, style }) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
		>
			<Ionicons name={iconName} size={size} color={color} style={styles.icon} />
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
}

export default OutlinedButton;

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.primary500,
		padding: 8,
		borderRadius: 8,
	},
	pressed: { opacity: 0.9, backgroundColor: Colors.primary100 },
	icon: { marginRight: 4 },
	text: { color: Colors.primary500, fontSize: 16 },
});
