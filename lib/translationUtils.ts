// Utility function to get category translation key
export function getCategoryKey(category: string): string {
  const categoryMap: Record<string, string> = {
    "E-Commerce / Branding": "ecommerceBranding",
    "Web App / FinTech": "webAppFintech",
    "Digital Experience": "digitalExperience"
  };
  
  return categoryMap[category] || category;
}

// Utility function to get testimonial key by index
export function getTestimonialKey(index: number): string {
  return `testimonial${index + 1}`;
}
