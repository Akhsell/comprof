import { Product } from '@/components/features/products/types';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Check, Minus } from 'lucide-react';

interface detailProductProps extends SharedData {
    product: Product;
    relatedProducts?: Product[];
}

export default function ProductDetail() {
    const { product, relatedProducts } = usePage<detailProductProps>().props;

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
                <div className="text-center">
                    <p className="text-lg text-black/70 dark:text-white/70">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={`${product.name} - VerveLab`}>
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

        .gradient-overlay {
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%);
        }

        .dark .gradient-overlay {
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
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
                            <div className="flex items-center gap-6">
                                <Link
                                    href="/product/view-product"
                                    className="link-underline text-sm font-medium"
                                >
                                    All Products
                                </Link>
                                <Link
                                    href="/"
                                    className="link-underline text-sm font-medium"
                                >
                                    Home
                                </Link>
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Breadcrumb */}
                <section className="mx-auto max-w-[1400px] px-6 pt-24 lg:px-12">
                    <Link
                        href="/product/view-product"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </Link>
                </section>

                {/* Main Content */}
                <section className="mx-auto max-w-[1400px] px-6 py-8 lg:px-12 lg:py-12">
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                        {/* Left - Overview (Product Info) */}
                        <div className="lg:col-span-5">
                            {/* Title */}
                            <div className="mb-8 space-y-2">
                                <h1 className="text-[clamp(2rem,4vw,3rem)] leading-tight font-semibold tracking-tight text-balance">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <Minus className="h-3 w-3 text-black/20 dark:text-white/20" />
                                    <span className="text-xs font-medium uppercase tracking-wider text-black/60 dark:text-white/60">
                                        Overview
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                                        Description
                                    </h2>
                                    <p className="text-base leading-relaxed font-light text-black/70 dark:text-white/70">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Details */}
                                {product.content && (
                                    <div className="border-t border-black/10 pt-6 dark:border-white/10">
                                        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                                            Product Details
                                        </h2>
                                        <p className="text-base leading-relaxed font-light text-black/70 dark:text-white/70">
                                            {product.content}
                                        </p>
                                    </div>
                                )}

                                {/* Benefits List */}
                                <div className="border-t border-black/10 pt-6 dark:border-white/10">
                                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                                        What's Included
                                    </h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-black/40 dark:text-white/40" />
                                            <span className="font-light text-black/70 dark:text-white/70">
                                                Free consultation
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-black/40 dark:text-white/40" />
                                            <span className="font-light text-black/70 dark:text-white/70">
                                                24/7 Support
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-black/40 dark:text-white/40" />
                                            <span className="font-light text-black/70 dark:text-white/70">
                                                Money-back guarantee
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Product Card (Image + Pricing) */}
                        <div className="lg:col-span-7">
                            <div className="sticky top-24">
                                <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                                    {/* Product Image */}
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Pricing Section */}
                                    <div className="p-6">
                                        <div className="mb-6 flex items-end justify-between">
                                            <div>
                                                <div className="mb-1 text-xs font-medium text-black/60 dark:text-white/60">
                                                    Price
                                                </div>
                                                <div className="text-3xl font-semibold tracking-tight">
                                                    Rp{' '}
                                                    {Number(product.price).toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-medium text-black/60 dark:text-white/60">
                                                    Status
                                                </div>
                                                <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs font-medium dark:bg-white/5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                    Available
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <a
                                            href={`/product/checkout/${product.slug}`}
                                            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:gap-4 dark:bg-white dark:text-black"
                                        >
                                            Buy Product
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </a>

                                        {/* Additional Info */}
                                        <div className="mt-5 rounded-xl border border-black/10 p-4 dark:border-white/10">
                                            <p className="text-sm font-light leading-relaxed text-black/70 dark:text-white/70">
                                                Need help choosing? Our team is ready to assist you in finding the perfect solution for your needs.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <section className="border-t border-black/10 px-6 py-20 lg:px-12 dark:border-white/10">
                        <div className="mx-auto max-w-[1400px]">
                            <div className="mb-10">
                                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                                    Related Products
                                </h2>
                                <p className="max-w-xl text-sm font-light text-black/70 dark:text-white/70">
                                    Discover more products that might interest you
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {relatedProducts
                                    .slice(0, 3)
                                    .map((relatedProduct) => (
                                        <Link
                                            key={relatedProduct.id}
                                            href={`/product/detail-product/${relatedProduct.id}`}
                                            className="group rounded-xl border border-black/5 p-5 transition-all hover:-translate-y-1 hover:border-black/10 hover:bg-black/[0.02] dark:border-white/5 dark:hover:border-white/10 dark:hover:bg-white/[0.02]"
                                        >
                                            <div className="mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
                                                <img
                                                    src={`/storage/${relatedProduct.image}`}
                                                    alt={relatedProduct.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium tracking-tight">
                                                    {relatedProduct.name}
                                                </h3>
                                                <p className="text-sm font-light text-black/60 dark:text-white/60">
                                                    Rp{' '}
                                                    {Number(
                                                        relatedProduct.price,
                                                    ).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="border-t border-black/10 px-6 py-12 lg:px-12 dark:border-white/10">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex flex-col items-start justify-between gap-8 pt-12 md:flex-row md:items-center">
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