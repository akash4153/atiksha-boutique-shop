import React, { useState } from 'react';
import { EDITORIAL_SCREENS, STITCH_IMAGES } from '../data/boutiqueData';

interface BoutiqueGalleryViewProps {
  onBackHome: () => void;
  onBookStylist: (note: string) => void;
}

export const BoutiqueGalleryView: React.FC<BoutiqueGalleryViewProps> = ({
  onBackHome,
  onBookStylist,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="w-full py-space-2xl px-gutter lg:px-gutter-desktop bg-surface min-h-screen">
      <div className="w-full max-w-[1380px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-bold">
              Archival Lookbook &amp; Stitch Canvas
            </span>
            <h1 className="font-headline-lg text-headline-lg text-primary mt-space-xs">
              Atiksh Editorial Gallery &amp; Couture Studies
            </h1>
          </div>
          <div className="flex items-center gap-space-sm">
            <button
              onClick={onBackHome}
              className="px-space-md py-space-xs rounded-lg bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Return to Flagship Store
            </button>
            <button
              onClick={() =>
                onBookStylist('Requesting private lookbook viewing and bridal trousseau styling.')
              }
              className="px-space-lg py-space-xs rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-colors cursor-pointer"
            >
              Book Private Viewing
            </button>
          </div>
        </div>

        {/* High-res Stitch Editorial Canvas Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl mb-space-3xl">
          {/* Hero 16:9 Campaign Card */}
          <div className="lg:col-span-12 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md">
            <div className="relative h-[440px] lg:h-[560px] overflow-hidden bg-surface-container">
              <img
                src={EDITORIAL_SCREENS[0].image}
                alt={EDITORIAL_SCREENS[0].title}
                referrerPolicy="no-referrer"
                onClick={() => setSelectedImage(EDITORIAL_SCREENS[0].image)}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 cursor-pointer"
              />
              <span className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm uppercase px-3 py-1 rounded shadow">
                {EDITORIAL_SCREENS[0].tag}
              </span>
            </div>
            <div className="p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div>
                <div className="font-label-sm text-xs text-secondary uppercase tracking-wider mb-1">
                  {EDITORIAL_SCREENS[0].dimensions}
                </div>
                <h2 className="font-headline-sm text-headline-sm text-primary">
                  {EDITORIAL_SCREENS[0].title}
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl mt-1">
                  {EDITORIAL_SCREENS[0].subtitle}
                </p>
              </div>
              <button
                onClick={() =>
                  onBookStylist(`Inquiring about ${EDITORIAL_SCREENS[0].title} ensembles`)
                }
                className="px-space-lg py-2.5 bg-primary-container text-on-primary rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inquire About Campaign
              </button>
            </div>
          </div>

          {/* 3 Portrait Editorial Studies from Stitch Project */}
          {EDITORIAL_SCREENS.slice(1).map((screen) => (
            <div
              key={screen.id}
              className="lg:col-span-4 bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                <img
                  src={screen.image}
                  alt={screen.title}
                  referrerPolicy="no-referrer"
                  onClick={() => setSelectedImage(screen.image)}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
                <span className="absolute top-3 left-3 bg-primary-container text-on-primary font-label-sm text-label-sm uppercase px-2.5 py-0.5 rounded">
                  {screen.tag}
                </span>
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-label-sm text-xs text-secondary uppercase tracking-wider mb-1">
                    {screen.dimensions}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-1">
                    {screen.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    {screen.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => onBookStylist(`Commissioning bespoke replica of: ${screen.title}`)}
                  className="w-full py-2.5 bg-surface-container-high text-primary rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-secondary-container hover:text-on-secondary-container transition-colors cursor-pointer"
                >
                  Commission Bespoke Cut
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-on-surface/80 backdrop-blur-md flex items-center justify-center p-gutter"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Editorial Fullscreen"
              referrerPolicy="no-referrer"
              className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-surface text-primary flex items-center justify-center shadow-lg cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

interface AtelierPortalViewProps {
  onBackHome: () => void;
  onShowToast: (msg: string) => void;
  onBookStylist: (note: string) => void;
}

export const AtelierPortalView: React.FC<AtelierPortalViewProps> = ({
  onBackHome,
  onShowToast,
  onBookStylist,
}) => {
  const [measurements, setMeasurements] = useState({
    bust: '36.0',
    underBust: '31.5',
    waist: '30.0',
    shoulder: '14.5',
    blouseLength: '15.0',
    sleeveLength: '10.5',
    armhole: '16.5',
    neckDepthFront: '7.5',
    neckDepthBack: '10.0',
  });

  return (
    <section className="w-full py-space-2xl px-gutter lg:px-gutter-desktop bg-surface min-h-screen">
      <div className="w-full max-w-[1380px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-bold">
              Client Bespoke Dossier
            </span>
            <h1 className="font-headline-lg text-headline-lg text-primary mt-space-xs">
              Atiksh Atelier Fitting &amp; Order Portal
            </h1>
          </div>
          <button
            onClick={onBackHome}
            className="px-space-md py-space-xs rounded-lg bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Back to Flagship Store
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Active Tailoring Orders */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <span className="font-label-sm text-xs text-secondary uppercase font-bold">
                    Order #AT-8942 • In Master Production
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-primary">
                    Maharani Crimson Anarkali &amp; Zari Bridal Blouse
                  </h2>
                </div>
                <span className="px-3 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold uppercase">
                  Stage 3 of 4
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-sm mb-space-lg">
                <div className="p-space-sm rounded-lg bg-surface-container-low">
                  <div className="font-label-sm text-xs text-secondary font-bold">Step 01 ✓</div>
                  <div className="font-title-md text-sm text-primary mt-0.5">Silk Dyed &amp; Cut</div>
                  <div className="text-xs text-on-surface-variant">Completed Oct 06</div>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low">
                  <div className="font-label-sm text-xs text-secondary font-bold">Step 02 ✓</div>
                  <div className="font-title-md text-sm text-primary mt-0.5">Video Measurement</div>
                  <div className="text-xs text-on-surface-variant">Approved Oct 08</div>
                </div>
                <div className="p-space-sm rounded-lg bg-primary-container text-on-primary">
                  <div className="font-label-sm text-xs text-secondary-fixed font-bold">
                    Step 03 • Active
                  </div>
                  <div className="font-title-md text-sm mt-0.5">Zardozi &amp; Stitching</div>
                  <div className="text-xs text-primary-fixed-dim">Master Cutter: Ustad Rafiq</div>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low">
                  <div className="font-label-sm text-xs text-on-surface-variant font-bold">Step 04</div>
                  <div className="font-title-md text-sm text-primary mt-0.5">Insured Dispatch</div>
                  <div className="text-xs text-on-surface-variant">Est. Oct 14</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-md border-t border-surface-container">
                <div className="text-xs text-on-surface-variant">
                  Includes 2.5-inch internal seam allowance &amp; complimentary doorstep fitting trial.
                </div>
                <button
                  onClick={() =>
                    onBookStylist(
                      'Requesting live studio photo update for Order #AT-8942 (Zardozi & Stitching stage).'
                    )
                  }
                  className="px-space-md py-2 bg-surface-container-high text-primary rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-secondary-container hover:text-on-secondary-container transition-colors cursor-pointer"
                >
                  Request Work-in-Progress Photo
                </button>
              </div>
            </div>

            <div className="bg-surface-container-low p-space-xl rounded-2xl flex flex-col sm:flex-row items-center gap-space-lg">
              <img
                src={STITCH_IMAGES.canvasMasterTailor}
                alt="Master Tailor"
                referrerPolicy="no-referrer"
                className="w-32 h-40 object-cover rounded-xl shrink-0"
              />
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                  Bengaluru Flagship Atelier
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">
                  Complimentary Lifetime Seam Adjustments
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Every Atiksh couture piece is archived with your personal paper pattern in our
                  Indiranagar vault for effortless future re-orders and festive resizing.
                </p>
                <button
                  onClick={() =>
                    onBookStylist('Scheduling doorstep pickup for garment alteration / refitting.')
                  }
                  className="px-space-lg py-2 bg-primary-container text-on-primary rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-colors cursor-pointer"
                >
                  Book Alteration Pickup
                </button>
              </div>
            </div>
          </div>

          {/* Saved Custom Measurement Profile */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              Saved Silhouette Profile
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary mt-1 mb-space-md">
              Personal Measurement Card (Inches)
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onShowToast('Your bespoke measurement profile has been updated in our Atelier Vault.');
              }}
              className="flex flex-col gap-space-md"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm tabular-nums">
                {[
                  { key: 'bust', label: 'Bust Full' },
                  { key: 'underBust', label: 'Under Bust' },
                  { key: 'waist', label: 'Waist' },
                  { key: 'shoulder', label: 'Shoulder' },
                  { key: 'blouseLength', label: 'Blouse Length' },
                  { key: 'sleeveLength', label: 'Sleeve Length' },
                  { key: 'armhole', label: 'Armhole' },
                  { key: 'neckDepthFront', label: 'Front Neck' },
                  { key: 'neckDepthBack', label: 'Back Neck' },
                ].map((field) => (
                  <div key={field.key} className="bg-surface-container-low p-2.5 rounded-lg">
                    <label className="block font-label-sm text-[0.65rem] uppercase text-on-surface-variant mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={measurements[field.key as keyof typeof measurements]}
                      onChange={(e) =>
                        setMeasurements({ ...measurements, [field.key]: e.target.value })
                      }
                      className="w-full bg-surface px-2 py-1 rounded text-primary font-bold text-sm focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors shadow cursor-pointer"
              >
                Save Measurement Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
