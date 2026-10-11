/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CATEGORIES,
  CartItem,
  INITIAL_CART_ITEMS,
  PRODUCTS,
  Product,
  STITCH_IMAGES,
  TESTIMONIALS,
} from './data/boutiqueData';
import {
  CartDrawer,
  CheckoutModal,
  QuickViewModal,
  SearchModal,
  SizeGuideModal,
  WhatsAppConciergeModal,
  WishlistDrawer,
} from './components/BoutiqueModals';
import { AtelierPortalView, BoutiqueGalleryView } from './components/AtelierViews';

type NavTab =
  | 'home'
  | 'shop-collection'
  | 'custom-stitching'
  | 'boutique-gallery'
  | 'about-us'
  | 'admin-atelier-portal';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavTab>('home');
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'suits' | 'sarees' | 'blouses'>('all');

  // Product card interactive states
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'prod-1': 'M',
    'prod-3': '36',
    'prod-4': 'M',
    'prod-5': 'Standard Bridal',
  });
  const [addBlouseStitching, setAddBlouseStitching] = useState<Record<string, boolean>>({
    'prod-2': false,
  });

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-2', 'prod-5']);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [conciergeContext, setConciergeContext] = useState<string | null>(null);

  // Interactive Stitching Estimator state
  const [estimatorGarment, setEstimatorGarment] = useState<'blouse' | 'suit' | 'lehenga' | 'gown'>(
    'blouse'
  );
  const [estimatorSpeed, setEstimatorSpeed] = useState<'express' | 'standard' | 'bridal'>(
    'standard'
  );

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Calculate Custom Stitching Estimate
  const calculateEstimate = () => {
    let base = 1850;
    if (estimatorGarment === 'blouse') base = 1850;
    else if (estimatorGarment === 'suit') base = 2600;
    else if (estimatorGarment === 'lehenga') base = 4800;
    else if (estimatorGarment === 'gown') base = 3500;

    if (estimatorSpeed === 'express') base += 800;
    if (estimatorSpeed === 'bridal') base += 2200;
    return base;
  };

  const estimatedCost = calculateEstimate();

  const handleNavClick = (tab: NavTab, sectionId?: string) => {
    setActiveNav(tab);
    if (tab === 'boutique-gallery' || tab === 'admin-atelier-portal') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const handleToggleWishlist = (productId: string, productTitle: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed "${productTitle}" from your royal wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${productTitle}" to your royal wishlist`);
        return [...prev, productId];
      }
    });
  };

  const handleAddToBag = (product: Product, customSize?: string) => {
    const size = customSize || selectedSizes[product.id];
    const withBlouse = addBlouseStitching[product.id] && product.blouseStitchingOption?.extraCost;
    const finalPrice =
      product.price + (withBlouse ? product.blouseStitchingOption!.extraCost : 0);

    const subtitleParts: string[] = [];
    if (size) subtitleParts.push(`Size: ${size}`);
    if (withBlouse) subtitleParts.push('Bespoke Blouse Stitching (+₹2,200)');
    else subtitleParts.push('Custom Atelier Stitching Selected');

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      productId: product.id,
      title: product.title,
      subtitle: subtitleParts.join(' | '),
      price: finalPrice,
      quantity: 1,
      image: product.image,
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Added "${product.title}" to your shopping bag`);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleBookStitchingViaWhatsApp = () => {
    const garmentLabels: Record<string, string> = {
      blouse: 'Bespoke Blouse (Padded / Maggam)',
      suit: 'Anarkali / Sharara Suit Set',
      lehenga: 'Bridal Lehenga & Choli',
      gown: 'Festive Ethnic Gown',
    };
    const speedLabels: Record<string, string> = {
      express: 'Express Tailoring (3 Days)',
      standard: 'Standard Atelier (7 Days)',
      bridal: 'Grand Bridal (14 Days Intensive)',
    };
    setConciergeContext(
      `Namaste Atiksh Boutique! I would like to book a bespoke tailoring consultation for: ${
        garmentLabels[estimatorGarment]
      } (${speedLabels[estimatorSpeed]}, Est: ₹${estimatedCost.toLocaleString(
        'en-IN'
      )}*). Please schedule my video measurement call.`
    );
  };

  const filteredProducts = PRODUCTS.filter(
    (p) => catalogFilter === 'all' || p.category === catalogFilter
  );

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(91,19,34,0.06)]">
        <div className="bg-primary text-on-primary py-space-xs px-gutter-desktop text-center">
          <div className="w-full max-w-[1380px] mx-auto flex items-center justify-center gap-space-sm">
            <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary-fixed">
              Complimentary Bespoke Consultation &amp; Pan-India Insured Delivery | WhatsApp
              Concierge: +916396461149
            </span>
          </div>
        </div>
        <div className="h-20 w-full px-gutter-desktop">
          <div className="w-full max-w-[1380px] mx-auto h-full flex items-center justify-between gap-space-lg">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-space-md text-left cursor-pointer"
            >
              <img
                alt="Charvi Boutique Logo"
                className="h-8 w-auto object-contain"
                src={STITCH_IMAGES.logo}
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary tracking-wide leading-none">
                  Charvi
                </span>
                <span className="font-label-sm text-label-sm tracking-[0.2em] text-secondary uppercase leading-tight">
                  Boutique &amp; Atelier
                </span>
              </div>
            </button>

            {/* Primary Navigation */}
            <nav className="hidden xl:flex items-center gap-space-lg">
              {[
                { id: 'home' as NavTab, label: 'Home', section: undefined },
                {
                  id: 'shop-collection' as NavTab,
                  label: 'Shop Collection',
                  section: 'collection-catalog',
                },
                {
                  id: 'custom-stitching' as NavTab,
                  label: 'Custom Stitching',
                  section: 'custom-atelier',
                },
                { id: 'boutique-gallery' as NavTab, label: 'Boutique Gallery', section: undefined },
                { id: 'about-us' as NavTab, label: 'About Us', section: 'testimonials-section' },
                {
                  id: 'admin-atelier-portal' as NavTab,
                  label: 'Atelier Portal',
                  section: undefined,
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.section)}
                  className={
                    activeNav === item.id
                      ? 'uppercase transition-colors bg-primary-container text-on-primary font-bold rounded-lg px-space-sm py-space-xs font-label-md text-label-md cursor-pointer whitespace-nowrap'
                      : 'font-label-md text-label-md uppercase transition-colors text-on-surface-variant hover:text-on-surface cursor-pointer whitespace-nowrap'
                  }
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Utility Actions */}
            <div className="flex items-center gap-space-md">
              <button
                aria-label="Search Boutique"
                onClick={() => setIsSearchOpen(true)}
                className="p-space-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[1.375rem]">search</span>
              </button>
              <button
                aria-label="Wishlist"
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-space-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[1.375rem]">favorite</span>
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-on-primary font-label-sm text-[0.625rem] rounded-full flex items-center justify-center font-bold tabular-nums">
                  {wishlistIds.length}
                </span>
              </button>
              <button
                aria-label="Shopping Bag"
                onClick={() => setIsCartOpen(true)}
                className="relative p-space-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[1.375rem]">shopping_bag</span>
                <span
                  className="absolute top-0 right-0 w-4 h-4 bg-secondary text-on-secondary font-label-sm text-[0.625rem] rounded-full flex items-center justify-center font-bold tabular-nums"
                  id="header-cart-badge"
                >
                  {totalBagCount}
                </span>
              </button>
              <button
                onClick={() => handleNavClick('admin-atelier-portal')}
                title="Open Client Atelier Portal"
                className="flex items-center pl-space-xs cursor-pointer"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  src={STITCH_IMAGES.profileAvatar}
                  referrerPolicy="no-referrer"
                />
              </button>
              <button
                onClick={() =>
                  setConciergeContext(
                    'Namaste Atiksh Boutique! I would like live assistance from a bridal & couture stylist.'
                  )
                }
                className="hidden sm:inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-low text-primary font-label-sm text-label-sm uppercase hover:bg-secondary-container hover:text-on-secondary-container transition-all cursor-pointer whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-base text-secondary">chat</span>
                <span>Chat with Stylist</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full pt-28 bg-surface min-h-screen">
        {activeNav === 'boutique-gallery' ? (
          <BoutiqueGalleryView
            onBackHome={() => handleNavClick('home')}
            onBookStylist={(note) => setConciergeContext(note)}
          />
        ) : activeNav === 'admin-atelier-portal' ? (
          <AtelierPortalView
            onBackHome={() => handleNavClick('home')}
            onShowToast={showToast}
            onBookStylist={(note) => setConciergeContext(note)}
          />
        ) : (
          <div className="flex flex-col w-full">
            {/* HERO SECTION */}
            <section className="relative w-full -mt-20 overflow-hidden bg-primary">
              <div className="relative w-full h-[620px] lg:h-[720px]">
                <img
                  alt="Atiksh Boutique Haute Couture Collection"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
                  src={STITCH_IMAGES.heroBanner}
                  referrerPolicy="no-referrer"
                />
                {/* Regal Ambient Gradient Scrims */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent" />
                {/* Hero Glassmorphism Card Overlay */}
                <div className="absolute inset-0 flex items-center pt-24 pb-12 px-gutter lg:px-gutter-desktop">
                  <div className="w-full max-w-[1380px] mx-auto">
                    <div className="max-w-2xl bg-surface/90 backdrop-blur-xl p-space-lg lg:p-space-xl rounded-xl shadow-[0_12px_40px_rgba(61,0,15,0.22)] relative overflow-hidden">
                      {/* Decorative Gold Corner Motif Line */}
                      <div className="absolute top-0 left-0 w-24 h-1 bg-secondary" />
                      <div className="absolute top-0 left-0 w-1 h-24 bg-secondary" />
                      <div className="inline-flex items-center gap-space-xs mb-space-sm px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
                          Festive &amp; Bridal 2025
                        </span>
                      </div>
                      <h1 className="font-headline-lg lg:font-display text-headline-lg-mobile lg:text-display text-primary leading-tight mb-space-sm">
                        Elegance in Every Stitch
                      </h1>
                      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-lg">
                        Discover timeless ethnic wear, beautiful royal handlooms, and impeccably
                        custom-tailored silhouettes sculpted exclusively for you.
                      </p>
                      <div className="flex flex-wrap items-center gap-space-md">
                        <a
                          className="inline-flex items-center justify-center gap-space-sm px-space-xl py-space-sm bg-primary-container text-on-primary rounded-lg font-label-lg text-label-lg uppercase tracking-wider shadow-md hover:bg-primary transition-all duration-300"
                          href="#collection-catalog"
                        >
                          <span>Explore Royal Collection</span>
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </a>
                        <a
                          className="inline-flex items-center justify-center gap-space-sm px-space-lg py-space-sm bg-surface-container-low text-primary rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-300"
                          href="#custom-atelier"
                        >
                          <span className="material-symbols-outlined text-base text-secondary">
                            design_services
                          </span>
                          <span>Book Custom Stitching</span>
                        </a>
                      </div>
                      {/* Stylist Live Badge Micro-feature */}
                      <div className="mt-space-lg pt-space-md flex items-center justify-between text-on-surface-variant">
                        <button
                          onClick={() =>
                            setConciergeContext(
                              'Requesting a Virtual Drapery & Bridal Fitting Appointment Today.'
                            )
                          }
                          className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-secondary hover:underline cursor-pointer"
                        >
                          <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-ping" />
                          <span>Virtual Drapery Appointments Available Today</span>
                        </button>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Bengaluru Atelier
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Highlights Bar */}
              <div className="w-full bg-tertiary-container text-surface-bright py-space-md px-gutter lg:px-gutter-desktop">
                <div className="w-full max-w-[1380px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-space-md text-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-space-xs text-left">
                    <span className="material-symbols-outlined text-secondary-fixed text-2xl">
                      workspace_premium
                    </span>
                    <div>
                      <div className="font-label-md text-label-md font-bold text-surface-bright">
                        100% Handcrafted Zari
                      </div>
                      <div className="font-body-sm text-body-sm text-on-tertiary-container">
                        Certified handloom pure silks
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-space-xs text-left">
                    <span className="material-symbols-outlined text-secondary-fixed text-2xl">
                      straighten
                    </span>
                    <div>
                      <div className="font-label-md text-label-md font-bold text-surface-bright">
                        Perfect Fit Guarantee
                      </div>
                      <div className="font-body-sm text-body-sm text-on-tertiary-container">
                        Complimentary doorstep alterations
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-space-xs text-left">
                    <span className="material-symbols-outlined text-secondary-fixed text-2xl">
                      local_shipping
                    </span>
                    <div>
                      <div className="font-label-md text-label-md font-bold text-surface-bright">
                        Pan-India Insured Express
                      </div>
                      <div className="font-body-sm text-body-sm text-on-tertiary-container">
                        Tamper-proof royal packaging
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-space-xs text-left">
                    <span className="material-symbols-outlined text-secondary-fixed text-2xl">
                      chat
                    </span>
                    <div>
                      <div className="font-label-md text-label-md font-bold text-surface-bright">
                        WhatsApp Concierge
                      </div>
                      <div className="font-body-sm text-body-sm text-on-tertiary-container">
                        Real-time fitting &amp; drape stylist
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED SHOPPING CATEGORIES GRID */}
            <section className="w-full py-space-3xl px-gutter lg:px-gutter-desktop bg-surface">
              <div className="w-full max-w-[1380px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-bold">
                      Curated Ensembles
                    </span>
                    <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary mt-space-xs">
                      Exquisite Atelier Categories
                    </h2>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                    From opulent Banarasi weaves to artisanal custom-embroidered bridal blouses,
                    explore silhouettes crafted for grand celebrations.
                  </p>
                </div>

                {/* Categories Mosaic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        if (cat.filterCategory) {
                          setCatalogFilter(cat.filterCategory);
                        }
                        const targetId =
                          cat.targetSection === 'atelier' ? 'custom-atelier' : 'collection-catalog';
                        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group relative rounded-xl overflow-hidden bg-surface-container-low shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-[480px] cursor-pointer"
                    >
                      <div className="relative w-full h-[340px] overflow-hidden">
                        <img
                          alt={cat.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                          src={cat.image}
                          referrerPolicy="no-referrer"
                        />
                        <span
                          className={`absolute top-4 left-4 ${cat.badgeClass} font-label-sm text-label-sm uppercase px-2.5 py-1 rounded shadow`}
                        >
                          {cat.badge}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
                      </div>
                      <div className="p-space-md flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors">
                            {cat.title}
                          </h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                            {cat.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-space-xs">
                          <span className="font-label-sm text-label-sm uppercase text-secondary font-bold tracking-wider">
                            {cat.exploreLabel}
                          </span>
                          <span className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                            <span className="material-symbols-outlined text-base">north_east</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* NEW ARRIVALS & INTERACTIVE PRODUCT CATALOG */}
            <section
              className="w-full py-space-3xl px-gutter lg:px-gutter-desktop bg-surface-container-low"
              id="collection-catalog"
            >
              <div className="w-full max-w-[1380px] mx-auto">
                {/* Catalog Header & Filter Segment Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-lg">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-bold">
                      The Royal Lookbook
                    </span>
                    <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary mt-space-xs">
                      New Arrivals &amp; Masterpiece Catalog
                    </h2>
                  </div>
                  {/* Filter Tabs */}
                  <div className="flex flex-wrap items-center gap-space-xs bg-surface p-1 rounded-lg shadow-sm">
                    {[
                      { id: 'all' as const, label: 'All' },
                      { id: 'suits' as const, label: 'Bespoke Suits' },
                      { id: 'sarees' as const, label: 'Heritage Sarees' },
                      { id: 'blouses' as const, label: 'Bridal Blouses' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCatalogFilter(tab.id)}
                        className={`catalog-filter-btn px-space-md py-space-xs rounded-lg font-label-sm text-label-sm uppercase transition-all cursor-pointer ${
                          catalogFilter === tab.id
                            ? 'bg-primary-container text-on-primary'
                            : 'text-on-surface-variant hover:text-primary'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Cards Grid */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-xl"
                  id="product-grid"
                >
                  {filteredProducts.map((product) => {
                    const isWishlisted = wishlistIds.includes(product.id);
                    const currentSize = selectedSizes[product.id] || product.defaultSize;
                    const badgeClasses = {
                      error: 'bg-error text-on-error',
                      secondary: 'bg-secondary text-on-secondary',
                      primary: 'bg-primary text-on-primary',
                      surface: 'bg-surface-container-high text-primary',
                      'primary-container': 'bg-primary-container text-on-primary',
                    }[product.badgeStyle];

                    return (
                      <div
                        key={product.id}
                        className="product-item group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                      >
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container">
                          <img
                            alt={product.fullTitle}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            src={product.image}
                            referrerPolicy="no-referrer"
                          />
                          <span
                            className={`absolute top-3 left-3 ${badgeClasses} font-label-sm text-label-sm uppercase px-2 py-0.5 rounded font-bold`}
                          >
                            {product.badgeText}
                          </span>
                          <button
                            aria-label="Add to Wishlist"
                            className={`wishlist-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
                              isWishlisted ? 'text-error' : 'text-on-surface hover:text-error'
                            }`}
                            onClick={() => handleToggleWishlist(product.id, product.title)}
                          >
                            <span
                              className="material-symbols-outlined text-lg"
                              style={{
                                fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0",
                              }}
                            >
                              favorite
                            </span>
                          </button>
                          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-space-xs">
                            <button
                              className="w-full py-2 bg-surface/95 backdrop-blur-md text-primary font-label-sm text-label-sm uppercase tracking-wider rounded shadow-md hover:bg-primary hover:text-on-primary transition-colors text-center cursor-pointer"
                              onClick={() => setQuickViewProduct(product)}
                            >
                              Quick View
                            </button>
                          </div>
                        </div>

                        <div className="p-space-md flex flex-col flex-1 justify-between">
                          <div>
                            <div className="flex items-center justify-between text-secondary mb-1">
                              <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                                {product.categoryLabel}
                              </span>
                              <div className="flex items-center text-secondary text-xs tabular-nums">
                                <span
                                  className="material-symbols-outlined text-sm"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  star
                                </span>
                                <span className="ml-0.5 font-bold">
                                  {product.rating} ({product.reviewCount})
                                </span>
                              </div>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-primary mb-1">
                              {product.title}
                            </h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-space-sm">
                              {product.shortDesc}
                            </p>

                            {/* Quick Size Selector OR Blouse Stitching Option */}
                            {product.sizes && (
                              <div className="mb-space-md">
                                <div className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1.5 flex items-center justify-between">
                                  <span>{product.sizeLabel || 'Select Size:'}</span>
                                  <button
                                    className="text-secondary hover:underline cursor-pointer"
                                    onClick={() => setIsSizeGuideOpen(true)}
                                  >
                                    {product.id === 'prod-3'
                                      ? 'Guide'
                                      : product.id === 'prod-5'
                                      ? 'Specs'
                                      : 'Size Guide'}
                                  </button>
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {product.sizes.map((sz) => {
                                    const isSelected = currentSize === sz;
                                    const isWide = sz.length > 3;
                                    return (
                                      <button
                                        key={sz}
                                        onClick={() =>
                                          setSelectedSizes({ ...selectedSizes, [product.id]: sz })
                                        }
                                        className={`size-pill ${
                                          isWide ? 'px-2.5' : 'w-8'
                                        } h-8 rounded text-xs font-semibold transition-colors cursor-pointer ${
                                          isSelected
                                            ? 'bg-primary text-on-primary'
                                            : sz.includes('Custom')
                                            ? 'bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary'
                                            : 'bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary'
                                        }`}
                                        title={
                                          sz.includes('Custom')
                                            ? 'Custom stitch to measurements'
                                            : undefined
                                        }
                                      >
                                        {sz}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {product.blouseStitchingOption && (
                              <div
                                onClick={() => {
                                  if (product.blouseStitchingOption?.extraCost) {
                                    setAddBlouseStitching((prev) => ({
                                      ...prev,
                                      [product.id]: !prev[product.id],
                                    }));
                                  }
                                }}
                                className={`mb-space-md p-space-xs rounded-lg transition-colors ${
                                  product.blouseStitchingOption.extraCost > 0
                                    ? 'cursor-pointer'
                                    : ''
                                } ${
                                  addBlouseStitching[product.id]
                                    ? 'bg-secondary-container/40 ring-1 ring-secondary'
                                    : 'bg-surface-container-low'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                                    {product.blouseStitchingOption.title}
                                  </span>
                                  <span className="font-label-sm text-label-sm text-secondary font-bold">
                                    {addBlouseStitching[product.id]
                                      ? '✓ Added (+₹2,200)'
                                      : product.blouseStitchingOption.priceText}
                                  </span>
                                </div>
                                <div className="text-[0.7rem] text-on-surface-variant mt-0.5">
                                  {product.blouseStitchingOption.subtext}
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-baseline gap-space-sm mb-space-md tabular-nums">
                              <span className="font-headline-sm text-headline-sm font-bold text-primary">
                                ₹
                                {(
                                  product.price +
                                  (addBlouseStitching[product.id] &&
                                  product.blouseStitchingOption?.extraCost
                                    ? product.blouseStitchingOption.extraCost
                                    : 0)
                                ).toLocaleString('en-IN')}
                              </span>
                              {product.originalPrice && (
                                <span className="font-body-sm text-body-sm line-through text-outline">
                                  ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                              {product.savingsText && (
                                <span className="font-label-sm text-label-sm text-error font-bold">
                                  {product.savingsText}
                                </span>
                              )}
                              {product.priceTagText && (
                                <span className="font-label-sm text-label-sm text-secondary font-bold">
                                  {product.priceTagText}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-space-xs">
                              <button
                                className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                onClick={() => handleAddToBag(product)}
                              >
                                <span className="material-symbols-outlined text-base">
                                  shopping_bag
                                </span>
                                <span>Add to Bag</span>
                              </button>
                              <button
                                onClick={() =>
                                  setConciergeContext(
                                    `Hi Atiksh Boutique, I am interested in the ${
                                      product.fullTitle
                                    } (₹${product.price.toLocaleString('en-IN')}).`
                                  )
                                }
                                className="w-full py-2.5 rounded-lg bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-base text-secondary">
                                  chat
                                </span>
                                <span>WhatsApp</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SIGNATURE CUSTOM STITCHING & BESPOKE ATELIER SHOWCASE */}
            <section
              className="w-full py-space-3xl px-gutter lg:px-gutter-desktop bg-surface"
              id="custom-atelier"
            >
              <div className="w-full max-w-[1380px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
                  {/* Visual Column with Master Tailor Photo */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container">
                      <img
                        alt="Atiksh Master Tailor and Bespoke Atelier Craft"
                        className="w-full h-[520px] object-cover object-center"
                        src={STITCH_IMAGES.customBlouse}
                        referrerPolicy="no-referrer"
                      />
                      {/* Floating Credibility Tag */}
                      <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md p-space-md rounded-xl shadow-lg">
                        <div className="flex items-center gap-space-md">
                          <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-2xl">architecture</span>
                          </div>
                          <div>
                            <div className="font-title-md text-title-md text-primary font-bold">
                              25+ Years Master Craftsmen
                            </div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">
                              Specialists in royal pad-cut blouses &amp; tailored flair
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Decorative Accent Offset Box */}
                    <div className="hidden sm:block absolute -top-4 -left-4 w-32 h-32 bg-secondary-container/40 rounded-2xl -z-10" />
                    <div className="hidden sm:block absolute -bottom-4 -right-4 w-40 h-40 bg-primary-fixed/30 rounded-2xl -z-10" />
                  </div>

                  {/* Content & Interactive Estimator Column */}
                  <div className="lg:col-span-7 flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-bold">
                      Atiksh Haute Bespoke
                    </span>
                    <h2 className="font-headline-lg lg:font-display text-headline-lg-mobile lg:text-display text-primary mt-space-xs mb-space-sm leading-tight">
                      Tailored to Your Exact Silhouette
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-xl">
                      Never compromise on fit again. From custom-sculpted bridal blouses to regal
                      Anarkalis, send us your fabric or select from our heritage silks. Our master
                      cutters craft every contour to your body.
                    </p>

                    {/* 4-Step Seamless Process Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-xl">
                      <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm">
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold tabular-nums">
                          01
                        </span>
                        <div>
                          <h4 className="font-title-md text-title-md text-primary">
                            Choose Design / Send Photo
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Select from our lookbook or send any Pinterest/Instagram reference.
                          </p>
                        </div>
                      </div>
                      <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm">
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold tabular-nums">
                          02
                        </span>
                        <div>
                          <h4 className="font-title-md text-title-md text-primary">
                            Video Call / Studio Visit
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Guided 15-minute WhatsApp video measurement or Bengaluru studio fitting.
                          </p>
                        </div>
                      </div>
                      <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm">
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold tabular-nums">
                          03
                        </span>
                        <div>
                          <h4 className="font-title-md text-title-md text-primary">
                            Master Cutting &amp; Zari Handcraft
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Precision lining, double interlock stitching &amp; handcrafted
                            embellishments.
                          </p>
                        </div>
                      </div>
                      <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm">
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold tabular-nums">
                          04
                        </span>
                        <div>
                          <h4 className="font-title-md text-title-md text-primary">
                            Doorstep Delivery &amp; Fit Trial
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Delivered in regal keepsake boxes. Complimentary alteration pickup if
                            needed.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Stitching Estimator & WhatsApp Trigger Box */}
                    <div className="p-space-lg rounded-xl bg-surface-container-high shadow-md">
                      <h4 className="font-headline-sm text-headline-sm text-primary mb-space-sm">
                        Interactive Stitching Concierge
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mb-space-md">
                        <div>
                          <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
                            Garment Silhouette
                          </label>
                          <select
                            className="w-full bg-surface text-on-surface px-space-sm py-2 rounded-lg font-body-sm text-body-sm focus:outline-none"
                            id="estimator-garment"
                            value={estimatorGarment}
                            onChange={(e) =>
                              setEstimatorGarment(
                                e.target.value as 'blouse' | 'suit' | 'lehenga' | 'gown'
                              )
                            }
                          >
                            <option value="blouse">Bespoke Blouse (Padded / Maggam)</option>
                            <option value="suit">Anarkali / Sharara Suit Set</option>
                            <option value="lehenga">Bridal Lehenga &amp; Choli</option>
                            <option value="gown">Festive Ethnic Gown</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
                            Timeline Preference
                          </label>
                          <select
                            className="w-full bg-surface text-on-surface px-space-sm py-2 rounded-lg font-body-sm text-body-sm focus:outline-none"
                            id="estimator-speed"
                            value={estimatorSpeed}
                            onChange={(e) =>
                              setEstimatorSpeed(e.target.value as 'express' | 'standard' | 'bridal')
                            }
                          >
                            <option value="express">Express Tailoring (3 Days)</option>
                            <option value="standard">Standard Atelier (7 Days)</option>
                            <option value="bridal">Grand Bridal (14 Days Intensive)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
                            Estimated Craft Fee
                          </label>
                          <div
                            className="font-headline-sm text-headline-sm font-bold text-primary mt-1 tabular-nums"
                            id="estimator-cost"
                          >
                            ₹{estimatedCost.toLocaleString('en-IN')}*
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          *Base custom stitching estimate. Embellishment charges depend on artwork.
                        </span>
                        <button
                          className="w-full sm:w-auto px-space-xl py-space-sm bg-primary-container text-on-primary rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary transition-all flex items-center justify-center gap-space-xs shadow-md cursor-pointer whitespace-nowrap"
                          onClick={handleBookStitchingViaWhatsApp}
                        >
                          <span className="material-symbols-outlined text-lg text-secondary-fixed">
                            chat
                          </span>
                          <span>Book Video Measurement on WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CUSTOMER TESTIMONIALS & REAL ATIKSH BRIDES GALLERY */}
            <section
              className="w-full py-space-3xl px-gutter lg:px-gutter-desktop bg-surface-container-low"
              id="testimonials-section"
            >
              <div className="w-full max-w-[1380px] mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-space-2xl">
                  <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-bold">
                    Royal Patronage
                  </span>
                  <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary mt-space-xs">
                    Adored by Brides &amp; Festive Connoisseurs
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                    Over 4,500 custom garments delivered across India, Singapore, USA and the UAE
                    with pristine 5-star fit approval.
                  </p>
                </div>

                {/* Testimonial Editorial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-2xl">
                  {TESTIMONIALS.map((t) => (
                    <div
                      key={t.name}
                      className="bg-surface p-space-lg rounded-xl shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center text-secondary mb-space-sm">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className="material-symbols-outlined text-base"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <p className="font-body-md text-body-md text-on-surface leading-relaxed mb-space-md italic">
                          {t.quote}
                        </p>
                      </div>
                      <div className="flex items-center gap-space-sm pt-space-sm">
                        <div
                          className={`w-10 h-10 rounded-full ${t.badgeClass} flex items-center justify-center font-bold`}
                        >
                          {t.initials}
                        </div>
                        <div>
                          <div className="font-title-md text-title-md text-primary font-bold">
                            {t.name}
                          </div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant">
                            {t.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Real Clients Instagram Lookbook Reel */}
                <div className="bg-surface p-space-xl rounded-2xl shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-space-lg gap-space-sm">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-primary">
                        #AtikshElegance Reel
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Tag @AtikshBoutique to be featured in our palace lookbook
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavClick('boutique-gallery')}
                      className="inline-flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>View Instagram Gallery</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
                    {[
                      {
                        alt: 'Client wearing Crimson Anarkali',
                        src: STITCH_IMAGES.crimsonAnarkali,
                        product: PRODUCTS[0],
                      },
                      {
                        alt: 'Client in Pastel Kanjeevaram Saree',
                        src: STITCH_IMAGES.kanjeevaramSaree,
                        product: PRODUCTS[1],
                      },
                      {
                        alt: 'Client royal wedding reception group',
                        src: STITCH_IMAGES.heroBanner,
                        product: PRODUCTS[4],
                      },
                      {
                        alt: 'Bespoke Blouse Client fitting',
                        src: STITCH_IMAGES.customBlouse,
                        product: PRODUCTS[2],
                      },
                    ].map((reel, idx) => (
                      <div
                        key={idx}
                        onClick={() => setQuickViewProduct(reel.product)}
                        className="relative group aspect-square rounded-xl overflow-hidden bg-surface-container cursor-pointer"
                      >
                        <img
                          alt={reel.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src={reel.src}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-on-primary">
                          <span className="material-symbols-outlined text-2xl">favorite</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* HERITAGE NEWSLETTER & CONCIERGE HELP CARD */}
            <section className="w-full py-space-3xl px-gutter lg:px-gutter-desktop bg-surface">
              <div className="w-full max-w-[1380px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                  {/* VIP Newsletter Box */}
                  <div className="lg:col-span-7 bg-primary text-on-primary p-space-xl rounded-2xl relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                      <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary-fixed font-bold">
                        Privé Circle
                      </span>
                      <h3 className="font-headline-md text-headline-md mt-space-xs mb-space-sm text-surface-bright">
                        Join the Atiksh Royal Salon
                      </h3>
                      <p className="font-body-md text-body-md text-primary-fixed-dim max-w-lg mb-space-xl">
                        Receive private invitations to confidential wedding trunk shows, early
                        access to festive handlooms, and receive a ₹1,500 bespoke tailoring gift
                        credit on your maiden order.
                      </p>
                      <form
                        className="flex flex-col sm:flex-row gap-space-sm max-w-md"
                        onSubmit={(e) => {
                          e.preventDefault();
                          showToast(
                            'Welcome to the Atiksh Privé Circle! Your ₹1500 voucher has been emailed.'
                          );
                          setNewsletterEmail('');
                        }}
                      >
                        <input
                          className="bg-surface/10 text-on-primary placeholder:text-primary-fixed-dim/60 px-space-md py-3 rounded-lg text-body-sm focus:outline-none flex-1"
                          placeholder="Enter your luxury email..."
                          required
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                        />
                        <button
                          className="px-space-lg py-3 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md uppercase tracking-wider font-bold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors cursor-pointer"
                          type="submit"
                        >
                          Claim Invitation
                        </button>
                      </form>
                    </div>
                    <div className="mt-space-lg pt-space-md text-primary-fixed-dim font-label-sm text-label-sm z-10">
                      Strict privacy preserved. Unsubscribe gracefully anytime.
                    </div>
                    {/* Decorative Ambient Radial Glow */}
                    <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-60 pointer-events-none" />
                  </div>

                  {/* Direct Boutique Concierge Card */}
                  <div className="lg:col-span-5 bg-surface-container-high p-space-xl rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-space-sm">
                        <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-bold">
                          Studio Visit &amp; Assistance
                        </span>
                        <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold bg-secondary-container px-2 py-0.5 rounded">
                          <span className="w-2 h-2 rounded-full bg-secondary" /> Open Today
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary mb-space-md">
                        Bengaluru Flagship Studio
                      </h3>
                      <div className="flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                        <div className="flex items-start gap-space-sm">
                          <span className="material-symbols-outlined text-secondary text-lg mt-0.5">
                            store
                          </span>
                          <span>
                            Shop no 5 Sector  3 jagrivti vihar ,Meerut ,250004
                          </span>
                        </div>
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-secondary text-lg">
                            schedule
                          </span>
                          <span>All 7 Days: 10:30 AM – 8:30 PM IST</span>
                        </div>
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-secondary text-lg">
                            call
                          </span>
                          <span>Direct Stylist Phone: +916396461149</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-space-lg">
                      <button
                        onClick={() =>
                          setConciergeContext(
                            'Hello Atiksh Boutique, I would like to schedule an in-person bridal studio fitting consultation at your Indiranagar Bengaluru Flagship.'
                          )
                        }
                        className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-wider flex items-center justify-center gap-space-xs hover:bg-primary-container transition-colors shadow cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg text-secondary-fixed">
                          calendar_month
                        </span>
                        <span>Reserve Studio Fitting Appointment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TOAST NOTIFICATION CONTAINER */}
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-space-lg py-space-sm rounded-full shadow-2xl font-label-md text-label-md uppercase tracking-wider flex items-center gap-space-xs pointer-events-none transition-all duration-300 ${
            toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          id="toast"
        >
          <span className="material-symbols-outlined text-secondary-fixed text-lg">
            check_circle
          </span>
          <span id="toast-message">{toastMessage || 'Item added to bag'}</span>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-low text-on-surface pt-space-3xl pb-space-2xl">
        <div className="w-full max-w-[1380px] mx-auto px-gutter-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-2xl">
            <div className="lg:col-span-4 flex flex-col gap-space-md">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-primary">ATIKSH</span>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary">
                  Haute Couture &amp; Heritage Atelier
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Embodying regal Indian sartorial artistry, delicate zardozi needlework, and imperial
                silhouette craft. Each creation is handwoven in our ateliers and sculpted to your
                precise bespoke measurements with ceremonial distinction.
              </p>
              <div className="flex items-center gap-space-md pt-space-xs">
                {[
                  { label: 'Boutique Instagram', icon: 'photo_camera' },
                  { label: 'Boutique Pinterest', icon: 'collections_bookmark' },
                  { label: 'Boutique Facebook', icon: 'public' },
                  { label: 'Boutique YouTube', icon: 'smart_display' },
                ].map((social) => (
                  <button
                    key={social.label}
                    aria-label={social.label}
                    onClick={() => handleNavClick('boutique-gallery')}
                    className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">{social.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-space-md">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary">
                Atelier Guides &amp; Services
              </span>
              <ul className="flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-primary transition-colors">
                  <button
                    onClick={() => handleNavClick('shop-collection', 'collection-catalog')}
                    className="cursor-pointer"
                  >
                    Shop All Curations
                  </button>
                </li>
                <li className="hover:text-primary transition-colors">
                  <button
                    onClick={() => handleNavClick('boutique-gallery')}
                    className="cursor-pointer"
                  >
                    Saree Draping Guides &amp; Editorial Lookbook
                  </button>
                </li>
                <li className="hover:text-primary transition-colors">
                  <button onClick={() => setIsSizeGuideOpen(true)} className="cursor-pointer">
                    Blouse Measurement Master Guide
                  </button>
                </li>
                <li className="hover:text-primary transition-colors">
                  <button
                    onClick={() => handleNavClick('custom-stitching', 'custom-atelier')}
                    className="cursor-pointer"
                  >
                    Custom Stitching FAQ
                  </button>
                </li>
                <li className="hover:text-primary transition-colors">
                  <button
                    onClick={() => handleNavClick('admin-atelier-portal')}
                    className="cursor-pointer"
                  >
                    Order Tracking &amp; Fitting Timeline
                  </button>
                </li>
                <li className="hover:text-primary transition-colors">
                  <button
                    onClick={() =>
                      showToast('Complimentary insured shipping & 7-day alteration pickup included.')
                    }
                    className="cursor-pointer"
                  >
                    Shipping &amp; Luxury Returns Policy
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-space-md">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary">
                Boutique Contact
              </span>
              <div className="flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-lg mt-0.5">
                    location_on
                  </span>
                  <span>
                    Shop no 5 Sector  3 jagrivti vihar ,Meerut ,250004
                  </span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-lg">mail</span>
                  <span>atelier@atikshboutique.com</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-lg">call</span>
                  <span>+916396461149</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-lg">schedule</span>
                  <span>Mon - Sun: 10:30 AM – 8:30 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Secured Concierge Payments:
              </span>
              {['UPI', 'RuPay', 'Visa', 'Mastercard', 'NetBanking', 'Cash on Delivery'].map(
                (method) => (
                  <span
                    key={method}
                    className="px-space-sm py-space-xs bg-surface rounded text-on-surface-variant font-label-sm text-label-sm"
                  >
                    {method}
                  </span>
                )
              )}
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              © 2025 Atiksh Boutique &amp; Atelier. Handcrafted with reverence.
            </span>
          </div>
        </div>
      </footer>

      {/* FLOATING BESPOKE STYLIST LIVE ACTION */}
      <aside className="fixed bottom-space-lg right-space-lg z-40">
        <button
          aria-label="WhatsApp Bridal Stylist"
          onClick={() =>
            setConciergeContext(
              'Namaste Atiksh Boutique! I would like to connect with a Bespoke Bridal Stylist.'
            )
          }
          className="flex items-center gap-space-sm px-space-md py-space-sm rounded-full bg-primary-container text-on-primary shadow-[0_8px_30px_rgba(91,19,34,0.25)] hover:bg-primary transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl text-secondary-fixed">forum</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider">
            Bespoke Stylist Live
          </span>
        </button>
      </aside>

      {/* INTERACTIVE DRAWERS & MODALS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartQuantity}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={PRODUCTS}
        onToggleWishlist={handleToggleWishlist}
        onMoveToBag={(prod) => handleAddToBag(prod)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        onRequestCustomFit={handleBookStitchingViaWhatsApp}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToBag={handleAddToBag}
      />

      <WhatsAppConciergeModal
        isOpen={conciergeContext !== null}
        onClose={() => setConciergeContext(null)}
        initialContext={conciergeContext || ''}
        onBooked={(summary) => showToast(summary)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderConfirmed={(orderId) => {
          setIsCheckoutOpen(false);
          setCartItems([]);
          showToast(
            `Order #${orderId} Confirmed! Our Master Tailor will connect with you on WhatsApp shortly.`
          );
        }}
      />
    </div>
  );
}
