import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SearchSettings, SearchResponse } from '../types';

export async function performSearch(query: string, settings: SearchSettings) {
  const params = {
    key: settings.apiKey,
    cx: settings.cx,
    q: query,
    num: settings.numResults,
    ...(settings.siteFilter && { siteSearch: settings.siteFilter }),
    ...(settings.geolocation && { gl: settings.geolocation }),
  };

  const response = await axios.get<SearchResponse>(
    'https://www.googleapis.com/customsearch/v1',
    { params }
  );

  return response.data;
}

export async function summarizeResults(results: SearchResponse, apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Summarize these search results, focusing on healthcare professional (HCP) and healthcare organization (HCO) relevant information. For each claim in the summary, include the source URL in parentheses after the claim. Provide the output in JSON format, compliant with the following HCP mapping: {name: string, titles: string[], specialties: string[], education: {degree: string, institution: string, year: string}[], affiliations: {organization: string, role: string, current: boolean}[], publications: string[], contact: {email: string, phone: string, address: string}}:\\n\\n${results.items
    .map((item) => `${item.title}\\n${item.snippet}\\nSource: ${item.link}\\n`)
    .join('\\n')}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
