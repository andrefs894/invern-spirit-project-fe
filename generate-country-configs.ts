import * as fs from "fs";

const getCountryConfigs = () => {
  fetch("https://preview.invern-be.pages.dev/country/all")
    .then((response) =>
      response.json().then((data) => {
        fs.writeFileSync("public/data.json", JSON.stringify(data.data));
      }),
    )
    .catch((err) => {
      throw err;
    });
};

getCountryConfigs();
