import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Alert } from '@mui/material';
import { SearchBar } from './components/SearchBar';
import { SettingsPanel } from './components/SettingsPanel';
import { SearchResults } from './components/SearchResults';
import { useSearchStore } from './store/searchStore';
import { performSearch, summarizeResults } from './services/search';

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
  } = useSearchStore();
  const [summary, setSummary] = useState<string>('');

  const handleSearch = async (query: string) => {
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
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-6 text-center">
        Healthcare Search Interface
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <SettingsPanel settings={settings} onSettingsChange={updateSettings} />
        </Grid>

        <Grid item xs={12} md={8}>
          <SearchBar onSearch={handleSearch} disabled={loading} />

          {summary && (
            <Paper className="p-4 mt-4 bg-blue-50">
              <Typography variant="h6" className="mb-2">
                AI Summary
              </Typography>
              <Typography>{summary}</Typography>
            </Paper>
          )}

          <SearchResults results={results} loading={loading} error={error} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;