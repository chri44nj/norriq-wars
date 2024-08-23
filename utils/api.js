/* export async function fetchAllCharacters(updateCharacterList) {
  let apiUrl = "https://swapi.dev/api/people";
  let charactersFetched = [];

  while (apiUrl) {
    const { data, error } = await useFetch(apiUrl);

    if (error.value) {
      console.error("Error fetching characters:", error.value);
      break;
    }

    if (data.value) {
      charactersFetched = charactersFetched.concat(data.value.results);
      updateCharacterList(charactersFetched);
      console.log("Fetched characters:", charactersFetched.length);

      apiUrl = data.value.next;
    } else {
      break;
    }
  }

  return charactersFetched;
}
 */
