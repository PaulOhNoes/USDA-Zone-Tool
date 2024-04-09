# USDA-Zone-Tool

A simple light weight tool to find a zipcode's USDA zone. [^1]

- No Api Connection
- Only Typescript dependencies
- Can generate a json file of the dataset

### How to install

`npm install getusdazone`

### Example

```javascript
const { ZoneTable } = require("getusdazone");

ZoneTable.loadDataSync();
console.log(ZoneTable.getZipCodeData("10001"));
```

> { zone: '7b', trange: '5 to 10', zonetitle: '7b: 5 to 10' }

### TODO

- Fetch csv file online

[^1]: Data comes from https://prism.oregonstate.edu/projects/plant_hardiness_zones.php
