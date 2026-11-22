import { useEffect } from 'react';
import { X, FileCode2, GitBranch, ShieldCheck } from 'lucide-react';

interface MaintenanceGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MaintenanceGuideModal({ isOpen, onClose }: MaintenanceGuideModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-[#E5E0D8] bg-[#FBF9F5] p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E5E0D8] pb-4">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
              Repository Documentation
            </p>
            <h2
              id="guide-modal-title"
              className="mt-1 font-serif text-2xl font-semibold text-[#1C1917]"
            >
              Content Maintenance &amp; GitHub Pages Deployment
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close guide"
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md border border-[#E5E0D8] bg-white text-[#1C1917] hover:bg-[#F3EFE8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-[#1C1917]">
          <section className="space-y-3">
            <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
              <FileCode2 className="h-4 w-4 text-[#1E3A8A]" aria-hidden="true" />
              <h3>1. Updating Academic Content Without Touching Code</h3>
            </div>
            <p className="text-[#57534E]">
              All biography, research themes, grants, students, teaching modules, news,
              and publications are separated from React presentation components in{' '}
              <code className="rounded bg-[#F3EFE8] px-1.5 py-0.5 font-mono text-xs text-[#1C1917]">
                src/data/
              </code>
              :
            </p>
            <div className="overflow-hidden rounded-md border border-[#E5E0D8] bg-white">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#E5E0D8] bg-[#F3EFE8]/70 text-[#57534E]">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">File</th>
                    <th className="px-4 py-2.5 font-semibold">Maintained Content</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8]">
                  <tr>
                    <td className="px-4 py-2.5 font-mono text-[#1E3A8A]">src/data/profile.yml</td>
                    <td className="px-4 py-2.5 text-[#57534E]">Name, bio, qualifications, appointments, links, office hours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono text-[#1E3A8A]">src/data/themes.yml</td>
                    <td className="px-4 py-2.5 text-[#57534E]">Research themes, key questions, methodologies, programme narrative</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono text-[#1E3A8A]">src/data/projects.yml</td>
                    <td className="px-4 py-2.5 text-[#57534E]">Ongoing/completed projects, grant references, collaborators</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono text-[#1E3A8A]">src/data/publications.bib</td>
                    <td className="px-4 py-2.5 text-[#57534E]">Standard BibTeX entries with custom theme, doi, pdf, and url fields</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono text-[#1E3A8A]">src/data/students.yml</td>
                    <td className="px-4 py-2.5 text-[#57534E]">Consented PhD, MSc, and early-career researcher profiles</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono text-[#1E3A8A]">src/data/teaching.yml</td>
                    <td className="px-4 py-2.5 text-[#57534E]">Modules taught, curriculum development, academic leadership</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono text-[#1E3A8A]">src/data/collaborations.yml</td>
                    <td className="px-4 py-2.5 text-[#57534E]">Institutional partnerships, networks, invited seminars</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-mono text-[#1E3A8A]">src/data/news.yml</td>
                    <td className="px-4 py-2.5 text-[#57534E]">Chronological announcements, grants, talks, and milestones</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2.5">
            <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
              <GitBranch className="h-4 w-4 text-[#1E3A8A]" aria-hidden="true" />
              <h3>2. Deploying to GitHub Pages (github.io)</h3>
            </div>
            <ol className="list-decimal space-y-1.5 pl-5 text-[#57534E]">
              <li>
                Create a repository named{' '}
                <code className="font-mono text-xs text-[#1C1917]">
                  &lt;username&gt;.github.io
                </code>{' '}
                (or any project repository).
              </li>
              <li>
                Enable <strong>Settings &rarr; Pages &rarr; Source: GitHub Actions</strong>.
              </li>
              <li>
                Commit to <code className="font-mono text-xs text-[#1C1917]">main</code>;{' '}
                <code className="font-mono text-xs text-[#1C1917]">
                  .github/workflows/deploy.yml
                </code>{' '}
                automatically builds and deploys <code className="font-mono text-xs">dist/</code>.
              </li>
            </ol>
          </section>

          <section className="space-y-2 rounded-md border border-[#E5E0D8] bg-[#F3EFE8]/70 p-4">
            <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
              <ShieldCheck className="h-4 w-4 text-[#1E3A8A]" aria-hidden="true" />
              <h3>3. Academic Integrity &amp; Privacy Checklist</h3>
            </div>
            <p className="text-xs leading-relaxed text-[#57534E]">
              Before publishing publicly, replace every bracketed placeholder with verified
              institutional records, confirm DOIs and PDF copyright permissions, and verify
              written consent for every listed doctoral or MSc researcher.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}