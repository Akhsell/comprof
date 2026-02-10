import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail: string;
    author: string;
    created_at?: string;
    updated_at?: string;
}

interface detailArticleProps extends SharedData {
    article: Article;
    relatedArticles?: Article[];
}

export default function articleDetail() {
    const { article, relatedArticles } = usePage<detailArticleProps>().props;

    if (!article) {
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

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title={`${article.title} - VerveLab`}>
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

        .article-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .article-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .article-content p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
        }

        .article-content ul, .article-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }

        .article-content blockquote {
          border-left: 3px solid rgba(0,0,0,0.2);
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: rgba(0,0,0,0.7);
        }

        .dark .article-content blockquote {
          border-left-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
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
                                    href="/article/view-article"
                                    className="link-underline text-sm font-medium"
                                >
                                    All Articles
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
                        href="/article/view-article"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Articles
                    </Link>
                </section>

                {/* Main Content */}
                <section className="mx-auto max-w-[1400px] px-6 py-8 lg:px-12 lg:py-12">
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                        {/* Left - Article Content */}
                        <div className="lg:col-span-8">
                            {/* Title & Meta */}
                            <div className="mb-8">
                                <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] leading-tight font-semibold tracking-tight text-balance">
                                    {article.title}
                                </h1>
                                
                                {/* Article Meta */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-black/60 dark:text-white/60">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span>{article.author}</span>
                                    </div>
                                    {article.created_at && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(article.created_at)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Featured Image */}
                            {article.thumbnail && (
                                <div className="mb-8 aspect-video overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                                    <img
                                        src={`/storage/${article.thumbnail}`}
                                        alt={article.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Article Content */}
                            <div className="article-content space-y-6">
                                {/* Main Content */}
                                <div 
                                    className="text-base leading-relaxed font-light text-black/70 dark:text-white/70"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            </div>

                            {/* Share & Actions */}
                            <div className="mt-12 border-t border-black/10 pt-8 dark:border-white/10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                                            Share Article
                                        </h3>
                                        <div className="flex gap-3">
                                            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
                                                <Share2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                {/* Author Card */}
                                <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
                                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                                        About Author
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 dark:bg-white/10">
                                            <User className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{article.author}</p>
                                            <p className="text-sm text-black/60 dark:text-white/60">
                                                Content Writer
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Article Info */}
                                <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
                                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                                        Article Info
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        {article.created_at && (
                                            <div className="flex justify-between">
                                                <span className="text-black/60 dark:text-white/60">Published</span>
                                                <span className="font-medium">{formatDate(article.created_at)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* CTA Card */}
                                <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.02]">
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Like this article?
                                    </h3>
                                    <p className="mb-4 text-sm font-light text-black/70 dark:text-white/70">
                                        Get more insights and updates delivered to your inbox.
                                    </p>
                                    <Link
                                        href="/#contact"
                                        className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:gap-3 dark:bg-white dark:text-black"
                                    >
                                        Subscribe Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Articles */}
                {relatedArticles && relatedArticles.length > 0 && (
                    <section className="border-t border-black/10 px-6 py-20 lg:px-12 dark:border-white/10">
                        <div className="mx-auto max-w-[1400px]">
                            <div className="mb-10">
                                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                                    Related Articles
                                </h2>
                                <p className="max-w-xl text-sm font-light text-black/70 dark:text-white/70">
                                    Continue reading with these related articles
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {relatedArticles
                                    .slice(0, 3)
                                    .map((relatedArticle) => (
                                        <Link
                                            key={relatedArticle.slug}
                                            href={`/article/detail-article/${relatedArticle.slug}`}
                                            className="group rounded-xl border border-black/5 p-5 transition-all hover:-translate-y-1 hover:border-black/10 hover:bg-black/[0.02] dark:border-white/5 dark:hover:border-white/10 dark:hover:bg-white/[0.02]"
                                        >
                                            {relatedArticle.thumbnail && (
                                                <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
                                                    <img
                                                        src={`/storage/${relatedArticle.thumbnail}`}
                                                        alt={relatedArticle.title}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                </div>
                                            )}
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium tracking-tight line-clamp-2">
                                                    {relatedArticle.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60">
                                                    <User className="h-3 w-3" />
                                                    <span>{relatedArticle.author}</span>
                                                </div>
                                                {relatedArticle.created_at && (
                                                    <div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{formatDate(relatedArticle.created_at)}</span>
                                                    </div>
                                                )}
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