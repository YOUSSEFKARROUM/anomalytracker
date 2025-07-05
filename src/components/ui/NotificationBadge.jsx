import React from 'react';

const NotificationBadge = ({ count = 0, maxCount = 99, className = '' }) => {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <div
      className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-error text-error-foreground text-xs font-semibold rounded-full flex items-center justify-center px-1 z-10 ${className}`}
    >
      <span className="leading-none">{displayCount}</span>
    </div>
  );
};

export default NotificationBadge;