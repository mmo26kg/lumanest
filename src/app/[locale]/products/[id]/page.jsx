"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
    FaStar,
    FaChevronDown,
    FaMinus,
    FaPlus,
    FaRegHeart,
} from "react-icons/fa"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent } from "@/components/ui/card"
import { useParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { getProductImageUrls, getBatchProductImages } from "@/lib/image"
import { Loading } from "@/components/ui/loading"
import { Link } from "@/i18n/navigation"

// ✅ Utility: Animated Section
const AnimatedSection = ({ children, className }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={className}
    >
        {children}
    </motion.div>
)

// ✅ Hero Section - Dynamic Background
const HeroSection = ({ heroImage }) => (
    <div
        className="w-full bg-center bg-no-repeat bg-cover min-h-[60vh] md:min-h-[90vh] flex flex-col justify-end"
        style={{
            backgroundImage: `url("${heroImage || 'https://placehold.co/1920x1080/ef4444/ffffff?text=No+Hero+Image'}")`,
        }}
    >
        <div className="w-full pt-24 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
    </div>
)

// ✅ Product Intro - Dynamic Content
const ProductIntro = ({ name, story, tagline }) => (
    <AnimatedSection className="flex flex-col items-center text-center -mt-24">
        <h1 className="text-foreground tracking-tight text-4xl md:text-5xl font-sans font-medium leading-tight pb-4 pt-6">
            {name}
        </h1>
        {tagline && (
            <p className="text-primary/80 text-lg font-semibold mb-2">
                {tagline}
            </p>
        )}
        <p className="text-foreground/90 text-base font-normal font-serif leading-relaxed pb-8 pt-1 px-4 max-w-2xl mx-auto">
            {story}
        </p>
    </AnimatedSection>
)

// ✅ Image Grid - Dynamic Gallery
const ImageGrid = ({ galleryImages }) => {
    if (!galleryImages || galleryImages.length === 0) {
        return (
            <div className="p-4 text-center text-muted-foreground">
                No gallery images available
            </div>
        )
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 md:gap-6 p-4">
            {galleryImages.map((imgUrl, idx) => (
                <AnimatedSection key={idx}>
                    <AspectRatio ratio={4 / 5}>
                        <div
                            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg"
                            style={{
                                backgroundImage: `url("${imgUrl}")`,
                            }}
                        ></div>
                    </AspectRatio>
                </AnimatedSection>
            ))}
        </div>
    )
}

// ✅ Feature Callout - Dynamic
const FeatureCallout = ({ tagline, materialInfo }) => (
    <AnimatedSection className="py-16 md:py-24 text-center">
        <h2 className="text-foreground text-3xl md:text-4xl font-sans font-medium leading-tight tracking-tight px-4 pb-4">
            {tagline}
        </h2>
        <p className="text-foreground/90 text-base font-serif leading-relaxed max-w-xl mx-auto">
            {materialInfo}
        </p>
    </AnimatedSection>
)

// ✅ Spec Item Component
const SpecItem = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="group p-4 border-b border-border last:border-b-0 font-serif"
        >
            <CollapsibleTrigger asChild>
                <button className="flex items-center justify-between cursor-pointer list-none w-full">
                    <span className="text-lg font-medium text-foreground">{title}</span>
                    <FaChevronDown className="text-foreground/80 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 text-foreground/80 space-y-2 text-sm leading-relaxed">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}

// ✅ Specifications - Dynamic
const Specifications = ({ product, locale }) => (
    <AnimatedSection className="border-t border-border divide-y divide-border max-w-2xl mx-auto w-full">
        <SpecItem title={locale === 'vi' ? 'Kích thước & Vật liệu' : 'Dimensions & Materials'} defaultOpen>
            <p>
                <strong>{locale === 'vi' ? 'Kích thước:' : 'Overall:'}</strong>{' '}
                {product.dimensions_width}W x {product.dimensions_depth}D x {product.dimensions_height}H (cm)
            </p>
            <p>
                <strong>{locale === 'vi' ? 'Vật liệu:' : 'Material:'}</strong>{' '}
                {locale === 'vi' ? product.material_primary_vi : product.material_primary_en}
            </p>
            <p>
                <strong>{locale === 'vi' ? 'Lớp hoàn thiện:' : 'Finish:'}</strong>{' '}
                {locale === 'vi' ? product.material_finish_vi : product.material_finish_en}
            </p>
            <p>
                <strong>{locale === 'vi' ? 'Xuất xứ:' : 'Origin:'}</strong>{' '}
                {product.origin_country_en}
            </p>
        </SpecItem>
        <SpecItem title={locale === 'vi' ? 'Bảo quản & Giao hàng' : 'Care & Shipping'}>
            <p>
                {locale === 'vi' ? product.care_instructions_vi : product.care_instructions_en}
            </p>
            <p>
                {locale === 'vi' ? product.shipping_info_vi : product.shipping_info_en}
            </p>
        </SpecItem>
    </AnimatedSection>
)

// ✅ Star Rating
const StarRating = ({ rating = 5 }) => (
    <div className="flex items-center gap-1 text-primary mb-2">
        {Array.from({ length: rating }).map((_, idx) => (
            <FaStar key={idx} className="text-base" />
        ))}
    </div>
)

// ✅ Review Card
const ReviewCard = ({ quote, author }) => (
    <Card className="bg-card p-6 flex flex-col">
        <CardContent className="p-0 flex flex-col flex-grow">
            <StarRating />
            <p className="text-foreground/90 text-base italic mb-4 flex-grow">
                "{quote}"
            </p>
            <p className="font-semibold text-sm">- {author}</p>
        </CardContent>
    </Card>
)

// ✅ Customer Reviews - Hardcoded for now
const CustomerReviews = ({ locale }) => (
    <AnimatedSection className="py-16 md:py-24">
        <h2 className="text-foreground text-3xl md:text-4xl font-medium font-sans leading-tight tracking-tight px-4 pb-8 text-center">
            {locale === 'vi' ? 'Được yêu thích bởi những người đam mê thiết kế' : 'Loved by Design Enthusiasts'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-serif">
            <ReviewCard
                quote={locale === 'vi'
                    ? 'Chất lượng đặc biệt. Đây là điểm nhấn hoàn hảo cho phòng ăn của chúng tôi.'
                    : "The quality is exceptional. It's the perfect centerpiece for our dining room."}
                author="Sarah L."
            />
            <ReviewCard
                quote={locale === 'vi'
                    ? 'Món đồ nội thất tuyệt đẹp. Nó đến hoàn hảo và còn đẹp hơn ngoài đời thực.'
                    : "Absolutely stunning piece of furniture. It arrived perfectly and was even more beautiful in person."}
                author="Mark C."
            />
            <ReviewCard
                quote={locale === 'vi'
                    ? 'Thiết kế vượt thời gian nâng tầm toàn bộ không gian. Xứng đáng từng xu.'
                    : "A timeless design that elevates our entire space. Worth every penny."}
                author="Emily R."
            />
        </div>
    </AnimatedSection>
)

// ✅ Related Product Card
const RelatedProductCard = ({ product, locale }) => (
    <Link href={`/products/${product.id}`}>
        <div className="flex flex-col gap-4 cursor-pointer group">
            <AspectRatio ratio={4 / 3}>
                {/* ✅ Dùng <img> thay vì background-image để debug dễ hơn */}
                <img
                    src={product.imageUrl}
                    alt={locale === 'vi' ? product.name_vi : product.name_en}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        console.error('❌ Image load error:', product.imageUrl)
                        e.currentTarget.src = 'https://placehold.co/400x400/ef4444/ffffff?text=Error'
                    }}
                    onLoad={() => {
                        console.log('✅ Image loaded successfully:', product.imageUrl)
                    }}
                />
            </AspectRatio>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {locale === 'vi' ? product.name_vi : product.name_en}
            </h3>
            <p className="text-foreground/80">${product.price.toFixed(2)}</p>
        </div>
    </Link>
)

// ✅ Complete the Look - Hardcoded for now
// ✅ Complete the Look - Optimized batch image fetch
const CompleteTheLook = ({ currentProductId, categoryNameKey, locale }) => {
    const [relatedProducts, setRelatedProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const supabase = createClient()

    React.useEffect(() => {
        async function fetchRelatedProducts() {
            try {
                setLoading(true)

                // Fetch 2 products from same category, excluding current product
                const { data: products, error: productError } = await supabase
                    .schema('lumanest')
                    .from('product')
                    .select('*')
                    .eq('categorynamekey', categoryNameKey)
                    .neq('id', currentProductId)
                    .limit(2)

                if (productError) throw productError

                console.log('✅ Fetched related products:', products)

                // ✅ Batch fetch images for all products in 1 query
                const productIds = products.map(p => p.id)

                const imageMap = await getBatchProductImages(productIds)

                // ✅ Map products with images
                const productsWithImages = products.map((product) => ({
                    ...product,
                    imageUrl: imageMap[product.id]?.thumbnail ||
                        'https://placehold.co/400x400/ef4444/ffffff?text=No+Image'
                }))

                setRelatedProducts(productsWithImages)
                console.log('✅ Related products with images:', productsWithImages)
            } catch (err) {
                console.error('❌ Error fetching related products:', err)
                setRelatedProducts([])
            } finally {
                setLoading(false)
            }
        }

        if (categoryNameKey && currentProductId) {
            fetchRelatedProducts()
        }
    }, [categoryNameKey, currentProductId, supabase])

    // Don't render if no related products
    if (!loading && relatedProducts.length === 0) {
        return null
    }

    return (
        <AnimatedSection className="text-center">
            <h2 className="text-foreground text-3xl font-sans md:text-4xl font-medium leading-tight tracking-tight px-4 pb-8">
                {locale === 'vi' ? 'Hoàn thiện phong cách' : 'Complete the Look'}
            </h2>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loading variant="wave" size="md" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedProducts.map((product) => (
                        <RelatedProductCard
                            key={product.id}
                            product={product}
                            locale={locale}
                        />
                    ))}
                </div>
            )}
        </AnimatedSection>
    )
}

// ✅ Sticky Purchase Bar - Dynamic
const StickyPurchaseBar = ({ product, thumbnailUrl, locale }) => {
    const [quantity, setQuantity] = React.useState(1)

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 w-full z-10 p-2 md:p-4 bg-background/80 backdrop-blur-sm border-t border-border"
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                {/* Product Info */}
                <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <img
                        alt={locale === 'vi' ? product.name_vi : product.name_en}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
                        src={thumbnailUrl || 'https://placehold.co/100x100/ef4444/ffffff?text=No+Image'}
                    />
                    <div className="hidden md:block">
                        <h3 className="font-bold text-foreground text-base">
                            {locale === 'vi' ? product.name_vi : product.name_en}
                        </h3>
                        <p className="text-sm text-foreground/80">${product.price.toFixed(2)}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4 justify-end">
                    {/* Quantity */}
                    <div className="flex items-center border border-border rounded-full">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Decrease quantity"
                            className="w-8 h-8 rounded-full"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            <FaMinus className="text-foreground/50 text-xs" />
                        </Button>
                        <span className="px-2 text-foreground text-sm">{quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Increase quantity"
                            className="w-8 h-8 rounded-full"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            <FaPlus className="text-foreground/50 text-xs" />
                        </Button>
                    </div>

                    {/* Wishlist */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="hidden md:inline-flex rounded-full"
                        aria-label="Add to wishlist"
                    >
                        <FaRegHeart className="text-xl" />
                    </Button>

                    {/* Add to Cart */}
                    <Button className="rounded-full font-serif bg-secondary py-2 md:py-3 px-4 md:px-6 whitespace-nowrap">
                        {locale === 'vi' ? 'Thêm vào giỏ' : 'Add to Cart'}
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

// ✅ Main Component
export default function ProductPage() {
    const params = useParams()
    const { locale, id } = params
    const supabase = createClient()

    const [product, setProduct] = React.useState(null)
    const [images, setImages] = React.useState({ thumbnail: null, gallery: [] })
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    // ✅ Fetch Product Data
    React.useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true)
                setError(null)

                // Fetch product details
                const { data: productData, error: productError } = await supabase
                    .schema('lumanest')
                    .from('product')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (productError) throw productError

                setProduct(productData)

                // Fetch product images
                const productImages = await getProductImageUrls(id)
                setImages(productImages)

                console.log('✅ Product loaded:', productData)
                console.log('✅ Images loaded:', productImages)
            } catch (err) {
                console.error('❌ Error fetching product:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProduct()
        }
    }, [id, supabase])

    // ✅ Loading State
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading variant="wave" size="lg" />
            </div>
        )
    }

    // ✅ Error State
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold text-destructive mb-4">Error</h2>
                <p className="text-destructive/80">{error}</p>
            </div>
        )
    }

    // ✅ Product Not Found
    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            </div>
        )
    }

    // ✅ Build dynamic content
    const productName = locale === 'vi' ? product.name_vi : product.name_en
    const productStory = locale === 'vi' ? product.story_vi : product.story_en
    const productTagline = locale === 'vi' ? product.tagline_vi : product.tagline_en
    const materialInfo = locale === 'vi' ? product.material_info_vi : product.material_info_en

    return (
        <div className="-mt-14 relative flex h-auto min-h-screen w-full flex-col bg-background text-foreground font-display overflow-x-hidden">
            <main className="flex-1 pb-40">
                <HeroSection heroImage={images.thumbnail} />

                <div className="px-4 md:px-10 lg:px-20">
                    <div className="flex flex-col max-w-4xl mx-auto">
                        <ProductIntro
                            name={productName}
                            story={productStory}
                            tagline={productTagline}
                        />
                        <ImageGrid galleryImages={images.gallery} />
                        <FeatureCallout
                            tagline={productTagline}
                            materialInfo={materialInfo}
                        />
                        <Specifications product={product} locale={locale} />
                        <CustomerReviews locale={locale} />

                        {/* ✅ Dynamic Complete the Look */}
                        <CompleteTheLook
                            currentProductId={product.id}
                            categoryNameKey={product.categorynamekey}
                            locale={locale}
                        />
                    </div>
                </div>
            </main>
            <StickyPurchaseBar
                product={product}
                thumbnailUrl={images.thumbnail}
                locale={locale}
            />
        </div>
    )
}