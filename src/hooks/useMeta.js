'use client'
import { useEffect } from "react";

/**
 * Custom hook để quản lý metadata của trang
 * @param {Object} options - Metadata options
 * @param {string} options.title - Page title
 * @param {string} options.description - Meta description
 * @param {string} options.keywords - Meta keywords
 * @param {string} options.ogImage - Open Graph image URL
 * @param {string} options.ogType - Open Graph type (default: website)
 * @param {string} options.canonical - Canonical URL
 */
export default function useMeta({
    title,
    description,
    keywords,
    ogImage,
    ogType = 'website',
    canonical
}) {
    useEffect(() => {
        // Set title
        if (title) {
            document.title = title;
        }

        // Helper function to update or create meta tag
        const updateMetaTag = (selector, attributeName, attributeValue, content) => {
            let meta = document.querySelector(selector);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attributeName, attributeValue);
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        // Update description
        if (description) {
            updateMetaTag('meta[name="description"]', 'name', 'description', description);
            updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
            updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
        }

        // Update keywords
        if (keywords) {
            updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
        }

        // Update Open Graph title
        if (title) {
            updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
            updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
        }

        // Update Open Graph image
        if (ogImage) {
            updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
            updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
        }

        // Update Open Graph type
        updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);

        // Update canonical URL
        if (canonical) {
            let link = document.querySelector('link[rel="canonical"]');
            if (!link) {
                link = document.createElement('link');
                link.rel = 'canonical';
                document.head.appendChild(link);
            }
            link.href = canonical;
        }

        // Update Open Graph URL
        if (canonical) {
            updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical);
        }

    }, [title, description, keywords, ogImage, ogType, canonical]);
}