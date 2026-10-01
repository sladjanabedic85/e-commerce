import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Home = () => {
  return (
    <div className="mt-5 mb-5">
      {/* Discover Brands Section */}
      <section>
        <div className="mb-12 grid items-center gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl font-semibold">Discover Brands</h2>
            <p>Discover a collection that blends style and comfort. Browse our carefully selected pieces of modern clothing that follow the latest trends while staying true to your unique style.</p>
          </div>
          <div className="text-center">
            <img src="/images/logo.png" alt="Logo" style={{ maxWidth: "150px" }} className="mx-auto" />
          </div>
        </div>

        {/* Brand Images */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          <img src="/images/bershka.png" alt="Bershka" />
          <img src="/images/h&m.png" alt="H&M" />
          <img src="/images/zara.png" alt="Zara" />
          <img src="/images/koton.png" alt="Koton" />
        </div>
      </section>

      <hr className="my-12" />

      {/* New Arrivals Section */}
      <section>
        <h2 className="mb-8 text-left text-2xl font-semibold">New Arrivals</h2>

        {/* Category Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-4">
            <img src="/images/women.png" alt="Women" className="aspect-3/4 w-full object-cover" />
            <Button asChild id="btn-women">
              <Link to="/products?category=women">Women</Link>
            </Button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img src="/images/kids.png" alt="Kids" className="aspect-3/4 w-full object-cover" />
            <Button asChild id="btn-kids">
              <Link to="/products?category=kids">Kids</Link>
            </Button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img src="/images/men.png" alt="Men" className="aspect-3/4 w-full object-cover" />
            <Button asChild id="btn-men">
              <Link to="/products?category=men">Men</Link>
            </Button>
          </div>
        </div>

        {/* Fashion Showcase */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <img src="/images/adult-fashion.png" alt="Adult Fashion" className="w-full" />
          <img src="/images/children-fashion.png" alt="Children Fashion" className="w-full" />
        </div>

        {/* Promo Section */}
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <h3 className="text-xl font-semibold">Enjoy 20% Off This Season's Styles</h3>
          <Button asChild size="lg" variant="default">
            <Link to="/products">Show All</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
export default Home;