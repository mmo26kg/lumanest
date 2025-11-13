'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBed, FaUtensils, FaChair, FaCouch, FaTable, FaTree, FaBath, FaDoorOpen, FaBaby } from 'react-icons/fa';
import {
    Search,
    ShoppingCart,
    CreditCard,
    Filter,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    X,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

// Import UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

// Utility
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { getProductImageUrls, getBatchProductImages } from '@/lib/image';
import { Loading } from '@/components/ui/loading';
import { useCart } from '@/provider/CartProvider';


const DEBOUNCE_DELAY = 500; // ✅ 500ms debounce delay
// const CATEGORIES = ['Chairs', 'Tables', 'Sofas', 'Lamps', 'Beds', 'Storage'];
const ROOMS = ['Office', 'Living Room', 'Bedroom', 'Kitchen', 'Dining'];
const categories = [
    { id: 1, nameKey: "bedroom", icon: FaBed },
    { id: 2, nameKey: "kitchen", icon: FaUtensils },
    { id: 3, nameKey: "meetingRoom", icon: FaChair },
    { id: 4, nameKey: "livingRoom", icon: FaCouch },
    { id: 5, nameKey: "office", icon: FaTable },
    { id: 6, nameKey: "outdoor", icon: FaTree },
    { id: 7, nameKey: "bathroom", icon: FaBath },
    { id: 8, nameKey: "toilet", icon: FaDoorOpen },
    { id: 9, nameKey: "kidsRoom", icon: FaBaby },
    { id: 10, nameKey: "diningRoom", icon: FaUtensils },
];
const MAX_PRICE = 2000;
const PRODUCTS_PER_PAGE = 6;

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// --- CUSTOM PAGINATION COMPONENTS ---
const Pagination = ({ className, ...props }) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    />
);

const PaginationContent = ({ className, ...props }) => (
    <ul className={cn('flex flex-row items-center gap-1', className)} {...props} />
);

const PaginationItem = ({ className, ...props }) => (
    <li className={cn('', className)} {...props} />
);

function PaginationLink({ className, isActive, size = 'default', ...props }) {
    const t = useTranslations('Products');
    return (
        <button
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300',
                'h-10 px-4 py-2',
                size === 'icon' && 'h-10 w-10',
                isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary dark:hover:text-secondary-foreground',
                className
            )}
            {...props}
        />
    );
}

function PaginationPrevious({ className, ...props }) {
    const t = useTranslations('Products');
    return (
        <PaginationLink
            aria-label={t('pagination.aria.previous')}
            size="default"
            className={cn('gap-1 pl-2.5', className)}
            {...props}
        >
            <ChevronLeft className="h-4 w-4" />
            <span>{t('pagination.previous')}</span>
        </PaginationLink>
    );
}

function PaginationNext({ className, ...props }) {
    const t = useTranslations('Products');
    return (
        <PaginationLink
            aria-label={t('pagination.aria.next')}
            size="default"
            className={cn('gap-1 pr-2.5', className)}
            {...props}
        >
            <span>{t('pagination.next')}</span>
            <ChevronRight className="h-4 w-4" />
        </PaginationLink>
    );
}

function PaginationEllipsis({ className, ...props }) {
    const t = useTranslations('Products');
    return (
        <span
            aria-hidden
            className={cn('flex h-9 w-9 items-center justify-center', className)}
            {...props}
        >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">{t('pagination.more')}</span>
        </span>
    );
}

// --- APPLICATION COMPONENTS ---

/**
 * FilterSidebar Component
 */
function FilterSidebar({ filters, onFilterChange, onPriceChange }) {
    const t = useTranslations('Products');
    const handleCheckboxChange = (group, value) => {
        const newGroupFilters = filters[group].includes(value)
            ? filters[group].filter((item) => item !== value)
            : [...filters[group], value];
        onFilterChange(group, newGroupFilters);
    };

    return (
        <div className="w-full">
            <Accordion type="multiple" defaultValue={['category', 'room', 'price']} className="w-full">
                {/* Category Filter */}
                <AccordionItem value="category">
                    <AccordionTrigger className="font-sans">{t('filters.category')}</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.nameKey} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={category.nameKey}
                                        checked={filters.category.includes(category.nameKey)}
                                        onCheckedChange={() =>
                                            handleCheckboxChange('category', category.nameKey)
                                        }
                                    />
                                    <Label
                                        htmlFor={category.nameKey}
                                        className="font-normal cursor-pointer"
                                    >
                                        {t(`categories.${category.nameKey}`)}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Room Filter */}
                {/* <AccordionItem value="room">
                    <AccordionTrigger className="font-sans">{t('filters.room')}</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {ROOMS.map((room) => (
                                <div key={room} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`room-${room}`}
                                        checked={filters.room.includes(room)}
                                        onCheckedChange={() => handleCheckboxChange('room', room)}
                                    />
                                    <Label
                                        htmlFor={`room-${room}`}
                                        className="font-normal cursor-pointer"
                                    >
                                        {t(`rooms.${room}`)}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem> */}

                {/* Price Filter */}
                <AccordionItem value="price">
                    <AccordionTrigger className="font-sans">{t('filters.price')}</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 overflow-visible">
                            <Slider
                                min={0}
                                max={MAX_PRICE}
                                step={10}
                                value={[filters.price]}
                                onValueChange={(value) => onPriceChange(value[0])}
                                className='pt-2'
                            />
                            <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
                                <span>{t('price.min', { value: 0 })}</span>
                                <span>{t('price.current', { value: filters.price })}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

/**
 * ProductCard Component
 */
function ProductCard({ product, loading }) {
    const t = useTranslations('Products');
    const locale = useLocale();
    const { addToCart } = useCart();
    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03, y: -5 }}
        >
            <Link href={`/products/${product.id}`}>
                <Card className="overflow-hidden h-full flex flex-col gap-2">
                    {loading ? (
                        <div className="flex items-center justify-center h-48">
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <CardHeader className="pb-2 gap-1 ">
                                <CardTitle className="font-sans text-xl line-clamp-1">{locale === 'vi' ? product.name_vi : product.name_en}</CardTitle>
                                <CardDescription className="pt-1 line-clamp-1  ">
                                    {locale === 'vi' ? product.description_vi : product.description_en}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grow">
                                <img
                                    src={product.imageUrl}
                                    alt={locale === 'vi' ? product.name_vi : product.name}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                    onError={(e) =>
                                    (e.currentTarget.src =
                                        'https://placehold.co/600x400/ef4444/ffffff?text=Image+Error')
                                    }
                                />
                                <div className="text-xl font-bold text-primary">
                                    ${product.price.toFixed(2)}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col lg:flex-row sm:justify-between gap-2">
                                <Button variant="outline" className=" w-full lg:w-auto border-muted text-primary" onClick={handleAddToCart}>
                                    <ShoppingCart className="mr-2 lg:mr-0 h-4 w-4" />
                                    <span className='sm:block md:block lg:hidden'>{t('actions.addToCart')}</span>
                                </Button>
                                <Button variant="default" className="flex-2 w-full lg:w-auto">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>{t('actions.checkout')}</span>
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </Card>
            </Link>
        </motion.div>
    );
}

/**
 * PaginationComponent
 */
function PaginationComponent({
    currentPage,
    totalProducts,
    productsPerPage,
    onPageChange,
}) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const half = Math.floor(maxPagesToShow / 2);

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - half);
            let end = Math.min(totalPages, currentPage + half);

            if (currentPage - half < 1) {
                end = maxPagesToShow;
            }
            if (currentPage + half > totalPages) {
                start = totalPages - maxPagesToShow + 1;
            }

            if (start > 1) {
                pages.push(1);
                if (start > 2) pages.push('ellipsis-start');
            }
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (end < totalPages) {
                if (end < totalPages - 1) pages.push('ellipsis-end');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                </PaginationItem>
                {pages.map((page, index) => (
                    <PaginationItem key={index}>
                        {typeof page === 'number' ? (
                            <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

/**
 * Main Products Page Component
 */
export default function ProductsPage() {
    const t = useTranslations('Products');
    const locale = useLocale();
    const supabase = createClient();

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [filters, setFilters] = useState({
        category: [],
        room: [],
        price: MAX_PRICE,
    });

    const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);
    const debouncedPrice = useDebounce(filters.price, DEBOUNCE_DELAY);

    // ✅ Optimized fetchProducts: Batch fetch images
    const fetchProducts = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            console.log('🔍 Fetching products with:', {
                filters,
                searchTerm: debouncedSearchTerm,
                price: debouncedPrice,
                locale
            });

            let query = supabase.schema('lumanest').from('product').select('*');

            // Apply filters
            if (filters.category.length > 0) {
                query = query.in('categorynamekey', filters.category);
            }

            if (debouncedPrice < MAX_PRICE) {
                query = query.lte('price', debouncedPrice);
            }

            if (debouncedSearchTerm.trim()) {
                const nameField = locale === 'vi' ? 'name_vi' : 'name_en';
                const descriptionField = locale === 'vi' ? 'description_vi' : 'description_en';

                query = query.or(
                    `${nameField}.ilike.%${debouncedSearchTerm}%,${descriptionField}.ilike.%${debouncedSearchTerm}%`
                );
            }

            const { data: products, error: productError } = await query;

            if (productError) throw productError;

            console.log('✅ Fetched products:', products?.length || 0);

            // ✅ Batch fetch images for all products in 1 query
            const productIds = products.map(p => p.id);
            const imageMap = await getBatchProductImages(productIds);

            console.log('✅ Fetched images map:', Object.keys(imageMap).length);

            // ✅ Map products with images
            const productsWithImages = products.map((product) => ({
                ...product,
                imageUrl: imageMap[product.id]?.thumbnail ||
                    'https://placehold.co/600x400/ef4444/ffffff?text=No+Image',
            }));

            setFilteredProducts(productsWithImages);
        } catch (err) {
            console.error('❌ Fetch error:', err);
            setError(err.message);
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    }, [filters.category, debouncedSearchTerm, debouncedPrice, locale, supabase]);

    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFilterChange = (group, newFilters) => {
        setFilters((prev) => ({
            ...prev,
            [group]: newFilters,
        }));
        setCurrentPage(1);
    };

    const handlePriceChange = (newPrice) => {
        setFilters((prev) => ({
            ...prev,
            price: newPrice,
        }));
        setCurrentPage(1);
    };

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage]);

    const sidebarContent = (
        <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onPriceChange={handlePriceChange}
        />
    );

    return (
        <div className="bg-background text-foreground font-serif min-h-screen">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                {/* Mobile Filter Sheet */}
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>{t('filters.title')}</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">{sidebarContent}</div>
                </SheetContent>

                <Button
                    variant="outline"
                    className="md:hidden fixed bottom-4 right-4 z-50"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{t('filters.button')}</span>
                </Button>

                {/* Main Content */}
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Desktop Sidebar */}
                        <aside className="hidden md:block w-full md:w-64 lg:w-72 shrink-0 sticky top-20 self-start">
                            {sidebarContent}
                        </aside>

                        {/* Product Grid */}
                        <main className="w-full min-w-0 min-h-full">
                            <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold font-sans">
                                    {t('results', { count: filteredProducts.length })}
                                </h2>

                                {/* Search Bar */}
                                <div className="w-full lg:max-w-xl flex-1 lg:my-2 lg:pl-10 my-4">
                                    <div className="relative flex">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder={t('search.placeholder')}
                                            className="pl-10 w-auto flex-1"
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                        />
                                        {searchTerm !== debouncedSearchTerm && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center py-8">
                                    <Loading variant="wave" size="md" />
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center h-64 border border-destructive/50 rounded-lg bg-destructive/10">
                                    <X className="h-12 w-12 text-destructive mb-4" />
                                    <h3 className="text-lg font-semibold text-destructive">Error</h3>
                                    <p className="text-destructive/80">{error}</p>
                                </div>
                            ) : paginatedProducts.length > 0 ? (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    <AnimatePresence>
                                        {paginatedProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                loading={false}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg">
                                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold">{t('noResults.title')}</h3>
                                    <p className="text-muted-foreground">
                                        {t('noResults.description')}
                                    </p>
                                </div>
                            )}

                            {filteredProducts.length > PRODUCTS_PER_PAGE && (
                                <div className="mt-12">
                                    <PaginationComponent
                                        currentPage={currentPage}
                                        totalProducts={filteredProducts.length}
                                        productsPerPage={PRODUCTS_PER_PAGE}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </Sheet>
        </div>
    );
}