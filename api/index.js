const fetch = require('node-fetch');
const token = require("./_token.js");

const url = "https://api.figma.com/v1";

const accessToken = "118755-1a0af042-022c-4b2a-aba4-f068e27a68ae";

export default async (req, res) => {
  const {
    id,
  } = req.query;

  const options = {
    method  : "GET",
    headers : {
      "X-FIGMA-TOKEN": accessToken
    }
  };

  let query;

  if(!id) {
    return res.status(505).send({});
  }

  try {
    const { file } = await token.verify(id); 

    console.log({ file })
    query = `${url}/files/${file}`;

  } catch(error) {
    console.log(error);
    return res.status(502).send({})
  }

  try {
    const response = await fetch(query, options);
    console.log({ response })
    const json = await response.json();
  
    res.send(json);
  } catch(error) {
    console.log("Failed to connect to Figma", error);

    return res.status(502).send(error);
  }
}