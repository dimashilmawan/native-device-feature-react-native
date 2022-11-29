const GOOGLE_API_KEY = "awdawdauwdbaowdnawkd";

export function getMapPreview(lat, lng) {
	const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
	// return imagePreviewUrl;

	return "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80";
}

export async function getAddress(latitude, longitude) {
	const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
	);
	if (!response.ok) {
		throw new Error("Failed to get address");
	}
	const data = response.json();
	// const address = data.results[0].formatted_address;
	const address = "H sidin st, duren sawit, Jakarta";
	return address;
}
