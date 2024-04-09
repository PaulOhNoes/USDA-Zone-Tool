import fs from "node:fs";
import http from "https";
import readline from "node:readline";
import { Zipcodes } from "./types";

export const processFileLinesSync = (): Zipcodes => {
  const filepath = `${__dirname}/data/phzm_us_zipcode_2023.csv`;

  if (!fs.existsSync(filepath)) {
    throw Error(`Can not find ${filepath}`);
  }

  const Data: Zipcodes = {};
  const lines = fs.readFileSync(filepath, "utf-8").split("\n").filter(Boolean);
  for (const line of lines) {
    const lineData = line.split(",");

    Data[lineData[0]] = {
      zone: lineData[1],
      trange: lineData[2],
      zonetitle: lineData[3],
    };
  }

  delete Data["zipcode"]; // remove header

  return Data;
};

export const processFileLines = async (): Promise<Zipcodes> => {
  const filepath = `${__dirname}/data/phzm_us_zipcode_2023.csv`;

  if (!fs.existsSync(filepath)) {
    throw Error(`Can not find ${filepath}`);
  }

  const Data: Zipcodes = {};
  const fileStream = fs.createReadStream(filepath);

  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // crlfDelay option to recognize all instances of CR LF
  });

  for await (const line of lines) {
    // Each line in input.txt will be successively available here as `line`
    const lineData = line.split(",");

    Data[lineData[0]] = {
      zone: lineData[1],
      trange: lineData[2],
      zonetitle: lineData[3],
    };
  }

  delete Data["zipcode"]; // remove header

  return Data;
};

export const createJSONFile = (data: Zipcodes) => {
  const filepath = `${__dirname}/data/phzm_us_zipcode_2023.json`;

  if (fs.existsSync(filepath)) {
    console.log("File already exist!");
  } else {
    const json = JSON.stringify(data);
    fs.writeFile(filepath, json, "utf8", function (err) {
      if (err) throw err;
      console.log("json file created!");
    });
  }
};

export const downloadCSV = async (): Promise<void> => {
  const url =
    "https://prism.oregonstate.edu/projects/phm_data/phzm_us_zipcode_2023.csv";
  const destination = `${__dirname}/data/phzm_us_zipcode_2023.csv`;

  const file = fs.createWriteStream(destination);

  http.get(url, function (response) {
    console.log(response.statusCode, response.statusMessage);
    response.pipe(file);
    file
      .on("finish", function () {
        file.close();
        if (response.statusCode !== 200) {
          fs.unlink(destination, function () {
            throw Error(
              `File did not download. Error: ${response.statusMessage}`
            );
          });
        }
      })
      .on("error", function (error) {
        fs.unlink(destination, function () {
          throw Error(`Could not create file. Error: ${error}`);
        });
      });
  });
};
