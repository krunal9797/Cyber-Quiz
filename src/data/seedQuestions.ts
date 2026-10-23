import { Question, QuizConfig, Student } from '../types';

export const INITIAL_QUIZ_CONFIGS: QuizConfig[] = [
  {
    id: 'day1',
    day: 1,
    title: 'Day 1: Basic Cyber Crime & Cyber Safety',
    description: 'Introduction to online threats, phishing scams, password hygiene, safe browsing habits, and common malware variants.',
    timeLimitPerQuestion: 45,
    questionsPerQuiz: 5,
    marksPerQuestion: 1,
    negativeMarksPerQuestion: 0,
    showReviewExplanations: true,
    isLeaderboardVisible: true,
    isDayActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'day2',
    day: 2,
    title: 'Day 2: Intermediate Cyber Crime & Financial Scams',
    description: 'UPI and banking fraud, QR code deceit, social media identity theft, fake investment traps, and cyber fraud reporting workflows.',
    timeLimitPerQuestion: 45,
    questionsPerQuiz: 5,
    marksPerQuestion: 1,
    negativeMarksPerQuestion: 0,
    showReviewExplanations: true,
    isLeaderboardVisible: true,
    isDayActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'day3',
    day: 3,
    title: 'Day 3: OSINT (Open-Source Intelligence)',
    description: 'Information gathering methodologies, search engine operators (Google Dorking), domain analysis, EXIF metadata, and ethical OSINT constraints.',
    timeLimitPerQuestion: 50,
    questionsPerQuiz: 5,
    marksPerQuestion: 1,
    negativeMarksPerQuestion: 0,
    showReviewExplanations: true,
    isLeaderboardVisible: true,
    isDayActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'day4',
    day: 4,
    title: 'Day 4: Advanced Cyber Crime & Digital Forensics',
    description: 'Digital evidence preservation, chain of custody, email header forensic analysis, IP routing, log parsing, and anti-money laundering tracking.',
    timeLimitPerQuestion: 60,
    questionsPerQuiz: 5,
    marksPerQuestion: 1,
    negativeMarksPerQuestion: 0,
    showReviewExplanations: true,
    isLeaderboardVisible: true,
    isDayActive: true,
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'STU-1001',
    studentId: 'STU-1001',
    rollNumber: 'CY-2026-01',
    fullName: 'Aarav Sharma',
    passcode: 'cyber123',
    email: 'aarav.sharma@example.edu',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'STU-1002',
    studentId: 'STU-1002',
    rollNumber: 'CY-2026-02',
    fullName: 'Priya Patel',
    passcode: 'secure456',
    email: 'priya.patel@example.edu',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'STU-1003',
    studentId: 'STU-1003',
    rollNumber: 'CY-2026-03',
    fullName: 'Rohan Mehta',
    passcode: 'shield789',
    email: 'rohan.mehta@example.edu',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'STU-1004',
    studentId: 'STU-1004',
    rollNumber: 'CY-2026-04',
    fullName: 'Ananya Iyer',
    passcode: 'guard321',
    email: 'ananya.iyer@example.edu',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_QUESTIONS: Question[] = [
  // DAY 1: BASIC CYBER CRIME
  {
    id: 'q1-1',
    day: 1,
    category: 'Phishing',
    difficulty: 'easy',
    question: 'You receive an urgent SMS stating: "Your bank account has been suspended. Click this bit.ly link immediately to verify your identity within 30 minutes." What attack technique is this?',
    options: [
      'Smishing (SMS Phishing)',
      'Spear Phishing via Darknet',
      'Distributed Denial of Service (DDoS)',
      'SQL Injection'
    ],
    correctAnswerIndex: 0,
    explanation: 'Smishing is phishing carried out through SMS text messages. Attackers instill false urgency and provide shortened or spoofed links to capture sensitive bank credentials.'
  },
  {
    id: 'q1-2',
    day: 1,
    category: 'Password Security',
    difficulty: 'easy',
    question: 'Which of the following creates the most resilient defence against credential stuffing and brute force dictionary attacks?',
    options: [
      'Using a pet name with an exclamation mark at the end',
      'Multi-Factor Authentication (MFA) combined with a long unique passphrase',
      'Changing your password every 7 days to a slightly modified number',
      'Writing the password on a sticky note attached to your monitor'
    ],
    correctAnswerIndex: 1,
    explanation: 'Multi-Factor Authentication (MFA) requires two or more verification factors, rendering stolen passwords useless without the secondary authenticator device or biometric token.'
  },
  {
    id: 'q1-3',
    day: 1,
    category: 'Malware',
    difficulty: 'medium',
    question: 'A malicious software that encrypts a victim\'s documents and hard disk, displaying a countdown clock demanding payment in cryptocurrency, is called:',
    options: [
      'Adware',
      'Spyware',
      'Ransomware',
      'Rootkit'
    ],
    correctAnswerIndex: 2,
    explanation: 'Ransomware is malicious software designed to deny access to computer files or whole systems until a ransom fee (frequently in crypto) is transferred to the attacker.'
  },
  {
    id: 'q1-4',
    day: 1,
    category: 'Network Safety',
    difficulty: 'easy',
    question: 'Why is conducting online net banking on an open, unencrypted public airport Wi-Fi considered unsafe?',
    options: [
      'Public Wi-Fi automatically blocks financial websites',
      'Attackers can intercept unencrypted traffic through Man-in-the-Middle (MitM) eavesdropping or rogue Evil Twin APs',
      'Public Wi-Fi consumes double your phone battery',
      'The bank server instantly deletes your account upon detecting shared networks'
    ],
    correctAnswerIndex: 1,
    explanation: 'Open Wi-Fi without encryption enables adversaries on the same wireless network to snoop on packets, perform ARP spoofing, or operate evil twin access points to harvest credentials.'
  },
  {
    id: 'q1-5',
    day: 1,
    category: 'Safe Browsing',
    difficulty: 'easy',
    question: 'You notice a website URL reading: "https://www.paypa1-security-verification.com/login". What indicator signifies this is a phishing domain?',
    options: [
      'It uses HTTPS which is illegal for commercial sites',
      'Typosquatting substituting the letter "l" with digit "1" and an unrelated domain host',
      'The URL contains hyphens which are prohibited on the Internet',
      'It has the word "security" in the address'
    ],
    correctAnswerIndex: 1,
    explanation: 'Typosquatting relies on deceptive visual similarities (such as using the digit 1 in place of lowercase l) to trick victims into believing they are visiting the legitimate service.'
  },
  {
    id: 'q1-6',
    day: 1,
    category: 'Social Engineering',
    difficulty: 'medium',
    question: 'What is "Pretexting" in the context of social engineering cyber attacks?',
    options: [
      'Scanning a server with Nmap before launching an exploit',
      'Creating an invented persona or fictional scenario to persuade a victim to divulge private information',
      'Encrypting data using pre-shared symmetric keys',
      'Sending mass spam emails automatically using bots'
    ],
    correctAnswerIndex: 1,
    explanation: 'Pretexting involves crafting a plausible scenario or false identity (e.g., impersonating an IT helpdesk technician, auditor, or police officer) to manipulate someone into releasing protected records.'
  },
  {
    id: 'q1-7',
    day: 1,
    category: 'Cyber Safety',
    difficulty: 'easy',
    question: 'What should you do immediately if you realize you entered your corporate login password on a suspicious email phishing link?',
    options: [
      'Wait 24 hours to see if any unauthorized changes occur',
      'Immediately change the password from a secure device, notify IT security, and revoke active sessions',
      'Delete the web browser application from your laptop',
      'Reply to the email requesting the attacker to disregard the input'
    ],
    correctAnswerIndex: 1,
    explanation: 'Prompt password resets from a trusted device, notifying incident response personnel, and invalidating active session tokens minimizes the attacker’s window of exploitation.'
  },
  {
    id: 'q1-8',
    day: 1,
    category: 'Malware',
    difficulty: 'medium',
    question: 'A malicious application disguised as an innocent utility (like an audio converter or calculator) that executes malicious backdoors in the background is classified as a:',
    options: [
      'Trojan Horse',
      'Network Worm',
      'Logic Bomb',
      'Macro Virus'
    ],
    correctAnswerIndex: 0,
    explanation: 'Named after the mythological Greek wooden horse, Trojan software misrepresents its true intent, presenting itself as useful while surreptitiously executing unauthorized actions.'
  },

  // DAY 2: INTERMEDIATE CYBER CRIME & FINANCIAL SCAMS
  {
    id: 'q2-1',
    day: 2,
    category: 'UPI & Banking Fraud',
    difficulty: 'medium',
    question: 'A buyer on an online marketplace offers to purchase your used laptop and sends a QR code stating: "Scan this QR code and enter your UPI PIN to receive ₹25,000 in your bank account." What is true regarding UPI transactions?',
    options: [
      'You must always enter your UPI PIN to receive incoming credits',
      'Entering a UPI PIN is strictly and exclusively used to DEBIT (deduct) money from your account, never to receive money',
      'Scanning QR codes automatically registers you for government insurance',
      'UPI PINs are required for receiving deposits exceeding ₹10,000'
    ],
    correctAnswerIndex: 1,
    explanation: 'Fundamental rule of UPI: You NEVER need to enter your UPI PIN or scan a QR code to receive money. A UPI PIN is solely an authorization to debit funds from your account.'
  },
  {
    id: 'q2-2',
    day: 2,
    category: 'SIM Swapping',
    difficulty: 'hard',
    question: 'What is the primary objective of cyber criminals executing a "SIM Swap" attack against a victim?',
    options: [
      'To increase the victim’s mobile data usage speed',
      'To intercept One-Time Passwords (OTPs) and SMS 2FA tokens used for banking and account takeovers',
      'To physically steal the smartphone hardware from a distance',
      'To install ransomware on the telecom provider’s cellular towers'
    ],
    correctAnswerIndex: 1,
    explanation: 'SIM swapping tricks or bribes telecom operators into porting the victim’s phone number to an attacker’s SIM card, enabling the fraudster to intercept two-factor SMS OTPs to break into financial accounts.'
  },
  {
    id: 'q2-3',
    day: 2,
    category: 'Social Media Fraud',
    difficulty: 'medium',
    question: 'A scammer creates a duplicate social media profile using a friend\'s public photos and sends urgent direct messages claiming: "I had an accident and need ₹5,000 urgently via GPay." This technique is known as:',
    options: [
      'Profile Impersonation / Clone Scam',
      'Buffer Overflow Attack',
      'Zero-Day Vulnerability Exploitation',
      'DNS Poisoning'
    ],
    correctAnswerIndex: 0,
    explanation: 'Profile cloning exploits social trust. Attackers scrape public photos and friend lists, create lookalike accounts, and exploit emotional urgency to solicit rapid financial transfers.'
  },
  {
    id: 'q2-4',
    day: 2,
    category: 'Online Financial Scams',
    difficulty: 'medium',
    question: 'In India, which toll-free national cyber helpline number and portal are designated by the Ministry of Home Affairs (MHA) for reporting immediate cyber financial fraud to freeze funds in transit?',
    options: [
      '100 and police.gov.in',
      '1930 and cybercrime.gov.in',
      '1091 and crimefree.org',
      '112 and bankfraud.in'
    ],
    correctAnswerIndex: 1,
    explanation: 'Helpline 1930 (formerly 155260) and cybercrime.gov.in constitute India\'s Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) designed to freeze money in inter-bank transit.'
  },
  {
    id: 'q2-5',
    day: 2,
    category: 'Investment & Task Scams',
    difficulty: 'medium',
    question: 'You are invited to a Telegram group promising ₹3,000 per day simply by "Liking YouTube videos and rating Google Maps restaurants", but later required to deposit "prepaid task funds" into crypto wallets to unlock withdrawals. This is an example of:',
    options: [
      'A legitimate digital affiliate marketing campaign',
      'A Part-Time Job / Task-Based Ponzi Scam',
      'A distributed penetration testing bounty program',
      'An automated cloud micro-tasking contract'
    ],
    correctAnswerIndex: 1,
    explanation: 'Task-based scams build initial trust with nominal payouts (₹100-₹500), then lure victims into transferring large "recharge deposits" to unlock fabricated yields, eventually freezing all funds.'
  },
  {
    id: 'q2-6',
    day: 2,
    category: 'Card Skimming',
    difficulty: 'medium',
    question: 'What is digital "Magecart" or E-skimming attack in the context of e-commerce websites?',
    options: [
      'Physical devices fitted onto gas station ATM machines',
      'Malicious JavaScript injected into online checkout pages that steals customer credit card details in real time',
      'Sending counterfeit magnetic stripe cards through postal mail',
      'Phishing emails offering discount coupons'
    ],
    correctAnswerIndex: 1,
    explanation: 'Magecart refers to cyber syndicates that inject illicit client-side JavaScript code into vulnerable web stores to silently intercept credit card numbers, CVVs, and billing addresses at checkout.'
  },
  {
    id: 'q2-7',
    day: 2,
    category: 'Search Engine SEO Fraud',
    difficulty: 'medium',
    question: 'How do fraudsters manipulate search engine results to execute "Fake Customer Care" scams?',
    options: [
      'By hacking into Google headquarters database directly',
      'By creating fake Google Maps business listings and websites with fraudulent toll-free numbers that outrank authentic support channels',
      'By changing the DNS root server entries of all ISPs',
      'By turning off customer smartphones remotely'
    ],
    correctAnswerIndex: 1,
    explanation: 'Fraudsters create malicious business listings and optimize SEO pages with fake helpline numbers. When distressed users Google "courier helpline" or "airline refund number", they dial the scammer.'
  },
  {
    id: 'q2-8',
    day: 2,
    category: 'Fraud Investigation',
    difficulty: 'hard',
    question: 'When reporting an unauthorized financial transfer to the bank or law enforcement, which critical detail is vital for the investigation to trace the money trail?',
    options: [
      'The brand of the smartphone screen protector',
      'The 12-digit UPI Transaction Reference (UTR) number or Bank Reference ID and exact timestamp',
      'The victim\'s social media follower count',
      'The color of the bank branch building'
    ],
    correctAnswerIndex: 1,
    explanation: 'The UTR (Unique Transaction Reference) / RRN (Retrieval Reference Number) and precise timestamp allow nodal bank officers to trace the specific beneficiary account and initiate nodal freeze orders.'
  },

  // DAY 3: OSINT (OPEN-SOURCE INTELLIGENCE)
  {
    id: 'q3-1',
    day: 3,
    category: 'OSINT Fundamentals',
    difficulty: 'easy',
    question: 'What constitutes Open-Source Intelligence (OSINT)?',
    options: [
      'Hacking into password-protected enterprise firewalls without authorization',
      'Intelligence collected from publicly available, overt sources in a legal and structured manner',
      'Writing open-source Linux software programs for GitHub',
      'Stealing classified government documents using spyware'
    ],
    correctAnswerIndex: 1,
    explanation: 'OSINT refers to intelligence derived from publicly accessible media, public records, government gazettes, social media, and search indexes without unauthorized intrusion.'
  },
  {
    id: 'q3-2',
    day: 3,
    category: 'Google Dorking',
    difficulty: 'medium',
    question: 'Which Google Search advanced operator query finds PDF files hosted specifically on the domain "example.gov" containing the term "confidential"?',
    options: [
      'site:example.gov filetype:pdf "confidential"',
      'search:example.gov type:pdf confidential',
      'domain(example.gov) && ext(pdf) == "confidential"',
      'find pdf from example.gov where word="confidential"'
    ],
    correctAnswerIndex: 0,
    explanation: 'Google Dorking uses structured operators: `site:` restricts results to a specific domain, `filetype:` limits by file extension, and quotes enforce exact phrase matching.'
  },
  {
    id: 'q3-3',
    day: 3,
    category: 'Domain & Web Intelligence',
    difficulty: 'medium',
    question: 'What information does a WHOIS lookup primarily provide regarding a suspicious phishing website?',
    options: [
      'The live plaintext passwords stored inside the website database',
      'Domain registrar name, registration dates, expiration date, nameservers, and registrant contact records',
      'The source code written in React or Python',
      'The browser history of visitors who browsed the website'
    ],
    correctAnswerIndex: 1,
    explanation: 'WHOIS is a public query protocol that reveals registrar details, registration creation and expiry dates, DNS nameservers, and registrant contact information (unless privacy protected).'
  },
  {
    id: 'q3-4',
    day: 3,
    category: 'Image Forensics',
    difficulty: 'medium',
    question: 'An image posted by a scammer on social media contains hidden EXIF metadata. Which of the following pieces of investigative intelligence can often be extracted from raw EXIF tags?',
    options: [
      'GPS coordinates (latitude/longitude), camera model, focal length, and exact capture timestamp',
      'The bank balance of the person who took the photo',
      'The password of the Wi-Fi network nearby',
      'The National Identity number of everyone in the photograph'
    ],
    correctAnswerIndex: 0,
    explanation: 'EXIF (Exchangeable Image File Format) metadata embedded by digital cameras and smartphones records capture date, device hardware model, aperture, and often embedded geotag GPS coordinates.'
  },
  {
    id: 'q3-5',
    day: 3,
    category: 'Historical Forensics',
    difficulty: 'easy',
    question: 'If a fraudulent website has been taken down or deleted by scammers, what public OSINT repository can investigators consult to examine historic snapshots of the site?',
    options: [
      'Internet Archive\'s Wayback Machine (archive.org)',
      'Windows Recycle Bin',
      'Local Browser Cache of another device',
      'Wikipedia edit logs'
    ],
    correctAnswerIndex: 0,
    explanation: 'The Wayback Machine crawls and archives billions of web pages over time, allowing investigators to inspect previous versions, contact numbers, and fraudulent claims of defunct websites.'
  },
  {
    id: 'q3-6',
    day: 3,
    category: 'Social Footprinting',
    difficulty: 'medium',
    question: 'What is the "Sock Puppet" concept in professional cyber crime OSINT investigations?',
    options: [
      'A hand puppet used in children’s educational videos',
      'A carefully researched, synthetic online identity and clean research environment used by investigators to prevent attribution and protect personal safety',
      'A software bug in Android devices that leaks keystrokes',
      'An automated spam script that floods chatrooms'
    ],
    correctAnswerIndex: 1,
    explanation: 'In OSINT, a "sock puppet" is a meticulously separated online persona with no ties to the investigator\'s real identity, utilized to research threat actors without compromising personal or institutional security.'
  },
  {
    id: 'q3-7',
    day: 3,
    category: 'Ethical & Legal OSINT',
    difficulty: 'hard',
    question: 'During an OSINT inquiry into a cyber fraud gang, you discover an open server with an exposed admin panel where you can guess the default password. Under cyber crime law (e.g. IT Act Sec 43/66 or CFAA), what must you do?',
    options: [
      'Log into the admin portal, download all databases, and delete their files',
      'Do not access password-protected systems without proper legal authorization; document the publicly visible finding and report to competent law enforcement',
      'Change the administrator password so the scammers get locked out',
      'Publish the password on Twitter for public vigilantism'
    ],
    correctAnswerIndex: 1,
    explanation: 'Unauthorized access to a computer system—even one belonging to suspected criminals—is illegal without warrant or statutory authority. OSINT strictly stops at the perimeter of public access.'
  },
  {
    id: 'q3-8',
    day: 3,
    category: 'Username Reconnaissance',
    difficulty: 'medium',
    question: 'Open-source tools such as "Sherlock" and "WhatsMyName" assist cyber investigators by:',
    options: [
      'Cracking WPA2 Wi-Fi handshakes',
      'Querying hundreds of social media platforms simultaneously to detect if a specific username exists across services',
      'Generating synthetic AI voice deepfakes',
      'Decrypting BitLocker hard drives'
    ],
    correctAnswerIndex: 1,
    explanation: 'Username enumeration utilities parse URL endpoints across hundreds of social networks, forums, and platforms to map a suspect\'s digital footprint from a single handle.'
  },

  // DAY 4: ADVANCED CYBER CRIME & DIGITAL FORENSICS
  {
    id: 'q4-1',
    day: 4,
    category: 'Evidence Preservation',
    difficulty: 'medium',
    question: 'What is the primary objective of establishing a formal "Chain of Custody" for digital evidence seized during a cyber crime raid?',
    options: [
      'To verify who gets custody of the suspect’s vehicle',
      'To provide a chronological, tamper-proof record of every individual who collected, accessed, transported, and examined the evidence to prove admissibility in court',
      'To calculate the monetary auction value of the seized hardware',
      'To ensure that evidence is returned to the suspect within 48 hours'
    ],
    correctAnswerIndex: 1,
    explanation: 'Chain of Custody documents evidence handling from crime scene to courtroom, guaranteeing the evidence was not altered, contaminated, or substituted, ensuring judicial admissibility.'
  },
  {
    id: 'q4-2',
    day: 4,
    category: 'Cryptographic Integrity',
    difficulty: 'medium',
    question: 'Why do forensic examiners compute cryptographic hash values (such as SHA-256) of a storage drive before and after creating a forensic bit-stream image?',
    options: [
      'To encrypt the suspect’s drive with a secret password',
      'To prove mathematically that the forensic duplicate is an exact 1:1 bit-by-bit identical clone and that original data was unmodified',
      'To speed up file transfer across USB 3.0 cables',
      'To erase viruses automatically from the hard drive'
    ],
    correctAnswerIndex: 1,
    explanation: 'Cryptographic hashing provides mathematical verification of integrity. If the hash of the forensic image matches the hash of the physical source, it proves zero alteration occurred.'
  },
  {
    id: 'q4-3',
    day: 4,
    category: 'Email Header Analysis',
    difficulty: 'hard',
    question: 'In an email spoofing investigation, which header line added by Mail Transfer Agents (MTAs) is the most trustworthy for tracing the genuine originating IP address of the sender?',
    options: [
      'From: header',
      'Reply-To: header',
      'The bottom-most (earliest) "Received:" header added by the first receiving mail gateway',
      'Subject: header'
    ],
    correctAnswerIndex: 2,
    explanation: 'The "From:" and "Reply-To:" headers are easily fabricated by the sender client. Each receiving MTA prepends a "Received:" header, with the bottom-most entry reflecting the actual sending IP handshake.'
  },
  {
    id: 'q4-4',
    day: 4,
    category: 'Email Authentication',
    difficulty: 'hard',
    question: 'What three core DNS-based email authentication protocols are evaluated when investigating whether a corporate CEO email was spoofed?',
    options: [
      'HTTP, FTP, and SSH',
      'SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC',
      'DHCP, ARP, and ICMP',
      'AES, DES, and RSA'
    ],
    correctAnswerIndex: 1,
    explanation: 'SPF specifies authorized sender IP addresses, DKIM verifies cryptographic signature integrity of messages, and DMARC establishes policy enforcement and alignment validation.'
  },
  {
    id: 'q4-5',
    day: 4,
    category: 'Live Memory Forensics',
    difficulty: 'hard',
    question: 'In live computer forensics, why is Order of Volatility critical, and why should RAM be captured BEFORE powering down the machine?',
    options: [
      'RAM loses all contents instantly upon power loss (volatile), yet contains unencrypted keys, active connections, and running malware in memory',
      'Powering down damages the monitor screen',
      'Hard disks lose all data if unplugged',
      'RAM consumes too much power while powered off'
    ],
    correctAnswerIndex: 0,
    explanation: 'According to RFC 3227, RAM is highly volatile. Live RAM contains decrypted BitLocker keys, chat sessions, injected malware payloads, and active network sockets that vanish on reboot.'
  },
  {
    id: 'q4-6',
    day: 4,
    category: 'Evidence Admissibility',
    difficulty: 'medium',
    question: 'Under Indian cyber law and the Indian Evidence Act (Section 65B, now BSA Sec 63), what must accompany an electronic record or printout to make it admissible as evidence in court?',
    options: [
      'A notarized translation in French',
      'A Certificate under Section 65B signed by a person occupying an official position responsible for the management of the relevant device, certifying device integrity and continuous operation',
      'A screenshot from a social media post',
      'The original receipt showing how much the computer cost when bought'
    ],
    correctAnswerIndex: 1,
    explanation: 'Section 65B certificate is a mandatory statutory prerequisite for admissibility of secondary electronic records, verifying the device was operating properly and evidence remained unaltered.'
  },
  {
    id: 'q4-7',
    day: 4,
    category: 'Financial Money Trail',
    difficulty: 'hard',
    question: 'In large-scale cyber financial fraud syndicates, what is the role of a "Mule Account"?',
    options: [
      'An encrypted Bitcoin cold storage wallet kept offline',
      'A bank account opened using compromised or purchased KYC documents, used to receive, layer, and rapidly cash-out illicit funds to obfuscate the real criminal mastermind',
      'A special account managed directly by the Reserve Bank of India',
      'A corporate credit line given to IT companies'
    ],
    correctAnswerIndex: 1,
    explanation: 'Mule accounts (often rented from vulnerable individuals or opened via forged KYC) act as intermediate layering conduits where stolen funds are routed and withdrawn at ATMs within minutes.'
  },
  {
    id: 'q4-8',
    day: 4,
    category: 'Web Server Log Analysis',
    difficulty: 'hard',
    question: 'While examining an Apache access log during an incident investigation, you identify the entry: `GET /search.php?id=1%27%20UNION%20SELECT%20null,username,password%20FROM%20users-- HTTP/1.1 200`. What attack was launched?',
    options: [
      'Distributed Denial of Service (DDoS)',
      'Union-based SQL Injection (SQLi) exfiltrating user credentials',
      'Cross-Site Request Forgery (CSRF)',
      'Man-in-the-Middle Wi-Fi deauthentication'
    ],
    correctAnswerIndex: 1,
    explanation: 'The payload contains URL-encoded SQL syntax (`UNION SELECT null, username, password FROM users--`) attempting to append an unauthorized query to extract credentials from database tables.'
  }
];
