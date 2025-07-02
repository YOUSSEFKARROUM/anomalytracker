import React from 'react';

const NewsSkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-background border border-border rounded-lg shadow-card overflow-hidden animate-pulse">
          <div className="relative">
            <div className="w-full h-48 bg-surface"></div>
            <div className="absolute top-3 left-3 w-16 h-6 bg-surface rounded-full"></div>
            <div className="absolute top-3 right-3 w-20 h-6 bg-surface rounded-md"></div>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              <div className="h-5 bg-surface rounded w-3/4"></div>
              <div className="h-5 bg-surface rounded w-1/2"></div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="h-4 bg-surface rounded"></div>
              <div className="h-4 bg-surface rounded"></div>
              <div className="h-4 bg-surface rounded w-2/3"></div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-surface rounded-full"></div>
                <div className="h-3 bg-surface rounded w-16"></div>
              </div>
              <div className="h-8 bg-surface rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeletonLoader;