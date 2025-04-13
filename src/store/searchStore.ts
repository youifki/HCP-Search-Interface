import { create } from 'zustand';
import { SearchState, SearchSettings } from '../types';

const DEFAULT_SETTINGS: SearchSettings = {
  apiKey: '',
  cx: '',
  siteFilter: '',
  geolocation: '',
  numResults: 10,
  aiModel: 'gemini-2.0-flash',
};

export const useSearchStore = create<SearchState>((set) => ({
  settings: DEFAULT_SETTINGS,
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  results: [],
  setResults: (results) => set({ results }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));