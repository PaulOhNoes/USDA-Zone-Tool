import { ZipData, Zipcodes } from "./types";
import {
  createJSONFile,
  processFileLines,
  processFileLinesSync,
} from "./utils";

class ZoneTable {
  static data: Zipcodes;

  /**
   * Reads the entire file first before constructing the dataset
   *
   * Use `loadDataSync()` for a less resource intensive operation
   *
   * @returns void
   */
  static loadDataSync() {
    ZoneTable.data = processFileLinesSync();
  }

  /**
   * Reads the file in a stream before constructing the dataset
   *
   * Requires `async`/`promise` handling
   *
   * @returns void
   */
  static async loadData() {
    ZoneTable.data = await processFileLines();
  }

  /**
   * Generates a json file under data folder
   *
   * @returns void
   */
  static generateJson = () => {
    try {
      createJSONFile(ZoneTable.data);
    } catch (error) {
      console.log("Could not create json file", error);
    }
  };

  /**
   * get zone data via zipcode
   * @param zipcode 5 digit zipcode
   * @returns an object containg zone, trange and zonetitle
   */
  static getZipCodeData = (zipcode: string | number): ZipData => {
    let input = zipcode;
    if (typeof input === "number") {
      input = zipcode.toString();
    }

    if (input.length !== 5) {
      throw Error("Not a valid zipcode.");
    }

    const result = ZoneTable.data[input];

    if (!result) {
      throw Error("No data found.");
    }

    return result;
  };

  /**
   * return true if data has values
   *
   * @returns true or false
   */
  static isDataLoaded = (): boolean => {
    if (
      typeof ZoneTable.data !== null &&
      typeof ZoneTable.data === "object" &&
      Object.keys(ZoneTable.data).length > 0
    ) {
      return true;
    }

    return false;
  };

  /**
   * deletes the data set
   *
   * @returns void
   */
  static deleteData = () => {
    ZoneTable.data = {};

    return false;
  };
}

export default ZoneTable;
