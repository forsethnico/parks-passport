export const fetchAllParks = async () => {
    const response = await fetch('https://developer.nps.gov/api/v1/parks', {
      method: "GET",
      headers: new Headers({
        "x-api-key":
          "Y0mYVTq8uyp2J5Z6UkwBQPlAbRzYD4W1ZyZ89Sd0",
      }),
    });
    if (!response.ok) {
      throw Error(response.status + ":" + response.text);
    }
    return await response.json();
  };