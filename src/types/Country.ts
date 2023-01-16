export interface Country {
    name: Name;
    cca2: string;
    cca3: string;
    altSpellings: string[];
    idd: Idd;
    flags: Flags;
    capital: string[];
    languages: Languages;
    translations: { [key: string]: Translation };
    latlng: number[];
    landlocked: boolean;
    borders: string[];
    area: number;
    flag: string;
    population: number;
    fifa: string;
    timezones: string[];
    continents: string[];
    startOfWeek: string;
    postalCode: PostalCode;
    unMember: boolean;
    independent: boolean;
  }

  export interface Name {
    common: string;
    official: string;
    nativeName: NativeName;
  }

  export interface NativeName {
    eng: Translation;
    zho: Translation;
  }

  export interface Translation {
    official: string;
    common: string;
  }
  
  export interface Idd {
    root: string;
    suffixes: string[];
  }

  export interface Flags {
    png: string;
    svg: string;
  }

  export interface Currency {
    name: string;
    symbol: string;
  }

  export interface PostalCode {
    format: string;
    regex: string;
  }
  
  export interface Languages {
    eng: string;
  }
