import { useMemo, useState } from 'react';
import { Check, Copy, Download, ExternalLink, FileText, Search, X } from 'lucide-react';
import type {
  Publication,
  PublicationCategory,
  ResearchTheme,
} from '../types/academic';

interface PublicationsSectionProps {
  publications: Publication[];
  rawBibtexFile: string;
  themes: ResearchTheme[];
  initialThemeFilter: string;
}

const CATEGORY_TABS: { id: 'all' | PublicationCategory; label: string }[] = [
  { id: 'all', label: 'All Outputs' },
  { id: 'journal', label: 'Journal Articles' },
  { id: 'conference', label: 'Conference Papers' },
  { id: 'chapter', label: 'Book Chapters' },
  { id: 'preprint', label: 'Preprints & Working Papers' },
  { id: 'other', label: 'Other Outputs' },
];

export function PublicationsSection({
  publications,
  rawBibtexFile,
  themes,
  initialThemeFilter,
}: PublicationsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | PublicationCategory>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [themeFilter, setThemeFilter] = useState<string>(initialThemeFilter || 'all');
  const [expandedBibKey, setExpandedBibKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(publications.map((p) => p.year)));
    return uniqueYears.sort((a, b) => b - a);
  }, [publications]);

  const filteredPublications = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return publications.filter((pub) => {
      const matchesCategory =
        categoryFilter === 'all' || pub.category === categoryFilter;
      const matchesYear =
        yearFilter === 'all' || String(pub.year) === yearFilter;
      const matchesTheme =
        themeFilter === 'all' || pub.themeIds.includes(themeFilter);
      const matchesSearch =
        !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.authors.some((a) => a.toLowerCase().includes(q)) ||
        pub.venue.toLowerCase().includes(q) ||
        (pub.abstract && pub.abstract.toLowerCase().includes(q));

      return matchesCategory && matchesYear && matchesTheme && matchesSearch;
    });
  }, [publications, categoryFilter, yearFilter, themeFilter, searchQuery]);

  const themeTitleById = (id: string) =>
    themes.find((t) => t.id === id)?.shortTitle ?? id;

  const handleCopyBibtex = async (pub: Publication) => {
    try {
      await navigator.clipboard.writeText(pub.rawBibtex);
      setCopiedKey(pub.key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      setExpandedBibKey(pub.key);
    }
  };

  const handleDownloadBib = () => {
    const blob = new Blob([rawBibtexFile], { type: 'application/x-bibtex;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'publications.bib';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12 pt-6 sm:pt-10">
      <header className="flex flex-col justify-between gap-4 border-b border-[#E5E0D8] pb-8 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
            Scholarly Repository
          </p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
            Publications &amp; Outputs
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[#57534E]">
            Parsed directly from <code className="font-mono text-xs text-[#1C1917]">src/data/publications.bib</code>{' '}
            and ordered reverse chronologically. Replace template entries with verified DOIs and citation records.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadBib}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#E5E0D8] bg-white px-4 py-2 text-xs font-medium text-[#1C1917] transition-colors hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A] whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Download BibTeX (.bib)
        </button>
      </header>

      <section aria-label="Filter publications" className="space-y-4">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="relative md:col-span-6">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#57534E]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, author, journal, or keyword..."
              aria-label="Search publications"
              className="min-h-[44px] w-full rounded-md border border-[#E5E0D8] bg-white pl-10 pr-9 text-sm text-[#1C1917] placeholder:text-[#57534E]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#57534E] hover:text-[#1C1917]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-3">
            <select
              aria-label="Filter by publication year"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="min-h-[44px] w-full rounded-md border border-[#E5E0D8] bg-white px-3 text-sm text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              <option value="all">All Years ({publications.length})</option>
              {years.map((yr) => (
                <option key={yr} value={String(yr)}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              aria-label="Filter by research theme"
              value={themeFilter}
              onChange={(e) => setThemeFilter(e.target.value)}
              className="min-h-[44px] w-full rounded-md border border-[#E5E0D8] bg-white px-3 text-sm text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              <option value="all">All Research Themes</option>
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.number}. {theme.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#F3EFE8] p-1">
          {CATEGORY_TABS.map((tab) => {
            const count =
              tab.id === 'all'
                ? publications.length
                : publications.filter((p) => p.category === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                  categoryFilter === tab.id
                    ? 'bg-white text-[#1C1917] shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex items-center justify-between text-xs text-[#57534E] tabular-nums">
        <p>
          Showing {filteredPublications.length} of {publications.length} catalogued entries
        </p>
        {(searchQuery || categoryFilter !== 'all' || yearFilter !== 'all' || themeFilter !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setYearFilter('all');
              setThemeFilter('all');
            }}
            className="font-medium text-[#1E3A8A] hover:underline underline-offset-4"
          >
            Reset all filters
          </button>
        )}
      </div>

      {filteredPublications.length === 0 ? (
        <div className="rounded-lg border border-[#E5E0D8] bg-white p-10 text-center space-y-2">
          <p className="font-serif text-lg text-[#1C1917]">
            No publications matched your search or filter criteria.
          </p>
          <p className="text-sm text-[#57534E]">
            Try clearing the keyword query or selecting &ldquo;All Outputs&rdquo;.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[#E5E0D8] rounded-lg border border-[#E5E0D8] bg-white">
          {filteredPublications.map((pub) => {
            const isBibOpen = expandedBibKey === pub.key;
            const isCopied = copiedKey === pub.key;

            return (
              <article key={pub.key} className="p-6 space-y-3">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#57534E] tabular-nums">
                  <span className="font-mono font-semibold text-[#1E3A8A]">{pub.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#1C1917]">{pub.categoryLabel}</span>
                  {pub.themeIds.length > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{pub.themeIds.map(themeTitleById).join(' / ')}</span>
                    </>
                  )}
                </div>

                <h2 className="font-serif text-lg font-semibold leading-snug text-[#1C1917] sm:text-xl">
                  {pub.title}
                </h2>

                <p className="text-sm leading-relaxed text-[#1C1917]">
                  {pub.authors.join(', ')}
                </p>
                <p className="text-sm italic text-[#57534E]">
                  {pub.venue}
                  {pub.volume ? `, Vol. ${pub.volume}` : ''}
                  {pub.issue ? `(${pub.issue})` : ''}
                  {pub.pages ? `, pp. ${pub.pages}` : ''}
                </p>

                {pub.abstract && (
                  <p className="max-w-3xl text-xs leading-relaxed text-[#57534E]">
                    {pub.abstract}
                  </p>
                )}

                {pub.note && (
                  <p className="font-mono text-[11px] text-[#57534E]">
                    Note: {pub.note}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium">
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#1E3A8A] hover:underline underline-offset-4 font-mono"
                    >
                      DOI: {pub.doi}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#1C1917] hover:text-[#1E3A8A] hover:underline underline-offset-4"
                    >
                      Publication Link
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#1C1917] hover:text-[#1E3A8A] hover:underline underline-offset-4"
                    >
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      Author PDF
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleCopyBibtex(pub)}
                    className="inline-flex items-center gap-1 text-[#57534E] hover:text-[#1E3A8A]"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#1E3A8A]" aria-hidden="true" />
                        <span className="text-[#1E3A8A]">Copied BibTeX</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy BibTeX</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setExpandedBibKey(isBibOpen ? null : pub.key)}
                    className="text-[#57534E] hover:text-[#1C1917] underline underline-offset-4"
                  >
                    {isBibOpen ? 'Hide BibTeX' : 'Inspect BibTeX'}
                  </button>
                </div>

                {isBibOpen && (
                  <pre className="mt-3 overflow-x-auto rounded-md border border-[#E5E0D8] bg-[#F3EFE8]/70 p-4 font-mono text-xs leading-relaxed text-[#1C1917]">
                    {pub.rawBibtex}
                  </pre>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}