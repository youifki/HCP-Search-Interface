import React, { useState, useCallback } from 'react';
import { Container, Grid, Paper, Typography, Alert } from '@mui/material';
import { SearchBar } from '../components/SearchBar.tsx';
import { SettingsPanel } from '../components/SettingsPanel.tsx';
import { SearchResults } from '../components/SearchResults.tsx';
import { ImportSection } from './components/ImportSection.tsx';
import { ResultsList } from './components/ResultsList.tsx';
import { useSearchStore } from './store/searchStore.ts';
import { performSearch, summarizeResults } from './services/search.ts';
import type { HCP, SourceData, Affiliation, Education, Contact, SearchResult } from '../types/index';

function App() {
  const {
    settings,
    updateSettings,
    results,
    setResults,
    loading,
    setLoading,
    error,
    setError,
    addNames,
    processQueue,
    isProcessing,
    reset,
  } = useSearchStore();
  const [summary, setSummary] = useState<string>('');

  const handleSearch = useCallback(async (query: string) => {
    if (!settings.apiKey || !settings.cx) {
      setError('Please configure API Key and Search Engine ID in settings');
      return;
    }

    setLoading(true);
    setError(null);
    setSummary('');

    try {
      const searchResults = await performSearch(query, settings);
      setResults(searchResults.items);

      // Generate summary using Gemini
      if (searchResults.items.length > 0) {
        const resultSummary = await summarizeResults(searchResults, settings.apiKey);
        setSummary(resultSummary);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during search');
    } finally {
      setLoading(false);
    }
  }, [settings, setError, setLoading, setResults, summarizeResults]);

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-6 text-center">
        Healthcare Search Interface
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <SettingsPanel settings={settings} onSettingsChange={updateSettings} />
          <ImportSection />
        </Grid>

        <Grid item xs={12} md={8}>
          <SearchBar onSearch={handleSearch} disabled={loading} />

          {summary && (
            <Paper className="p-4 mt-4 bg-blue-50">
              <Typography variant="h6" className="mb-2">
                AI Summary
              </Typography>
              <Typography component="pre" style={{ whiteSpace: 'pre-wrap' }}>{summary}</Typography>
            </Paper>
          )}

          <ResultsList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
