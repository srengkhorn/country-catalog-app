export interface Country {
    name: Name;
    cca2: string;
    cca3: string;
    altSpellings: string[];
    idd: Idd;
    flags: Flags;
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