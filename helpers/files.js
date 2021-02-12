const fsPromises = require("fs").promises;

const getDataFromFile = (pathtofile, req, res) => {
  return fsPromises
    .readFile(pathtofile, { encoding: "utf-8" })
    .then((data) => JSON.parse(data))
    .catch((err) => res.send({ message: err.message }));
};

module.exports = getDataFromFile;
