// Get image by path from Supabase Storage
import { createClient } from "@/utils/supabase/client";
const supabaseEndpoint = process.env.NEXT_PUBLIC_SUPABASE_URL;
const baseUrl = `${supabaseEndpoint}/storage/v1/object/public/upload/`;

// Get product related images, return image URLs
export async function getProductImageUrls(productId) {

    try {
        const supabase = createClient()
        const productImages = await supabase
            .schema('lumanest')
            .from('product_image')
            .select('*')
            .eq('product_id', productId);
        const thumbnailImage = productImages.data.find(img => img.type === 'thumbnail');
        const galleryImages = productImages.data.filter(img => img.type === 'gallery');
        return {
            thumbnail: thumbnailImage ? `${baseUrl}${thumbnailImage.url}` : null,
            gallery: galleryImages.map(img => `${baseUrl}${img.url}`)
        };
    } catch (error) {
        console.error('Error fetching product images:', error);
        return {
            thumbnail: null,
            gallery: []
        };
    }
}

export async function getBatchProductImages(productIds) {
    const supabase = createClient();



    try {
        // Fetch all images for all product IDs in 1 query
        const { data, error } = await supabase
            .schema('lumanest')
            .from('product_image')
            .select('product_id, url, type')
            .in('product_id', productIds)
            .order('type', { ascending: true }); // thumbnail first

        if (error) throw error;

        // Group images by product_id
        const imageMap = {};
        data.forEach((img) => {
            if (!imageMap[img.product_id]) {
                imageMap[img.product_id] = { thumbnail: null, gallery: [] };
            }

            if (img.type === 'thumbnail') {
                imageMap[img.product_id].thumbnail = `${baseUrl}${img.url}`;
            } else {
                imageMap[img.product_id].gallery.push(`${baseUrl}${img.url}`);
            }
        });

        return imageMap;
    } catch (err) {
        console.error('❌ Error fetching batch images:', err);
        return {};
    }
}