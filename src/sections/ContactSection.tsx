import { useState, type FormEvent } from 'react';
import { Check, Copy, ExternalLink, Mail, Send } from 'lucide-react';
import type { ProfileData } from '../types/academic';

interface ContactSectionProps {
  profile: ProfileData;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('Research Collaboration');
  const [message, setMessage] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard fallback ignored silently
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setSubmitState('error');
      setFeedback('Please complete your name, email address, and message.');
      return;
    }

    if (profile.formspreeEndpoint && profile.formspreeEndpoint.startsWith('https://')) {
      try {
        setSubmitState('submitting');
        const response = await fetch(profile.formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: senderName,
            email: senderEmail,
            subject: `[Academic Enquiry: ${enquiryType}]`,
            message,
          }),
        });
        if (!response.ok) throw new Error('Form submission failed');
        setSubmitState('sent');
        setFeedback('Your enquiry has been transmitted via the configured static form endpoint.');
        setSenderName('');
        setSenderEmail('');
        setMessage('');
        return;
      } catch {
        setSubmitState('error');
        setFeedback('Unable to submit to the configured endpoint. Please email directly instead.');
        return;
      }
    }

    const cleanEmail = profile.email.replace(/^\[|\]$/g, '');
    const mailtoSubject = encodeURIComponent(`[${enquiryType}] Enquiry from ${senderName}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${senderName}\nReply-To: ${senderEmail}\nTopic: ${enquiryType}\n\n${message}`
    );
    window.location.href = `mailto:${cleanEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitState('sent');
    setFeedback('Opened your local email client with a pre-formatted academic enquiry.');
  };

  return (
    <div className="space-y-12 pt-6 sm:pt-10">
      <header className="space-y-2 border-b border-[#E5E0D8] pb-8">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
          Academic Correspondence
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
          Contact &amp; Scholarly Profiles
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[#57534E]">
          For research collaborations, PhD supervision enquiries, invited seminars, or
          peer-review and examination correspondence.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-4">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
              Institutional Contact
            </h2>

            <div className="space-y-1">
              <p className="text-xs font-medium text-[#57534E]">Institutional Email</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm text-[#1C1917] break-all">
                  {profile.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 rounded border border-[#E5E0D8] bg-[#FBF9F5] px-2.5 py-1 text-xs font-medium text-[#1C1917] hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3 w-3 text-[#1E3A8A]" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-[#E5E0D8] pt-4 space-y-1 text-sm">
              <p className="text-xs font-medium text-[#57534E]">Department &amp; Office</p>
              <p className="text-[#1C1917]">{profile.department}</p>
              <p className="text-[#1C1917]">{profile.institution}</p>
              <p className="text-xs text-[#57534E]">{profile.officeLocation}</p>
            </div>

            <div className="border-t border-[#E5E0D8] pt-4 space-y-1 text-xs">
              <p className="font-medium text-[#57534E]">Consultation / Office Hours</p>
              <p className="text-[#1C1917]">{profile.officeHours}</p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E5E0D8] bg-white p-6 space-y-4">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
              Verified Academic Profiles
            </h2>
            <ul className="divide-y divide-[#E5E0D8]">
              {profile.links.map((link) => (
                <li key={link.label} className="py-2.5 flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium text-[#1C1917]">{link.label}</span>
                  {link.url.startsWith('http') ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#1E3A8A] hover:underline underline-offset-4"
                    >
                      Visit profile
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-[#57534E]">
                      [Add URL in profile.yml]
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-lg border border-[#E5E0D8] bg-white p-6 sm:p-8 space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Direct Enquiry Composer</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-[#1C1917]">
                Send an Academic Enquiry
              </h2>
              <p className="text-xs leading-relaxed text-[#57534E]">
                {profile.formspreeEndpoint
                  ? 'Submissions are delivered securely via the configured HTTPS form endpoint in profile.yml.'
                  : 'Because GitHub Pages serves static files without a backend server, submitting this form drafts a pre-formatted email in your mail client. Optionally add a Formspree HTTPS endpoint in src/data/profile.yml for direct web submission.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#1C1917]">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Dr. / Prof. / Candidate Name"
                    className="min-h-[44px] w-full rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-3.5 text-sm text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#1C1917]">
                    Institutional Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="name@university.ac.uk"
                    className="min-h-[44px] w-full rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-3.5 text-sm text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-topic" className="block text-xs font-medium text-[#1C1917]">
                  Enquiry Category
                </label>
                <select
                  id="contact-topic"
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className="min-h-[44px] w-full rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-3.5 text-sm text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                >
                  <option>Research Collaboration</option>
                  <option>Prospective PhD Supervision</option>
                  <option>Invited Seminar / Keynote</option>
                  <option>External Examining / Peer Review</option>
                  <option>Policy &amp; Knowledge Exchange</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-medium text-[#1C1917]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Include your institutional affiliation, proposed research focus, or dates where relevant..."
                  className="w-full rounded-md border border-[#E5E0D8] bg-[#FBF9F5] p-3.5 text-sm text-[#1C1917] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
                />
              </div>

              {feedback && (
                <p
                  role="status"
                  className={`text-xs font-medium ${
                    submitState === 'error' ? 'text-[#9A3412]' : 'text-[#1E3A8A]'
                  }`}
                >
                  {feedback}
                </p>
              )}

              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#1E3A8A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#172554] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {profile.formspreeEndpoint ? 'Send Message' : 'Draft Email Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}