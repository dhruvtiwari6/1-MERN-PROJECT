import { useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './userProvider';
import { Link2, ArrowRight, Globe } from 'lucide-react';
import React from 'react';

export default function HomePage() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const urlInputRef = useRef<HTMLInputElement>(null);
  const { UserDetails, setUserDetails } = useContext(UserContext);

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    const urlEntered = urlInputRef.current?.value;

    if (urlEntered === "") {
      return alert("Please enter a URL to shorten");
    }

    try {
      console.log(urlEntered);
      const response = await axios.post("http://localhost:3000/GenerateUrl", { url: urlEntered } ,{withCredentials: true});
      setUserDetails(response.data.data);
      navigate('/userURL');
    } catch (error) {
      console.log("axios error:", error.response);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Link2 className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              URL Shortener
            </h1>
            <p className="text-gray-600">
              Transform your long URLs into short, shareable links
            </p>
          </div>

          <form onSubmit={handleShortenUrl} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                ref={urlInputRef}
                className="block w-full pl-11 pr-12 py-3 text-gray-900 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                         placeholder:text-gray-400 text-base"
                placeholder="Enter your URL here..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔗</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white 
                       rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 transition-colors duration-200 font-medium"
            >
              Shorten URL
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Globe className="h-4 w-4" />
              <span>Fast, secure, and reliable URL shortening</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}