'use client';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/web/Home/Hero";
import ExploreCategory from "@/components/web/Home/ExploreCategory";
import PopularProducts from "@/components/web/Home/PopularProduct";



export default function Home() {
  const t = useTranslations();

  return (
    <div className="px-4 lg:px-0">
      {/* Hero section */}
      <Hero />

      {/* Explore Category */}
      <ExploreCategory />

      {/* Popular product */}
      <PopularProducts />
      {/* Special package */}
      {/* Explore Room */}
      {/* Benefit */}
      {/* Testimonials */}
      {/* Call to Action Newsletter */}

    </div>
  );

}

