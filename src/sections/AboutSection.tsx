import { EditorialImage } from '../components/EditorialImage';
import type { ProfileData, SectionId } from '../types/academic';

interface AboutSectionProps {
  profile: ProfileData;
  onNavigate: (section: SectionId) => void;
}

export function AboutSection({ profile, onNavigate }: AboutSectionProps) {
  return (
    <div className="space-y-16 pt-6 sm:pt-10">
      <header className="border-b border-[#E5E0D8] pb-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
          Academic Biography
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
          About {profile.name}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#57534E]">
          {profile.designation} <span aria-hidden="true">·</span> {profile.department}{' '}
          <span aria-hidden="true">·</span> {profile.institution}
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-10">
          <section aria-labelledby="bio-narrative-heading" className="space-y-5 max-w-prose">
            <h2 id="bio-narrative-heading" className="font-serif text-2xl font-semibold text-[#1C1917]">
              Background &amp; Research Evolution
            </h2>
            {profile.about.extendedBio.map((paragraph, idx) => (
              <p
                key={idx}
                className={`text-base leading-[1.78] text-[#1C1917] ${
                  idx === 0
                    ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:leading-none first-letter:text-[#1E3A8A]'
                    : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
            <p className="text-sm leading-relaxed text-[#57534E]">
              {profile.about.researchEvolution}
            </p>
          </section>

          <section
            aria-labelledby="philosophy-heading"
            className="space-y-6 border-t border-[#E5E0D8] pt-8 max-w-prose"
          >
            <h2 id="philosophy-heading" className="font-serif text-2xl font-semibold text-[#1C1917]">
              Research Philosophy &amp; Academic Ambitions
            </h2>
            <blockquote className="border-y border-[#E5E0D8] py-5 font-serif text-xl italic leading-relaxed text-[#1C1917]">
              &ldquo;{profile.about.researchPhilosophy}&rdquo;
            </blockquote>
            <p className="text-base leading-[1.75] text-[#1C1917]">
              {profile.about.longTermAmbitions}
            </p>
          </section>

          <section aria-labelledby="appointments-heading" className="space-y-5 border-t border-[#E5E0D8] pt-8">
            <h2 id="appointments-heading" className="font-serif text-2xl font-semibold text-[#1C1917]">
              Academic Appointments
            </h2>
            <div className="divide-y divide-[#E5E0D8] rounded-lg border border-[#E5E0D8] bg-white">
              {profile.about.appointments.map((appt, idx) => (
                <div key={idx} className="p-5 sm:p-6 grid gap-2 sm:grid-cols-12">
                  <div className="sm:col-span-4">
                    <p className="font-mono text-xs font-medium tabular-nums text-[#1E3A8A]">
                      {appt.period}
                    </p>
                    <p className="mt-1 text-xs text-[#57534E]">{appt.location}</p>
                  </div>
                  <div className="sm:col-span-8 space-y-1">
                    <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                      {appt.role}
                    </h3>
                    <p className="text-sm font-medium text-[#57534E]">
                      {appt.department}, {appt.institution}
                    </p>
                    <p className="pt-1 text-sm leading-relaxed text-[#57534E]">
                      {appt.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="qualifications-heading" className="space-y-5 border-t border-[#E5E0D8] pt-8">
            <h2 id="qualifications-heading" className="font-serif text-2xl font-semibold text-[#1C1917]">
              Academic Qualifications
            </h2>
            <dl className="divide-y divide-[#E5E0D8] rounded-lg border border-[#E5E0D8] bg-white">
              {profile.about.qualifications.map((qual, idx) => (
                <div key={idx} className="grid gap-2 p-5 sm:grid-cols-12">
                  <dt className="sm:col-span-3 font-mono text-xs font-medium tabular-nums text-[#57534E]">
                    {qual.year} <span aria-hidden="true">·</span> {qual.degree}
                  </dt>
                  <dd className="sm:col-span-9 space-y-1">
                    <p className="text-sm font-semibold text-[#1C1917]">{qual.field}</p>
                    <p className="text-sm text-[#57534E]">{qual.institution}</p>
                    {qual.notes && (
                      <p className="text-xs italic text-[#57534E]">{qual.notes}</p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <EditorialImage
            src="/src/assets/images/research_methodology.jpg"
            alt="Scholarly monographs, diagrams, and research notes on a desk"
            caption="Fig. 2 — Methodological foundations spanning formal evaluation and linguistic analysis."
            aspectClass="aspect-[4/3]"
          />

          <div className="rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
              Areas of Expertise
            </h3>
            <ul className="space-y-2.5 text-sm leading-relaxed text-[#1C1917]">
              {profile.about.expertiseAreas.map((area) => (
                <li key={area} className="border-b border-[#E5E0D8]/70 pb-2 last:border-b-0 last:pb-0">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
              Professional Memberships
            </h3>
            <ul className="space-y-2 text-sm text-[#57534E]">
              {profile.about.memberships.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-[#E5E0D8] bg-[#F3EFE8]/70 p-6 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Prospective Collaborations &amp; PhD Supervision
            </h3>
            <p className="text-xs leading-relaxed text-[#57534E]">
              Explore current supervision openings, ongoing grant projects, or reach out
              regarding academic partnerships.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('supervision')}
                className="text-xs font-semibold text-[#1E3A8A] hover:underline underline-offset-4"
              >
                Supervision &rarr;
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-xs font-semibold text-[#1E3A8A] hover:underline underline-offset-4"
              >
                Contact &rarr;
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}