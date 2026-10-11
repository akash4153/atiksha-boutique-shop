export interface Product {
  id: string;
  title: string;
  fullTitle: string;
  category: 'suits' | 'sarees' | 'blouses';
  categoryLabel: string;
  badgeText: string;
  badgeStyle: 'error' | 'secondary' | 'primary' | 'surface' | 'primary-container';
  rating: string;
  reviewCount: number;
  shortDesc: string;
  quickViewDesc: string;
  price: number;
  originalPrice?: number;
  savingsText?: string;
  priceTagText?: string;
  image: string;
  sizes?: string[];
  defaultSize?: string;
  sizeLabel?: string;
  blouseStitchingOption?: {
    title: string;
    priceText: string;
    extraCost: number;
    subtext: string;
  };
}

export interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeClass: string;
  exploreLabel: string;
  targetSection: 'catalog' | 'atelier';
  filterCategory?: 'all' | 'suits' | 'sarees' | 'blouses';
  image: string;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
}

export interface EditorialCanvasScreen {
  id: string;
  title: string;
  subtitle: string;
  dimensions: string;
  image: string;
  tag: string;
}

export const STITCH_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1WJ4-MJEY9UuQN41q3ocnulAx8h1yE8yMPisZi92oArDb6vGsnAcJZH7Uq0M3UuxNQawpRUrjuSPJFdQjsEz2bOjgptZikBFfkWDmgVzLbv8UycdA9FaonU5l4alr-ws935qGePiYYb2RGayQcuJCTtdl62MgV7TKkJIrezMaReLJMQLYPlTJCq8KbhDoW2S2v02w9F775m1Xipwk6Y6d0gcf_Sy9FJ5k6XAfOciNH2DUb2HFJESlpYSNU',
  profileAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE2qNAyLfPbaWYCL1E01flH0fi8PBKd9bMHWM386-jbz0OkQoqPs4sluwNwWvymHyc-sY8rzw2-YI_md3MpgvlOErZ7Se35auIl3VPXhRyXuAMSD_oAeGMT5ExrhU-DfdCqVkrFz0eiblV1i9qEMBDsYqVPkdkjvtIx_DcEcvTqDLOliSiDbMyG8rGlZsv5cioB2fEYJeEy28zJOLLFQnBcrVolTg7j9fBH_NojdTVtr9TU7atH6jP1g',
  heroBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqct4D1QNiHxLjgbIdFMC_jJHtgES0A0UvqRW-erLT6vZ2POBRtxUw6UJk3pvhDD127ZDQkXGvtFg2nNlQAJsoD30n1ytC1RxlGMunoaCwcflPWorbSX-R3bwn8rL99bdySUdAGcTMEO4UIGQTiFloqM6ETJqmB2uD6f072POGge7MSS6JAoJS5qxdwppsLcOxcERlEOAcvs3Ej04mbg2rkU4OVi_UtZO-hd-kxXJjnt_hR9UaqMyoaw',
  crimsonAnarkali: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUPX1cgJm4_s62vsnCV5qKU5n9C04AOg8cnaFUdgwaAK6Y-F2FeKoogy3HpxS1NxJT1SQJIRP0g2ezV9nCqHPW_uYEu2JmC74HJX7gSICpHETK8EZIZvyQY-ED3OtCamT9eG3gcZUghxB49HIzRrKPip46FMuMiurs01HXC0MzSK4l4prpOIZRM5NM30U4w_w5UU256eJFkffTz-JS0xDcGzFa1Irl0M0LAYvZO2kq45xIiaCge2v7bA',
  kanjeevaramSaree: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSoUrB_zQh9JFWUcXslllpreIoRYLlisJmXlUZlFfWPvCjpaQMiHKiQMRc0lBFsO584a3XgSZcPtgdTBTdgMF5F14RNHmQA8UXUKEy_7SWRVZn0NW2xOvtNwz09hzKC2PseL1XX89MfAMtyywckZQOxr9sr4UrPdqKkzu_ktJtZuj6vmfyEIMqmWFcFBjmiId5V8m1hORSSlTWpPnq6McHoedH8wQdWA1nEDPIbLo8S6Wvd1O-a4LXvA',
  customBlouse: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl5fwzi5Ao3zdZJosixzllOHQdmpuVrh6U2Iu9L9zA-hjTrfYSP6wxnQsbQYgRPKYw8M4soFGqU2zvnuupz9EmTWtVYfhHBvkrC52Wn5FEyfEjuesdqzuYDIsiKzBzAg4m3t2Tax3E4dlzmbrmG8ENvJCnqKmuMhvCqN5c1Tof8EDtasI0Po3fuBxTEpKILLPBlXLK1cfPq9vXUdD7lqeSLVu6TYJpTrXRvUqwSuXjE3vNQVhocSzADg',
  weddingLehenga: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0otZGg7lxtorgaSNlGUNof-d8l1JIiU9FyG5xcXN6WCcA6CXR26xrr5oApWeff_kXqsn8jyzaAa6mazuVMesmU_EDE-cMGIQ4grAQm4hm4zo1vC18htIdtC1RSsCYRflPIG4veaPZistgC4IIrRIZOFKTx0fr_PNaypg7A7XrYbYeVsqvv0XrUjYpPWTPs5szNBASB1ATiALUDB5SCgI8Ud4GVHhdmVO3uxPbSKF4sIPSNWaqW4zPwg',
  kurtiSet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcNgTmYiNpCri5EJeBpCCrFc_jWUWS6eAyWUjUQkvgQXGxB2-vXI8VfJ66HdPBMszICO-ZmH2WisY-reZ4hr_h8DQ0nFjdfvgv4UtxwjICscq-s-9h1hdWnveBqYlft8LmoVVIQ0Zm63VQF5MvPOB_BOjzpw1PrEsSWsz_WmN-v-YoPHoHEgf28oMS2N4qoID8MWwI3Vjqb8n0bUh8M7aHu36b0CTq123JibO8gVJ6ztS-cmOLBHzpJA',
  organzaDupatta: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvvgLcmPt55oTO25BUDWyAso41B15wemV_UK0jZ71Ld_2U8o6rfaNL2vCaHiicBWmb2ovIJA3Wutd84lNI9qC2xhgDs07PlCVC4gUA-z_4AyiMDfHKku3Hvz1PmLH36xmY8nL8Ifs6xdUy2j8jp13BZj5rjtNiW0Nci3haQQrH0XhdcpGolHjxZWcKeiNNzMWa8emYeuRqbNMINq9zjKsOz-O6c1MqsOs826Yzx6qn1BThsddNIvmAaw',
  ivoryChanderi: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1RrpwIGIg8oRVtUYJ24nKtU4Yz0xWKI6DfFVTVFowiDLTYZZfS5IFgU_bh0NWeL9evEAmB0mHGAb5_gxm_pMx-3Ze2t8cVrQhEVRjs1FLxi4g1C_K3hN8VtOEHubWpDPp4zcUB6r4ZYNT-SEMqChz3hMTlal1B4pOW9RK3kCEK9BQn5HBVhfsq6Jv1aoVOHyh2--xSEZhNt7QyNhxgHlRhY_2zw9iqFGO2ByRMdYslE-U81tICdEI9w',
  tussarSilk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0wOc5vsW14cWCy3mIbTuJ-PL2vcOk3-61E1O7ys67ApGSL4yx9SSviB5O0DcBioi1G3950tNH7WLE7ZpXHJsa4FK-K-OfWnmSybVPYz-2xfmBNpli9dTc26MceBPBZY_eWXdnxi5p11ctLpN0ltHLWQOMVYGl1J-T7DyY3O9_nVPjCD71kTLFbzVkTh__ga3Co4aDGqR9LW1E_tEdLsKGwbolKeGFDGaxkUZzOmvkl1w2LzcQHHMpQw',
  // Direct Stitch project canvas assets
  canvasHeroEditorial: 'https://lh3.googleusercontent.com/aida/AEtjO1W4uynQwWcMUGrKPLUzwnNlIsu-hndJR-Zi43WvWGwVu4jZ_qwnjgHPlspw9PvpPi_fbaWlbvnOBzBruw2B-DZ_Blzi7JAPOOZTHO7L_6SMC4SgrR4ViDVMnLqgGmRkQo_C-pFBfXn-_s2M8GsNksHboCMPhGpd2UJ8cYOhRMAQE5qldI_9OVBJiN5OA7o60eGacMsHTmntam2rEUjE_Vtxh0trxplxXkLU9h-XFGq7XaOLiiCnl4I4mvo',
  canvasAnarkaliEditorial: 'https://lh3.googleusercontent.com/aida/AEtjO1VcDlPr4AJxzSdwQsFPaKTWj-Wyj3ub7ta3MabR5MI1CWThWSGajRydpOllGp9adHMDqpD_-ds2WToF75VJC0GZmwyKJo9tG6HTVTB5HalW1YboOk0DEa3rixoxmFWD93DiqpCgGmxxzQbRi9RVa9D838c7u0h4s_G6ojH0hN9aCfnbnXfC7bTgqUxgh4TKFTzlicfCgyjNgesOUcdcMoxQ_MsQuckaajUjoLAs6ls5EI08D6oeEb0Y2us',
  canvasMasterTailor: 'https://lh3.googleusercontent.com/aida/AEtjO1U3k911RXyjE1a0GIVbxklnUv3b3xt9heRLdbZflHZcMsICeYIjyJWF4ASk50iIMHn409gb8BTYYALeC--sf8XcewtAFyDzu4HGtOU19FUOJo_tzwLKhYTw3u18Ntw0HwISPrsFPWx3BhIQCZ0q0lCPjvvQsJRqWY454_OpYkpHDjUexM3vsIexx_nyEg8TyGrLsPUwMB3sVCsCji8E2ymihkXOJLJs8xgor5GN25dRVVqTRlF-CJ-c7QYv',
  canvasKanjeevaramPortrait: 'https://lh3.googleusercontent.com/aida/AEtjO1VyroPxwxNu6xcQXzN7AnK2TJSoEBfs2ekxg2i2dEWmIyD506fIxkN1lSYgL7NouJjwqa4QWdv4B0b_NOFtaYSu7PN0qLXkFE9tKlNTFmF03LMcIE2gp4e_RxGyiwr94_207i4sGF59WrDE16CIapDZgoP6D2THsxPeUzwydufC4nCmRXx20IQJEFn1xmWybjvFyOhdf-QeXX4IeyJtloG1blQDTjuW8wJCW1JKxqhdP_2nZvLk3jU4au88',
};

export const CATEGORIES: CategoryCard[] = [
  {
    id: 'cat-suits',
    title: 'Designer Suits & Sets',
    subtitle: 'Bespoke Anarkalis, Shararas, Angrakhas & Straight Cuts',
    badge: 'Royal Coutures',
    badgeClass: 'bg-primary text-on-primary',
    exploreLabel: 'Explore 48 Designs',
    targetSection: 'catalog',
    filterCategory: 'suits',
    image: STITCH_IMAGES.crimsonAnarkali,
  },
  {
    id: 'cat-sarees',
    title: 'Pure Silk Sarees',
    subtitle: 'Banarasi, Kanjeevaram, Organza & Chanderi Handlooms',
    badge: 'Heritage Weaves',
    badgeClass: 'bg-secondary text-on-secondary',
    exploreLabel: 'Explore 64 Silks',
    targetSection: 'catalog',
    filterCategory: 'sarees',
    image: STITCH_IMAGES.kanjeevaramSaree,
  },
  {
    id: 'cat-blouses',
    title: 'Custom-Stitched Blouses',
    subtitle: 'Precision Cut, Padded, Zardozi & Maggam Embroidery',
    badge: 'Bespoke Atelier',
    badgeClass: 'bg-primary-container text-on-primary',
    exploreLabel: 'Book Measurement',
    targetSection: 'atelier',
    filterCategory: 'blouses',
    image: STITCH_IMAGES.customBlouse,
  },
  {
    id: 'cat-wedding',
    title: 'Party & Wedding Wear',
    subtitle: 'Royal Velvet, Shimmering Georgette & Silk Lehengas',
    badge: 'Bridal Troussier',
    badgeClass: 'bg-secondary-container text-on-secondary-container font-bold',
    exploreLabel: 'Explore 32 Curations',
    targetSection: 'catalog',
    filterCategory: 'suits',
    image: STITCH_IMAGES.weddingLehenga,
  },
  {
    id: 'cat-kurtis',
    title: 'Kurtis & Kurta Sets',
    subtitle: 'Everyday Luxury, Soiree Kurtas & Statement Co-ords',
    badge: 'Everyday Luxe',
    badgeClass: 'bg-surface text-primary',
    exploreLabel: 'Explore 50 Sets',
    targetSection: 'catalog',
    filterCategory: 'suits',
    image: STITCH_IMAGES.kurtiSet,
  },
  {
    id: 'cat-dupattas',
    title: 'Dupattas & Artisanal Shawls',
    subtitle: 'Pure Organza, Kalamkari, Phulkari & Hand-cut Gota Patti',
    badge: 'Accessories',
    badgeClass: 'bg-tertiary-container text-surface-bright',
    exploreLabel: 'Explore 28 Weaves',
    targetSection: 'catalog',
    filterCategory: 'all',
    image: STITCH_IMAGES.organzaDupatta,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Maharani Crimson Anarkali Set',
    fullTitle: 'Maharani Crimson Anarkali Set',
    category: 'suits',
    categoryLabel: 'Bridal Heavy Suit',
    badgeText: '16% OFF',
    badgeStyle: 'error',
    rating: '4.9',
    reviewCount: 42,
    shortDesc: 'Zardozi work with scalloped dupatta & custom churidar',
    quickViewDesc:
      'Pure Raw Silk with Intricate Gota & Marodi Needlework. Comes with fully stitched Churidar and handcrafted Organza Dupatta.',
    price: 18500,
    originalPrice: 22000,
    savingsText: 'Save ₹3,500',
    image: STITCH_IMAGES.crimsonAnarkali,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom'],
    defaultSize: 'M',
    sizeLabel: 'Select Size:',
  },
  {
    id: 'prod-2',
    title: 'Noor Pastel Blush Kanjeevaram',
    fullTitle: 'Noor Pastel Blush Kanjeevaram Saree',
    category: 'sarees',
    categoryLabel: 'Handwoven Heritage',
    badgeText: 'Pure Silk Handloom',
    badgeStyle: 'secondary',
    rating: '5.0',
    reviewCount: 68,
    shortDesc: 'Real zari floral pallu with 80cm unstitched blouse',
    quickViewDesc:
      'Handwoven pure mulberry silk with real gold metallic zari border and complimentary matching unstitched pure silk blouse piece.',
    price: 24900,
    priceTagText: 'Silk Mark Certified',
    image: STITCH_IMAGES.kanjeevaramSaree,
    blouseStitchingOption: {
      title: 'Add Bespoke Blouse Stitching?',
      priceText: '+₹2,200',
      extraCost: 2200,
      subtext: 'Padded, custom neck cut, doorstep trial included',
    },
  },
  {
    id: 'prod-3',
    title: 'Zari Embellished Raw Silk Blouse',
    fullTitle: 'Zari Embellished Raw Silk Bridal Blouse',
    category: 'blouses',
    categoryLabel: 'Custom Atelier',
    badgeText: 'Master Tailored',
    badgeStyle: 'primary',
    rating: '4.9',
    reviewCount: 95,
    shortDesc: 'Maggam border with deep sweetheart cut & padding',
    quickViewDesc:
      'Hand-cut sweetheart neckline, padded interior, intricate zardozi wire embroidery with deep U back and latkan dori.',
    price: 7800,
    priceTagText: 'Includes Video Fitting',
    image: STITCH_IMAGES.customBlouse,
    sizes: ['32', '34', '36', '38', '40', 'Custom'],
    defaultSize: '36',
    sizeLabel: 'Bust Size (inches):',
  },
  {
    id: 'prod-4',
    title: 'Gulmohar Ivory Chanderi Set',
    fullTitle: 'Gulmohar Ivory Chanderi Kurta Set',
    category: 'suits',
    categoryLabel: 'Festive Pret',
    badgeText: 'New Arrival',
    badgeStyle: 'surface',
    rating: '4.8',
    reviewCount: 29,
    shortDesc: 'Lightweight 3-piece set with handcrafted organza dupatta',
    quickViewDesc:
      'Featherlight pure Chanderi silk with hand block printed motifs, delicate mukaish sparkle, and cropped cigarette trousers.',
    price: 9400,
    priceTagText: 'Ready to Ship',
    image: STITCH_IMAGES.ivoryChanderi,
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M',
    sizeLabel: 'Select Size:',
  },
  {
    id: 'prod-5',
    title: 'Rajwada Royal Velvet Lehanga',
    fullTitle: 'Rajwada Royal Velvet Lehanga Suit',
    category: 'suits',
    categoryLabel: 'Imperial Heritage',
    badgeText: 'Limited Atelier',
    badgeStyle: 'primary-container',
    rating: '5.0',
    reviewCount: 31,
    shortDesc: 'Micro-velvet with antique gold dori embroidery',
    quickViewDesc:
      'Imperial micro-velvet kalidar lehenga skirt paired with hand-embroidered koti jacket and sequin veil.',
    price: 32000,
    priceTagText: 'Includes Can-Can Layering',
    image: STITCH_IMAGES.heroBanner,
    sizes: ['Standard Bridal', 'Custom Waist & Flare'],
    defaultSize: 'Standard Bridal',
    sizeLabel: 'Custom Fit Option:',
  },
  {
    id: 'prod-6',
    title: 'Aura Handloom Tussar Silk',
    fullTitle: 'Aura Handloom Tussar Silk Saree',
    category: 'sarees',
    categoryLabel: 'Tussar Handloom',
    badgeText: 'Organic Wild Silk',
    badgeStyle: 'secondary',
    rating: '4.9',
    reviewCount: 18,
    shortDesc: 'Woven temple borders with hand-twisted tassels',
    quickViewDesc:
      'Ethically sourced Tussar wild silk saree woven with traditional tribal temple borders and rich antique copper pallu.',
    price: 14200,
    priceTagText: 'Free Insured Shipping',
    image: STITCH_IMAGES.tussarSilk,
    blouseStitchingOption: {
      title: 'Includes Silk Blouse Piece',
      priceText: 'Included',
      extraCost: 0,
      subtext: 'Fall, Pico & Tassel finishing complimentary',
    },
  },
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    productId: 'prod-1',
    title: 'Maharani Crimson Anarkali Set',
    subtitle: 'Size: M | Free Pico Included',
    price: 18500,
    quantity: 1,
    image: STITCH_IMAGES.crimsonAnarkali,
  },
  {
    id: 'cart-2',
    productId: 'prod-3',
    title: 'Zari Embellished Raw Silk Blouse',
    subtitle: 'Size: 36 | Video Fitting Confirmed',
    price: 7800,
    quantity: 1,
    image: STITCH_IMAGES.customBlouse,
  },
];

export const EDITORIAL_SCREENS: EditorialCanvasScreen[] = [
  {
    id: 'ab6b9e25af284ffe817de01c76150924',
    title: 'Palatial Couture Campaign — Festive & Bridal 2025',
    subtitle:
      'High-fashion editorial banner of elegant Indian women wearing regal designer crimson maroon and champagne gold embroidered lehengas and royal silk sarees in our palatial luxury boutique atelier.',
    dimensions: '1376 × 768 · Editorial Lookbook',
    image: STITCH_IMAGES.canvasHeroEditorial,
    tag: 'Campaign Showcase',
  },
  {
    id: '546d0933f82f44d8bedbe55a3851d1aa',
    title: 'Bespoke Royal Maroon Zardozi Anarkali Study',
    subtitle:
      'Editorial fashion study of a bespoke royal maroon designer Anarkali suit crafted with delicate gold zardozi embroidery and pure zari borders.',
    dimensions: '896 × 1200 · Silhouette Archive',
    image: STITCH_IMAGES.canvasAnarkaliEditorial,
    tag: 'Bespoke Suits',
  },
  {
    id: '9f0a62f31ce640bcb2e7b75e12da580b',
    title: 'Master Artisan Tailoring & Handloom Silk Draping',
    subtitle:
      'Inside the Bengaluru Atelier: master Indian artisan tailor measuring exquisite handloom silk fabric with brass tape measure and bespoke embellished blouse cuts.',
    dimensions: '896 × 1200 · Craftsmanship Study',
    image: STITCH_IMAGES.canvasMasterTailor,
    tag: 'Haute Atelier',
  },
  {
    id: 'a03d2adc43e745b59a7cada1e2af331b',
    title: 'Pastel Blush & Champagne Gold Kanjeevaram Portrait',
    subtitle:
      'High-fashion portrait of a pastel blush pink and champagne gold Kanjeevaram silk saree woven with intricate floral zari motifs and paired with temple heirloom jewelry.',
    dimensions: '896 × 1200 · Heritage Weaves',
    image: STITCH_IMAGES.canvasKanjeevaramPortrait,
    tag: 'Silk Mark Certified',
  },
];

export const SIZE_CHART = [
  { size: 'XS (32)', bust: '32 - 33', waist: '26 - 27', hip: '36 - 37', length: '14.0' },
  { size: 'S (34)', bust: '34 - 35', waist: '28 - 29', hip: '38 - 39', length: '14.5' },
  { size: 'M (36)', bust: '36 - 37', waist: '30 - 31', hip: '40 - 41', length: '15.0' },
  { size: 'L (38)', bust: '38 - 39', waist: '32 - 33', hip: '42 - 43', length: '15.0' },
  { size: 'XL (40)', bust: '40 - 41', waist: '34 - 35', hip: '44 - 45', length: '15.5' },
  { size: 'XXL (42)', bust: '42 - 44', waist: '36 - 38', hip: '46 - 48', length: '16.0' },
];

export const TESTIMONIALS = [
  {
    initials: 'AK',
    name: 'Ananya Kulkarni',
    role: 'Bridal Client • Mumbai',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    quote:
      '"I was nervous about ordering my wedding Sangeet Anarkali online from Delhi. The Atiksh team did a 20-minute video measurement session, sent fabric swatches, and the fitting was 100% flawless! No alterations needed."',
  },
  {
    initials: 'SV',
    name: 'Sunita Venkat',
    role: 'Heritage Silk Collector • Bengaluru',
    badgeClass: 'bg-primary-fixed text-on-primary-fixed',
    quote:
      '"Their Kanjeevaram weaves are pure royalty. The silk has incredible weight and authentic sheen that cheap powerloom fabrics just cannot mimic. Plus, their blouse tailoring service saved me weeks of tailor visits."',
  },
  {
    initials: 'PM',
    name: 'Prerna Mehrotra',
    role: 'Fashion Stylist • Hyderabad',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    quote:
      '"Sent them a custom embroidery sketch for my reception blouse. The intricate zardozi wirework matched the moodboard down to the exact millimeter. The doorstep delivery package felt like opening a royal heirloom chest!"',
  },
];
