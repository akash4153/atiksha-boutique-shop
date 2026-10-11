import React, { useState } from 'react';
import { CartItem, Product, SIZE_CHART } from '../data/boutiqueData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToCheckout,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      id="cart-drawer"
    >
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
        id="cart-backdrop"
        onClick={onClose}
      />
      <div
        className={`absolute top-0 right-0 w-full max-w-md h-full bg-surface shadow-2xl flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="cart-panel"
      >
        {/* Drawer Header */}
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
            <span className="font-headline-sm text-headline-sm text-primary">Your Shopping Bag</span>
            <span
              className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold tabular-nums"
              id="cart-count-badge"
            >
              {totalCount}
            </span>
          </div>
          <button
            aria-label="Close Shopping Bag"
            className="p-1 rounded-full text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="p-space-md bg-secondary-container/20 px-space-lg">
          <div className="flex items-center justify-between font-label-sm text-label-sm text-on-secondary-container font-bold mb-1">
            <span>Complimentary Pan-India Insured Shipping</span>
            <span>{subtotal > 0 ? 'Unlocked!' : 'Free on all orders'}</span>
          </div>
          <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
            <div className="w-full h-full bg-secondary rounded-full" />
          </div>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-md" id="cart-items-list">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">shopping_bag</span>
              <p className="font-headline-sm text-headline-sm text-primary mb-1">Your Shopping Bag is Empty</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                Explore our handcrafted sarees, regal Anarkalis, and custom bridal blouses.
              </p>
              <button
                onClick={onClose}
                className="px-space-lg py-space-xs bg-primary-container text-on-primary rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-colors cursor-pointer"
              >
                Explore Royal Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-space-md bg-surface-container-lowest p-space-sm rounded-lg shadow-sm"
              >
                <img
                  alt={item.title}
                  className="w-16 h-20 object-cover rounded bg-surface-container shrink-0"
                  src={item.image}
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-title-md text-title-md text-primary truncate">{item.title}</h5>
                  <span className="font-label-sm text-xs text-on-surface-variant block">{item.subtitle}</span>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="font-headline-sm text-sm font-bold text-primary tabular-nums">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-container rounded px-1.5 py-0.5">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-xs font-bold text-primary px-1 hover:text-secondary cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-xs font-semibold tabular-nums">{item.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-xs font-bold text-primary px-1 hover:text-secondary cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  aria-label={`Remove ${item.title}`}
                  className="text-on-surface-variant hover:text-error transition-colors p-1 cursor-pointer"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-space-lg bg-surface-container-low flex flex-col gap-space-sm">
          <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
            <span>Bag Subtotal</span>
            <span className="font-headline-sm text-headline-sm font-bold text-primary tabular-nums" id="cart-subtotal">
              ₹{subtotal.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center justify-between font-label-sm text-xs text-on-surface-variant">
            <span>Insured Transit &amp; Taxes</span>
            <span className="text-secondary font-bold">Complimentary</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full mt-2 py-3 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-all flex items-center justify-center gap-space-xs shadow-md disabled:opacity-50 cursor-pointer"
            onClick={onProceedToCheckout}
          >
            <span className="material-symbols-outlined text-base">lock</span>
            <span>Proceed to Secured Checkout</span>
          </button>
          <div className="flex items-center justify-center gap-space-md pt-space-xs text-on-surface-variant text-[0.7rem] uppercase font-bold tracking-wider">
            <span>UPI / GPay</span>
            <span>•</span>
            <span>RuPay / Cards</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestCustomFit: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onRequestCustomFit,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-gutter transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      id="size-modal"
    >
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface p-space-xl rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-space-md mb-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              Boutique Tailoring Standard
            </span>
            <h3 className="font-headline-md text-headline-md text-primary">
              Indian Couture Size Master Guide
            </h3>
          </div>
          <button
            aria-label="Close Size Guide"
            className="p-1 rounded-full text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
          All measurements are depicted in <strong>inches</strong>. Every stitched garment comes with
          an internal 2.5-inch alteration margin allowance for future personal adjustment.
        </p>
        <div className="overflow-x-auto mb-space-lg">
          <table className="w-full text-left font-body-sm text-body-sm tabular-nums">
            <thead className="bg-surface-container-high text-primary font-bold">
              <tr>
                <th className="p-2.5">Size Tag</th>
                <th className="p-2.5">Bust (in)</th>
                <th className="p-2.5">Waist (in)</th>
                <th className="p-2.5">Hip (in)</th>
                <th className="p-2.5">Blouse Length (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-on-surface">
              {SIZE_CHART.map((row, index) => (
                <tr key={row.size} className={index % 2 === 1 ? 'bg-surface-container-lowest' : ''}>
                  <td className="p-2.5 font-bold text-primary">{row.size}</td>
                  <td className="p-2.5">{row.bust}</td>
                  <td className="p-2.5">{row.waist}</td>
                  <td className="p-2.5">{row.hip}</td>
                  <td className="p-2.5">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
          <div>
            <h5 className="font-title-md text-title-md text-primary">Need a Bespoke Cut?</h5>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              We customize neck depth, sleeve length, shoulder slope, and back tassels.
            </p>
          </div>
          <button
            className="px-space-md py-2 bg-secondary text-on-secondary rounded font-label-sm text-label-sm uppercase font-bold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            onClick={() => {
              onClose();
              onRequestCustomFit();
            }}
          >
            Request Custom Fit
          </button>
        </div>
      </div>
    </div>
  );
};

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (product: Product, selectedSize?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToBag,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product?.defaultSize || 'M');

  React.useEffect(() => {
    if (product?.defaultSize) {
      setSelectedSize(product.defaultSize);
    }
  }, [product]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-gutter transition-opacity duration-300 ${
        product ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      id="quickview-modal"
    >
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={onClose} />
      {product && (
        <div className="relative bg-surface rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden">
          <button
            aria-label="Close Quick View"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-[3/4] bg-surface-container">
              <img
                alt={product.fullTitle}
                className="w-full h-full object-cover"
                id="qv-img"
                src={product.image}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-space-xl flex flex-col justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                  Atiksh Authentic Handcraft
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2" id="qv-title">
                  {product.fullTitle}
                </h3>
                <div
                  className="font-headline-md text-headline-md font-bold text-primary mb-3 tabular-nums"
                  id="qv-price"
                >
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md" id="qv-desc">
                  {product.quickViewDesc}
                </p>

                {product.sizes && (
                  <div className="mb-space-md">
                    <span className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1.5">
                      {product.sizeLabel || 'Select Size:'}
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-2.5 h-8 rounded text-xs font-semibold transition-colors cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-primary text-on-primary'
                              : sz === 'Custom'
                              ? 'bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary'
                              : 'bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-space-sm bg-surface-container-low rounded-lg mb-space-md">
                  <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-secondary font-bold">
                    <span className="material-symbols-outlined text-base">verified</span>
                    <span>Silk Mark / Handloom Authenticated</span>
                  </div>
                  <div className="text-[0.75rem] text-on-surface-variant mt-0.5">
                    Complimentary door-to-door alteration trial available across India.
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-sm">
                <button
                  className="w-full py-3 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors shadow cursor-pointer"
                  id="qv-add-btn"
                  onClick={() => {
                    onAddToBag(product, selectedSize);
                    onClose();
                  }}
                >
                  Add to Shopping Bag
                </button>
                <button
                  className="w-full py-2.5 bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm uppercase hover:bg-surface-container-high transition-colors cursor-pointer"
                  onClick={onClose}
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string, productTitle: string) => void;
  onMoveToBag: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onToggleWishlist,
  onMoveToBag,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute top-0 right-0 w-full max-w-md h-full bg-surface shadow-2xl flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-2xl">favorite</span>
            <span className="font-headline-sm text-headline-sm text-primary">Royal Wishlist</span>
            <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-xs font-bold tabular-nums">
              {wishlistedProducts.length}
            </span>
          </div>
          <button
            aria-label="Close Wishlist"
            className="p-1 rounded-full text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-md">
          {wishlistedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">favorite</span>
              <p className="font-headline-sm text-headline-sm text-primary mb-1">Your Wishlist is Empty</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Tap the heart icon on any couture creation to save it to your private trousseau list.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-space-md bg-surface-container-lowest p-space-sm rounded-lg shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-20 object-cover rounded bg-surface-container shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-title-md text-title-md text-primary truncate">{item.title}</h5>
                  <span className="font-label-sm text-xs text-secondary block">{item.categoryLabel}</span>
                  <div className="font-headline-sm text-sm font-bold text-primary mt-1 tabular-nums">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onMoveToBag(item);
                      onClose();
                    }}
                    className="px-2.5 py-1.5 bg-primary-container text-on-primary rounded font-label-sm text-[0.65rem] uppercase tracking-wider hover:bg-primary transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => onToggleWishlist(item.id, item.title)}
                    className="text-xs text-on-surface-variant hover:text-error text-center py-0.5 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter(
    (p) =>
      p.fullTitle.toLowerCase().includes(query.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-gutter">
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl max-w-2xl w-full shadow-2xl p-space-lg overflow-hidden">
        <div className="flex items-center gap-space-sm border-b border-outline-variant pb-space-sm mb-space-md">
          <span className="material-symbols-outlined text-primary text-2xl">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kanjeevaram sarees, crimson Anarkalis, zardozi blouses..."
            className="w-full bg-transparent text-on-surface font-body-md text-body-md focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto flex flex-col gap-space-xs">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onClose();
                onSelectProduct(item);
              }}
              className="flex items-center gap-space-md p-space-sm rounded-lg hover:bg-surface-container-low transition-colors text-left cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-16 object-cover rounded shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <div className="font-title-md text-title-md text-primary truncate">{item.fullTitle}</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {item.shortDesc}
                </div>
              </div>
              <div className="font-headline-sm text-sm font-bold text-primary tabular-nums">
                ₹{item.price.toLocaleString('en-IN')}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface WhatsAppConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext: string;
  onBooked: (summary: string) => void;
}

export const WhatsAppConciergeModal: React.FC<WhatsAppConciergeModalProps> = ({
  isOpen,
  onClose,
  initialContext,
  onBooked,
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [preferredSlot, setPreferredSlot] = useState('Today, 4:00 PM IST (Video Drapery & Fitting)');
  const [notes, setNotes] = useState(initialContext);

  React.useEffect(() => {
    setNotes(initialContext);
  }, [initialContext]);

  if (!isOpen) return null;

  const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `${notes} | Client: ${clientName || 'Guest'} (${phone}) | Slot: ${preferredSlot}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter">
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl max-w-lg w-full shadow-2xl p-space-xl overflow-hidden">
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              Atiksh Bridal &amp; Bespoke Concierge
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary mt-0.5">
              Schedule Stylist &amp; Video Measurement
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onBooked(`Consultation reserved for ${preferredSlot}`);
            onClose();
          }}
          className="flex flex-col gap-space-md"
        >
          <div>
            <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
              Your Full Name
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g., Maharani Gayatri Devi"
              className="w-full bg-surface-container-low text-on-surface px-space-md py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none border border-outline-variant"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div>
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
                WhatsApp Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface px-space-md py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none border border-outline-variant"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
                Appointment Slot
              </label>
              <select
                value={preferredSlot}
                onChange={(e) => setPreferredSlot(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none border border-outline-variant"
              >
                <option>Today, 4:00 PM IST (Video Fitting)</option>
                <option>Today, 6:30 PM IST (Video Fitting)</option>
                <option>Tomorrow, 11:30 AM IST (Bengaluru Studio)</option>
                <option>Tomorrow, 3:00 PM IST (Bridal Trousseau)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
              Garment &amp; Custom Tailoring Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-surface-container-low text-on-surface p-space-sm rounded-lg font-body-sm text-body-sm focus:outline-none border border-outline-variant"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
            <button
              type="submit"
              className="flex-1 py-3 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors flex items-center justify-center gap-1.5 shadow cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-secondary-fixed">check_circle</span>
              <span>Confirm Video Fitting</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onBooked('Opening direct WhatsApp Concierge chat...');
                onClose();
              }}
              className="px-space-md py-3 bg-surface-container-high text-primary rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-base text-secondary">open_in_new</span>
              <span>WhatsApp App</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderConfirmed: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderConfirmed,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter">
      <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl max-w-xl w-full shadow-2xl p-space-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              Secured Indian Concierge Gateway
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary">
              Complete Your Couture Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const orderId = `AT-${Math.floor(1000 + Math.random() * 9000)}`;
            onOrderConfirmed(orderId);
          }}
          className="flex flex-col gap-space-md"
        >
          <div className="p-space-md bg-surface-container-low rounded-xl flex items-center justify-between">
            <div>
              <div className="font-label-sm text-xs text-on-surface-variant uppercase">
                Total Payable ({items.reduce((s, i) => s + i.quantity, 0)} Creations)
              </div>
              <div className="font-headline-sm text-headline-sm font-bold text-primary tabular-nums">
                ₹{subtotal.toLocaleString('en-IN')}
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-bold">
              Free Insured Express Delivery
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div>
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
                Recipient Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none border border-outline-variant"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
                Mobile / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none border border-outline-variant"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            <div className="sm:col-span-2">
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
                Delivery Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Flat No., Street, Landmark, City"
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none border border-outline-variant"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1 font-semibold">
                PIN Code
              </label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="560038"
                className="w-full bg-surface-container-low text-on-surface px-space-sm py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none border border-outline-variant tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1.5 font-semibold">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-space-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-space-sm rounded-lg text-center font-label-sm text-label-sm uppercase transition-colors cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'bg-surface-container text-on-surface'
                }`}
              >
                UPI / GPay
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-space-sm rounded-lg text-center font-label-sm text-label-sm uppercase transition-colors cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'bg-surface-container text-on-surface'
                }`}
              >
                RuPay / Cards
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-space-sm rounded-lg text-center font-label-sm text-label-sm uppercase transition-colors cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'bg-surface-container text-on-surface'
                }`}
              >
                Cash on Delivery
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-primary-container text-on-primary rounded-lg font-label-lg text-label-lg uppercase tracking-wider hover:bg-primary transition-colors shadow-md cursor-pointer mt-2"
          >
            Place Royal Order • ₹{subtotal.toLocaleString('en-IN')}
          </button>
        </form>
      </div>
    </div>
  );
};
