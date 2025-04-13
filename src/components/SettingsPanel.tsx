import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Slider,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import { ChevronDown, Eye, EyeOff, Globe, Key, Search, Settings2, SlidersHorizontal, Zap } from 'lucide-react';
import { SearchSettings } from '../types';

interface SettingsPanelProps {
  settings: SearchSettings;
  onSettingsChange: (settings: Partial<SearchSettings>) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
}) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [expanded, setExpanded] = useState<string | false>('api');

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="space-y-4">
      <Paper className="p-4">
        <Typography variant="h6" className="flex items-center gap-2 mb-4">
          <Settings2 className="w-5 h-5" />
          Search Settings
        </Typography>

        <Accordion
          expanded={expanded === 'api'}
          onChange={handleAccordionChange('api')}
          className="shadow-none border rounded-lg mb-2"
        >
          <AccordionSummary
            expandIcon={<ChevronDown />}
            className="bg-gray-50"
          >
            <Typography className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              API Configuration
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="space-y-4">
            <TextField
              fullWidth
              label="Google API Key"
              value={settings.apiKey}
              onChange={(e) => onSettingsChange({ apiKey: e.target.value })}
              type={showApiKey ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowApiKey(!showApiKey)}
                      edge="end"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Custom Search Engine ID (CX)"
              value={settings.cx}
              onChange={(e) => onSettingsChange({ cx: e.target.value })}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'search'}
          onChange={handleAccordionChange('search')}
          className="shadow-none border rounded-lg mb-2"
        >
          <AccordionSummary
            expandIcon={<ChevronDown />}
            className="bg-gray-50"
          >
            <Typography className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search Parameters
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="space-y-4">
            <TextField
              fullWidth
              label="Site Filter"
              value={settings.siteFilter}
              onChange={(e) => onSettingsChange({ siteFilter: e.target.value })}
              placeholder="example.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Globe className="w-4 h-4" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label="Geolocation"
              value={settings.geolocation}
              onChange={(e) => onSettingsChange({ geolocation: e.target.value })}
              placeholder="US"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Globe className="w-4 h-4" />
                  </InputAdornment>
                ),
              }}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'advanced'}
          onChange={handleAccordionChange('advanced')}
          className="shadow-none border rounded-lg"
        >
          <AccordionSummary
            expandIcon={<ChevronDown />}
            className="bg-gray-50"
          >
            <Typography className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Advanced Options
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="space-y-4">
            <div>
              <Typography gutterBottom>Number of Results</Typography>
              <Slider
                value={settings.numResults}
                onChange={(_, value) => onSettingsChange({ numResults: value as number })}
                min={1}
                max={10}
                marks
                step={1}
                valueLabelDisplay="auto"
                className="px-2"
              />
            </div>
            
            <FormControl fullWidth>
              <InputLabel>AI Model</InputLabel>
              <Select
                value={settings.aiModel}
                label="AI Model"
                onChange={(e) => onSettingsChange({ aiModel: e.target.value })}
              >
                <MenuItem value="gemini-2.0-flash">
                  <div className="flex items-center gap-2">
                    Gemini 2.0 Flash
                    <Tooltip title="Latest and fastest model" arrow>
                      <span className="flex items-center gap-1 text-xs bg-yellow-100 px-2 py-0.5 rounded text-yellow-700">
                        <Zap className="w-3 h-3" />
                        Fastest
                      </span>
                    </Tooltip>
                  </div>
                </MenuItem>
                <MenuItem value="gemini-pro">Gemini Pro</MenuItem>
                <MenuItem value="gemini-pro-vision">Gemini Pro Vision</MenuItem>
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
};