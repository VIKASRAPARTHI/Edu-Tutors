export const checkAPIConfig = () => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error(
      "API key is missing. Please set VITE_OPENROUTER_API_KEY in your .env file"
    );
    return false;
  }

  if (
    apiKey === "your_api_key_here" ||
    apiKey.includes("YOUR_") ||
    apiKey.length < 10
  ) {
    console.error(
      "API key appears to be a placeholder. Set your actual API key in .env"
    );
    return false;
  }

  return true;
};

export const testAPIConnection = async () => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_OPENROUTER_API_KEY || ""
        }`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    console.log("API connection test successful");
    return true;
  } catch (error) {
    console.error("API connection test failed:", error);
    return false;
  }
};
