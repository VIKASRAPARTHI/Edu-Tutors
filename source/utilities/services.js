export const validateApiSettings = () => {
  const authKey = import.meta.env.API_KEY;

  if (!authKey) {
    console.error(
      "API key is missing. Please set API_KEY in your .env file"
    );
    return false;
  }

  if (
    authKey === "your_api_key_here" ||
    authKey.includes("YOUR_") ||
    authKey.length < 10
  ) {
    console.error(
      "API key appears to be a placeholder. Set your actual API key in .env"
    );
    return false;
  }

  return true;
};

export const testApiConnection = async () => {
  try {
    const apiResponse = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        Authorization: `Bearer ${
          import.meta.env.API_KEY || ""
        }`,
        "Content-Type": "application/json",
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`API returned status ${apiResponse.status}`);
    }

    const responseData = await apiResponse.json();
    console.log("API connection test successful");
    return true;
  } catch (errorInfo) {
    console.error("API connection test failed:", errorInfo);
    return false;
  }
};
