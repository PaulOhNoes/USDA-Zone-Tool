export interface ZipData {
  zone: string;
  trange: string;
  zonetitle: string;
}

export interface Zipcodes {
  [key: string]: ZipData;
}
