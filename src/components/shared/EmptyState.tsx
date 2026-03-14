import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="mb-4 text-gray-300">{icon}</div>}
      <h3 className="text-heading-3 text-navy-700 mb-2">{title}</h3>
      {description && (
        <p className="text-body text-gray-500 max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}
