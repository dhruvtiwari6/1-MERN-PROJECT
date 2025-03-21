import React from 'react';
import { BookOpen, Code, Coffee, Globe, Heart, Terminal } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            About Me
          </h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Welcome to my About page! I'm a passionate MERN stack developer with a strong background 
              in programming and data structures and algorithms (DSA). I have a knack for building 
              scalable web applications using MongoDB, Express, React, and Node.js.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              My journey into programming began with a curiosity for creating functional and 
              user-friendly applications. Over the years, I've honed my skills in JavaScript, 
              gaining proficiency in both frontend and backend development.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              As a developer, I thrive on solving complex problems and implementing efficient 
              solutions. I enjoy leveraging the latest technologies to deliver robust and dynamic 
              web experiences. From crafting RESTful APIs to designing responsive UIs, I'm committed 
              to delivering high-quality code.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Beyond coding, I'm dedicated to continuous learning and staying updated with industry 
              trends. I believe in the power of teamwork and collaboration, striving to contribute 
              positively to every project I'm involved in.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Code className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Clean Code</h3>
            <p className="text-gray-600">Committed to writing maintainable, efficient, and well-documented code.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Continuous Learning</h3>
            <p className="text-gray-600">Always exploring new technologies and staying updated with industry trends.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Passion for Tech</h3>
            <p className="text-gray-600">Deeply passionate about creating innovative solutions and learning new skills.</p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Terminal className="h-8 w-8 text-blue-600" />
              <span className="text-lg text-gray-700">Full Stack Development</span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-lg text-gray-700">Web Technologies</span>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Coffee className="h-8 w-8 text-blue-600" />
              <span className="text-lg text-gray-700">Problem Solving</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}