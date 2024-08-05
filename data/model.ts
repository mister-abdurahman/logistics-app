export class Shipment {
  itemName: string;
  imageUri: string;
  address: string;
  location: { lat: number; lng: number };
  id: string;
  constructor(
    itemName: string,
    imageUri: string,
    address: string,
    location: { lat: number; lng: number }
  ) {
    this.itemName = itemName;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random();
  }
}
