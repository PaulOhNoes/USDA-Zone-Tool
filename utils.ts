import fs from "node:fs";
import readline from "node:readline";
import { Zipcodes } from "./types";

export const processFileLinesSync = (): Zipcodes => {
  const filepath = "data/phzm_us_zipcode_2023.csv";

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
  const filepath = "data/phzm_us_zipcode_2023.csv";

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
  const filepath = "data/phzm_us_zipcode_2023.json";

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
