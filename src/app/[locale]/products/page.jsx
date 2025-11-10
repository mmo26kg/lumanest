'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useTranslations } from 'next-intl';

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

// --- MOCK DATA ---
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: 'Ergonomic Office Chair',
        description: 'Supportive mesh back and adjustable armrests.',
        price: 249.99,
        category: 'Chairs',
        room: 'Office',
        imageUrl: 'https://placehold.co/600x400/5e5e5e/ffffff?text=Office+Chair',
    },
    {
        id: 2,
        name: 'Minimalist Oak Desk',
        description: 'Solid oak wood with a natural finish.',
        price: 399.0,
        category: 'Tables',
        room: 'Office',
        imageUrl: 'https://placehold.co/600x400/a8a29e/ffffff?text=Oak+Desk',
    },
    {
        id: 3,
        name: 'Plush Velvet Sofa',
        description: 'A 3-seater sofa in deep navy blue velvet.',
        price: 799.5,
        category: 'Sofas',
        room: 'Living Room',
        imageUrl: 'https://placehold.co/600x400/262626/ffffff?text=Velvet+Sofa',
    },
    {
        id: 4,
        name: 'Industrial Floor Lamp',
        description: 'Matte black finish with an Edison bulb.',
        price: 129.0,
        category: 'Lamps',
        room: 'Living Room',
        imageUrl: 'https://placehold.co/600x400/404040/ffffff?text=Floor+Lamp',
    },
    {
        id: 5,
        name: 'Queen Size Platform Bed',
        description: 'Upholstered headboard with wooden slats.',
        price: 450.0,
        category: 'Beds',
        room: 'Bedroom',
        imageUrl: 'https://placehold.co/600x400/737373/ffffff?text=Platform+Bed',
    },
    {
        id: 6,
        name: 'Modern Nightstand',
        description: 'Two-drawer nightstand with gold hardware.',
        price: 179.99,
        category: 'Storage',
        room: 'Bedroom',
        imageUrl: 'https://placehold.co/600x400/a3a3a3/ffffff?text=Nightstand',
    },
    {
        id: 7,
        name: 'Marble Coffee Table',
        description: 'Genuine marble top with a brass frame.',
        price: 349.0,
        category: 'Tables',
        room: 'Living Room',
        imageUrl: 'https://placehold.co/600x400/f5f5f5/000000?text=Marble+Table',
    },
    {
        id: 8,
        name: 'Bookshelf Etagere',
        description: '5-tier open-concept bookshelf.',
        price: 220.0,
        category: 'Storage',
        room: 'Office',
        imageUrl: 'https://placehold.co/600x400/d4d4d4/000000?text=Bookshelf',
    },
    {
        id: 9,
        name: 'Kitchen Island Cart',
        description: 'Butcher block top with rolling casters.',
        price: 199.0,
        category: 'Storage',
        room: 'Kitchen',
        imageUrl: 'https://placehold.co/600x400/e5e5e5/000000?text=Kitchen+Cart',
    },
    {
        id: 10,
        name: 'Dining Table Set',
        description: 'Extendable table with four matching chairs.',
        price: 650.0,
        category: 'Tables',
        room: 'Dining',
        imageUrl: 'https://placehold.co/600x400/8a8a8a/ffffff?text=Dining+Set',
    },
    {
        id: 11,
        name: 'Leather Accent Chair',
        description: 'Top-grain leather in a warm cognac color.',
        price: 329.0,
        category: 'Chairs',
        room: 'Living Room',
        imageUrl: 'https://placehold.co/600x400/7f5539/ffffff?text=Leather+Chair',
    },
    {
        id: 12,
        name: 'LED Desk Lamp',
        description: 'Adjustable brightness and color temperature.',
        price: 49.99,
        category: 'Lamps',
        room: 'Office',
        imageUrl: 'https://placehold.co/600x400/bfbfbf/000000?text=Desk+Lamp',
    },
    {
        id: 13,
        name: '6-Drawer Dresser',
        description: 'Wide dresser in a white lacquer finish.',
        price: 380.0,
        category: 'Storage',
        room: 'Bedroom',
        imageUrl: 'https://placehold.co/600x400/fafafa/000000?text=Dresser',
    },
    {
        id: 14,
        name: 'Bar Stool (Set of 2)',
        description: 'Counter height stools with low backs.',
        price: 149.0,
        category: 'Chairs',
        room: 'Kitchen',
        imageUrl: 'https://placehold.co/600x400/525252/ffffff?text=Bar+Stools',
    },
    {
        id: 15,
        name: 'Sectional Sofa',
        description: 'L-shaped sectional with chaise lounge.',
        price: 999.0,
        category: 'Sofas',
        room: 'Living Room',
        imageUrl: 'https://placehold.co/600x400/78716c/ffffff?text=Sectional',
    },
    {
        id: 16,
        name: 'TV Stand Console',
        description: 'Mid-century modern design, fits 65-inch TVs.',
        price: 289.0,
        category: 'Storage',
        room: 'Living Room',
        imageUrl: 'https://placehold.co/600x400/a1a1aa/ffffff?text=TV+Stand',
    },
];

const CATEGORIES = ['Chairs', 'Tables', 'Sofas', 'Lamps', 'Beds', 'Storage'];
const ROOMS = ['Office', 'Living Room', 'Bedroom', 'Kitchen', 'Dining'];
const MAX_PRICE = 1000;
const PRODUCTS_PER_PAGE = 6;

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
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
                    : 'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
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
            <Accordion type="multiple" className="w-full">
                {/* Category Filter */}
                <AccordionItem value="category">
                    <AccordionTrigger className="font-sans">{t('filters.category')}</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {CATEGORIES.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cat-${category}`}
                                        checked={filters.category.includes(category)}
                                        onCheckedChange={() =>
                                            handleCheckboxChange('category', category)
                                        }
                                    />
                                    <Label
                                        htmlFor={`cat-${category}`}
                                        className="font-normal cursor-pointer"
                                    >
                                        {t(`categories.${category}`)}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Room Filter */}
                <AccordionItem value="room">
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
                </AccordionItem>

                {/* Price Filter */}
                <AccordionItem value="price">
                    <AccordionTrigger className="font-sans">{t('filters.price')}</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            <Slider
                                min={0}
                                max={MAX_PRICE}
                                step={10}
                                value={[filters.price]}
                                onValueChange={(value) => onPriceChange(value[0])}
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
function ProductCard({ product }) {
    const t = useTranslations('Products');
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03, y: -5 }}
        >
            <Link href={`/products/1`}>
                <Card className="overflow-hidden h-full flex flex-col">
                    <CardHeader className="pb-2 ">
                        <CardTitle className="font-sans text-xl">{product.name}</CardTitle>
                        <CardDescription className="pt-1 h-10">
                            {product.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grow">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                            onError={(e) =>
                            (e.currentTarget.src =
                                'https://placehold.co/600x400/ef4444/ffffff?text=Image+Error')
                            }
                        />
                        <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            ${product.price.toFixed(2)}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col lg:flex-row sm:justify-between gap-2">
                        <Button variant="outline" className=" w-full lg:w-auto">
                            <ShoppingCart className="mr-2 lg:mr-0 h-4 w-4" />
                            <span className='sm:block md:block lg:hidden'>{t('actions.addToCart')}</span>
                        </Button>
                        <Button variant="default" className="flex-2 w-full lg:w-auto">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>{t('actions.checkout')}</span>
                        </Button>
                    </CardFooter>
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

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: [],
        room: [],
        price: MAX_PRICE,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                filters.category.length === 0 ||
                filters.category.includes(product.category);

            const matchesRoom =
                filters.room.length === 0 || filters.room.includes(product.room);

            const matchesPrice = product.price <= filters.price;

            return matchesSearch && matchesCategory && matchesRoom && matchesPrice;
        });
    }, [searchTerm, filters]);

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
        <div className="bg-background text-foreground font-serif">
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
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Desktop Sidebar */}
                        <aside className="hidden md:block w-full md:w-64 lg:w-72 shrink-0 sticky top-20 self-start">
                            {sidebarContent}
                        </aside>

                        {/* Product Grid */}
                        <main className="w-full min-w-0">
                            <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold  font-sans">
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
                                    </div>
                                </div>
                            </div>

                            {paginatedProducts.length > 0 ? (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    <AnimatePresence>
                                        {paginatedProducts.map((product) => (
                                            <ProductCard key={product.id} product={product} />
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