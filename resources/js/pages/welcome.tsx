import { Article } from '@/components/features/articles/types';
import { Client } from '@/components/features/clients/types';
import { Event } from '@/components/features/events/types';
import { Gallery } from '@/components/features/galleries/types';
import { Product } from '@/components/features/products/types';
import { login } from '@/routes';
import { type SharedData } from '@/types';
import { formatDate } from '@/types/formatDate';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    ArrowUpRight,
    Calendar,
    Mail,
    MapPin,
    Phone,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface welcomeProps extends SharedData {
    products: Product[];
    articles: Article[];
    events: Event[];
    clients: Client[];
    galleries: Gallery[];
}

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const { products, articles, events, clients, galleries } =
        usePage<welcomeProps>().props;
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const menuSections = [
        { title: 'About Us', href: '#about' },
        { title: 'Contact Us', href: '#contact' },
    ];

    const mainMenuItems = [
        { label: 'Products', href: '/product/view-product', featured: true },
        { label: 'Articles', href: '/article/view-article' },
        { label: 'Events', href: '/event/view-event' },
        { label: 'Clients', href: '/client/view-client' },
        { label: 'Gallery', href: '/gallery/view-gallery' },
    ];

    return (
        <>
            <Head title="VerveLab">
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

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin 0.8s linear infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

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
          transform: scale(1);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-reveal:hover img {
          transform: scale(1.08);
        }

        /* Smooth hover animation for product images */
        .product-card .image-reveal img {
          transform: scale(1);
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .image-reveal img {
          transform: scale(1.1);
        }

        /* Smooth hover animation for article images */
        .article-card .image-reveal img {
          transform: scale(1);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .article-card:hover .image-reveal img {
          transform: scale(1.05);
        }

        /* Smooth hover animation for gallery images */
        .gallery-item {
          overflow: hidden;
          position: relative;
        }

        .gallery-item img {
          transform: scale(1);
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover img {
          transform: scale(1.12);
        }

        /* Smooth hover animation for client logos */
        .client-logo-wrapper {
          overflow: hidden;
        }

        .client-logo-wrapper img {
          transform: scale(1);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .client-logo-wrapper:hover img {
          transform: scale(1.1);
        }

        .text-balance {
          text-wrap: balance;
        }

        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
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

        .marquee {
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-content {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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

        .contact-info-card {
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.05);
          padding: 24px;
          transition: all 0.2s ease;
        }

        .contact-info-card:hover {
          border-color: rgba(0,0,0,0.1);
          background: rgba(0,0,0,0.02);
          transform: translateY(-2px);
        }

        .dark .contact-info-card {
          border-color: rgba(255,255,255,0.05);
        }

        .dark .contact-info-card:hover {
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
        }
      `}</style>

            <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
                {/* Navigation */}
                <header
                    className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                        scrolled
                            ? 'border-b border-black/10 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-black/90'
                            : ''
                    }`}
                >
                    <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                        <nav className="flex h-16 items-center justify-between">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/image/VerveLab6.png"
                                    alt="VerveLab"
                                    className="h-8 w-auto object-contain"
                                />
                            </Link>

                            <div className="flex items-center gap-8">
                                {!auth.user && (
                                    <Link
                                        href={login()}
                                        className="link-underline hidden text-sm font-medium md:inline-block"
                                    >
                                        Sign In
                                    </Link>
                                )}

                                {auth.user && (
                                    <Link
                                        href="/dashboard"
                                        className="link-underline text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={() => setIsMenuOpen(true)}
                                    className="group hidden cursor-pointer items-center gap-3 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition-all hover:border-black/20 hover:bg-black/5 md:inline-flex dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/5"
                                >
                                    <span className="transition-opacity group-hover:opacity-70">
                                        Menu
                                    </span>
                                    <div className="flex flex-col gap-1">
                                        <span className="h-[2px] w-4 bg-current transition-all duration-300 group-hover:w-5"></span>
                                        <span className="h-[2px] w-3 bg-current transition-all duration-300 group-hover:w-5"></span>
                                    </div>
                                </button>
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Menu Overlay */}
                <div
                    className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-md transition-opacity duration-500 ${
                        isMenuOpen
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={`fixed top-0 right-0 z-[60] h-full w-full max-w-xl transform bg-white transition-transform duration-500 ease-out dark:bg-black ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b border-black/10 px-8 py-6 dark:border-white/10">
                            <span className="text-xs font-medium tracking-wide uppercase opacity-50">
                                Navigation
                            </span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-8 py-12">
                            <nav className="space-y-1">
                                {mainMenuItems.map((item, index) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className="group flex items-center justify-between rounded-xl px-4 py-4 transition-all hover:bg-black/5 dark:hover:bg-white/5"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="text-2xl font-light tracking-tight">
                                            {item.label}
                                        </span>
                                        <ArrowUpRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                                    </a>
                                ))}
                            </nav>

                            <div className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">
                                <h3 className="mb-4 text-xs font-semibold tracking-wider uppercase opacity-50">
                                    Company
                                </h3>
                                <div className="space-y-3">
                                    {menuSections.map((section) => (
                                        <a
                                            key={section.title}
                                            href={section.href}
                                            className="block text-base text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsMenuOpen(false);
                                                setTimeout(() => {
                                                    const element =
                                                        document.querySelector(
                                                            section.href,
                                                        );
                                                    element?.scrollIntoView({
                                                        behavior: 'smooth',
                                                    });
                                                }, 300);
                                            }}
                                        >
                                            {section.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="grid-lines relative overflow-hidden px-6 pt-24 pb-16 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="max-w-5xl">
                            <div className="mb-4 inline-block rounded-full border border-black/10 px-4 py-1.5 text-xs font-medium dark:border-white/10">
                                <span className="opacity-60">
                                    Welcome to VerveLab
                                </span>
                            </div>
                            <h1 className="mb-6 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-tighter text-balance">
                                Digital innovation
                                <br />
                                for modern
                                <br />
                                businesses
                            </h1>
                            <p className="mb-10 max-w-xl text-lg leading-relaxed font-light text-black/70 dark:text-white/70">
                                We craft exceptional digital experiences that
                                drive growth and transform industries.
                            </p>
                            <div className="flex flex-wrap items-center gap-4"></div>
                        </div>
                    </div>
                </section>

                {/* About Us */}
                <section id="about" className="px-6 py-20 lg:px-12 lg:py-32">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="mb-20">
                            <div className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase opacity-40">
                                Who We Are
                            </div>
                            <h2 className="mb-6 text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] font-bold tracking-tighter">
                                About Us
                            </h2>
                            <p className="max-w-3xl text-xl leading-relaxed font-light text-black/60 dark:text-white/60">
                                VerveLab is a digital innovation company
                                dedicated to transforming businesses through
                                cutting-edge technology and creative solutions.
                                We believe in the power of digital experiences
                                to drive meaningful change.
                            </p>
                        </div>

                        <div>
                            <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
                                <div className="lg:col-span-2">
                                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                                        <svg
                                            className="h-8 w-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-6 text-4xl font-bold tracking-tight">
                                        Our Vision
                                    </h3>
                                    <p className="text-lg leading-relaxed text-black/70 dark:text-white/70">
                                        To be the leading catalyst for digital
                                        transformation, empowering businesses
                                        worldwide to reach their full potential
                                        through innovative technology solutions
                                        and exceptional user experiences.
                                    </p>
                                </div>

                                <div className="lg:col-span-3">
                                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                                        <svg
                                            className="h-8 w-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-8 text-4xl font-bold tracking-tight">
                                        Our Mission
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="group flex gap-6 border-l-2 border-black/10 pl-6 transition-all hover:border-black/40 dark:border-white/10 dark:hover:border-white/40">
                                            <div className="flex-shrink-0 pt-1">
                                                <span className="text-3xl font-bold text-black/20 dark:text-white/20">
                                                    01
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-lg leading-relaxed text-black/70 dark:text-white/70">
                                                    Deliver world-class digital
                                                    products and services that
                                                    solve real-world problems
                                                </p>
                                            </div>
                                        </div>
                                        <div className="group flex gap-6 border-l-2 border-black/10 pl-6 transition-all hover:border-black/40 dark:border-white/10 dark:hover:border-white/40">
                                            <div className="flex-shrink-0 pt-1">
                                                <span className="text-3xl font-bold text-black/20 dark:text-white/20">
                                                    02
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-lg leading-relaxed text-black/70 dark:text-white/70">
                                                    Foster innovation and create
                                                    lasting value for our
                                                    clients and their customers
                                                </p>
                                            </div>
                                        </div>
                                        <div className="group flex gap-6 border-l-2 border-black/10 pl-6 transition-all hover:border-black/40 dark:border-white/10 dark:hover:border-white/40">
                                            <div className="flex-shrink-0 pt-1">
                                                <span className="text-3xl font-bold text-black/20 dark:text-white/20">
                                                    03
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-lg leading-relaxed text-black/70 dark:text-white/70">
                                                    Build solutions through
                                                    creativity, expertise, and
                                                    unwavering dedication
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section id="products" className="px-6 py-20 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="mb-16 flex items-end justify-between">
                            <div>
                                <div className="mb-2 text-xs font-semibold tracking-wider uppercase opacity-50">
                                    What We Offer
                                </div>
                                <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tighter">
                                    Products
                                </h2>
                            </div>
                            <p className="hidden max-w-sm text-base font-light text-black/70 lg:block dark:text-white/70">
                                Innovative solutions designed to solve
                                real-world challenges
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product, index) => (
                                <a
                                    key={index}
                                    href={`/product/detail-product/${product.slug}`}
                                    className="product-card group"
                                >
                                    <div className="image-reveal reveal mb-6 aspect-[3/4] overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="text-xs font-semibold tracking-wider text-black/40 uppercase dark:text-white/40">
                                            {product.description}
                                        </div>
                                        <h3 className="text-xl font-medium tracking-tight transition-opacity group-hover:opacity-60">
                                            {product.name}
                                        </h3>
                                        <p className="text-base font-light text-black/70 dark:text-white/70">
                                            Rp{' '}
                                            {Number(
                                                product.price,
                                            ).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Articles Section */}
                <section
                    id="articles"
                    className="bg-black/[0.015] px-6 py-20 lg:px-12 dark:bg-white/[0.015]"
                >
                    <div className="mx-auto max-w-[1400px]">
                        <div className="mb-16">
                            <div className="mb-2 text-xs font-semibold tracking-wider uppercase opacity-50">
                                Insights
                            </div>
                            <h2 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tighter">
                                Latest Articles
                            </h2>
                            <p className="max-w-xl text-base font-light text-black/70 dark:text-white/70">
                                Insights and perspectives on technology and
                                design
                            </p>
                        </div>

                        <div className="space-y-0 divide-y divide-black/10 dark:divide-white/10">
                            {articles.map((article, index) => (
                                <a
                                    key={index}
                                    href={`/article/detail-article/${article.slug}`}
                                    className="article-card group grid gap-6 py-8 transition-all hover:bg-black/[0.02] lg:grid-cols-12 lg:gap-12 lg:px-6 lg:py-10 dark:hover:bg-white/[0.02]"
                                >
                                    <div className="lg:col-span-5">
                                        <div className="image-reveal reveal aspect-[16/10] overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                                            <img
                                                src={`/storage/${article.thumbnail}`}
                                                alt={article.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center lg:col-span-7">
                                        <h3 className="mb-3 text-2xl font-medium tracking-tight transition-opacity group-hover:opacity-60 lg:text-3xl">
                                            {article.title}
                                        </h3>
                                        <p className="mb-4 text-base leading-relaxed text-black/70 dark:text-white/70">
                                            {article.content}
                                        </p>
                                        <div className="inline-flex items-center gap-2 text-sm font-medium">
                                            Read Article
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Events Section */}
                <section id="events" className="px-6 py-20 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="mb-16">
                            <div className="mb-2 text-xs font-semibold tracking-wider uppercase opacity-50">
                                Join Us
                            </div>
                            <h2 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tighter">
                                Upcoming Events
                            </h2>
                            <p className="max-w-xl text-base font-light text-black/70 dark:text-white/70">
                                Join us at industry-leading conferences and
                                meetups
                            </p>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            {events.map((event, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-8 transition-all hover:border-black/20 dark:border-white/10 dark:bg-black dark:hover:border-white/20"
                                >
                                    <div className="relative z-10">
                                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-xs dark:border-white/10">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{event.location}</span>
                                        </div>
                                        <h3 className="mb-3 text-3xl font-medium tracking-tight">
                                            {event.title}
                                        </h3>
                                        <p className="text-base text-black/70 dark:text-white/70">
                                            {event.location}
                                        </p>
                                        <p className="text-base text-black/70 dark:text-white/70">
                                            {formatDate(event.start_date)}
                                        </p>
                                        <p className="text-base text-black/70 dark:text-white/70">
                                            {formatDate(event.end_date)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Clients Section */}
                <section
                    id="clients"
                    className="border-y border-black/10 px-6 py-24 lg:px-16 dark:border-white/10"
                >
                    <div className="mx-auto max-w-[1440px]">
                        <div className="mb-20 text-center">
                            <div className="mb-3 text-xs font-semibold tracking-wider uppercase opacity-50">
                                Partners
                            </div>
                            <h2 className="mb-5 text-[clamp(2.75rem,5vw,4.25rem)] leading-[0.95] font-semibold tracking-tighter">
                                Trusted By
                            </h2>
                            <p className="mx-auto max-w-xl text-lg font-light text-black/70 dark:text-white/70">
                                Leading organizations across industries
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-px bg-black/5 md:grid-cols-3 lg:grid-cols-6 dark:bg-white/5">
                            {clients.map((client, index) => (
                                <a
                                    key={index}
                                    href={
                                        client.website
                                            ? client.website.startsWith('http')
                                                ? client.website
                                                : `https://${client.website}`
                                            : '#'
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center justify-center bg-white p-14 text-center transition-all duration-300 hover:bg-black/[0.03] dark:bg-black dark:hover:bg-white/[0.03]"
                                >
                                    <div className="client-logo-wrapper mb-6 h-24 w-24 overflow-hidden rounded-2xl">
                                        <img
                                            src={`/storage/${client.logo}`}
                                            alt={client.name}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <div className="text-base font-medium tracking-tight">
                                        {client.name}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section id="gallery" className="px-6 py-20 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="mb-16">
                            <div className="mb-2 text-xs font-semibold tracking-wider uppercase opacity-50">
                                Portfolio
                            </div>
                            <h2 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tighter">
                                Gallery
                            </h2>
                            <p className="max-w-xl text-base font-light text-black/70 dark:text-white/70">
                                A collection of our recent work
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {galleries.map((item, index) => (
                                <a
                                    key={index}
                                    href="/gallery/view-gallery"
                                    className="gallery-item group relative aspect-[4/5] overflow-hidden rounded-xl bg-black/5 dark:bg-white/5"
                                >
                                    <img
                                        src={`/storage/${item.image}`}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="text-lg font-medium text-white">
                                            {item.title}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Us */}
                <section id="contact" className="px-6 py-20 lg:px-12 lg:py-32">
                    <div className="mx-auto max-w-[1400px]">
                        {/* Header */}
                        <div className="mb-16">
                            <div className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase opacity-40">
                                Get in Touch
                            </div>
                            <h2 className="mb-6 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-tighter text-balance">
                                Contact Us
                            </h2>
                            <p className="max-w-xl text-lg leading-relaxed font-light text-black/70 dark:text-white/70">
                                Have a question or want to work together? We'd
                                love to hear from you.
                            </p>
                        </div>

                        {/* Info Cards */}
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="contact-info-card">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
                                    <Mail className="h-5 w-5 opacity-60" />
                                </div>
                                <div className="mb-1 text-xs font-semibold tracking-wider text-black/40 uppercase dark:text-white/40">
                                    Email
                                </div>
                                <p className="text-base font-medium">
                                    hello@vervelab.io
                                </p>
                                <p className="mt-1 text-sm font-light text-black/50 dark:text-white/50">
                                    We reply within 24 hours
                                </p>
                            </div>

                            <div className="contact-info-card">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
                                    <Phone className="h-5 w-5 opacity-60" />
                                </div>
                                <div className="mb-1 text-xs font-semibold tracking-wider text-black/40 uppercase dark:text-white/40">
                                    Phone
                                </div>
                                <p className="text-base font-medium">
                                    +62 21 1234 5678
                                </p>
                                <p className="mt-1 text-sm font-light text-black/50 dark:text-white/50">
                                    Mon–Fri, 9am–6pm WIB
                                </p>
                            </div>

                            <div className="contact-info-card">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5">
                                    <MapPin className="h-5 w-5 opacity-60" />
                                </div>
                                <div className="mb-1 text-xs font-semibold tracking-wider text-black/40 uppercase dark:text-white/40">
                                    Office
                                </div>
                                <p className="text-base font-medium">
                                    Jakarta, Indonesia
                                </p>
                                <p className="mt-1 text-sm font-light text-black/50 dark:text-white/50">
                                    Sudirman Central Business District
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="border-y border-black/10 px-6 py-20 lg:px-12 dark:border-white/10">
                    <div className="mx-auto max-w-[1400px] text-center">
                        <h2 className="mb-8 text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-semibold tracking-tighter text-balance">
                            Let's create something
                            <br />
                            extraordinary together
                        </h2>
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all hover:gap-4 dark:bg-white dark:text-black"
                        >
                            Start a Project
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
                                    href=""
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