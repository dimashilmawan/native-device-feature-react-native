import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
// import AppLoading from "expo-app-loading";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";

import IconButton from "./components/UI/IconButton";

import { Colors } from "./constants/colors";

import { init } from "./util/database";
import PlaceDetail from "./screens/PlaceDetail";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
	const [dbInitialized, setDbInitialized] = useState(false);

	useEffect(() => {
		init()
			.then(() => {
				setDbInitialized(true);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	if (!dbInitialized) return <Text>Loading...</Text>;

	return (
		<>
			<StatusBar style="light" />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: Colors.primary500 },
						headerTintColor: "white",
						// contentStyle: { backgroundColor: Colors.gray700 },
						contentStyle: { backgroundColor: "white" },
					}}
				>
					<Stack.Screen
						name="AllPlaces"
						component={AllPlaces}
						options={({ navigation }) => ({
							title: "Your favorite Places",
							headerRight: ({ tintColor }) => (
								<IconButton
									iconName="add"
									color={tintColor}
									size={28}
									onPress={() => navigation.navigate("AddPlace")}
								/>
							),
						})}
					/>
					<Stack.Screen
						name="AddPlace"
						component={AddPlace}
						options={{ title: "Add a new Place" }}
					/>
					<Stack.Screen name="Map" component={Map} />
					<Stack.Screen
						name="PlaceDetail"
						component={PlaceDetail}
						options={{ title: "Loading Place..." }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
