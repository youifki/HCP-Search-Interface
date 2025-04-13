export interface SourceData<T> {
  value: T;
  source: string;
}

export interface Affiliation {
  organization: SourceData<string>;
  role: SourceData<string>;
  current: SourceData<boolean>;
}

export interface Education {
  degree: SourceData<string>;
  institution: SourceData<string>;
  year: SourceData<string>;
}

export interface Contact {
  email?: SourceData<string>;
  phone?: SourceData<string>;
  address?: SourceData<string>;
}

export interface HCP {
  name: SourceData<string>;
  titles: SourceData<string>[];
  specialties: SourceData<string>[];
  education: Education[];
  affiliations: Affiliation[];
  publications: SourceData<string>[];
  contact?: Contact;
  allSources: string[];
}
