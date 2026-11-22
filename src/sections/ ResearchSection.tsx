import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type {
  Publication,
  ResearchProject,
  ResearchThemesData,
  SectionId,
} from '../types/academic';

interface ResearchSectionProps {
  themesData: ResearchThemesData;
  projects: ResearchProject[];
  publications: Publication[];
  selectedThemeId: string;
  onSelectThemeId: (id: string) => void;
  onNavigate: (section: SectionId) => void;
  onFilterPublicationsByTheme: (themeId: string) => void;
}

export function ResearchSection({
  themesData,
  projects,
  publications,
  selectedThemeId,
  onSelectThemeId,
  onNavigate,
  onFilterPublicationsByTheme,
}: ResearchSectionProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed'>('all');

  const activeTheme =
    themesData.themes.find((t) => t.id === selectedThemeId) ?? themesData.themes[0];

  const filteredProjects = projects.filter((proj) => {
    const matchesTheme =
      selectedThemeId === 'all' || proj.themeIds.includes(selectedThemeId);
    const matchesStatus =
      statusFilter === 'all' || proj.status === statusFilter;
    return matchesTheme && matchesStatus;
  });

  const themeTitleById = (id: string) =>
    themesData.themes.find((t) => t.id === id)?.shortTitle ?? id;

  const relatedPubsForTheme = (themeId: string) =>
    publications.filter((p) => p.themeIds.includes(themeId));

  const relatedPubsForProject = (keys: string[]) =>
    publications.filter((p) => keys.includes(p.key));

  return (
    <div className="space-y-16 pt-6 sm:pt-10">
      <header className="space-y-5 border-b border-[#E5E0D8] pb-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
          Research Programme &amp; Projects
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
          Research Interests &amp; Current Projects
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-[#1C1917]">
          {themesData.programmeOverview}
        </p>
        <p className="max-w-3xl text-sm leading-relaxed text-[#57534E]">
          {themesData.programmeDiagramNote}
        </p>
      </header>

      <section aria-labelledby="themes-heading" className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 id="themes-heading" className="font-serif text-2xl font-semibold text-[#1C1917]">
              Six Interconnected Research Themes
            </h2>
            <p className="mt-1 text-sm text-[#57534E]">
              Select a theme to inspect its core research questions, methodologies, and linked outputs.
            </p>
          </div>
          {selectedThemeId !== 'all' && (
            <button
              type="button"
              onClick={() => onSelectThemeId('all')}
              className="text-xs font-medium text-[#1E3A8A] hover:underline underline-offset-4 self-start sm:self-auto whitespace-nowrap shrink-0"
            >
              Show all projects across themes
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {themesData.themes.map((theme) => {
            const isSelected = activeTheme.id === theme.id;
            const projCount = projects.filter((p) => p.themeIds.includes(theme.id)).length;
            const pubCount = relatedPubsForTheme(theme.id).length;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onSelectThemeId(theme.id)}
                aria-pressed={isSelected}
                className={`flex flex-col justify-between rounded-lg border p-5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] ${
                  isSelected
                    ? 'border-[#1E3A8A] bg-white shadow-sm'
                    : 'border-[#E5E0D8] bg-[#F3EFE8]/45 hover:border-[#1E3A8A]/40 hover:bg-white'
                }`}
              >
                <div className="space-y-1.5">
                  <p className="font-mono text-xs font-medium tabular-nums text-[#1E3A8A]">
                    {theme.number}.
                  </p>
                  <h3 className="font-serif text-base font-semibold leading-snug text-[#1C1917]">
                    {theme.title}
                  </h3>
                </div>
                <p className="mt-4 text-xs text-[#57534E] tabular-nums">
                  {projCount} {projCount === 1 ? 'project' : 'projects'} <span aria-hidden="true">·</span>{' '}
                  {pubCount} {pubCount === 1 ? 'publication' : 'publications'}
                </p>
              </button>
            );
          })}
        </div>

        <article className="rounded-lg border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E5E0D8] pb-5 md:flex-row md:items-start">
            <div className="space-y-2 max-w-3xl">
              <p className="font-mono text-xs font-medium text-[#1E3A8A]">
                Theme {activeTheme.number} <span aria-hidden="true">·</span> {activeTheme.programRole}
              </p>
              <h3 className="font-serif text-2xl font-semibold text-[#1C1917]">
                {activeTheme.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#1C1917]">
                {activeTheme.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onFilterPublicationsByTheme(activeTheme.id);
                onNavigate('publications');
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-4 py-2 text-xs font-medium text-[#1C1917] transition-colors hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A] whitespace-nowrap shrink-0"
            >
              View theme publications ({relatedPubsForTheme(activeTheme.id).length})
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                Key Research Questions
              </h4>
              <ul className="space-y-2.5 text-sm leading-relaxed text-[#1C1917]">
                {activeTheme.keyQuestions.map((q) => (
                  <li key={q} className="border-b border-[#E5E0D8]/60 pb-2.5 last:border-b-0 last:pb-0">
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                Methodologies &amp; Technical Approaches
              </h4>
              <ul className="space-y-2.5 text-sm leading-relaxed text-[#57534E]">
                {activeTheme.methodologies.map((m) => (
                  <li key={m} className="border-b border-[#E5E0D8]/60 pb-2.5 last:border-b-0 last:pb-0">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section aria-labelledby="projects-heading" className="space-y-6 border-t border-[#E5E0D8] pt-12">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="space-y-1">
            <h2 id="projects-heading" className="font-serif text-2xl font-semibold text-[#1C1917]">
              Current &amp; Completed Research Projects
            </h2>
            <p className="text-sm text-[#57534E]">
              Organised by research theme and project status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-[#F3EFE8] p-1">
              {(['all', 'ongoing', 'completed'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors whitespace-nowrap shrink-0 ${
                    statusFilter === status
                      ? 'bg-white text-[#1C1917] shadow-sm'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {status === 'all' ? 'All Statuses' : status}
                </button>
              ))}
            </div>

            <select
              aria-label="Filter projects by research theme"
              value={selectedThemeId}
              onChange={(e) => onSelectThemeId(e.target.value)}
              className="min-h-[40px] rounded-md border border-[#E5E0D8] bg-white px-3 py-2 text-xs font-medium text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
            >
              <option value="all">All Research Themes</option>
              {themesData.themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.number}. {theme.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-lg border border-[#E5E0D8] bg-white p-8 text-center space-y-2">
            <p className="font-serif text-lg text-[#1C1917]">
              No projects match the current filter combination.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('all');
                onSelectThemeId('all');
              }}
              className="text-xs font-medium text-[#1E3A8A] hover:underline underline-offset-4"
            >
              Reset project filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => {
              const linkedPubs = relatedPubsForProject(project.relatedPublicationKeys);
              return (
                <article
                  key={project.id}
                  className="rounded-lg border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6"
                >
                  <div className="space-y-2 border-b border-[#E5E0D8] pb-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] tabular-nums">
                      <span className="font-semibold text-[#1E3A8A]">
                        {project.status === 'ongoing' ? 'Ongoing Project' : 'Completed Project'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{project.period}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.themeIds.map(themeTitleById).join(' / ')}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#1C1917] sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="max-w-3xl text-sm leading-relaxed text-[#1C1917]">
                      {project.summary}
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                        Research Objectives
                      </h4>
                      <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-[#1C1917]">
                        {project.objectives.map((obj) => (
                          <li key={obj}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                        Research Questions
                      </h4>
                      <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-[#57534E]">
                        {project.researchQuestions.map((rq) => (
                          <li key={rq}>{rq}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <dl className="grid gap-4 border-t border-[#E5E0D8] pt-5 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                        Methodology
                      </dt>
                      <dd className="mt-1 text-xs leading-relaxed text-[#1C1917]">
                        {project.methodology}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                        Collaborators &amp; Partners
                      </dt>
                      <dd className="mt-1 text-xs leading-relaxed text-[#1C1917]">
                        {project.collaborators.join('; ')}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                        Funding Information
                      </dt>
                      <dd className="mt-1 font-mono text-xs leading-relaxed text-[#1C1917]">
                        {project.funding}
                      </dd>
                    </div>
                  </dl>

                  {linkedPubs.length > 0 && (
                    <div className="border-t border-[#E5E0D8] pt-4 space-y-2">
                      <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#57534E]">
                        Related Publications &amp; Outputs
                      </h4>
                      <ul className="space-y-1.5 text-xs text-[#1C1917]">
                        {linkedPubs.map((pub) => (
                          <li key={pub.key} className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[#57534E] tabular-nums">
                              [{pub.year}]
                            </span>
                            <span>{pub.title}</span>
                            {pub.url && (
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[#1E3A8A] hover:underline underline-offset-2"
                              >
                                Link
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}