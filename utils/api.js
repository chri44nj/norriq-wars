export async function fetchAllCharacters() {
  let apiUrl = "https://swapi.dev/api/people";
  let charactersFetched = [];

  while (apiUrl) {
    const response = await fetch(apiUrl);
    const characterBatch = await response.json();
    charactersFetched = charactersFetched.concat(characterBatch.results);
    apiUrl = characterBatch.next;
  }

  return charactersFetched;
}
