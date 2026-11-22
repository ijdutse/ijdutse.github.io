import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import type {
  CollaborationsData,
  NewsCategory,
  NewsItem,
  ResearchTheme,
  SectionId,
  TeachingData,
} from '../types/academic';

interface ActivitiesSectionProps {
  activeTab: 'teaching' | 'collaborations' | 'news';
  onSelectTab: (tab: 'teaching' | 'collaborations' | 'news') => void;
  teaching: TeachingData;
  collaborations: CollaborationsData;
  news: NewsItem[];
  themes: ResearchTheme[];
  onNavigate: (section: SectionId) => void;
}

const PARTNER_TYPE_LABELS: Record<string, string> = {
  academic: 'Academic & University Partner',
  network: 'International Research Network',
  industry_clinical: 'Clinical & Industry Collaboration',
  policy: 'Policy & Assurance Working Group',
};

const NEWS_FILTERS: { id: 'all' | NewsCategory; label: string }[] = [
  { id: 'all', label: 'All Updates' },
  { id: 'publication', label: 'Publications' },
  { id: 'project', label: 'Projects' },
  { id: 'presentation', label: 'Presentations' },
  { id: 'award', label: 'Awards' },
  { id: 'student', label: 'Student Milestones' },
  { id: 'event', label: 'Upcoming Events' },
];

export function ActivitiesSection({
  activeTab,
  onSelectTab,
  teaching,
  collaborations,
  news,
  themes,
  onNavigate,
}: ActivitiesSectionProps) {
  const [newsFilter, setNewsFilter] = useState<'all' | NewsCategory>('all');

  const themeTitleById = (id: string) =>
    themes.find((t) => t.id === id)?.shortTitle ?? id;

  const filteredNews = news.filter(
    (item) => newsFilter === 'all' || item.category === newsFilter
  );

  return (
    <div className="space-y-12 pt-6 sm:pt-10">
      <header className="space-y-6 border-b border-[#E5E0D8] pb-6">
        <div className="space-y-2">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
            Academic Citizenship &amp; Engagement
          </p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
            Teaching, Collaborations &amp; News
          </h1>
        </div>

        <div
          role="tablist"
          aria-label="Academic activities sections"
          className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-[#F3EFE8] p-1"
        >
          {(
            [
              { id: 'teaching', label: 'Teaching & Leadership' },
              { id: 'collaborations', label: 'Collaborations & Talks' },
              { id: 'news', label: 'News & Updates' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={activeTab === tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`min-h-[40px] rounded-md px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white text-[#1C1917] shadow-sm'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'teaching' && (
        <div className="space-y-12">
          <section className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Teaching Philosophy &amp; Research-Led Education
              </h2>
              <p className="text-base leading-relaxed text-[#1C1917]">
                {teaching.philosophy}
              </p>
              <p className="text-sm leading-relaxed text-[#57534E]">
                {teaching.researchLedTeaching}
              </p>
            </div>

            <aside className="lg:col-span-5 rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-4 self-start">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
                Teaching Interests
              </h3>
              <ul className="space-y-2 text-sm text-[#1C1917]">
                {teaching.teachingInterests.map((item) => (
                  <li key={item} className="border-b border-[#E5E0D8]/60 pb-2 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section aria-labelledby="modules-heading" className="space-y-5">
            <h2 id="modules-heading" className="font-serif text-2xl font-semibold text-[#1C1917]">
              Modules Taught
            </h2>
            <div className="divide-y divide-[#E5E0D8] rounded-lg border border-[#E5E0D8] bg-white">
              {teaching.modules.map((mod) => (
                <article key={mod.code} className="p-6 grid gap-4 md:grid-cols-12">
                  <div className="md:col-span-4 space-y-1">
                    <p className="font-mono text-xs font-medium tabular-nums text-[#1E3A8A]">
                      {mod.code}
                    </p>
                    <p className="text-xs font-medium text-[#1C1917]">{mod.level}</p>
                    <p className="text-xs text-[#57534E]">
                      {mod.role} <span aria-hidden="true">·</span> {mod.term}
                    </p>
                  </div>
                  <div className="md:col-span-8 space-y-2">
                    <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                      {mod.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#57534E]">
                      {mod.description}
                    </p>
                    {mod.researchLink && (
                      <p className="text-xs text-[#57534E]">
                        <span className="font-medium text-[#1C1917]">Research alignment: </span>
                        {mod.researchLink}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <article className="rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Curriculum Development
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                {teaching.curriculumDevelopment}
              </p>
            </article>

            <article className="rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Student Project Supervision
              </h3>
              <p className="text-sm leading-relaxed text-[#57534E]">
                {teaching.studentProjectSupervision}
              </p>
            </article>

            <article className="rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-3">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Academic Leadership
              </h3>
              <ul className="space-y-2 text-xs leading-relaxed text-[#57534E]">
                {teaching.academicLeadership.map((role) => (
                  <li key={role} className="border-b border-[#E5E0D8]/60 pb-1.5 last:border-b-0 last:pb-0">
                    {role}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </div>
      )}

      {activeTab === 'collaborations' && (
        <div className="space-y-12">
          <section className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Research Partnerships &amp; Knowledge Exchange
              </h2>
              <p className="text-base leading-relaxed text-[#1C1917]">
                {collaborations.overview}
              </p>
              <p className="text-sm leading-relaxed text-[#57534E]">
                {collaborations.knowledgeExchange}
              </p>
            </div>
            <div className="lg:col-span-6">
              <EditorialImage
                src="/src/assets/images/research_colloquium.jpg"
                alt="Interdisciplinary academic research seminar around an oak table"
                caption="Fig. 3 — Interdisciplinary seminar and collaborative research exchange."
                aspectClass="aspect-[16/9]"
              />
            </div>
          </section>

          <section aria-labelledby="partners-heading" className="space-y-5">
            <h2 id="partners-heading" className="font-serif text-2xl font-semibold text-[#1C1917]">
              Institutional Partnerships &amp; Networks
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {collaborations.partners.map((partner) => (
                <article
                  key={partner.name}
                  className="rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-3"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                    <span className="font-medium text-[#1E3A8A]">
                      {PARTNER_TYPE_LABELS[partner.type] ?? partner.type}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{partner.country}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                    {partner.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#57534E]">
                    {partner.focus}
                  </p>
                  <p className="text-xs text-[#57534E]">
                    Themes: {partner.themeIds.map(themeTitleById).join(' · ')}
                  </p>
                  {partner.url && (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1E3A8A] hover:underline underline-offset-4"
                    >
                      Partner website
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="talks-heading" className="space-y-5">
            <h2 id="talks-heading" className="font-serif text-2xl font-semibold text-[#1C1917]">
              Selected Research Seminars &amp; Invited Talks
            </h2>
            <div className="divide-y divide-[#E5E0D8] rounded-lg border border-[#E5E0D8] bg-white">
              {collaborations.talks.map((talk) => (
                <article key={talk.title} className="p-6 grid gap-3 sm:grid-cols-12">
                  <div className="sm:col-span-3 space-y-1 text-xs text-[#57534E]">
                    <p className="font-mono font-medium tabular-nums text-[#1E3A8A]">
                      {talk.date}
                    </p>
                    <p>{talk.location}</p>
                    <p>{talk.type}</p>
                  </div>
                  <div className="sm:col-span-9 space-y-1.5">
                    <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                      {talk.title}
                    </h3>
                    <p className="text-sm font-medium text-[#57534E]">{talk.venue}</p>
                    {talk.summary && (
                      <p className="text-xs leading-relaxed text-[#57534E]">
                        {talk.summary}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'news' && (
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#F3EFE8] p-1">
            {NEWS_FILTERS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setNewsFilter(cat.id)}
                className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  newsFilter === cat.id
                    ? 'bg-white text-[#1C1917] shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="divide-y divide-[#E5E0D8] rounded-lg border border-[#E5E0D8] bg-white">
            {filteredNews.map((item) => (
              <article key={item.id} className="p-6 grid gap-3 sm:grid-cols-12">
                <div className="sm:col-span-3 space-y-1 text-xs text-[#57534E] tabular-nums">
                  <time dateTime={item.date} className="font-mono font-medium text-[#1E3A8A]">
                    {item.displayDate}
                  </time>
                  <p className="capitalize">{item.category}</p>
                </div>
                <div className="sm:col-span-9 space-y-2">
                  <h2 className="font-serif text-lg font-semibold text-[#1C1917]">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#57534E]">
                    {item.summary}
                  </p>
                  {item.linkSection && (
                    <button
                      type="button"
                      onClick={() => onNavigate(item.linkSection!)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1E3A8A] hover:underline underline-offset-4"
                    >
                      View related section
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}