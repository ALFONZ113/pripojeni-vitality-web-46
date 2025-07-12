
/**
 * Date formatting utilities for sitemap generation
 */

/**
 * Format date to ISO 8601 format (YYYY-MM-DD)
 */
export const formatDateISO = (dateStr: string): string => {
  try {
    if (!dateStr) {
      return new Date().toISOString().split('T')[0];
    }
    
    // Handle Czech date format (dd. mm. yyyy)
    if (dateStr.includes('. ')) {
      const parts = dateStr.split('. ');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
    }
    
    // Fallback to current date if parsing fails
    return new Date().toISOString().split('T')[0];
  } catch (error) {
    console.warn('Date parsing error:', error);
    return new Date().toISOString().split('T')[0];
  }
};
