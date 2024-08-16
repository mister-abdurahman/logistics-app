export class Shipment {
  title: string;
  imageUri: string;
  address: string;
  location: { lat: number; lng: number };
  id: string;
  constructor({
    title,
    imageUri,
    location,
  }: {
    title: string;
    imageUri: string;
    location: { lat: number; lng: number; address: string };
  }) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = new Date().toString() + Math.random().toString();
  }
}
