import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ children, onPress, style }) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
		>
			<Text style={styles.text}>{children}</Text>
		</Pressable>
	);
}

export default Button;

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary800,
		padding: 12,
		borderRadius: 8,
		elevation: 2,
		shadowColor: "black",
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
	},
	pressed: { opacity: 0.9, backgroundColor: Colors.primary700 },
	text: {
		color: Colors.primary50,
		fontSize: 16,
		textAlign: "center",
		fontWeight: "bold",
	},
});
