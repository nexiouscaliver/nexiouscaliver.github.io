// Everything the /terminal page knows, as data. terminal.astro renders the
// script-off transcript from this module and serializes the same object to
// the live terminal, so adding a command is a content edit: it lands in
// help, in tab completion, and in the static transcript in the same change.
//
// Link lines carry a token in `href` that the page resolves against the site
// settings before anything ships: site:resume, site:email, site:github,
// site:linkedin, site:projects. Everything else passes through as-is.

export type TermClass = 'dim' | 'bright' | 'amber' | 'err' | 'ok';

/** A printed line: plain text, or a link. */
export type TermLine =
  | { t: string; c?: TermClass }
  | { a: string; href: string; c?: TermClass };

export interface TermCommand {
  /** What the user types. Lowercase, one word. */
  name: string;
  /** Argument hint shown in help, if any. */
  args?: string;
  /** One line of help text. */
  summary: string;
  /** What the command prints. */
  lines?: TermLine[];
  /** Behavioral commands instead of printed lines. */
  action?: 'clear';
  /** Easter eggs: absent from help and from the static transcript. */
  hidden?: boolean;
}

const commands: TermCommand[] = [
  {
    name: 'about',
    summary: 'who is behind this site',
    lines: [
      { t: 'Shahil Kadia. AI System Architect (consultant) at RegenAI since' },
      { t: 'August 2026; AI Developer Intern there before that, January 2025' },
      { t: 'to July 2026. B.Tech in Computer Science, Amity University Mumbai,' },
      { t: 'class of 2026, 9.20 CGPA.' },
      { t: '' },
      { t: 'The work sits where LLMs meet production software: agent' },
      { t: 'write-integrity, prompt-injection defense, retrieval and embeddings' },
      { t: 'infrastructure, GPU inference operations, and the platform half' },
      { t: 'that keeps all of it honest.' },
      { t: '' },
      { t: 'The short version: I build systems that hold up when the failure', c: 'bright' },
      { t: 'modes matter.', c: 'bright' },
    ],
  },
  {
    name: 'projects',
    summary: 'the four things worth linking, one line each',
    lines: [
      { t: '# four things worth linking', c: 'dim' },
      {
        t: 'voxbar/           rust     Privacy-first dictation for macOS. Hold a key, talk,',
      },
      { t: '                           release: clean text lands wherever your cursor is.' },
      { t: '' },
      {
        t: 'mission-control/  python   A controller for long-running agent engineering',
      },
      { t: '                           programmes: waves, lanes, verification against' },
      { t: '                           machine records, honest blocked states.' },
      { t: '' },
      {
        t: 'omniforge/        python   Self-hosted review and merge automation for GitLab',
      },
      { t: '                           and GitHub: a 23-tool MCP server and a fail-closed' },
      { t: '                           merge gate.' },
      { t: '' },
      {
        t: 'amischeduler/     flask    Venue booking for a university: 15 halls, 200+',
      },
      { t: '                           bookings a month, approvals that route themselves.' },
      { t: '' },
      { t: 'the long versions live at', c: 'dim' },
      { a: 'shahilkadia.me/projects/', href: 'site:projects', c: 'amber' },
    ],
  },
  {
    name: 'resume',
    summary: 'where the PDF lives',
    lines: [
      { t: 'one page, no photos, no skill bars:' },
      { a: 'Shahil-Kadia-Resume.pdf', href: 'site:resume', c: 'amber' },
      { t: 'same file as the one linked in the footer of every page here.', c: 'dim' },
    ],
  },
  {
    name: 'contact',
    summary: 'email and profiles, no forms in between',
    lines: [
      { t: 'no forms, no calendars, no chat widget. pick a channel:' },
      { t: '' },
      { a: '  email     shahilkadia@gmail.com', href: 'site:email' },
      { a: '  github    github.com/nexiouscaliver', href: 'site:github' },
      {
        a: '  linkedin  linkedin.com/in/shahil-kadia',
        href: 'site:linkedin',
      },
      { t: '' },
      { t: 'email is the fastest one. I read everything.', c: 'dim' },
    ],
  },
  {
    name: 'help',
    summary: 'this list',
  },
  {
    name: 'clear',
    summary: 'wipe the screen (ctrl+l works too)',
    action: 'clear',
  },
  {
    name: 'sudo',
    summary: 'you never know',
    hidden: true,
    lines: [
      { t: 'visitor is not in the sudoers file.', c: 'err' },
      { t: 'this incident will be reported to exactly nobody: there is no' },
      { t: 'server here, just a page in your tab. everything on it already' },
      { t: 'belongs to you.' },
    ],
  },
];

export const TERMINAL = {
  promptUser: 'visitor',
  promptHost: 'shahilkadia',

  banner: [
    '      ███████╗██╗  ██╗  █████╗  ██╗  ██╗██╗██╗',
    '      ██╔════╝██║  ██║ ██╔══██╗███╗ ██║██║██║',
    '      ███████╗███████║ ███████║╚██╗██╔╝██║██║',
    '      ╚════██║██╔══██║██╔══██║ ╚███╔╝ ██║██║',
    '      ███████║██║  ██║██║  ██║ ██╔██╗ ██║██║',
    '      ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═╝ ╚═╝╚═╝',
  ],

  /** Typed at boot, before the banner. */
  boot: [
    { t: '[  OK  ] mounted /home/visitor (read-only, zero cookies)', c: 'dim' },
  ],
  /** Printed after the banner. */
  intro: [
    { t: 'SHAHIL KADIA · AI System Architect', c: 'bright' },
    { t: 'the portfolio, except you can type at it.', c: 'dim' },
    { t: '' },
    {
      t: "type 'help' for commands · tab completes · up-arrow recalls · ctrl+l clears",
      c: 'dim',
    },
  ],

  helpFlavor: {
    header: 'TERMINAL(1)                  Shahil Kadia                  TERMINAL(1)',
    name: 'terminal, the part of shahilkadia.me that takes input',
    files: ['~/about.md          the human', '~/projects/         the building'],
    bugs: 'none known. the caret is real, though.',
  },

  commands,
};
