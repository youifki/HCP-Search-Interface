import React from 'react';
import { Building2, GraduationCap, Phone, Mail, MapPin, BookOpen, Award, FileText } from 'lucide-react';
import type { HCP, SourceData } from '../types/hcp';

interface HCPCardProps {
  hcp: HCP;
}

function SourceLink({ source }: { source: string }) {
  if (source.startsWith('http')) {
    return (
      <a 
        href={source}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 hover:underline ml-2"
      >
        Source
      </a>
    );
  }
  return <span className="text-xs text-gray-500 ml-2">{source}</span>;
}

function DataWithSource<T>({ data }: { data: SourceData<T> }) {
  return (
    <div className="flex items-baseline justify-between">
      <span>{String(data.value)}</span>
      <SourceLink source={data.source} />
    </div>
  );
}

export function HCPCard({ hcp }: HCPCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="border-b pb-4 mb-4">
        <DataWithSource data={hcp.name} />
        {hcp.titles.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {hcp.titles.map((title, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {title.value}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {hcp.specialties.length > 0 && (
          <div className="flex items-start gap-2">
            <Award className="w-5 h-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
              {hcp.specialties.map((specialty, i) => (
                <DataWithSource key={i} data={specialty} />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-start gap-2">
          <GraduationCap className="w-5 h-5 text-gray-500 mt-1" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-2">Education</h4>
            {hcp.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <DataWithSource data={edu.degree} />
                <div className="text-sm text-gray-600">
                  <DataWithSource data={edu.institution} />
                  <DataWithSource data={edu.year} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Building2 className="w-5 h-5 text-gray-500 mt-1" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-2">Affiliations</h4>
            {hcp.affiliations.map((aff, i) => (
              <div key={i} className="mb-2">
                <DataWithSource data={aff.organization} />
                <div className="text-sm text-gray-600">
                  <DataWithSource data={aff.role} />
                  <span className={aff.current.value ? 'text-green-600' : 'text-gray-500'}>
                    {aff.current.value ? '(Current)' : '(Past)'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {hcp.publications.length > 0 && (
          <div className="flex items-start gap-2">
            <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-2">Publications</h4>
              {hcp.publications.map((pub, i) => (
                <DataWithSource key={i} data={pub} />
              ))}
            </div>
          </div>
        )}

        {hcp.contact && (
          <div className="flex items-start gap-2">
            <FileText className="w-5 h-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
              {hcp.contact.email && <DataWithSource data={hcp.contact.email} />}
              {hcp.contact.phone && <DataWithSource data={hcp.contact.phone} />}
              {hcp.contact.address && <DataWithSource data={hcp.contact.address} />}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">
            Data collected from {hcp.allSources.length} sources. Click on source links to verify information.
          </p>
        </div>
      </div>
    </div>
  );
}