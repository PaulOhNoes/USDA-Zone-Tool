import ZoneTable from "./ZoneTable";

// const Scenario1 = () => {
//   ZoneTable.loadDataSync();
//   const data = ZoneTable.getZipCodeData("10001");
//   console.log("My zone is", data.zone);
// };

// const Scenario2 = async () => {
//   await ZoneTable.loadData();
//   const data = ZoneTable.getZipCodeData("10001");
//   console.log("My zone is", data.zone);
// };

// const GenerateJSONScenario = () => {
//   if (!ZoneTable.isDataLoaded()) {
//     ZoneTable.loadDataSync();
//   }

//   ZoneTable.generateJson();
// };

// Scenario1();
// Scenario2();
// GenerateJSONScenario();

module.exports = {
  ZoneTable: ZoneTable,
};
