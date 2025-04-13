export * from './hcp';

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  pagemap?: {
    metatags?: Array<Record<string, string>>;
  };
}

export interface SearchResponse {
  items: SearchResult[];
  searchInformation: {
    totalResults: string;
    searchTime: number;
  };
}

export interface SearchSettings {
  apiKey: string;
  cx: string;
  siteFilter: string;
  geolocation: string;
  numResults: number;
  aiModel: string;
}

export interface SearchState {
  settings: SearchSettings;
  updateSettings: (settings: Partial<SearchSettings>) => void;
  results: any[];
  setResults: (results: any[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  names: string[];
  addNames: (names: string[]) => void;
  processQueue: () => void;
  isProcessing: boolean;
  reset: () => void;
}
