
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQItem } from '../../utils/structuredData';

interface BlogFAQProps {
  faqs: FAQItem[];
  title?: string;
}

const BlogFAQ = ({ faqs, title = "Často kladené otázky" }: BlogFAQProps) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 bg-gray-50 rounded-lg p-6" itemScope itemType="https://schema.org/FAQPage">
      <h3 className="text-xl font-bold text-poda-blue mb-6">{title}</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm border border-gray-200"
            itemScope 
            itemType="https://schema.org/Question"
          >
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => toggleItem(index)}
              aria-expanded={openItems.has(index)}
            >
              <span 
                className="font-medium text-gray-900 pr-4"
                itemProp="name"
              >
                {faq.question}
              </span>
              {openItems.has(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {openItems.has(index) && (
              <div 
                className="px-6 pb-4 text-gray-700"
                itemScope 
                itemType="https://schema.org/Answer"
              >
                <div itemProp="text">{faq.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogFAQ;
