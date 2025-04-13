import React from 'react';
import { useSearchStore } from '../store/searchStore';
import { HCPCard } from './HCPCard';
import { Loader2, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function ResultsList() {
  const { results } = useSearchStore();

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-8">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {results.map((result, index) => (
              <tr key={`${result.name}-${index}`}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {result.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    {result.status === 'pending' && (
                      <>
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-500">Pending</span>
                      </>
                    )}
                    {result.status === 'loading' && (
                      <>
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                        <span className="text-blue-500">Searching...</span>
                      </>
                    )}
                    {result.status === 'success' && (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-600">Found</span>
                      </>
                    )}
                    {result.status === 'error' && (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-red-600">{result.error || 'Error'}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  {result.status === 'success' && result.data && (
                    <div className="mt-4">
                      <HCPCard hcp={result.data} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}