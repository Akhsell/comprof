import { Product } from '@/components/features/products/types';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CreditCard,
    Trash2,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface CheckoutProps extends SharedData {
    product?: Product;
}

interface CartItem {
    product: Product;
    quantity: number;
}

export default function Checkout() {
    const { props } = usePage();
    const { product } = props as unknown as CheckoutProps;
    
    // Initialize cart with the product from backend if available
    const [cart, setCart] = useState<CartItem[]>([]);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
    });

    // Initialize cart when component mounts or product changes
    useEffect(() => {
        if (product) {
            // If a product is passed from backend, add it to cart
            setCart([{
                product: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    description: product.description || '',
                    content: '',
                    order: 0,
                    slug: ''
                },
                quantity: 1
            }]);
        } else {
            // If no product, initialize empty cart
            setCart([]);
        }
    }, [product]);

    const updateQuantity = (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        const newCart = [...cart];
        newCart[index].quantity = newQuantity;
        setCart(newCart);
    };

    const removeItem = (index: number) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    const calculateSubtotal = () => {
        return cart.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0,
        );
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const tax = subtotal * 0.11;
        return subtotal + tax;
    };

    const generateWhatsAppLink = () => {
        const phoneNumber = '6285695766484';

        const itemsText = cart
            .map(
                (item, index) =>
                    `${index + 1}. ${item.product.name} x${item.quantity} - Rp ${(
                        item.product.price * item.quantity
                    ).toLocaleString('id-ID')}`,
            )
            .join('\n');

        const message = `
Halo VerveLab 👋
Saya ingin melakukan pemesanan dengan detail berikut:

🧑 Nama: ${formData.fullName}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}

📦 Alamat Pengiriman:
${formData.address}, ${formData.city}, ${formData.postalCode}

🛒 Order:
${itemsText}

💰 Subtotal: Rp ${calculateSubtotal().toLocaleString('id-ID')}
🧾 Pajak (11%): Rp ${(calculateSubtotal() * 0.11).toLocaleString('id-ID')}
✅ Total: Rp ${calculateTotal().toLocaleString('id-ID')}

Terima kasih 🙏
`;

        const encodedMessage = encodeURIComponent(message.trim());
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate cart is not empty
        if (cart.length === 0) {
            alert('Keranjang belanja kosong. Silahkan tambahkan produk terlebih dahulu.');
            return;
        }
        
        // Validate form data
        if (!formData.fullName || !formData.email || !formData.phone || 
            !formData.address || !formData.city || !formData.postalCode) {
            alert('Silahkan lengkapi semua informasi pengiriman.');
            return;
        }
        
        const waLink = generateWhatsAppLink();
        window.open(waLink, '_blank');
    };

    return (
        <>
            <Head title="Checkout - VerveLab">
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
                        Continue Shopping
                    </Link>
                </section>

                {/* Main Content */}
                <section className="mx-auto max-w-[1400px] px-6 py-6 lg:px-12 lg:py-8">
                    {/* Page Title */}
                    <div className="mb-12">
                        <div className="mb-3 flex items-center gap-2">
                            <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] font-semibold tracking-tighter">
                                Checkout
                            </h1>
                        </div>
                        <p className="text-base font-light text-black/70 dark:text-white/70">
                            Complete your purchase
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                            {/* Left - Checkout Form */}
                            <div className="lg:col-span-7">
                                <div className="space-y-8">
                                    {/* Contact Information */}
                                    <div>
                                        <h2 className="mb-4 text-xl font-semibold tracking-tight">
                                            Contact Information
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            fullName:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full rounded-lg border border-black/10 bg-transparent px-4 py-3 text-base transition-colors outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                email: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="w-full rounded-lg border border-black/10 bg-transparent px-4 py-3 text-base transition-colors outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                phone: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="w-full rounded-lg border border-black/10 bg-transparent px-4 py-3 text-base transition-colors outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
                                                        placeholder="+62 ..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="border-t border-black/10 pt-8 dark:border-white/10">
                                        <h2 className="mb-4 text-xl font-semibold tracking-tight">
                                            Shipping Address
                                        </h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">
                                                    Street Address
                                                </label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    value={formData.address}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            address:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full rounded-lg border border-black/10 bg-transparent px-4 py-3 text-base transition-colors outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
                                                    placeholder="Enter your street address"
                                                />
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.city}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                city: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="w-full rounded-lg border border-black/10 bg-transparent px-4 py-3 text-base transition-colors outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
                                                        placeholder="City"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-2 block text-sm font-medium text-black/70 dark:text-white/70">
                                                        Postal Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={
                                                            formData.postalCode
                                                        }
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                postalCode:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full rounded-lg border border-black/10 bg-transparent px-4 py-3 text-base transition-colors outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
                                                        placeholder="12345"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Order Summary */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-24">
                                    <div className="rounded-xl border border-black/10 p-6 dark:border-white/10">
                                        <h2 className="mb-5 text-xl font-semibold tracking-tight">
                                            Order Summary
                                        </h2>

                                        {/* Cart Items */}
                                        <div className="mb-5 space-y-4">
                                            {cart.length === 0 ? (
                                                <div className="text-center py-8">
                                                    <p className="text-black/50 dark:text-white/50">
                                                        Keranjang belanja kosong
                                                    </p>
                                                    <Link 
                                                        href="/product/view-product"
                                                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline"
                                                    >
                                                        <ArrowLeft className="h-4 w-4" />
                                                        Pilih produk terlebih dahulu
                                                    </Link>
                                                </div>
                                            ) : (
                                                cart.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-4 rounded-lg border border-black/5 p-4 dark:border-white/5"
                                                    >
                                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-black/5 dark:bg-white/5">
                                                            <img
                                                                src={`/storage/${item.product.image}`}
                                                                alt={
                                                                    item.product
                                                                        .name
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-1 flex-col">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <h3 className="text-base font-medium tracking-tight line-clamp-2">
                                                                    {
                                                                        item.product
                                                                            .name
                                                                    }
                                                                </h3>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeItem(
                                                                            index,
                                                                        )
                                                                    }
                                                                    className="text-black/40 transition-colors hover:text-red-500 dark:text-white/40"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                            <div className="mt-3 flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                index,
                                                                                item.quantity -
                                                                                    1,
                                                                            )
                                                                        }
                                                                        className="flex h-7 w-7 items-center justify-center rounded border border-black/10 text-sm transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <span className="w-8 text-center text-sm">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                index,
                                                                                item.quantity +
                                                                                    1,
                                                                            )
                                                                        }
                                                                        className="flex h-7 w-7 items-center justify-center rounded border border-black/10 text-sm transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                                <span className="text-base font-medium">
                                                                    Rp{' '}
                                                                    {Number(
                                                                        item.product
                                                                            .price *
                                                                            item.quantity,
                                                                    ).toLocaleString(
                                                                        'id-ID',
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        {/* Price Breakdown - Only show if cart has items */}
                                        {cart.length > 0 && (
                                            <>
                                                <div className="space-y-3 border-t border-black/10 pt-5 dark:border-white/10">
                                                    <div className="flex justify-between text-base">
                                                        <span className="text-black/70 dark:text-white/70">
                                                            Subtotal
                                                        </span>
                                                        <span className="font-medium">
                                                            Rp{' '}
                                                            {calculateSubtotal().toLocaleString(
                                                                'id-ID',
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-base">
                                                        <span className="text-black/70 dark:text-white/70">
                                                            Tax (11%)
                                                        </span>
                                                        <span className="font-medium">
                                                            Rp{' '}
                                                            {(
                                                                calculateSubtotal() *
                                                                0.11
                                                            ).toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between border-t border-black/10 pt-3 dark:border-white/10">
                                                        <span className="text-lg font-semibold">
                                                            Total
                                                        </span>
                                                        <span className="text-xl font-semibold">
                                                            Rp{' '}
                                                            {calculateTotal().toLocaleString(
                                                                'id-ID',
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Checkout Button */}
                                                <button
                                                    type="submit"
                                                    className="cursor-pointer group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-base font-medium text-white transition-all hover:gap-4 dark:bg-white dark:text-black"
                                                >
                                                    <CreditCard className="h-5 w-5" />
                                                    Complete Purchase
                                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>

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