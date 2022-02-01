const axios = require("axios");

const getForms = async () => {
  let result = await (async () => {
    try {
      const response = axios.get("https://github.com/users/nmastroianni");
      return response;
    } catch (error) {
      console.log("Here comes the axios error...", error);
    }
  })();
  return result;
};

exports.handler = async (event, context) => {
  const formData = await getForms();
  console.log(JSON.stringify(formData));

  return {
    body: JSON.stringify(formData)
  };
};
