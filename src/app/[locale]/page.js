'use client';
import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Hero from "@/components/web/Home/Hero";
import ExploreCategory from "@/components/web/Home/ExploreCategory";
import PopularProducts from "@/components/web/Home/PopularProduct";
import Benefit from "@/components/web/Home/Benefit";
import Testimonials from "@/components/web/Home/Testimonials";
import Newsletter from "@/components/web/Home/Newsleter";
import useMeta from "@/hooks/useMeta";



export default function Home() {
  const t = useTranslations();

  useMeta({
    title: t('home.meta.title'),
    description: t('home.meta.description'),
    canonical: "https://lumanest.com/",
  });

  return (
    <>

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
        <Benefit />

        {/* Testimonials */}
        <Testimonials />

        {/* Call to Action Newsletter */}
        <Newsletter />


      </div>
    </>
  );
}




