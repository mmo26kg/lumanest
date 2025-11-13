import 'dotenv/config'; // ✅ Load .env.local
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

// ✅ Fix __dirname cho ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Fix: Dùng process.env thay vì import.meta.env
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ✅ Kiểm tra env variables
if (!UNSPLASH_ACCESS_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Thiếu biến môi trường! Kiểm tra .env.local');
    console.error('Cần có: UNSPLASH_ACCESS_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const BUCKET_NAME = 'upload';
const FOLDER_IN_BUCKET = 'product-image';

// Thư mục tạm lưu ảnh
const DOWNLOAD_DIR = path.join(__dirname, 'temp_images');
if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR);
}

// === Danh sách keyword ===
const keywords = [
    'Full-Length Wall Mirror', '3-Bar Towel Rack', '5-Cube Wall Shelf', 'Tall Glass Vase', 'Feather Hug Pillow', 'Round Bathroom Mirror', 'Bathroom Storage Shelf', 'Toothbrush & Cup Holder', 'Anti-Slip Bath Mat', 'Artisan Knife Set', 'Eco Spice Rack', 'Timeless 3-Layer Pot', 'Pine Spice Jar Set',
];

// === Hàm chính ===
async function main() {
    console.log('🚀 Bắt đầu tải và upload ảnh từ Unsplash...\n');

    for (const keyword of keywords) {
        console.log(`📸 Đang xử lý keyword: "${keyword}"`);
        await processKeyword(keyword);
        console.log(`✅ Hoàn thành "${keyword}"\n`);
    }

    console.log('🎉 Tất cả hoàn tất! Đã xóa file tạm.');
    fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true });
}

// === Xử lý từng keyword ===
async function processKeyword(keyword) {
    try {
        const searchResponse = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: keyword,
                per_page: 3,
                orientation: 'landscape'
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });

        const photos = searchResponse.data.results;
        if (photos.length === 0) {
            console.log(`⚠️  Không tìm thấy ảnh cho "${keyword}"`);
            return;
        }

        console.log(`   Tìm thấy ${photos.length} ảnh`);

        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            const imageUrl = photo.urls.raw;
            const fileName = `${keyword}_${Date.now()}_${i + 1}.jpg`;
            const localPath = path.join(DOWNLOAD_DIR, fileName);

            await downloadImage(imageUrl, localPath);
            console.log(`   📥 Tải: ${fileName}`);

            const fileBuffer = fs.readFileSync(localPath);
            const supabasePath = `${FOLDER_IN_BUCKET}/${fileName}`;

            const { data, error } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(supabasePath, fileBuffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: 'image/jpeg'
                });

            if (error) {
                if (error.statusCode === 409) {
                    console.log(`   ⚠️  File đã tồn tại: ${fileName}`);
                } else {
                    console.error(`   ❌ Lỗi upload ${fileName}:`, error.message);
                }
            } else {
                console.log(`   ✅ Upload thành công: ${supabasePath}`);
            }

            try {
                await axios.get(photo.links.download_location, {
                    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
                });
            } catch (err) {
                // Bỏ qua lỗi trigger
            }

            fs.unlinkSync(localPath);
        }
    } catch (err) {
        console.error(`❌ Lỗi xử lý "${keyword}":`, err.message);
    }
}

// === Hàm tải ảnh ===
async function downloadImage(url, filepath) {
    const writer = fs.createWriteStream(filepath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
        params: { fm: 'jpg', q: 85, w: 1920 }
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// === Chạy ===
main().catch((err) => {
    console.error('❌ Lỗi nghiêm trọng:', err);
    process.exit(1);
});