import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ iconName, size, color, onPress }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={onPress}
		>
			<Ionicons name={iconName} size={size} color={color} />
		</Pressable>
	);
}

export default IconButton;

const styles = StyleSheet.create({
	button: {},
	pressed: { opacity: 0.7 },
});
