export class Place {
	constructor(title, imageUri, location, id) {
		this.title = title;
		this.imageUri = imageUri;
		this.location = {
			latitude: location.latitude,
			longitude: location.longitude,
		};
		this.address = location.address;
		this.id = id;
	}
}
