
import React from 'react';

interface MessageFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  compact: boolean;
}

const MessageField = ({ value, onChange, isLoading, compact }: MessageFieldProps) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
        Zpráva nebo poznámka
      </label>
      <textarea
        id="message"
        name="message"
        value={value}
        onChange={onChange}
        rows={compact ? 3 : 4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
        placeholder="Napište nám, pokud máte nějaké specifické požadavky nebo dotazy..."
        disabled={isLoading}
      ></textarea>
    </div>
  );
};

export default MessageField;
