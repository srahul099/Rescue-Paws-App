const fetchLocationDetails = async (lat, lon) => {
  const apiKey = "6a024787cb1f420cbc431a0c050b0c06";
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`;
  // console.log("URL:", url);
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch location details");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching location details:", error);
    return null;
  }
};

export default fetchLocationDetails;
