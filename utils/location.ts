const GOOGLE_API_KEY = "AIzaSyBOhfL3k4Go30mA1hvz4BdfthJASS6q4XU";
const GEOAPIFY_API_KEY = "885296d62ed845abae0d6cabe15cab18";

export function getMapPreview({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

interface AddressResType {
  features: { properties: { formatted: string } }[];
}
export async function getLocationAddress({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to fetch address");
    const data: AddressResType = await res.json();
    return data.features[0].properties.formatted;
  } catch (error) {
    console.error(error);
  }
}
