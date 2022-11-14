export const fetchSpecificPark = async (parkCode) => {
    const response = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}`, {
      method: "GET",
      headers: new Headers({
        "x-api-key":
          "Y0mYVTq8uyp2J5Z6UkwBQPlAbRzYD4W1ZyZ89Sd0",
      }),
    });
    if (!response.ok) {
      throw Error(response.status + ":" + response.statusText);
    }
    return await response.json();
  };

  export const fetchParkQuery = async (query) => {
    const encodedQuery = encodeURIComponent(`${query}`)
    const response = await fetch(`https://developer.nps.gov/api/v1/parks?q=${encodedQuery}`, {
      method: "GET",
      headers: new Headers({
        "x-api-key":
          "Y0mYVTq8uyp2J5Z6UkwBQPlAbRzYD4W1ZyZ89Sd0",
      }),
    });
    if (!response.ok) {
      throw Error(response.status + ":" + response.statusText);
    }
    return await response.json();
  };
