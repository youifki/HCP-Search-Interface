import React, { useCallback } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { useSearchStore } from '../store/searchStore';

export function ImportSection() {
  const { addNames, processQueue, isProcessing, reset } = useSearchStore();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === 'text/csv') {
      Papa.parse(file, {
        complete: (results) => {
          const names = results.data.flat().filter(Boolean).map(String);
          addNames(names);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          alert('Error parsing CSV file. Please check the format.');
        }
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const names = text.split('\n').filter(Boolean).map(name => name.trim());
          addNames(names);
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  }, [addNames]);

  const handleTextImport = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const textarea = form.querySelector('textarea');
    if (!textarea?.value) return;

    const names = textarea.value.split('\n').filter(Boolean).map(name => name.trim());
    addNames(names);
    textarea.value = '';
  }, [addNames]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Import HCP Names</h2>
        <button
          onClick={reset}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".txt,.csv"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drop a file or click to upload
            </p>
            <p className="text-xs text-gray-500">
              Supports .txt (one name per line) or .csv
            </p>
          </div>
        </div>

        <div>
          <form onSubmit={handleTextImport} className="space-y-4">
            <textarea
              placeholder="Paste names here (one per line)"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Import Names
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => processQueue()}
          disabled={isProcessing}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              Process All Names
            </>
          )}
        </button>
      </div>
    </div>
  );
}