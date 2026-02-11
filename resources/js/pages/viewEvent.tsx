import { Event } from '@/components/features/events/types';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, X, Calendar, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

interface eventProps extends SharedData {
    events: Event[];
}

export default function Events({ events }: eventProps) {
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

    const { events: eventData } = usePage<eventProps>().props;

    // Format date if available
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title="Events - VerveLab">
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
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

        .gradient-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
        }

        .dark .gradient-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%);
        }

        @media (max-width: 768px) {
          .modal-content {
            margin: 0;
            border-radius: 0;
            max-height: 100vh;
          }
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
                                <span className="opacity-60">Events</span>
                            </div>
                            <h1 className="mb-6 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-tighter text-balance">
                                All Events
                            </h1>
                            <p className="mb-10 max-w-xl text-lg leading-relaxed font-light text-black/70 dark:text-white/70">
                                Join us at industry-leading conferences and
                                meetups to stay ahead of the curve.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Events Grid */}
                <section className="px-6 py-20 lg:px-12">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {eventData.map((event: Event) => (
                                <div
                                    key={event.id}
                                    className="group cursor-pointer rounded-2xl border border-black/5 p-6 transition-all hover:-translate-y-1 hover:border-black/10 hover:bg-black/[0.02] dark:border-white/5 dark:hover:border-white/10 dark:hover:bg-white/[0.02]"
                                    onClick={() => setSelectedEvent(event.id)}
                                >
                                    <div className="mb-6 aspect-[4/3] overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                                        <img
                                            src={`/storage/${event.image}`}
                                            alt={event.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold tracking-wider text-black/40 uppercase dark:text-white/40">
                                            {event.title}
                                        </div>
                                        <h3 className="text-xl font-medium tracking-tight line-clamp-2">
                                            {event.content}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm font-light text-black/60 dark:text-white/60">
                                            <MapPin className="h-4 w-4" />
                                            <p className="line-clamp-1">{event.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Event Detail Modal */}
                {selectedEvent && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="animate-fade-in fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
                            onClick={() => setSelectedEvent(null)}
                        />
                        
                        {/* Modal */}
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 md:p-8">
                                {eventData
                                    .filter((e) => e.id === selectedEvent)
                                    .map((event) => (
                                        <div
                                            key={event.id}
                                            className="animate-scale-in modal-content relative w-full max-w-5xl overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-black"
                                        >
                                            {/* Close Button */}
                                            <button
                                                onClick={() => setSelectedEvent(null)}
                                                className="absolute top-4 right-4 z-20 rounded-full bg-black/80 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-black hover:scale-110 dark:bg-white/80 dark:text-black dark:hover:bg-white md:top-6 md:right-6"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>

                                            {/* Hero Image with Overlay */}
                                            <div className="relative aspect-[21/9] overflow-hidden bg-black/5 dark:bg-white/5">
                                                <img
                                                    src={`/storage/${event.image}`}
                                                    alt={event.title}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="gradient-overlay absolute inset-0" />
                                                
                                                {/* Event Category Badge */}
                                                <div className="absolute top-6 left-6">
                                                    <div className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                                                        {event.title}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-8 md:p-12">
                                                {/* Event Title */}
                                                <h2 className="mb-6 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-semibold tracking-tight text-balance">
                                                    {event.content}
                                                </h2>

                                                {/* Event Meta Info */}
                                                <div className="mb-8 grid gap-4 md:grid-cols-2">
                                                    {/* Location */}
                                                    <div className="flex items-start gap-3 rounded-xl border border-black/10 p-4 dark:border-white/10">
                                                        <div className="mt-0.5 rounded-lg bg-black/5 p-2 dark:bg-white/5">
                                                            <MapPin className="h-5 w-5 text-black/60 dark:text-white/60" />
                                                        </div>
                                                        <div>
                                                            <p className="mb-1 text-xs font-semibold tracking-wider text-black/40 uppercase dark:text-white/40">
                                                                Location
                                                            </p>
                                                            <p className="font-medium leading-snug">
                                                                {event.location}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Date (if available) */}
                                                    {event.created_at && (
                                                        <div className="flex items-start gap-3 rounded-xl border border-black/10 p-4 dark:border-white/10">
                                                            <div className="mt-0.5 rounded-lg bg-black/5 p-2 dark:bg-white/5">
                                                                <Calendar className="h-5 w-5 text-black/60 dark:text-white/60" />
                                                            </div>
                                                            <div>
                                                                <p className="mb-1 text-xs font-semibold tracking-wider text-black/40 uppercase dark:text-white/40">
                                                                    Date
                                                                </p>
                                                                <p className="font-medium leading-snug">
                                                                    {formatDate(String(event.created_at))}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Description */}
                                                {event.description && (
                                                    <div className="mb-8 rounded-2xl border border-black/5 bg-black/[0.02] p-6 dark:border-white/5 dark:bg-white/[0.02]">
                                                        <h3 className="mb-3 text-sm font-semibold tracking-wider text-black/60 uppercase dark:text-white/60">
                                                            About this Event
                                                        </h3>
                                                        <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
                                                            {event.description}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className="flex flex-wrap gap-3">
                                                    <button className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:gap-3 hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                                                        Register Now
                                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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