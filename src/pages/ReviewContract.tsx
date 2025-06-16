import React, { useState } from 'react';
import { Scale, Upload, FileText, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

interface EvaluationQuestion {
  id: string;
  question: string;
  answer: string;
  status: 'good' | 'warning' | 'critical';
}

const ReviewContract: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [contractType, setContractType] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationQuestion[]>([]);

  const contractTypes = [
    { value: 'msa', label: 'Master Service Agreement (MSA)' },
    { value: 'nda', label: 'Non-Disclosure Agreement (NDA)' },
    { value: 'sla', label: 'Service Level Agreement (SLA)' },
    { value: 'employment', label: 'Employment Contract' },
    { value: 'vendor', label: 'Vendor Agreement' }
  ];

  const mockEvaluations: { [key: string]: EvaluationQuestion[] } = {
    msa: [
      {
        id: '1',
        question: 'Are the service scope and deliverables clearly defined?',
        answer: 'Yes, the contract clearly outlines all service deliverables, timelines, and acceptance criteria in Section 3.1-3.4.',
        status: 'good'
      },
      {
        id: '2',
        question: 'Is there adequate intellectual property protection?',
        answer: 'Partially addressed. While IP ownership is mentioned, work-for-hire clauses could be more comprehensive.',
        status: 'warning'
      },
      {
        id: '3',
        question: 'Are liability limitations properly structured?',
        answer: 'Critical issue: Liability cap is set too high at 2x contract value. Industry standard is typically 1x annual fees.',
        status: 'critical'
      },
      {
        id: '4',
        question: 'Does the contract include proper termination clauses?',
        answer: 'Yes, termination rights are well-defined with 30-day notice period and proper wind-down procedures.',
        status: 'good'
      },
      {
        id: '5',
        question: 'Are payment terms and conditions favorable?',
        answer: 'Payment terms are reasonable with 30-day NET terms, but late payment penalties should be included.',
        status: 'warning'
      }
    ],
    nda: [
      {
        id: '1',
        question: 'Is confidential information properly defined?',
        answer: 'Yes, confidential information is broadly and appropriately defined in Section 1 with proper exclusions.',
        status: 'good'
      },
      {
        id: '2',
        question: 'Are the permitted uses of confidential information clear?',
        answer: 'The permitted uses are somewhat vague and could be more specific to avoid potential disputes.',
        status: 'warning'
      },
      {
        id: '3',
        question: 'Is the term and duration appropriate?',
        answer: 'Critical concern: 10-year confidentiality period is excessive for this type of business relationship.',
        status: 'critical'
      }
    ]
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyzeContract = () => {
    if (!selectedFile || !contractType) {
      alert('Please upload a document and select contract type');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockEvaluation = mockEvaluations[contractType] || mockEvaluations.msa;
      setEvaluation(mockEvaluation);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'critical':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-teal-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Review Contract</h1>
              <p className="text-gray-600">Upload and analyze contracts with AI-powered evaluation</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Contract Document</h3>
                <p className="text-gray-600 mb-4">Support for Word documents, PDFs, and text files</p>
                <input
                  type="file"
                  accept=".doc,.docx,.pdf,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 cursor-pointer transition-colors"
                >
                  Choose File
                </label>
                {selectedFile && (
                  <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span className="text-sm text-teal-800">{selectedFile.name}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Type *
                </label>
                <select
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select contract type</option>
                  {contractTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAnalyzeContract}
                disabled={isAnalyzing || !selectedFile || !contractType}
                className="w-full mt-6 bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Contract...</span>
                  </>
                ) : (
                  <>
                    <Scale className="w-5 h-5" />
                    <span>Analyze Contract</span>
                  </>
                )}
              </button>
            </div>

            {/* Results Section */}
            <div>
              {evaluation.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Evaluation Results</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {evaluation.map((item) => (
                      <div
                        key={item.id}
                        className={`border rounded-lg p-4 ${getStatusColor(item.status)}`}
                      >
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(item.status)}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                            <p className="text-sm text-gray-700">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Next Step</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-2">
                      Need to compare this contract with another version? Use our Contract Comparison tool 
                      to identify changes and get detailed AI insights.
                    </p>
                  </div>
                </div>
              )}
              
              {evaluation.length === 0 && !isAnalyzing && (
                <div className="text-center py-12">
                  <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                  <p className="text-gray-600">Upload a contract document and select its type to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewContract;