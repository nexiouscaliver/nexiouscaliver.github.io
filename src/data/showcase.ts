// The complete public-repo census for the projects showcase.
// Every entry is fact-checked against the repository itself (README, code,
// manifests) or GitHub metadata. Categories are honest classifications, not
// marketing tiers. The flagship entries below are rendered from the projects
// content collection (full rows); this array records them so the census in
// this file stays complete and auditable in one place.

export type ShowcaseCategory =
  | 'flagship'
  | 'product'
  | 'tooling'
  | 'experiment'
  | 'library'
  | 'fork-adapted'
  | 'archive';

export interface ShowcaseEntry {
  name: string;
  description: string;
  tags: string[];
  link: string;
}

export const showcase: Record<ShowcaseCategory, ShowcaseEntry[]> = {
  flagship: [
    {
      name: 'VoxBar',
      description:
        'Privacy-first dictation for macOS: on-device speech recognition, a local LLM that cleans up the transcript, and a phone companion. Rust and Tauri.',
      tags: ['Rust', 'Tauri', 'GGUF'],
      link: 'https://github.com/nexiouscaliver/voxbar',
    },
    {
      name: 'mission-control',
      description:
        'The master session that plans multi-session programs, forges red-teamed session prompts, verifies results against reality, and distills knowledge.',
      tags: ['Python'],
      link: 'https://github.com/nexiouscaliver/mission-control',
    },
    {
      name: 'OmniForge',
      description:
        'A merge-request lifecycle plugin: adversarial review agents tear apart code in isolated worktrees, auto-fix findings, and forge MRs with real descriptions.',
      tags: ['Python'],
      link: 'https://github.com/nexiouscaliver/OmniForge',
    },
  ],

  product: [
    {
      name: 'DevTrack',
      description:
        'Local-first developer time tracker: native git integration, work estimation from commits, analytics, and styled Excel exports; no cloud, no accounts.',
      tags: ['React', 'Node.js', 'Docker'],
      link: 'https://github.com/nexiouscaliver/DevTrack',
    },
    {
      name: 'AgenticOS',
      description:
        'Self-hosted multi-agent research platform on the Agno framework: eight specialized agents, team workflows, RAG knowledge bases, FastAPI backend, PostgreSQL vector store.',
      tags: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'],
      link: 'https://github.com/nexiouscaliver/AgenticOS',
    },
    {
      name: 'Prism-DB',
      description:
        'Natural-language analytics layer for SQL databases: plain-English questions become SQL, charts, and reports. Flask backend, Next.js frontend, JWT auth.',
      tags: ['Python', 'Flask', 'Next.js', 'PostgreSQL'],
      link: 'https://github.com/nexiouscaliver/Prism-DB',
    },
    {
      name: 'doctor-appointment-system',
      description:
        'Self-hostable appointment booking for doctors and patients with hashed logins and an offline SQLite database; runs on Windows, Linux, and Raspberry Pi.',
      tags: ['Python', 'Flask', 'SQLite'],
      link: 'https://github.com/nexiouscaliver/doctor-appointment-system',
    },
    {
      name: 'spacify-backend',
      description:
        'Flask API gateway and SQLite data layer for a warehouse inventory system: product, warehouse, and transaction endpoints plus report generation.',
      tags: ['Python', 'Flask', 'SQLite'],
      link: 'https://github.com/nexiouscaliver/spacify-backend',
    },
    {
      name: 'parentapp-api',
      description:
        'Backend API gateway for a parents community app: Firebase auth, storage, and realtime database, JWT sessions, bundled with a React client.',
      tags: ['Python', 'Firebase', 'React'],
      link: 'https://github.com/nexiouscaliver/parentapp-api',
    },
  ],

  tooling: [
    {
      name: 'tugline',
      description:
        'Push notifications and phone replies for coding-agent sessions over ntfy: zero-dependency Python CLI and daemon with a loopback web console, spooling, retry, and approve or deny buttons.',
      tags: ['Python', 'ntfy', 'CLI'],
      link: 'https://github.com/nexiouscaliver/tugline',
    },
    {
      name: 'architect-orchestrator',
      description:
        'Coding-agent plugin that triages tasks by complexity, gates plans by risk, and dispatches specialist subagents with model routing, keeping project state across sessions.',
      tags: ['Python', 'plugin'],
      link: 'https://github.com/nexiouscaliver/architect-orchestrator',
    },
    {
      name: 'dotfiles',
      description:
        'Personal terminal setup: zsh, git, and vim defaults with an idempotent POSIX sh installer that symlinks configs and backs up existing files.',
      tags: ['Shell', 'zsh'],
      link: 'https://github.com/nexiouscaliver/dotfiles',
    },
    {
      name: 'password-cracker-automation',
      description:
        'Password hash analysis platform: Flask and Celery backend running ten cracking techniques with async progress tracking, Next.js dashboard.',
      tags: ['Python', 'Flask', 'Celery', 'Next.js'],
      link: 'https://github.com/nexiouscaliver/password-cracker-automation',
    },
    {
      name: 'amizone-faculty-feedback-bot',
      description:
        'PyAutoGUI desktop automation that fills and submits faculty feedback forms on the student portal, in Windows and Linux variants.',
      tags: ['Python', 'PyAutoGUI'],
      link: 'https://github.com/nexiouscaliver/amizone-faculty-feedback-bot',
    },
    {
      name: 'amity-website',
      description:
        'Python scripts that build and verify research publication pages for two university institutes, generating HTML tables from CSV and Excel data.',
      tags: ['Python', 'BeautifulSoup'],
      link: 'https://github.com/nexiouscaliver/amity-website',
    },
    {
      name: 'dbscript',
      description:
        'Small collection of SQLite user management scripts in Python: table creation, hashed user creation and lookup, with SQL logging.',
      tags: ['Python', 'SQLite'],
      link: 'https://github.com/nexiouscaliver/dbscript',
    },
  ],

  experiment: [
    {
      name: 'Digital-Gov-Drishti',
      description:
        'Civic complaint platform where citizens report local issues with photo evidence: Flask and MongoDB backend with OTP verification and LLM-assisted triage, Next.js frontend.',
      tags: ['Python', 'Flask', 'MongoDB', 'Next.js'],
      link: 'https://github.com/nexiouscaliver/Digital-Gov-Drishti',
    },
    {
      name: 'pavement-condition-prediction',
      description:
        'Regression project predicting Pavement Condition Index from distress, traffic, and weather data; Keras, CatBoost, and XGBoost compared, with a Flask API serving predictions.',
      tags: ['TensorFlow', 'Keras', 'Flask'],
      link: 'https://github.com/nexiouscaliver/pavement-condition-prediction',
    },
    {
      name: 'spam-sms-classifier',
      description:
        'Naive Bayes spam classifier trained on the UCI SMS Spam Collection, with TF-IDF text cleaning and a Streamlit demo loading the pickled model.',
      tags: ['Python', 'Streamlit', 'NLTK'],
      link: 'https://github.com/nexiouscaliver/spam-sms-classifier',
    },
    {
      name: 'cat-dog-image-classifier',
      description:
        'CNN image classifier separating cats from dogs, trained on the Kaggle dataset with TensorFlow and Keras in a Colab notebook.',
      tags: ['TensorFlow', 'Keras', 'Jupyter'],
      link: 'https://github.com/nexiouscaliver/cat-dog-image-classifier',
    },
    {
      name: 'cybersec-backdoor',
      description:
        'Security coursework demonstrating how a reverse shell backdoor can hide behind an innocent-looking number guessing game.',
      tags: ['Python', 'sockets'],
      link: 'https://github.com/nexiouscaliver/cybersec-backdoor',
    },
    {
      name: 'cybersec-keylogger',
      description:
        'Security coursework implementing a keystroke logger that batches captured input and emails it over SMTP, credentials entered at runtime.',
      tags: ['Python', 'pynput'],
      link: 'https://github.com/nexiouscaliver/cybersec-keylogger',
    },
    {
      name: 'cybersec-ransomware',
      description:
        'Security coursework pair of Fernet encryptor and decryptor scripts for studying directory-walking cryptography, execution blocks left commented out.',
      tags: ['Python', 'cryptography'],
      link: 'https://github.com/nexiouscaliver/cybersec-ransomware',
    },
  ],

  library: [
    {
      name: 'secret-text',
      description:
        'Multi-layer text cipher library: substitution, position shuffle, serial key remapping, and Fernet AES with file vaults and SHA-256 integrity checks.',
      tags: ['Python', 'cryptography'],
      link: 'https://github.com/nexiouscaliver/secret-text',
    },
  ],

  'fork-adapted': [
    {
      name: 'pyWhat',
      description:
        'Upstream fix merged: IPv6 regex false positives corrected, so lone colons stop matching and hex digits and ports parse correctly.',
      tags: ['Python', 'regex'],
      link: 'https://github.com/nexiouscaliver/pyWhat',
    },
    {
      name: 'mem0',
      description:
        'Upstream fix merged: OSS Memory examples migrated to the v3 filters API so search and get_all calls stop crashing on removed parameters.',
      tags: ['Python', 'examples'],
      link: 'https://github.com/nexiouscaliver/mem0',
    },
    {
      name: 'camel',
      description:
        'Two toolkit fixes: MCPToolkit connects exactly once when max_retries is 0 (merged upstream), and sub-agent tool inheritance made explicit and configurable (open PR).',
      tags: ['Python', 'toolkits'],
      link: 'https://github.com/nexiouscaliver/camel',
    },
    {
      name: 'agno',
      description:
        'Two upstream changes proposed: the A2A client migrated to the official a2a-sdk, and telemetry submission made non-blocking with a configurable timeout.',
      tags: ['Python', 'a2a'],
      link: 'https://github.com/nexiouscaliver/agno',
    },
    {
      name: 'agentscope',
      description:
        'Session recovery fix proposed upstream: orphan tool calls closed with a synthesized interrupted result, so a mid-stream failure cannot brick the next run.',
      tags: ['Python', 'agents'],
      link: 'https://github.com/nexiouscaliver/agentscope',
    },
    {
      name: 'cognee',
      description:
        'Two upstream fixes: full traceback logging when a delegated CLI command fails, and S3 storage falling back to the boto3 credential chain so IAM roles work.',
      tags: ['Python', 'AWS'],
      link: 'https://github.com/nexiouscaliver/cognee',
    },
    {
      name: 'transformers',
      description:
        'Segformer model outputs refactored to the standard capture_outputs decorators, removing manual return handling; PR closed after review.',
      tags: ['Python', 'PyTorch'],
      link: 'https://github.com/nexiouscaliver/transformers',
    },
    {
      name: 'instructor',
      description:
        'ModeRegistry.get_handlers made thread-safe with double-checked locking so concurrent first access stops failing with KeyError; PR closed after review.',
      tags: ['Python', 'concurrency'],
      link: 'https://github.com/nexiouscaliver/instructor',
    },
    {
      name: 'moltbot',
      description:
        'OnCompactionStart callback for the assistant agent runner: chats get a heads-up message when context auto-compaction starts; proposed upstream, closed unmerged.',
      tags: ['TypeScript', 'agents'],
      link: 'https://github.com/nexiouscaliver/moltbot',
    },
  ],

  archive: [],
};

// Upstream pull requests, public record. Titles are verbatim from GitHub;
// nothing is paraphrased into a claim. Merged first, then open, newest first.
export interface Contribution {
  repo: string;
  title: string;
  state: 'merged' | 'open';
  when: string;
  url: string;
}

export const contributions: { merged: Contribution[]; open: Contribution[] } = {
  merged: [
    {
      repo: 'bee-san/pyWhat',
      title: 'fix: update IPv6 regex to support hexadecimal characters',
      state: 'merged',
      when: 'merged Oct 2026',
      url: 'https://github.com/bee-san/pyWhat/pull/266',
    },
    {
      repo: 'mem0ai/mem0',
      title: 'fix(examples): migrate OSS Memory search/get_all calls to v3 filters API',
      state: 'merged',
      when: 'merged Sep 2026',
      url: 'https://github.com/mem0ai/mem0/pull/7300',
    },
    {
      repo: 'camel-ai/camel',
      title: 'fix(toolkits): MCPToolkit connects once when max_retries=0',
      state: 'merged',
      when: 'merged Jun 2026',
      url: 'https://github.com/camel-ai/camel/pull/4117',
    },
    {
      repo: 'openzim/zimfarm',
      title: 'Fix worker dashboard boxes inconsistent sizing',
      state: 'merged',
      when: 'merged Jun 2026',
      url: 'https://github.com/openzim/zimfarm/pull/1956',
    },
    {
      repo: 'langgenius/dify',
      title: 'refactor: accept db.session explicitly in RecommendedAppService',
      state: 'merged',
      when: 'merged Jun 2026',
      url: 'https://github.com/langgenius/dify/pull/37417',
    },
  ],
  open: [
    {
      repo: 'topoteretes/cognee',
      title: 'fix(cli): log full traceback on delegated API command failure',
      state: 'open',
      when: 'open since Sep 2026',
      url: 'https://github.com/topoteretes/cognee/pull/3427',
    },
    {
      repo: 'camel-ai/camel',
      title: 'feat(toolkits): make AgentToolkit sub-agent tool inheritance policy explicit',
      state: 'open',
      when: 'open since Sep 2026',
      url: 'https://github.com/camel-ai/camel/pull/4165',
    },
    {
      repo: 'agentscope-ai/agentscope',
      title: 'fix(agent): prevent orphan tool_calls from bricking sessions',
      state: 'open',
      when: 'open since Aug 2026',
      url: 'https://github.com/agentscope-ai/agentscope/pull/1905',
    },
    {
      repo: 'agno-agi/agno',
      title: '[refactor] Migrate A2A client to official a2a-sdk',
      state: 'open',
      when: 'open since Aug 2026',
      url: 'https://github.com/agno-agi/agno/pull/6246',
    },
    {
      repo: 'openzim/zimfarm',
      title: 'Display tags on recipes list page',
      state: 'open',
      when: 'open since Jun 2026',
      url: 'https://github.com/openzim/zimfarm/pull/1957',
    },
    {
      repo: 'agno-agi/agno',
      title: '[fix] Non-blocking telemetry submission',
      state: 'open',
      when: 'open since Jun 2026',
      url: 'https://github.com/agno-agi/agno/pull/6239',
    },
    {
      repo: 'GDSC-AUM/Git-ting-Started',
      title: 'Added new data for Shahil N. Kadia.',
      state: 'open',
      when: 'open since Oct 2022',
      url: 'https://github.com/GDSC-AUM/Git-ting-Started/pull/7',
    },
  ],
};
