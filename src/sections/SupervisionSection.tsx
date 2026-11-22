import { useState } from 'react';
import { ExternalLink, Shield } from 'lucide-react';
import type {
  ResearchProject,
  ResearchTheme,
  SectionId,
  StudentGroup,
  SupervisionData,
} from '../types/academic';

interface SupervisionSectionProps {
  supervision: SupervisionData;
  themes: ResearchTheme[];
  projects: ResearchProject[];
  onNavigate: (section: SectionId) => void;
  onSelectTheme: (themeId: string) => void;
}

const GROUP_TABS: { id: 'all' | StudentGroup; label: string }[] = [
  { id: 'all', label: 'All Researchers' },
  { id: 'current_phd', label: 'Current PhD Students' },
  { id: 'completed_phd', label: 'Completed PhD Students' },
  { id: 'msc', label: 'MSc Research Students' },
  { id: 'collaborator_ecr', label: 'Collaborators & ECRs' },
];

const GROUP_LABELS: Record<StudentGroup, string> = {
  current_phd: 'Current PhD Researcher',
  completed_phd: 'Completed PhD Alumni',
  msc: 'MSc Research Student',
  collaborator_ecr: 'Collaborator / Early-Career Researcher',
};

export function SupervisionSection({
  supervision,
  themes,
  projects,
  onNavigate,
  onSelectTheme,
}: SupervisionSectionProps) {
  const [groupFilter, setGroupFilter] = useState<'all' | StudentGroup>('all');
  const [themeFilter, setThemeFilter] = useState<string>('all');

  const filtered = supervision.researchers.filter((r) => {
    const matchesGroup = groupFilter === 'all' || r.group === groupFilter;
    const matchesTheme = themeFilter === 'all' || r.themeIds.includes(themeFilter);
    return matchesGroup && matchesTheme;
  });

  const themeTitleById = (id: string) =>
    themes.find((t) => t.id === id)?.shortTitle ?? id;

  const projectTitleById = (id: string) =>
    projects.find((p) => p.id === id)?.title ?? id;

  return (
    <div className="space-y-12 pt-6 sm:pt-10">
      <header className="space-y-6 border-b border-[#E5E0D8] pb-8">
        <div className="space-y-2">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
            Doctoral &amp; Postgraduate Mentoring
          </p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
            Research Students &amp; Supervision
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-base leading-relaxed text-[#1C1917]">
              {supervision.introStatement}
            </p>
            <p className="text-sm leading-relaxed text-[#57534E]">
              {supervision.prospectiveNote}
            </p>
          </div>

          <aside className="lg:col-span-5 rounded-lg border border-[#E5E0D8] bg-[#F3EFE8]/70 p-5 space-y-2.5 self-start">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
              <Shield className="h-4 w-4 text-[#1E3A8A]" aria-hidden="true" />
              <span>Student Privacy &amp; Consent Notice</span>
            </div>
            <p className="text-xs leading-relaxed text-[#57534E]">
              {supervision.privacyNotice}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="pt-1 text-xs font-semibold text-[#1E3A8A] hover:underline underline-offset-4"
            >
              Enquire about PhD supervision &rarr;
            </button>
          </aside>
        </div>
      </header>

      <section aria-label="Filter supervised researchers" className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#F3EFE8] p-1">
          {GROUP_TABS.map((tab) => {
            const count =
              tab.id === 'all'
                ? supervision.researchers.length
                : supervision.researchers.filter((r) => r.group === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setGroupFilter(tab.id)}
                className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                  groupFilter === tab.id
                    ? 'bg-white text-[#1C1917] shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>

        <select
          aria-label="Filter researchers by theme"
          value={themeFilter}
          onChange={(e) => setThemeFilter(e.target.value)}
          className="min-h-[40px] rounded-md border border-[#E5E0D8] bg-white px-3 py-2 text-xs font-medium text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
        >
          <option value="all">All Research Themes</option>
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.number}. {t.shortTitle}
            </option>
          ))}
        </select>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-[#E5E0D8] bg-white p-8 text-center space-y-2">
          <p className="font-serif text-lg text-[#1C1917]">
            No researchers match the selected cohort and theme.
          </p>
          <button
            type="button"
            onClick={() => {
              setGroupFilter('all');
              setThemeFilter('all');
            }}
            className="text-xs font-medium text-[#1E3A8A] hover:underline underline-offset-4"
          >
            Reset supervision filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((person) => (
            <article
              key={person.id}
              className="flex flex-col justify-between rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] tabular-nums">
                  <span className="font-medium text-[#1E3A8A]">
                    {GROUP_LABELS[person.group]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{person.years}</span>
                </div>

                <div>
                  <h2 className="font-serif text-lg font-semibold leading-snug text-[#1C1917]">
                    {person.name}
                  </h2>
                  <p className="mt-0.5 text-xs font-medium text-[#57534E]">
                    {person.programme}
                  </p>
                </div>

                <div className="border-t border-[#E5E0D8] pt-3 space-y-1.5">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
                    Research Topic
                  </p>
                  <p className="text-sm leading-relaxed text-[#1C1917]">
                    {person.topic}
                  </p>
                </div>

                <p className="text-xs text-[#57534E]">
                  <span className="font-medium text-[#1C1917]">Interests: </span>
                  {person.researchInterests.join(' · ')}
                </p>
              </div>

              <div className="border-t border-[#E5E0D8] pt-3 space-y-2 text-xs">
                <p className="text-[#57534E]">
                  <span className="font-medium text-[#1C1917]">Themes: </span>
                  {person.themeIds.map((id, i) => (
                    <span key={id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectTheme(id);
                          onNavigate('research');
                        }}
                        className="text-[#1E3A8A] hover:underline underline-offset-2"
                      >
                        {themeTitleById(id)}
                      </button>
                      {i < person.themeIds.length - 1 && ' · '}
                    </span>
                  ))}
                </p>

                {person.projectIds && person.projectIds.length > 0 && (
                  <p className="text-[#57534E] truncate" title={person.projectIds.map(projectTitleById).join(', ')}>
                    <span className="font-medium text-[#1C1917]">Project: </span>
                    {person.projectIds.map(projectTitleById).join(', ')}
                  </p>
                )}

                {person.profileUrl && (
                  <a
                    href={person.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#1E3A8A] hover:underline underline-offset-2"
                  >
                    Research Profile
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}

                <p className="font-mono text-[11px] text-[#57534E]">
                  {person.consentNote}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}