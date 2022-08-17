export default async function fetchImages({ searchQuery, page }) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error(`No images with ${"newSearch"}`));
}
