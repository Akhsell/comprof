import { Client } from '@/components/features/clients/types';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface ClientProps extends SharedData {
    clients: Client[];
}

export default function Clients() {
    const { clients } = usePage<ClientProps>().props;

    return (
        <>
            <Head title="Clients - VerveLab">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
                {/* Navigation */}
                <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-black/90">
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
                <section className="px-6 pt-28 pb-20 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="max-w-4xl">
                            <div className="mb-4 inline-block rounded-full border border-black/10 px-4 py-1.5 text-xs font-medium dark:border-white/10">
                                Clients
                            </div>
                            <h1 className="mb-6 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-tighter">
                                All Clients
                            </h1>
                            <p className="max-w-xl text-lg font-light text-black/70 dark:text-white/70">
                                Organizations across industries that trust us to
                                deliver impactful digital solutions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Clients Grid */}
                <section className="px-6 py-20 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {clients.map((client) => (
                                <div
                                    key={client.id}
                                    className="group block rounded-2xl border border-black/5 p-6 transition-all hover:-translate-y-1 hover:border-black/10 hover:bg-black/[0.02] dark:border-white/5 dark:hover:border-white/10 dark:hover:bg-white/[0.02]"
                                >
                                    <div className="mb-6 aspect-[4/3] overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                                        <img
                                            src={`/storage/${client.logo}`}
                                            alt={client.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold tracking-wider text-black/40 uppercase dark:text-white/40">
                                            {client.description}
                                        </div>
                                        <h3 className="text-xl font-medium tracking-tight">
                                            {client.name}
                                        </h3>
                                        {/* <p className="text-sm font-light text-black/60 dark:text-white/60">
                                            {client.website}
                                        </p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
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
                        <div className="flex flex-col gap-8 border-t border-black/10 pt-12 md:flex-row md:items-center md:justify-between dark:border-white/10">
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