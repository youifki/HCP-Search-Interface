import React from 'react';
import { Paper, Typography, Link, CircularProgress } from '@mui/material';
import { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Paper className="p-4 mt-4 bg-red-50">
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  if (results.length === 0) {
    return (
      <Paper className="p-4 mt-4">
        <Typography>No results found. Try adjusting your search terms.</Typography>
      </Paper>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {results.map((result, index) => (
        <Paper key={index} className="p-4">
          <Link href={result.link} target="_blank" rel="noopener noreferrer">
            <Typography variant="h6" color="primary">
              {result.title}
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary" className="mb-2">
            {result.link}
          </Typography>
          <Typography variant="body1">{result.snippet}</Typography>
        </Paper>
      ))}
    </div>
  );
};