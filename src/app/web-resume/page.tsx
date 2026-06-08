'use client';

import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { fadeInUp, stagger } from '@/lib/constants/animations';
import {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  resumeHeader as header,
  resumeExperiences as experiences,
  resumeOpenSource as openSource,
  resumeSkills as skills,
  resumeEducation as education,
  resumePublications as publications,
} from '@/lib/constants/resume-data';

// ─── Font scale ───────────────────────────────────────────────────────────────

const FONT_LEVELS = [0.82, 0.91, 1.0, 1.1, 1.22] as const;
const LS_KEY = 'resume-font-level';
const DRIVE_PDF = header.drivePdf;

// ─── Sub-components ───────────────────────────────────────────────────────────

function IconTooltip({ children, label }: { children: React.ReactNode; label: string }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="absolute bottom-full right-0 mb-2 z-50 pointer-events-auto"
          style={{ minWidth: '140px', maxWidth: '260px' }}
        >
          <div
            className="rounded-md px-2.5 py-1.5 text-[11px] shadow-lg select-text cursor-text break-all"
            style={{
              background: 'var(--rb-fg)',
              color: 'var(--rb-bg)',
              border: '1px solid var(--rb-border)',
              userSelect: 'text',
              WebkitUserSelect: 'text',
              lineHeight: 1.4,
            } as React.CSSProperties}
          >
            {label}
          </div>
          <div
            className="w-2 h-2 rotate-45 -mt-1 ml-auto mr-2"
            style={{ background: 'var(--rb-fg)' }}
          />
        </div>
      )}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="text-[0.625em] font-semibold tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: 'var(--rb-accent)' }}>
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'var(--rb-border)' }} />
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 font-mono text-[0.656em] tracking-tight"
      style={{ background: 'var(--rb-chip-bg)', color: 'var(--rb-chip-fg)' }}
    >
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WebResumePage() {
  const [fontLevel, setFontLevel] = useState(2); // default = 1.0

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved !== null) setFontLevel(Number(saved));
  }, []);

  useEffect(() => {
    const colorTheme = localStorage.getItem('color-theme');
    if (colorTheme && colorTheme !== 'default') {
      document.documentElement.setAttribute('data-color-theme', colorTheme);
    } else {
      document.documentElement.removeAttribute('data-color-theme');
    }
  }, []);

  const changeFontLevel = (next: number) => {
    setFontLevel(next);
    localStorage.setItem(LS_KEY, String(next));
  };

  return (
    <>
      {/* ── Theme vars — mapped from site CSS vars so color theme picker syncs ── */}
      <style>{`
        .resume-page {
          --rb-bg:      var(--background);
          --rb-fg:      var(--foreground);
          --rb-muted:   var(--muted-foreground);
          --rb-border:  var(--border);
          --rb-accent:  var(--primary);
          --rb-chip-bg: var(--muted);
          --rb-chip-fg: var(--muted-foreground);
          --rb-topbar:  color-mix(in oklch, var(--background) 85%, transparent);
        }
        .resume-page a {
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
          text-decoration-color: var(--rb-border);
        }
        .resume-page a:hover {
          text-decoration-color: var(--rb-accent);
        }
        .resume-page a.no-underline,
        .resume-page header a {
          text-decoration: none !important;
        }
        @media print {
          @page { margin: 0.55in 0.75in; size: letter; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div
        className="resume-page min-h-screen"
        style={{ background: 'var(--rb-bg)', color: 'var(--rb-fg)' }}
      >
        {/* ── Top bar ── */}
        <header
          className="print:hidden sticky top-0 z-50"
          style={{
            background: 'var(--rb-topbar)',
            borderBottom: '1px solid var(--rb-border)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          } as React.CSSProperties}
        >
          <div className="mx-auto flex h-12 max-w-4xl items-center gap-3 px-4 sm:px-6">
            {/* Left: back + title */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                href="/"
                className="flex items-center justify-center w-7 h-7 rounded-full transition-opacity duration-200 hover:opacity-60"
                aria-label="Back to portfolio"
                style={{ color: 'var(--rb-muted)', border: '1px solid var(--rb-border)', background: 'var(--rb-chip-bg)' }}
              >
                <ArrowLeft size={13} />
              </Link>
              <h1
                className="text-[14px] sm:text-[15px] font-semibold tracking-tight"
                style={{ color: 'var(--rb-fg)' }}
              >
                Résumé
              </h1>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Font size controls */}
              <div
                className="flex items-center rounded-full overflow-hidden"
                style={{ border: '1px solid var(--rb-border)', background: 'var(--rb-chip-bg)' }}
                role="group"
                aria-label="Font size"
              >
                <button
                  onClick={() => changeFontLevel(Math.max(0, fontLevel - 1))}
                  disabled={fontLevel === 0}
                  aria-label="Decrease font size"
                  className="flex items-center justify-center w-7 h-7 text-[11px] font-semibold transition-opacity duration-200 hover:opacity-60 disabled:opacity-25 disabled:cursor-not-allowed select-none"
                  style={{ color: 'var(--rb-muted)' }}
                >
                  A−
                </button>
                {/* pip indicators — hidden on small screens */}
                <div className="hidden sm:flex items-center gap-0.5 px-1">
                  {FONT_LEVELS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => changeFontLevel(i)}
                      aria-label={`Font size level ${i + 1}`}
                      className="w-1.5 h-1.5 rounded-full transition-opacity duration-200 hover:opacity-80"
                      style={{
                        background: 'var(--rb-accent)',
                        opacity: i === fontLevel ? 1 : 0.2,
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => changeFontLevel(Math.min(FONT_LEVELS.length - 1, fontLevel + 1))}
                  disabled={fontLevel === FONT_LEVELS.length - 1}
                  aria-label="Increase font size"
                  className="flex items-center justify-center w-7 h-7 text-[11px] font-semibold transition-opacity duration-200 hover:opacity-60 disabled:opacity-25 disabled:cursor-not-allowed select-none"
                  style={{ color: 'var(--rb-muted)' }}
                >
                  A+
                </button>
              </div>

              {/* PDF — icon only on mobile */}
              <a
                href={DRIVE_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-opacity duration-200 hover:opacity-70 no-underline"
                style={{
                  border: '1px solid var(--rb-border)',
                  background: 'var(--rb-chip-bg)',
                  color: 'var(--rb-muted)',
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={12} />
                <span className="hidden sm:inline">PDF</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* ── Document ── */}
        <main
          className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10 print:py-6 print:px-0"
          style={{
            fontSize: `${FONT_LEVELS[fontLevel] * 16}px`,
            transition: 'font-size 0.4s cubic-bezier(0.16,1,0.3,1)',
            overflowX: 'hidden',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-9"
          >
            {/* ── Header ── */}
            <motion.div variants={fadeInUp}>
              {/* Name + Role */}
              <div>
                <h1
                  className="text-[1.625em] font-semibold tracking-tight leading-none"
                  style={{ color: 'var(--rb-fg)' }}
                >
                  {header.name}
                </h1>
                {header.role && (
                  <p
                    className="mt-1.5 text-[0.8125em] font-medium tracking-wide"
                    style={{ color: 'var(--rb-accent)' }}
                  >
                    {header.role}
                  </p>
                )}
              </div>

              {/* Location left · icons right */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <div
                  className="flex items-center gap-1.5 text-[0.75em]"
                  style={{ color: 'var(--rb-muted)' }}
                >
                  <MapPin size={9} />
                  <span>{header.location}</span>
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                  <IconTooltip label={header.email}>
                    <a
                      href={`mailto:${header.email}`}
                      className="flex items-center justify-center w-6 h-6 rounded-md transition-opacity duration-200 hover:opacity-60"
                      style={{ color: 'var(--rb-muted)' }}
                    >
                      <Mail size={12} />
                    </a>
                  </IconTooltip>
                  <IconTooltip label={header.phone}>
                    <a
                      href={`tel:${header.phone}`}
                      className="flex items-center justify-center w-6 h-6 rounded-md transition-opacity duration-200 hover:opacity-60"
                      style={{ color: 'var(--rb-muted)' }}
                    >
                      <Phone size={12} />
                    </a>
                  </IconTooltip>
                  <div className="w-px h-3 mx-0.5" style={{ background: 'var(--rb-border)' }} />
                  <IconTooltip label={header.portfolio.href}>
                    <a
                      href={header.portfolio.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-6 h-6 rounded-md transition-opacity duration-200 hover:opacity-60"
                      style={{ color: 'var(--rb-muted)' }}
                    >
                      <Globe size={12} />
                    </a>
                  </IconTooltip>
                  <IconTooltip label={header.linkedin.href}>
                    <a
                      href={header.linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-6 h-6 rounded-md transition-opacity duration-200 hover:opacity-60"
                      style={{ color: 'var(--rb-muted)' }}
                    >
                      <Linkedin size={12} />
                    </a>
                  </IconTooltip>
                  <IconTooltip label={header.github.href}>
                    <a
                      href={header.github.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-6 h-6 rounded-md transition-opacity duration-200 hover:opacity-60"
                      style={{ color: 'var(--rb-muted)' }}
                    >
                      <Github size={12} />
                    </a>
                  </IconTooltip>
                </div>
              </div>

              <p
                className="mt-4 text-[0.844em] leading-relaxed max-w-2xl"
                style={{ color: 'var(--rb-muted)' }}
              >
                {header.summary}
              </p>
            </motion.div>

            {/* ── Experience ── */}
            <motion.section variants={fadeInUp}>
              <SectionHeading>Experience</SectionHeading>

              <div className="space-y-7">
                {experiences.map((exp) => (
                  <motion.div key={exp.company} variants={fadeInUp} className="group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3
                          className="text-[0.875em] font-semibold leading-snug"
                          style={{ color: 'var(--rb-fg)' }}
                        >
                          {exp.title}
                        </h3>
                        <a
                          href={exp.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 flex items-center gap-1 text-[0.781em] transition-opacity duration-200 hover:opacity-60"
                          style={{ color: 'var(--rb-accent)' }}
                        >
                          {exp.company}
                          <ExternalLink size={9} />
                        </a>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="text-[0.75em]" style={{ color: 'var(--rb-muted)' }}>
                          {exp.period}
                        </div>
                        <div
                          className="mt-0.5 flex items-center justify-end gap-1 text-[0.6875em]"
                          style={{ color: 'var(--rb-muted)' }}
                        >
                          <MapPin size={9} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <ul
                      className="mt-3 space-y-1.5 pl-3.5"
                      style={{ borderLeft: '1.5px solid var(--rb-border)' }}
                    >
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className="shrink-0 w-[0.28em] h-[0.28em] rounded-[2px]"
                            style={{
                              background: 'var(--rb-accent)',
                              opacity: 0.75,
                              marginTop: 'calc(0.781em * 1.625 / 2 - 0.14em)',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            className="text-[0.781em] leading-relaxed"
                            style={{ color: 'var(--rb-muted)' }}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Open Source ── */}
            <motion.section variants={fadeInUp}>
              <SectionHeading>Open Source</SectionHeading>

              <div className="space-y-5">
                {openSource.map((proj) => (
                  <motion.div key={proj.name} variants={fadeInUp} className="group">
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-2 gap-y-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span
                          className="text-[0.844em] font-semibold"
                          style={{ color: 'var(--rb-fg)' }}
                        >
                          {proj.name}
                        </span>
                        <span style={{ color: 'var(--rb-border)' }}>|</span>
                        <div className="flex flex-wrap gap-1">
                          {proj.tech.map((t) => (
                            <Chip key={t} label={t} />
                          ))}
                        </div>
                      </div>
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm:ml-auto flex items-center gap-1 text-[0.6875em] transition-opacity duration-200 hover:opacity-60 min-w-0"
                        style={{ color: 'var(--rb-accent)' }}
                      >
                        <span className="truncate">{proj.linkLabel}</span>
                        <ExternalLink size={9} className="shrink-0" />
                      </a>
                    </div>

                    <div
                      className="mt-2 pl-3.5"
                      style={{ borderLeft: '1.5px solid var(--rb-border)' }}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className="shrink-0 w-[0.28em] h-[0.28em] rounded-[2px]"
                          style={{
                            background: 'var(--rb-accent)',
                            opacity: 0.75,
                            marginTop: 'calc(0.781em * 1.625 / 2 - 0.14em)',
                            flexShrink: 0,
                          }}
                        />
                        <p
                          className="text-[0.781em] leading-relaxed"
                          style={{ color: 'var(--rb-muted)' }}
                        >
                          {proj.bullet}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Skills ── */}
            <motion.section variants={fadeInUp}>
              <SectionHeading>Technical Skills</SectionHeading>

              <div className="space-y-3">
                {skills.map((cat) => (
                  <div key={cat.label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 text-[0.781em]">
                    <span
                      className="sm:w-40 sm:shrink-0 font-medium sm:pt-0.5"
                      style={{ color: 'var(--rb-fg)' }}
                    >
                      {cat.label}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <Chip key={item} label={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Education ── */}
            <motion.section variants={fadeInUp}>
              <SectionHeading>Education</SectionHeading>

              <div className="space-y-5">
                {education.map((edu) => (
                  <motion.div key={edu.degree} variants={fadeInUp}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3
                          className="text-[0.875em] font-semibold leading-snug"
                          style={{ color: 'var(--rb-fg)' }}
                        >
                          {edu.degree}
                        </h3>
                        <div
                          className="mt-0.5 text-[0.781em]"
                          style={{ color: 'var(--rb-muted)' }}
                        >
                          {edu.school}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="text-[0.75em]" style={{ color: 'var(--rb-muted)' }}>
                          {edu.period}
                        </div>
                        <div
                          className="mt-0.5 flex items-center justify-end gap-1 text-[0.6875em]"
                          style={{ color: 'var(--rb-muted)' }}
                        >
                          <MapPin size={9} />
                          {edu.location}
                        </div>
                      </div>
                    </div>

                    <div className="mt-1.5 flex items-center gap-2 text-[0.75em]">
                      <span className="font-semibold" style={{ color: 'var(--rb-fg)' }}>
                        {edu.gpa}
                      </span>
                      <span style={{ color: 'var(--rb-border)' }}>·</span>
                      <span style={{ color: 'var(--rb-muted)' }}>{edu.note}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Publications ── */}
            {publications.length > 0 && (
              <motion.section variants={fadeInUp}>
                <SectionHeading>Publications</SectionHeading>

                <div className="space-y-4">
                  {publications.map((pub) => (
                    <motion.div key={pub.title} variants={fadeInUp}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3
                            className="text-[0.875em] font-semibold leading-snug"
                            style={{ color: 'var(--rb-fg)' }}
                          >
                            {pub.title}
                          </h3>
                          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.781em]">
                            <span style={{ color: 'var(--rb-muted)' }}>{pub.venue}</span>
                            <span style={{ color: 'var(--rb-border)' }}>·</span>
                            <span style={{ color: 'var(--rb-muted)' }}>{pub.note}</span>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="text-[0.75em]" style={{ color: 'var(--rb-muted)' }}>
                            {pub.year}
                          </div>
                          {pub.link && (
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-0.5 flex items-center justify-end gap-1 text-[0.6875em] transition-opacity duration-200 hover:opacity-60"
                              style={{ color: 'var(--rb-accent)' }}
                            >
                              DOI
                              <ExternalLink size={9} />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </motion.div>
          </motion.div>

          {/* ── Print footer ── */}
          <div
            className="hidden print:block mt-10 pt-5 text-center text-[0.656em]"
            style={{ borderTop: '1px solid var(--rb-border)', color: 'var(--rb-muted)' }}
          >
            {header.email} · {header.phone} · {header.portfolio.href}
          </div>
        </main>
      </div>
    </>
  );
}
