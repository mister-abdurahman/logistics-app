const GOOGLE_API_KEY = "AIzaSyBOhfL3k4Go30mA1hvz4BdfthJASS6q4XU";

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
