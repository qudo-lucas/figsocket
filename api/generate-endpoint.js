const token = require("./_token.js");

export default async (req, res) => {
    const {
        ["x-vercel-deployment-url"] : origin,
        ["x-forwarded-proto"] : proto,
        referer
    } = req.headers;

    const {
        url = "",
    } = req.query;

    const decodedURL = decodeURI(url);

    // eg. https://www.figma.com/file/EoIGjb8EwKbqjw7TRq5JUg/FigSocket
    const file = decodedURL.split("file/")[1].split("/")[0];

    if(!decodedURL || ! file) {
        res.send(501).send({});
    }

    try {
        const id = await token.sign({ file });
        const endpoint = `${referer}/api/?id=${id}`;
        res.send({ endpoint });
    } catch(error) {
        console.log(error);

        res.status(500).send({});
    }
}
