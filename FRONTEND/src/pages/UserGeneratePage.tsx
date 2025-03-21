import { UserContext } from "./userProvider";
import { useContext } from "react";
import { Link2, ExternalLink, ClipboardCopy } from "lucide-react";
import React from "react";
import { redirect } from "react-router-dom";

export default function UserGeneratePage() {
  const { UserDetails } = useContext(UserContext);

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!UserDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Loading your URLs...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Link2 className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Generated URLs</h2>
          </div>

          {UserDetails.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <Link2 className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <p className="text-gray-600 text-lg">No URLs generated yet.</p>
              <p className="text-gray-500 mt-2">Create your first shortened URL to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Short Link
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Original Link
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {UserDetails.map((url: { shortId: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.Key | null | undefined; redirectUrl: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }) => {
                    const shortUrl = `${url.shortId}`;
                    return (
                      <tr key={String(url.shortId)} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <a
                            href={url.redirectUrl ? String(url.redirectUrl) : "#"}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium group"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {String(url.shortId)}
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-gray-700 truncate max-w-xl" title={url.redirectUrl ? String(url.redirectUrl) : undefined}>
                              {url.redirectUrl}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleCopyUrl(shortUrl)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 
                                     hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                            title="Copy shortened URL"
                          >
                            <ClipboardCopy className="h-4 w-4" />
                            Copy
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}