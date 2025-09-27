import React from 'react';

interface AIContentSummaryProps {
  title: string;
  summary: string;
  services?: string[];
  location?: string;
  keyPoints?: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

/**
 * AI-readable content summary component that provides structured information
 * at the beginning of each page for better AI comprehension
 */
export const AIContentSummary: React.FC<AIContentSummaryProps> = ({
  title,
  summary,
  services = [],
  location,
  keyPoints = [],
  contactInfo
}) => {
  return (
    <div 
      className="sr-only" 
      itemScope 
      itemType="https://schema.org/WebPageElement"
      aria-label="Content summary for accessibility and AI"
    >
      {/* Main content summary */}
      <div itemProp="description">
        <h1 itemProp="headline">{title}</h1>
        <p itemProp="text">{summary}</p>
      </div>

      {/* Services offered */}
      {services.length > 0 && (
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span itemProp="description">
            Nabízené služby: {services.join(', ')}
          </span>
        </div>
      )}

      {/* Location information */}
      {location && (
        <div itemProp="serviceArea" itemScope itemType="https://schema.org/Place">
          <span itemProp="name">
            Oblast poskytování služeb: {location}
          </span>
        </div>
      )}

      {/* Key points */}
      {keyPoints.length > 0 && (
        <div itemProp="mainEntity">
          <ul>
            {keyPoints.map((point, index) => (
              <li key={index} itemProp="about">{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact information */}
      {contactInfo && (
        <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
          {contactInfo.phone && (
            <span itemProp="telephone">Telefon: {contactInfo.phone}</span>
          )}
          {contactInfo.email && (
            <span itemProp="email">Email: {contactInfo.email}</span>
          )}
        </div>
      )}

      {/* Structured FAQ for common questions */}
      <div itemScope itemType="https://schema.org/FAQPage">
        <div itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
          <h3 itemProp="name">Co nabízíme?</h3>
          <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
            <div itemProp="text">
              Poskytujeme rychlé internetové připojení PODA s TV zdarma, 
              profesionální instalaci a non-stop podporu.
            </div>
          </div>
        </div>
        
        <div itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
          <h3 itemProp="name">Kde poskytujeme služby?</h3>
          <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
            <div itemProp="text">
              Ostrava, Karviná, Havířov, Bohumín, Poruba a okolní oblasti 
              v Moravskoslezském kraji.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};