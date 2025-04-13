import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { TextField, Button, Paper } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, disabled }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} className="flex gap-2 p-2">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for HCP or HCO..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={disabled}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={disabled || !query.trim()}
        className="px-6"
      >
        <Search className="w-5 h-5" />
      </Button>
    </Paper>
  );
};