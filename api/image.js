// WIP

const fetch = require('node-fetch');

const url = "https://api.figma.com/v1";

const token = "118755-1a0af042-022c-4b2a-aba4-f068e27a68ae";
const defaultImage = "b04ea23757d8b57f71d3c417cf7433acbb2976a6";

export default async (req, res) => {
  const {
    accessToken = token,
    image = defaultImage,
  } = req.query;

  const options = {
    method  : "GET",
    headers : {
      "X-FIGMA-TOKEN": accessToken
    }
  };

  const query = `${url}/images/${image}`;

  try {
    const response = await fetch(query, options);
    console.log({ response })
    const json = await response.json();
  
    res.send(json);
  } catch(error) {
    console.log(error);
    return res.status(500).send(error);
  }
}