import { Gallery } from '@/components/features/galleries/types';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

interface galleryProps extends SharedData {
    galleries: Gallery[];
}

export default function Galleries() {
    const [selectedGallery, setSelectedGallery] = useState<number | null>(null);

    const { galleries } = usePage<galleryProps>().props;

    return (
        <>
            <Head title="Gallery - VerveLab">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <style>{`
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.98);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .modal-overlay {
          animation: modalFadeIn 0.3s ease-out;
        }

        .modal-content {
          animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .image-reveal {
          overflow: hidden;
          position: relative;
        }

        .image-reveal::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          transform: translateX(-100%);
          transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 1;
        }

        .image-reveal.reveal::before {
          transform: translateX(100%);
        }

        .image-reveal img {
          transform: scale(1.1);
          transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .image-reveal.reveal img {
          transform: scale(1);
        }

        .text-balance {
          text-wrap: balance;
        }

        .link-underline {
          position: relative;
          display: inline-block;
        }

        .link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }

        .link-underline:hover::after {
          width: 100%;
        }

        .grid-lines {
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .dark .grid-lines {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
      `}</style>

            <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
                {/* Navigation */}
                <header className="fixed top-0 right-0 left-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-black/90">
                    <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                        <nav className="flex h-16 items-center justify-between">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/image/VerveLab6.png"
                                    alt="VerveLab"
                                    className="h-8 w-auto object-contain"
                                />
                            </Link>
                            <Link
                                href="/"
                                className="link-underline text-sm font-medium"
                            >
                                Back to Home
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Hero */}
                <section className="grid-lines relative overflow-hidden px-6 pt-24 pb-16 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="max-w-5xl">
                            <div className="mb-4 inline-block rounded-full border border-black/10 px-4 py-1.5 text-xs font-medium dark:border-white/10">
                                <span className="opacity-60">Gallery</span>
                            </div>
                            <h1 className="mb-6 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-tighter text-balance">
                                All Galleries
                            </h1>
                            <p className="mb-10 max-w-xl text-lg leading-relaxed font-light text-black/70 dark:text-white/70">
                                A collection of our recent work showcasing
                                creativity and innovation.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Galleries Grid */}
                <section className="px-6 py-20 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {galleries.map((gallery: Gallery) => (
                                <div
                                    key={gallery.id}
                                    className="group cursor-pointer rounded-2xl border border-black/5 p-6 transition-all hover:-translate-y-1 hover:border-black/10 hover:bg-black/[0.02] dark:border-white/5 dark:hover:border-white/10 dark:hover:bg-white/[0.02]"
                                    onClick={() =>
                                        setSelectedGallery(gallery.id)
                                    }
                                >
                                    <div className="mb-6 aspect-[4/3] overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                                        <img
                                            src={`/storage/${gallery.image}`}
                                            alt={gallery.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-medium tracking-tight">
                                            {gallery.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gallery Detail Modal - IMPROVED */}
                {selectedGallery && (
                    <>
                        <div
                            className="modal-overlay fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
                            onClick={() => setSelectedGallery(null)}
                        />
                        <div className="fixed inset-0 z-[60] overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
                                <div className="modal-content relative w-full max-w-5xl">
                                    {galleries
                                        .filter((g) => g.id === selectedGallery)
                                        .map((gallery) => (
                                            <div
                                                key={gallery.id}
                                                className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-black"
                                            >
                                                {/* Close Button */}
                                                <button
                                                    onClick={() =>
                                                        setSelectedGallery(null)
                                                    }
                                                    className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all hover:bg-white dark:bg-black/90 dark:hover:bg-black sm:top-6 sm:right-6"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>

                                                {/* Main Image */}
                                                <div className="relative aspect-[16/9] overflow-hidden bg-black/5 dark:bg-white/5">
                                                    <img
                                                        src={`/storage/${gallery.image}`}
                                                        alt={gallery.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                    {/* Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                    
                                                    {/* Title Overlay on Image */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
                                                        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                                            {gallery.title}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* CTA Section */}
                <section className="border-y border-black/10 px-6 py-20 lg:px-12 dark:border-white/10">
                    <div className="mx-auto max-w-[1400px] text-center">
                        <h2 className="mb-8 text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-semibold tracking-tighter text-balance">
                            Ready to get started?
                        </h2>
                        <a
                            href="/#contact"
                            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all hover:gap-4 dark:bg-white dark:text-black"
                        >
                            Contact Us
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-12 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex flex-col items-start justify-between gap-8 border-t border-black/10 pt-12 md:flex-row md:items-center dark:border-white/10">
                            <div>
                                <div className="mb-2">
                                    <img
                                        src="/image/VerveLab6.png"
                                        alt="VerveLab"
                                        className="h-8 w-auto object-contain"
                                    />
                                </div>
                                <div className="text-sm text-black/50 dark:text-white/50">
                                    © {new Date().getFullYear()} All rights
                                    reserved.
                                </div>
                            </div>
                            <div className="flex gap-8 text-sm">
                                <a
                                    href="#"
                                    className="link-underline font-medium"
                                >
                                    Privacy
                                </a>
                                <a
                                    href="#"
                                    className="link-underline font-medium"
                                >
                                    Terms
                                </a>
                                <a
                                    href="#"
                                    className="link-underline font-medium"
                                >
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}