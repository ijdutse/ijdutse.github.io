import { ArrowRight, ExternalLink, Mail, BookOpen } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import type {
  NewsItem,
  ProfileData,
  Publication,
  ResearchProject,
  ResearchThemesData,
  SectionId,
} from '../types/academic';

interface HomeSectionProps {
  profile: ProfileData;
  themesData: ResearchThemesData;
  projects: ResearchProject[];
  publications: Publication[];
  news: NewsItem[];
  researcherCount: number;
  onNavigate: (section: SectionId) => void;
  onSelectTheme: (themeId: string) => void;
}

export function HomeSection({
  profile,
  themesData,
  projects,
  publications,
  news,
  researcherCount,
  onNavigate,
  onSelectTheme,
}: HomeSectionProps) {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const recentPublications = publications.slice(0, 3);
  const recentNews = news.slice(0, 4);

  const themeTitleById = (id: string) =>
    themesData.themes.find((t) => t.id === id)?.shortTitle ?? id;

  return (
    <div className="space-y-20">
      <section aria-labelledby="hero-heading" className="pt-6 sm:pt-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-between lg:col-span-7 space-y-6">
            <div className="space-y-5">
              <div className="space-y-1.5">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
                  {profile.titlePrefix}
                </p>
                <p className="text-sm text-[#57534E]">
                  {profile.department} <span aria-hidden="true">·</span> {profile.institution}
                </p>
              </div>

              <h1
                id="hero-heading"
                className="font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-[#1C1917] sm:text-5xl"
              >
                {profile.name}
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-[#1C1917]">
                {profile.shortBio}
              </p>

              <div className="border-y border-[#E5E0D8] py-4">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                  Overarching Research Vision
                </p>
                <p className="mt-1.5 max-w-2xl font-serif text-lg italic leading-relaxed text-[#1C1917]">
                  &ldquo;{profile.researchVision}&rdquo;
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                  Core Research Areas
                </p>
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#1C1917]">
                  {profile.interestTags.map((tag, idx) => (
                    <span key={tag} className="inline-flex items-center gap-2.5">
                      <span>{tag}</span>
                      {idx < profile.interestTags.length - 1 && (
                        <span aria-hidden="true" className="text-[#57534E]">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#1E3A8A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#172554] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Academic Enquiries &amp; Contact
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('publications')}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#E5E0D8] bg-white px-5 py-2.5 text-sm font-medium text-[#1C1917] transition-colors hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] whitespace-nowrap shrink-0"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Publications Repository
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#57534E]">
                {profile.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    onClick={(e) => {
                      if (link.url.startsWith('#')) {
                        e.preventDefault();
                        onNavigate(link.url.slice(1) as SectionId);
                      }
                    }}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-[#1C1917] underline decoration-[#E5E0D8] underline-offset-4 transition-colors hover:text-[#1E3A8A] hover:decoration-[#1E3A8A]"
                  >
                    <span>{link.label}</span>
                    {link.url.startsWith('http') && (
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <EditorialImage
              src={profile.portraitPath}
              alt={profile.portraitAlt}
              caption={profile.portraitCaption}
              aspectClass="aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[480px]"
              className="flex-1 flex flex-col"
              priority
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 divide-y divide-[#E5E0D8] rounded-lg border border-[#E5E0D8] bg-white sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <button
            type="button"
            onClick={() => onNavigate('research')}
            className="p-5 text-left transition-colors hover:bg-[#F3EFE8]/60 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1E3A8A]"
          >
            <p className="font-mono text-2xl font-medium tabular-nums text-[#1C1917]">
              {themesData.themes.length}
            </p>
            <p className="mt-1 text-xs font-medium text-[#57534E]">
              Interconnected Research Themes
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('research')}
            className="p-5 text-left transition-colors hover:bg-[#F3EFE8]/60 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1E3A8A]"
          >
            <p className="font-mono text-2xl font-medium tabular-nums text-[#1C1917]">
              {projects.length}
            </p>
            <p className="mt-1 text-xs font-medium text-[#57534E]">
              Active &amp; Completed Projects
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('publications')}
            className="p-5 text-left transition-colors hover:bg-[#F3EFE8]/60 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1E3A8A]"
          >
            <p className="font-mono text-2xl font-medium tabular-nums text-[#1C1917]">
              {publications.length}
            </p>
            <p className="mt-1 text-xs font-medium text-[#57534E]">
              Catalogued BibTeX Outputs
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('supervision')}
            className="p-5 text-left transition-colors hover:bg-[#F3EFE8]/60 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1E3A8A]"
          >
            <p className="font-mono text-2xl font-medium tabular-nums text-[#1C1917]">
              {researcherCount}
            </p>
            <p className="mt-1 text-xs font-medium text-[#57534E]">
              Supervised Researchers &amp; Fellows
            </p>
          </button>
        </div>
      </section>

      <section aria-labelledby="featured-projects-heading" className="space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E5E0D8] pb-4 sm:flex-row sm:items-end">
          <div className="space-y-1">
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
              Research Programme
            </p>
            <h2
              id="featured-projects-heading"
              className="font-serif text-2xl font-semibold text-[#1C1917] sm:text-3xl"
            >
              Featured Research Projects
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('research')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E3A8A] hover:text-[#172554] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            Explore all themes &amp; projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between rounded-lg border border-[#E5E0D8] bg-white p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#57534E] tabular-nums">
                  <span className="font-medium text-[#1E3A8A]">
                    {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{project.period}</span>
                </div>

                <h3 className="font-serif text-lg font-semibold leading-snug text-[#1C1917]">
                  {project.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#57534E]">
                  {project.summary}
                </p>
              </div>

              <div className="mt-5 border-t border-[#E5E0D8] pt-4 space-y-2.5">
                <p className="text-xs text-[#57534E]">
                  {project.themeIds.map((id, i) => (
                    <span key={id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectTheme(id);
                          onNavigate('research');
                        }}
                        className="hover:text-[#1E3A8A] hover:underline underline-offset-2"
                      >
                        {themeTitleById(id)}
                      </button>
                      {i < project.themeIds.length - 1 && (
                        <span aria-hidden="true"> · </span>
                      )}
                    </span>
                  ))}
                </p>
                <p className="font-mono text-xs text-[#57534E] truncate" title={project.funding}>
                  {project.funding}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="recent-work-heading" className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-end justify-between gap-4 border-b border-[#E5E0D8] pb-3">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
                Scholarly Record
              </p>
              <h2
                id="recent-work-heading"
                className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]"
              >
                Recent Publications
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('publications')}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Full repository
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="divide-y divide-[#E5E0D8] rounded-lg border border-[#E5E0D8] bg-white">
            {recentPublications.map((pub) => (
              <article key={pub.key} className="p-5 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] tabular-nums">
                  <span className="font-mono font-medium text-[#1C1917]">{pub.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{pub.categoryLabel}</span>
                  {pub.themeIds.length > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{themeTitleById(pub.themeIds[0])}</span>
                    </>
                  )}
                </div>
                <h3 className="font-serif text-base font-semibold leading-snug text-[#1C1917]">
                  {pub.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#57534E]">
                  {pub.authors.join(', ')}
                </p>
                <p className="text-xs italic text-[#57534E]">{pub.venue}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-end justify-between gap-4 border-b border-[#E5E0D8] pb-3">
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
                Announcements
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]">
                News &amp; Updates
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('news')}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              All updates
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="divide-y divide-[#E5E0D8] rounded-lg border border-[#E5E0D8] bg-white">
            {recentNews.map((item) => (
              <article key={item.id} className="p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[#57534E] tabular-nums">
                  <time dateTime={item.date} className="font-mono">
                    {item.displayDate}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{item.category}</span>
                </div>
                <h3 className="font-serif text-base font-medium leading-snug text-[#1C1917]">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#57534E]">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}