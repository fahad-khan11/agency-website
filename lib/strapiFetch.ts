const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getHeroData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/hero-section?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    return null;
  }
}

export async function getAboutHeroData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/about-heroes?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    if (!json.data || json.data.length === 0) return null;
    return json.data[0].attributes || json.data[0];
  } catch (error) {
    return null;
  }
}

export async function getAboutInfoData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/about-info?locale=${locale}&populate[teamMembers][populate]=*&populate[storyImage][populate]=*&populate[stats][populate]=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    return null;
  }
}

export async function getFaqPageData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/faq-page?locale=${locale}&populate[categories][populate][items]=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    return null;
  }
}

export async function getProjectModelData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/project-model?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    return null;
  }
}

export async function getFinancingModels(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/financing-models?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return [];
    }
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export async function getFinancingModelBySlug(slug: string, locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/financing-models?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    if (!json.data || json.data.length === 0) return null;
    return json.data[0].attributes || json.data[0];
  } catch (error) {
    return null;
  }
}

export async function getFeatureStripData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/feature-strip?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || {};
  } catch (error) {
    return null;
  }
}

export async function getProjectsData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/projects?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return [];
    }
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export async function getProjectBySlug(slug: string, locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/projects?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    const projects = json.data || [];
    return projects.length > 0 ? projects[0] : null;
  } catch (error) {
    console.error("Strapi fetch error (Project by Slug):", error);
    return null;
  }
}

export async function getCaseStudiesData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/case-studies?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return [];
    }
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Strapi fetch error (Case Studies):", error);
    return [];
  }
}

export async function getCaseStudyBySlugData(slug: string, locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/case-studies?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    const caseStudies = json.data || [];
    return caseStudies.length > 0 ? caseStudies[0] : null;
  } catch (error) {
    console.error("Strapi fetch error (Case Study by Slug):", error);
    return null;
  }
}

export async function getIndustriesData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/industries?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return [];
    }
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export async function getIndustryBySlugData(slug: string, locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/industries?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    const industries = json.data || [];
    return industries.length > 0 ? industries[0] : null;
  } catch (error) {
    return null;
  }
}

export async function getServicesData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/services?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    if (!res.ok) {
        return [];
    }
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export async function getServiceBySlugData(slug: string, locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    if (!res.ok) {
        return null;
    }
    const json = await res.json();
    const services = json.data || [];
    return services.length > 0 ? services[0] : null;
  } catch (error) {
    return null;
  }
}
export async function getBlogPosts(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/blog-posts?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    if (!res.ok) {
        return [];
    }
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Strapi fetch error (Blog Posts):", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string, locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    if (!res.ok) {
        return null;
    }
    const json = await res.json();
    const posts = json.data || [];
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error("Strapi fetch error (Blog Post by Slug):", error);
    return null;
  }
}
export async function getServicesSectionData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/services-section?locale=${locale}&populate[Services]=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    console.error("Strapi fetch error (Services Section):", error);
    return null;
  }
}
export async function getOrangeStatementData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/orange-statement?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    console.error("Strapi fetch error (Orange Statement):", error);
    return null;
  }
}
export async function getProcessSectionData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/process-section?locale=${locale}&populate[steps]=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    console.error("Strapi fetch error (Process Section):", error);
    return null;
  }
}
export async function getTestimonialsData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/testimonials?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return [];
    }
    
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Strapi fetch error (Testimonials):", error);
    return [];
  }
}

export async function getTestimonialsSectionData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/testimonials-section?locale=${locale}&populate=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    console.error("Strapi fetch error (Testimonials Section):", error);
  }
}

export async function getFooterData(locale: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/footer?locale=${locale}&populate[socialLinks]=*`, {
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
        return null;
    }
    
    const json = await res.json();
    return json.data?.attributes || json.data || null;
  } catch (error) {
    console.error("Strapi fetch error (Footer):", error);
    return null;
  }
}
