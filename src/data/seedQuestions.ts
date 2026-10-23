import { Question, QuizConfig, Student } from '../types';

export const INITIAL_QUIZ_CONFIGS: QuizConfig[] = [
  {
    id: 'day1',
    day: 1,
    title: 'Day 1: Basic Cyber Crime & Cyber Safety',
    description: 'Introduction to online threats, phishing scams, password hygiene, safe browsing habits, and common malware variants.',
    timeLimitPerQuestion: 45,
    questionsPerQuiz: 20,
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
    questionsPerQuiz: 20,
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
    questionsPerQuiz: 20,
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
    questionsPerQuiz: 20,
    marksPerQuestion: 1,
    negativeMarksPerQuestion: 0,
    showReviewExplanations: true,
    isLeaderboardVisible: true,
    isDayActive: true,
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_STUDENTS: Student[] = [];

export const INITIAL_QUESTIONS: Question[] = [
  // ==========================================
  // DAY 1: BASIC CYBER CRIME & CYBER SAFETY (25 Questions)
  // ==========================================
  {
    id: 'q1-1',
    day: 1,
    category: 'Phishing',
    difficulty: 'easy',
    question: 'You receive an urgent SMS stating: "Your bank account has been suspended. Click this bit.ly link immediately to verify your identity within 30 minutes." What attack technique is this?',
    options: ['Smishing (SMS Phishing)', 'Spear Phishing via Darknet', 'Distributed Denial of Service (DDoS)', 'SQL Injection'],
    correctAnswerIndex: 0,
    explanation: 'Smishing is phishing carried out through SMS text messages. Attackers instill false urgency and provide shortened or spoofed links to capture sensitive bank credentials.'
  },
  {
    id: 'q1-2',
    day: 1,
    category: 'Password Security',
    difficulty: 'easy',
    question: 'Which of the following creates the most resilient defence against credential stuffing and brute force dictionary attacks?',
    options: ['Using a pet name with an exclamation mark at the end', 'Multi-Factor Authentication (MFA) combined with a long unique passphrase', 'Changing your password every 7 days to a slightly modified number', 'Writing the password on a sticky note attached to your monitor'],
    correctAnswerIndex: 1,
    explanation: 'Multi-Factor Authentication (MFA) requires two or more verification factors, rendering stolen passwords useless without the secondary authenticator device or biometric token.'
  },
  {
    id: 'q1-3',
    day: 1,
    category: 'Malware',
    difficulty: 'medium',
    question: 'A malicious software that encrypts a victim\'s documents and hard disk, displaying a countdown clock demanding payment in cryptocurrency, is called:',
    options: ['Adware', 'Spyware', 'Ransomware', 'Rootkit'],
    correctAnswerIndex: 2,
    explanation: 'Ransomware is malicious software designed to deny access to computer files or whole systems until a ransom fee (frequently in crypto) is transferred to the attacker.'
  },
  {
    id: 'q1-4',
    day: 1,
    category: 'Network Safety',
    difficulty: 'easy',
    question: 'Why is conducting online net banking on an open, unencrypted public airport Wi-Fi considered unsafe?',
    options: ['Public Wi-Fi automatically blocks financial websites', 'Attackers can intercept unencrypted traffic through Man-in-the-Middle (MitM) eavesdropping or rogue Evil Twin APs', 'Public Wi-Fi consumes double your phone battery', 'The bank server instantly deletes your account upon detecting shared networks'],
    correctAnswerIndex: 1,
    explanation: 'Open Wi-Fi without encryption enables adversaries on the same wireless network to snoop on packets, perform ARP spoofing, or operate evil twin access points to harvest credentials.'
  },
  {
    id: 'q1-5',
    day: 1,
    category: 'Safe Browsing',
    difficulty: 'easy',
    question: 'You notice a website URL reading: "https://www.paypa1-security-verification.com/login". What indicator signifies this is a phishing domain?',
    options: ['It uses HTTPS which is illegal for commercial sites', 'Typosquatting substituting the letter "l" with digit "1" and an unrelated domain host', 'The URL contains hyphens which are prohibited on the Internet', 'It has the word "security" in the address'],
    correctAnswerIndex: 1,
    explanation: 'Typosquatting relies on deceptive visual similarities (such as using the digit 1 in place of lowercase l) to trick victims into believing they are visiting the legitimate service.'
  },
  {
    id: 'q1-6',
    day: 1,
    category: 'Social Engineering',
    difficulty: 'medium',
    question: 'What is "Pretexting" in the context of social engineering cyber attacks?',
    options: ['Scanning a server with Nmap before launching an exploit', 'Creating an invented persona or fictional scenario to persuade a victim to divulge private information', 'Encrypting data using pre-shared symmetric keys', 'Sending mass spam emails automatically using bots'],
    correctAnswerIndex: 1,
    explanation: 'Pretexting involves crafting a plausible scenario or false identity (e.g., impersonating an IT helpdesk technician, auditor, or police officer) to manipulate someone into releasing protected records.'
  },
  {
    id: 'q1-7',
    day: 1,
    category: 'Cyber Safety',
    difficulty: 'easy',
    question: 'What should you do immediately if you realize you entered your corporate login password on a suspicious email phishing link?',
    options: ['Wait 24 hours to see if any unauthorized changes occur', 'Immediately change the password from a secure device, notify IT security, and revoke active sessions', 'Delete the web browser application from your laptop', 'Reply to the email requesting the attacker to disregard the input'],
    correctAnswerIndex: 1,
    explanation: 'Prompt password resets from a trusted device, notifying incident response personnel, and invalidating active session tokens minimizes the attacker’s window of exploitation.'
  },
  {
    id: 'q1-8',
    day: 1,
    category: 'Malware',
    difficulty: 'medium',
    question: 'A malicious application disguised as an innocent utility (like an audio converter or calculator) that executes malicious backdoors in the background is classified as a:',
    options: ['Trojan Horse', 'Network Worm', 'Logic Bomb', 'Macro Virus'],
    correctAnswerIndex: 0,
    explanation: 'Named after the mythological Greek wooden horse, Trojan software misrepresents its true intent, presenting itself as useful while surreptitiously executing unauthorized actions.'
  },
  {
    id: 'q1-9',
    day: 1,
    category: 'Social Engineering',
    difficulty: 'easy',
    question: 'A fraudster calls claiming to be from your bank\'s credit card division and asks you to read out the 6-digit OTP sent to your phone to "cancel an unauthorized transaction". What attack is this?',
    options: ['Vishing (Voice Phishing)', 'Shoulder Surfing', 'Watering Hole Attack', 'Cross-Site Scripting'],
    correctAnswerIndex: 0,
    explanation: 'Vishing (voice phishing) uses telephone calls combined with social engineering to extract sensitive secrets such as OTPs, PINs, and card security codes.'
  },
  {
    id: 'q1-10',
    day: 1,
    category: 'Physical Security',
    difficulty: 'easy',
    question: 'When someone stands closely behind you at an ATM or coffee shop to observe you typing your PIN or device password, this is known as:',
    options: ['Shoulder Surfing', 'Tailgating', 'Dumpster Diving', 'Eavesdropping'],
    correctAnswerIndex: 0,
    explanation: 'Shoulder surfing is a direct observation technique where adversaries physically watch a victim typing credentials or PIN numbers.'
  },
  {
    id: 'q1-11',
    day: 1,
    category: 'Cyber Safety',
    difficulty: 'easy',
    question: 'What is the purpose of software security patches and automatic operating system updates?',
    options: ['To slow down your device so you buy a new one', 'To fix known security vulnerabilities and protect against newly discovered exploits', 'To delete your saved browser history', 'To increase monitor brightness'],
    correctAnswerIndex: 1,
    explanation: 'Software updates deliver security patches that eliminate known vulnerabilities, preventing cyber criminals from exploiting software flaws to compromise your system.'
  },
  {
    id: 'q1-12',
    day: 1,
    category: 'Phishing',
    difficulty: 'medium',
    question: 'Which type of phishing attack specifically targets high-profile executives, CFOs, or company directors to authorize fraudulent wire transfers?',
    options: ['Whaling', 'Pharming', 'Clone Phishing', 'Spamming'],
    correctAnswerIndex: 0,
    explanation: 'Whaling is a targeted phishing attack directed specifically at senior executives, board members, or high-value individuals (the "big fish").'
  },
  {
    id: 'q1-13',
    day: 1,
    category: 'Network Safety',
    difficulty: 'medium',
    question: 'What does the padlock icon and "https://" prefix in your web browser address bar signify?',
    options: ['The website is 100% immune to malware', 'The data transmitted between your browser and the web server is encrypted via TLS/SSL', 'The website has government certification', 'The website cannot charge your credit card'],
    correctAnswerIndex: 1,
    explanation: 'HTTPS encrypts the communication channel between the user\'s browser and the web server using TLS, preventing eavesdropping and tampering in transit.'
  },
  {
    id: 'q1-14',
    day: 1,
    category: 'Malware',
    difficulty: 'easy',
    question: 'What is "Spyware"?',
    options: ['Software that improves computer gaming frame rates', 'Software secretly installed to monitor user keystrokes, browsing habits, and harvest personal data without consent', 'A program used to cool down CPU temperature', 'A tool for designing 3D graphics'],
    correctAnswerIndex: 1,
    explanation: 'Spyware gathers intelligence on a user\'s activities without their knowledge, often recording keystrokes (keylogger), passwords, and sensitive documents.'
  },
  {
    id: 'q1-15',
    day: 1,
    category: 'Safe Browsing',
    difficulty: 'easy',
    question: 'Which of the following is considered a safe cybersecurity practice when downloading software?',
    options: ['Downloading cracked or pirated software from torrent sites', 'Disabling your antivirus when prompted by an installer', 'Only downloading applications from official developer websites or verified app stores', 'Clicking on flashing banner ads promising free cleanup tools'],
    correctAnswerIndex: 2,
    explanation: 'Downloading only from authentic sources or verified stores significantly reduces the risk of installing trojans and bundled malware.'
  },
  {
    id: 'q1-16',
    day: 1,
    category: 'Social Engineering',
    difficulty: 'medium',
    question: 'An attacker leaves an infected USB drive labeled "Executive Salary Review Q4" in an office parking lot hoping an employee plugs it into a workstation. What technique is this?',
    options: ['Baiting', 'Honeytoken', 'DNS Spoofing', 'Clickjacking'],
    correctAnswerIndex: 0,
    explanation: 'Baiting preys on human curiosity or greed by planting physical media (like USB drives) containing malicious autorun or malware payloads in public places.'
  },
  {
    id: 'q1-17',
    day: 1,
    category: 'Password Security',
    difficulty: 'medium',
    question: 'Why is reusing the same password across multiple online accounts (email, banking, social media) hazardous?',
    options: ['Computers forget passwords if used more than three times', 'If one service suffers a data breach, attackers use credential stuffing to compromise all your other accounts', 'Web browsers automatically charge a fee for duplicate passwords', 'Internet service providers block identical passwords'],
    correctAnswerIndex: 1,
    explanation: 'Credential stuffing automated bots take leaked username/password pairs from breached databases and test them across thousands of popular portals.'
  },
  {
    id: 'q1-18',
    day: 1,
    category: 'Cyber Safety',
    difficulty: 'easy',
    question: 'What is a "Digital Footprint"?',
    options: ['The physical fingerprint used on smartphone biometric sensors', 'The record and trail of personal data left behind by a user while interacting on the internet', 'A measurement of CPU clock cycles', 'The serial number of an Ethernet network cable'],
    correctAnswerIndex: 1,
    explanation: 'A digital footprint encompasses browsing history, social media posts, comments, photos, IP logs, and digital activities traceable back to a specific individual.'
  },
  {
    id: 'q1-19',
    day: 1,
    category: 'Phishing',
    difficulty: 'medium',
    question: 'Which email header inspection helps identify whether an email purporting to be from support@apple.com actually originated from Apple\'s servers?',
    options: ['The Subject line', 'The Sender display name', 'The "Received from" mail server IP address and SPF/DKIM verification results', 'The color of the font inside the body'],
    correctAnswerIndex: 2,
    explanation: 'Display names and sender headers can be spoofed trivially; the underlying Received headers and SPF/DKIM authentication records expose the actual originating mail server.'
  },
  {
    id: 'q1-20',
    day: 1,
    category: 'Network Safety',
    difficulty: 'medium',
    question: 'What security tool creates a private, encrypted tunnel between your device and the internet when accessing public networks?',
    options: ['Virtual Private Network (VPN)', 'File Transfer Protocol (FTP)', 'Domain Name System (DNS)', 'Hypertext Markup Language (HTML)'],
    correctAnswerIndex: 0,
    explanation: 'A Virtual Private Network (VPN) encrypts internet traffic from the host to the VPN exit node, shielding data from interception by malicious actors on local Wi-Fi.'
  },
  {
    id: 'q1-21',
    day: 1,
    category: 'Malware',
    difficulty: 'easy',
    question: 'What is an "Adware" infection?',
    options: ['Software that generates unsolicited promotional pop-ups, banners, and redirects user search queries', 'Hardware that expands system memory', 'A safe utility that organizes files', 'An operating system firewall component'],
    correctAnswerIndex: 0,
    explanation: 'Adware automatically displays or downloads advertising materials such as banners or pop-ups, often tracking user behaviour to deliver targeted commercial spam.'
  },
  {
    id: 'q1-22',
    day: 1,
    category: 'Cyber Safety',
    difficulty: 'easy',
    question: 'Why should you review application permissions (camera, contacts, microphone, location) on mobile devices?',
    options: ['To prevent apps from consuming device memory when not in use', 'To ensure apps only access data strictly necessary for their stated legitimate functions and prevent surveillance', 'To change the app icon appearance', 'To increase 5G download speed'],
    correctAnswerIndex: 1,
    explanation: 'Restricting permissions follows the principle of least privilege, preventing rogue or compromised apps from harvesting private contacts, location, or microphone feeds.'
  },
  {
    id: 'q1-23',
    day: 1,
    category: 'Social Engineering',
    difficulty: 'medium',
    question: 'An uninvited individual following closely behind an authorized employee to enter a secure corporate facility without scanning a badge is committing:',
    options: ['Tailgating (Piggybacking)', 'Phishing', 'Wardriving', 'Snooping'],
    correctAnswerIndex: 0,
    explanation: 'Tailgating or piggybacking is a physical social engineering attack where an unauthorized person tags along behind an authorized entrant to breach physical perimeters.'
  },
  {
    id: 'q1-24',
    day: 1,
    category: 'Safe Browsing',
    difficulty: 'medium',
    question: 'What are browser "Cookies", and why should users periodically review or clear third-party tracking cookies?',
    options: ['Computer hardware chips that process cookies recipes', 'Small text files saved on your computer used for session state and tracking across websites', 'Antivirus signature database files', 'Windows registry backup files'],
    correctAnswerIndex: 1,
    explanation: 'Cookies store authentication tokens and preferences, but third-party tracking cookies can profile your browsing behavior across multiple advertising networks.'
  },
  {
    id: 'q1-25',
    day: 1,
    category: 'Password Security',
    difficulty: 'easy',
    question: 'Which of the following represents a strong and memorable passphrase approach?',
    options: ['12345678', 'password1', 'Elephant-Riding-Bicycle-Solar-92!', 'admin'],
    correctAnswerIndex: 2,
    explanation: 'Combining four or more unrelated dictionary words with symbols and numbers creates high entropy against brute-force attacks while remaining easy for humans to memorize.'
  },

  // ==========================================
  // DAY 2: INTERMEDIATE CYBER CRIME & FINANCIAL SCAMS (25 Questions)
  // ==========================================
  {
    id: 'q2-1',
    day: 2,
    category: 'UPI & Banking Fraud',
    difficulty: 'medium',
    question: 'A buyer on an online marketplace offers to purchase your used laptop and sends a QR code stating: "Scan this QR code and enter your UPI PIN to receive ₹25,000 in your bank account." What is true regarding UPI transactions?',
    options: ['You must always enter your UPI PIN to receive incoming credits', 'Entering a UPI PIN is strictly and exclusively used to DEBIT (deduct) money from your account, never to receive money', 'Scanning QR codes automatically registers you for government insurance', 'UPI PINs are required for receiving deposits exceeding ₹10,000'],
    correctAnswerIndex: 1,
    explanation: 'Fundamental rule of UPI: You NEVER need to enter your UPI PIN or scan a QR code to receive money. A UPI PIN is solely an authorization to debit funds from your account.'
  },
  {
    id: 'q2-2',
    day: 2,
    category: 'SIM Swapping',
    difficulty: 'hard',
    question: 'What is the primary objective of cyber criminals executing a "SIM Swap" attack against a victim?',
    options: ['To increase the victim’s mobile data usage speed', 'To intercept One-Time Passwords (OTPs) and SMS 2FA tokens used for banking and account takeovers', 'To physically steal the smartphone hardware from a distance', 'To install ransomware on the telecom provider’s cellular towers'],
    correctAnswerIndex: 1,
    explanation: 'SIM swapping tricks or bribes telecom operators into porting the victim’s phone number to an attacker’s SIM card, enabling the fraudster to intercept two-factor SMS OTPs to break into financial accounts.'
  },
  {
    id: 'q2-3',
    day: 2,
    category: 'Social Media Fraud',
    difficulty: 'medium',
    question: 'A scammer creates a duplicate social media profile using a friend\'s public photos and sends urgent direct messages claiming: "I had an accident and need ₹5,000 urgently via GPay." This technique is known as:',
    options: ['Profile Impersonation / Clone Scam', 'Buffer Overflow Attack', 'Zero-Day Vulnerability Exploitation', 'DNS Poisoning'],
    correctAnswerIndex: 0,
    explanation: 'Profile cloning exploits social trust. Attackers scrape public photos and friend lists, create lookalike accounts, and exploit emotional urgency to solicit rapid financial transfers.'
  },
  {
    id: 'q2-4',
    day: 2,
    category: 'Online Financial Scams',
    difficulty: 'medium',
    question: 'In India, which toll-free national cyber helpline number and portal are designated by the Ministry of Home Affairs (MHA) for reporting immediate cyber financial fraud to freeze funds in transit?',
    options: ['100 and police.gov.in', '1930 and cybercrime.gov.in', '1091 and crimefree.org', '112 and bankfraud.in'],
    correctAnswerIndex: 1,
    explanation: 'Helpline 1930 (formerly 155260) and cybercrime.gov.in constitute India\'s Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) designed to freeze money in inter-bank transit.'
  },
  {
    id: 'q2-5',
    day: 2,
    category: 'Investment & Task Scams',
    difficulty: 'medium',
    question: 'You are invited to a Telegram group promising ₹3,000 per day simply by "Liking YouTube videos and rating Google Maps restaurants", but later required to deposit "prepaid task funds" into crypto wallets to unlock withdrawals. This is an example of:',
    options: ['A legitimate digital affiliate marketing campaign', 'A Part-Time Job / Task-Based Ponzi Scam', 'A distributed penetration testing bounty program', 'An automated cloud micro-tasking contract'],
    correctAnswerIndex: 1,
    explanation: 'Task-based scams build initial trust with nominal payouts (₹100-₹500), then lure victims into transferring large "recharge deposits" to unlock fabricated yields, eventually freezing all funds.'
  },
  {
    id: 'q2-6',
    day: 2,
    category: 'Card Skimming',
    difficulty: 'medium',
    question: 'What is digital "Magecart" or E-skimming attack in the context of e-commerce websites?',
    options: ['Physical devices fitted onto gas station ATM machines', 'Malicious JavaScript injected into online checkout pages that steals customer credit card details in real time', 'Sending counterfeit magnetic stripe cards through postal mail', 'Phishing emails offering discount coupons'],
    correctAnswerIndex: 1,
    explanation: 'Magecart refers to cyber syndicates that inject illicit client-side JavaScript code into vulnerable web stores to silently intercept credit card numbers, CVVs, and billing addresses at checkout.'
  },
  {
    id: 'q2-7',
    day: 2,
    category: 'Search Engine SEO Fraud',
    difficulty: 'medium',
    question: 'How do fraudsters manipulate search engine results to execute "Fake Customer Care" scams?',
    options: ['By hacking into Google headquarters database directly', 'By creating fake Google Maps business listings and websites with fraudulent toll-free numbers that outrank authentic support channels', 'By changing the DNS root server entries of all ISPs', 'By turning off customer smartphones remotely'],
    correctAnswerIndex: 1,
    explanation: 'Fraudsters create malicious business listings and optimize SEO pages with fake helpline numbers. When distressed users Google "courier helpline" or "airline refund number", they dial the scammer.'
  },
  {
    id: 'q2-8',
    day: 2,
    category: 'Fraud Investigation',
    difficulty: 'hard',
    question: 'When reporting an unauthorized financial transfer to the bank or law enforcement, which critical detail is vital for the investigation to trace the money trail?',
    options: ['The brand of the smartphone screen protector', 'The 12-digit UPI Transaction Reference (UTR) number or Bank Reference ID and exact timestamp', 'The victim\'s social media follower count', 'The color of the bank branch building'],
    correctAnswerIndex: 1,
    explanation: 'The UTR (Unique Transaction Reference) / RRN (Retrieval Reference Number) and precise timestamp allow nodal bank officers to trace the specific beneficiary account and initiate nodal freeze orders.'
  },
  {
    id: 'q2-9',
    day: 2,
    category: 'Remote Access Scams',
    difficulty: 'medium',
    question: 'A fake tech support caller instructs a victim to download "AnyDesk" or "TeamViewer" to "fix an urgent virus alert". What does this accomplish?',
    options: ['It cleans hard disk dust', 'It grants the scammer full remote desktop control over the victim\'s device and access to active banking sessions', 'It updates graphic drivers', 'It speeds up CPU clock speed'],
    correctAnswerIndex: 1,
    explanation: 'Legitimate remote desktop tools are weaponized by scammers to take complete interactive control of victims\' screens and manipulate net banking portals.'
  },
  {
    id: 'q2-10',
    day: 2,
    category: 'Loan App Fraud',
    difficulty: 'hard',
    question: 'How do predatory unauthorized "Instant Loan Apps" harass borrowers after dispensing quick small loans?',
    options: ['By filing formal lawsuits in civil court', 'By exfiltrating the borrower\'s entire phone contacts and photo gallery to blackmail and shame them using morphed pictures', 'By lowering their mobile phone volume', 'By sending certified postal notices'],
    correctAnswerIndex: 1,
    explanation: 'Illegal lending apps require aggressive permissions (contacts, storage, camera) during installation and use this stolen private data for extortion and defamatory contact harassment.'
  },
  {
    id: 'q2-11',
    day: 2,
    category: 'Deepfake Fraud',
    difficulty: 'hard',
    question: 'A scammer uses generative AI to clone the voice and video appearance of a relative in distress requesting bail money over WhatsApp video. What technology is being weaponized?',
    options: ['Deepfake Synthetic Media', 'Quantum Computing', 'Blockchain Smart Contracts', 'Optical Character Recognition'],
    correctAnswerIndex: 0,
    explanation: 'Deepfakes employ deep neural networks to generate ultra-realistic synthetic audio and video of real individuals, exploited for impersonation and emotional extortion.'
  },
  {
    id: 'q2-12',
    day: 2,
    category: 'UPI & Banking Fraud',
    difficulty: 'medium',
    question: 'What is a "Collect Request" in UPI payments apps like PhonePe, Google Pay, or Paytm?',
    options: ['A request to receive cash from the nearest ATM', 'A request initiated by someone asking YOU to pay money into their account', 'A free cash reward notification', 'A bank statement download prompt'],
    correctAnswerIndex: 1,
    explanation: 'A collect request asks the payer to authorize a debit from their own account. Fraudsters disguise collect requests as "refund vouchers" or "lottery claims".'
  },
  {
    id: 'q2-13',
    day: 2,
    category: 'ATM Fraud',
    difficulty: 'medium',
    question: 'A physical device covertly attached over an ATM card slot to read magnetic stripe data along with a pinhole camera to capture the PIN is called an:',
    options: ['ATM Skimmer', 'Network Switch', 'Optical Scanner', 'Hard Drive Dock'],
    correctAnswerIndex: 0,
    explanation: 'Skimmers duplicate the magnetic stripe data as the card passes through, while hidden pinhole cameras or fake keypad overlays record the PIN.'
  },
  {
    id: 'q2-14',
    day: 2,
    category: 'Crypto Scams',
    difficulty: 'medium',
    question: 'What is a "Pig Butchering" (Sha Zhu Pan) cyber scam?',
    options: ['An attack targeting agricultural IoT feeding sensors', 'A long-term confidence scam where fraudsters build romantic or financial rapport over weeks ("fattening the pig") before luring the victim into fraudulent crypto trading platforms', 'A malware that deletes pork farming recipes', 'A distributed denial of service on food portals'],
    correctAnswerIndex: 1,
    explanation: 'Originating as "Sha Zhu Pan", this scam builds deep emotional or romantic trust over months before directing victims to fake crypto investment dashboards where deposits cannot be withdrawn.'
  },
  {
    id: 'q2-15',
    day: 2,
    category: 'Identity Theft',
    difficulty: 'medium',
    question: 'What is "Synthetic Identity Fraud"?',
    options: ['Wearing a synthetic polymer disguise at a bank branch', 'Combining real and fake credentials (e.g. valid Aadhaar or SSN with a fabricated name) to create a new fraudulent credit profile', 'Fabricating a social media profile for a cartoon character', 'Purchasing plastic credit cards online'],
    correctAnswerIndex: 1,
    explanation: 'Synthetic identity theft blends stolen real identifiers with fictitious credentials to open accounts that bypass standard automated identity verification.'
  },
  {
    id: 'q2-16',
    day: 2,
    category: 'Lottery & Courier Scams',
    difficulty: 'easy',
    question: 'You receive an email claiming: "You have won £1,000,000 in the UK National Lottery. Deposit £500 processing and customs fee to release your cheque." What fraud model is this?',
    options: ['Advance-Fee Fraud (419 Scam)', 'Zero-Day Exploit', 'Rogue DHCP Attack', 'Side-Channel Attack'],
    correctAnswerIndex: 0,
    explanation: 'Advance-fee fraud promises an enormous reward or windfall on the condition that the victim pays small upfront "processing fees", taxes, or customs clearance charges.'
  },
  {
    id: 'q2-17',
    day: 2,
    category: 'Fraud Investigation',
    difficulty: 'hard',
    question: 'What constitutes the "Golden Hour" in cyber financial fraud investigation and reporting?',
    options: ['The sunset hour when banks close their branches', 'The critical initial 1 to 2 hours immediately following fraudulent fund debits when reporting to 1930 / bank can successfully freeze funds in transit', 'The 60 minutes after buying a new computer', 'The daily hour when bank interest is calculated'],
    correctAnswerIndex: 1,
    explanation: 'During the first 1-2 hours after fraud, funds are typically moving across intermediate bank accounts or payment gateways; prompt reporting allows authorities to place instantaneous lien holds.'
  },
  {
    id: 'q2-18',
    day: 2,
    category: 'Online Financial Scams',
    difficulty: 'medium',
    question: 'In digital banking security, what is the role of an "IVR Calling Scam"?',
    options: ['Automated phone systems mimicking bank security that trick victims into typing their OTP or card PIN on the telephone keypad', 'A free ringtone download service', 'A telecom utility for testing audio quality', 'A satellite communication protocol'],
    correctAnswerIndex: 0,
    explanation: 'Automated interactive voice response (IVR) calls impersonate bank fraud departments, advising victims to enter their secret PIN or OTP to "block an unauthorized charge".'
  },
  {
    id: 'q2-19',
    day: 2,
    category: 'Social Media Fraud',
    difficulty: 'medium',
    question: 'How do threat actors hijack high-follower Instagram or YouTube accounts via "Copyright Infringement" phishing?',
    options: ['By filing lawsuits in federal court', 'By sending deceptive DMs or emails alleging copyright violations with links to fake appeals forms that capture account credentials and 2FA codes', 'By reporting the account for bad video quality', 'By brute forcing passwords with desktop calculators'],
    correctAnswerIndex: 1,
    explanation: 'Attackers send urgent copyright warning notices linking to spoofed verification portals, seizing the account credentials and immediately changing recovery emails.'
  },
  {
    id: 'q2-20',
    day: 2,
    category: 'UPI & Banking Fraud',
    difficulty: 'easy',
    question: 'Can you receive funds via UPI simply by sharing your UPI ID / VPA (e.g. username@okhdfcbank)?',
    options: ['No, you must also share your debit card CVV', 'Yes, sharing your public UPI ID allows others to send you money safely without exposing your bank account number or needing a PIN', 'No, sharing a UPI ID automatically debits your balance', 'Only if you share your net banking password'],
    correctAnswerIndex: 1,
    explanation: 'A UPI ID (VPA) is a safe public identifier for receiving funds. You never need to enter a PIN or share OTPs to receive funds sent to your UPI ID.'
  },
  {
    id: 'q2-21',
    day: 2,
    category: 'Online Financial Scams',
    difficulty: 'medium',
    question: 'What is a "Digital Arrest" scam that has recently targeted citizens in various jurisdictions?',
    options: ['An official automated court judgment delivered by email', 'Scammers posing as police or CBI/customs officers via video call, alleging drug/contraband parcel delivery in the victim\'s name, confining them under psychological threat until they transfer savings', 'When police confiscate a computer with a warrant', 'A biometric fingerprint check at the airport'],
    correctAnswerIndex: 1,
    explanation: 'In "Digital Arrest" scams, fraudsters pose as law enforcement in mock police stations over Skype/WhatsApp video, intimidating victims into transferring funds for "verification".'
  },
  {
    id: 'q2-22',
    day: 2,
    category: 'Card Skimming',
    difficulty: 'medium',
    question: 'Why are EMV chip cards significantly more secure against physical skimming than traditional magnetic stripe-only cards?',
    options: ['EMV chips are made of solid gold', 'EMV chips generate a unique dynamic cryptogram for every single transaction, making stolen card data unusable for duplicate card cloning', 'EMV chips prevent the card from bending', 'EMV chips contain a built-in GPS tracking system'],
    correctAnswerIndex: 1,
    explanation: 'Magnetic stripes contain static data that can be copied 1:1, whereas EMV chips generate dynamic cryptographic tokens unique to every transaction.'
  },
  {
    id: 'q2-23',
    day: 2,
    category: 'Investment & Task Scams',
    difficulty: 'medium',
    question: 'What is a key warning indicator that an online work-from-home job opportunity is fraudulent?',
    options: ['The employer conducts a formal interview', 'You are asked to pay an upfront "registration fee", security deposit, or cryptocurrency transfer before receiving work assignments', 'The employer asks for a resume in PDF format', 'The company uses email communication'],
    correctAnswerIndex: 1,
    explanation: 'Legitimate employers pay you for your work; they never require employees or candidates to pay upfront fees, security deposits, or recharge funds.'
  },
  {
    id: 'q2-24',
    day: 2,
    category: 'Fraud Investigation',
    difficulty: 'hard',
    question: 'Which entity in India operates the National Cybercrime Reporting Portal (NCRP) and citizen grievance management system?',
    options: ['Indian Cyber Crime Coordination Centre (I4C) under MHA', 'Department of Agriculture', 'National Highways Authority', 'Central Board of Direct Taxes'],
    correctAnswerIndex: 0,
    explanation: 'The Indian Cyber Crime Coordination Centre (I4C), established by the Ministry of Home Affairs, operates the National Cybercrime Reporting Portal (cybercrime.gov.in) and helpline 1930.'
  },
  {
    id: 'q2-25',
    day: 2,
    category: 'UPI & Banking Fraud',
    difficulty: 'easy',
    question: 'If you suspect you have been a victim of unauthorized UPI money transfer, what is your FIRST mandatory step?',
    options: ['Throw away your smartphone into water', 'Immediately call 1930 and notify your bank to block your UPI profile and freeze the transaction reference', 'Wait until next month\'s bank statement arrives', 'Post complaints on public video forums'],
    correctAnswerIndex: 1,
    explanation: 'Immediate notification to the bank and calling 1930 within the Golden Hour maximizes the chance of freezing the funds before scammers withdraw at ATMs.'
  },

  // ==========================================
  // DAY 3: OSINT (OPEN-SOURCE INTELLIGENCE) (25 Questions)
  // ==========================================
  {
    id: 'q3-1',
    day: 3,
    category: 'OSINT Fundamentals',
    difficulty: 'easy',
    question: 'What constitutes Open-Source Intelligence (OSINT)?',
    options: ['Hacking into password-protected enterprise firewalls without authorization', 'Intelligence collected from publicly available, overt sources in a legal and structured manner', 'Writing open-source Linux software programs for GitHub', 'Stealing classified government documents using spyware'],
    correctAnswerIndex: 1,
    explanation: 'OSINT refers to intelligence derived from publicly accessible media, public records, government gazettes, social media, and search indexes without unauthorized intrusion.'
  },
  {
    id: 'q3-2',
    day: 3,
    category: 'Google Dorking',
    difficulty: 'medium',
    question: 'Which Google Search advanced operator query finds PDF files hosted specifically on the domain "example.gov" containing the term "confidential"?',
    options: ['site:example.gov filetype:pdf "confidential"', 'search:example.gov type:pdf confidential', 'domain(example.gov) && ext(pdf) == "confidential"', 'find pdf from example.gov where word="confidential"'],
    correctAnswerIndex: 0,
    explanation: 'Google Dorking uses structured operators: `site:` restricts results to a specific domain, `filetype:` limits by file extension, and quotes enforce exact phrase matching.'
  },
  {
    id: 'q3-3',
    day: 3,
    category: 'Domain & Web Intelligence',
    difficulty: 'medium',
    question: 'What information does a WHOIS lookup primarily provide regarding a suspicious phishing website?',
    options: ['The live plaintext passwords stored inside the website database', 'Domain registrar name, registration dates, expiration date, nameservers, and registrant contact records', 'The source code written in React or Python', 'The browser history of visitors who browsed the website'],
    correctAnswerIndex: 1,
    explanation: 'WHOIS is a public query protocol that reveals registrar details, registration creation and expiry dates, DNS nameservers, and registrant contact information (unless privacy protected).'
  },
  {
    id: 'q3-4',
    day: 3,
    category: 'Image Forensics',
    difficulty: 'medium',
    question: 'An image posted by a scammer on social media contains hidden EXIF metadata. Which of the following pieces of investigative intelligence can often be extracted from raw EXIF tags?',
    options: ['GPS coordinates (latitude/longitude), camera model, focal length, and exact capture timestamp', 'The bank balance of the person who took the photo', 'The password of the Wi-Fi network nearby', 'The National Identity number of everyone in the photograph'],
    correctAnswerIndex: 0,
    explanation: 'EXIF (Exchangeable Image File Format) metadata embedded by digital cameras and smartphones records capture date, device hardware model, aperture, and often embedded geotag GPS coordinates.'
  },
  {
    id: 'q3-5',
    day: 3,
    category: 'Historical Forensics',
    difficulty: 'easy',
    question: 'If a fraudulent website has been taken down or deleted by scammers, what public OSINT repository can investigators consult to examine historic snapshots of the site?',
    options: ['Internet Archive\'s Wayback Machine (archive.org)', 'Windows Recycle Bin', 'Local Browser Cache of another device', 'Wikipedia edit logs'],
    correctAnswerIndex: 0,
    explanation: 'The Wayback Machine crawls and archives billions of web pages over time, allowing investigators to inspect previous versions, contact numbers, and fraudulent claims of defunct websites.'
  },
  {
    id: 'q3-6',
    day: 3,
    category: 'Social Footprinting',
    difficulty: 'medium',
    question: 'What is the "Sock Puppet" concept in professional cyber crime OSINT investigations?',
    options: ['A hand puppet used in children’s educational videos', 'A carefully researched, synthetic online identity and clean research environment used by investigators to prevent attribution and protect personal safety', 'A software bug in Android devices that leaks keystrokes', 'An automated spam script that floods chatrooms'],
    correctAnswerIndex: 1,
    explanation: 'In OSINT, a "sock puppet" is a meticulously separated online persona with no ties to the investigator\'s real identity, utilized to research threat actors without compromising personal or institutional security.'
  },
  {
    id: 'q3-7',
    day: 3,
    category: 'Ethical & Legal OSINT',
    difficulty: 'hard',
    question: 'During an OSINT inquiry into a cyber fraud gang, you discover an open server with an exposed admin panel where you can guess the default password. Under cyber crime law (e.g. IT Act Sec 43/66 or CFAA), what must you do?',
    options: ['Log into the admin portal, download all databases, and delete their files', 'Do not access password-protected systems without proper legal authorization; document the publicly visible finding and report to competent law enforcement', 'Change the administrator password so the scammers get locked out', 'Publish the password on Twitter for public vigilantism'],
    correctAnswerIndex: 1,
    explanation: 'Unauthorized access to a computer system—even one belonging to suspected criminals—is illegal without warrant or statutory authority. OSINT strictly stops at the perimeter of public access.'
  },
  {
    id: 'q3-8',
    day: 3,
    category: 'Username Reconnaissance',
    difficulty: 'medium',
    question: 'Open-source tools such as "Sherlock" and "WhatsMyName" assist cyber investigators by:',
    options: ['Cracking WPA2 Wi-Fi handshakes', 'Querying hundreds of social media platforms simultaneously to detect if a specific username exists across services', 'Generating synthetic AI voice deepfakes', 'Decrypting BitLocker hard drives'],
    correctAnswerIndex: 1,
    explanation: 'Username enumeration utilities parse URL endpoints across hundreds of social networks, forums, and platforms to map a suspect\'s digital footprint from a single handle.'
  },
  {
    id: 'q3-9',
    day: 3,
    category: 'Google Dorking',
    difficulty: 'medium',
    question: 'Which search operator command searches specifically within the text of the webpage URL rather than page content?',
    options: ['inurl:', 'intitle:', 'filetype:', 'link:'],
    correctAnswerIndex: 0,
    explanation: 'The `inurl:` operator restricts Google search results to web pages where the specified search query occurs directly within the URL string.'
  },
  {
    id: 'q3-10',
    day: 3,
    category: 'Geolocation & GEOINT',
    difficulty: 'hard',
    question: 'In geospatial intelligence (GEOINT), which open resources assist investigators in verifying where an image was taken based on sun angles and shadow lengths?',
    options: ['SunCalc and shadow geometry tools', 'VLC Media Player', 'Adobe Acrobat Reader', 'Notepad++'],
    correctAnswerIndex: 0,
    explanation: 'Tools like SunCalc calculate sun position, elevation, and shadow trajectory for any given date, time, and geographic coordinate, allowing temporal and location verification.'
  },
  {
    id: 'q3-11',
    day: 3,
    category: 'Image Forensics',
    difficulty: 'medium',
    question: 'What technique involves uploading a photo to search engines (Google Images, Yandex, TinEye) to locate duplicate instances or previous appearances across the web?',
    options: ['Reverse Image Search', 'Steganography Injection', 'Optical Image Compression', 'Histogram Equalization'],
    correctAnswerIndex: 0,
    explanation: 'Reverse Image Search computes visual feature hashes of an image to query search indexes for identical or visually similar images posted online.'
  },
  {
    id: 'q3-12',
    day: 3,
    category: 'Domain & Web Intelligence',
    difficulty: 'hard',
    question: 'What is a "Passive DNS" (pDNS) database utilized for in cyber threat investigations?',
    options: ['Temporarily turning off internet routing', 'Reviewing historical DNS resolution records mapping domain names to IP addresses over time', 'Creating encrypted passwords for routers', 'Generating spam emails automatically'],
    correctAnswerIndex: 1,
    explanation: 'Passive DNS aggregates historical sensor data showing which IP addresses a domain resolved to in the past, exposing infrastructure migration patterns of threat actors.'
  },
  {
    id: 'q3-13',
    day: 3,
    category: 'Public Records',
    difficulty: 'medium',
    question: 'In India, which government portal can cyber crime investigators and researchers consult to verify legal incorporation, director DIN numbers, and registered office addresses of suspicious companies?',
    options: ['Ministry of Corporate Affairs (MCA - mca.gov.in)', 'Indian Railways IRCTC', 'Passport Seva Portal', 'Weather Forecasting IMD'],
    correctAnswerIndex: 0,
    explanation: 'The Ministry of Corporate Affairs (MCA21) portal provides public records of company registration, authorized capital, Director Identification Numbers (DIN), and statutory filings.'
  },
  {
    id: 'q3-14',
    day: 3,
    category: 'Social Footprinting',
    difficulty: 'medium',
    question: 'Why do investigators analyze user activity timelines (posting times converted to UTC) in Social Media Intelligence (SOCMINT)?',
    options: ['To determine what kind of computer monitor they use', 'To deduce the suspect\'s probable geographic timezone and daily sleep/wake patterns', 'To calculate the suspect\'s battery charging speed', 'To change their profile picture'],
    correctAnswerIndex: 1,
    explanation: 'Plotting timestamp distribution of posts, tweets, or commits reveals active hours, identifying probable timezones and typical working schedules.'
  },
  {
    id: 'q3-15',
    day: 3,
    category: 'Code & Dev OSINT',
    difficulty: 'medium',
    question: 'Which platform is often audited during OSINT investigations into malware authors or threat actors for leaked hardcoded API keys, commit author emails, and development repositories?',
    options: ['GitHub / GitLab', 'Netflix', 'Spotify', 'Amazon Kindle'],
    correctAnswerIndex: 0,
    explanation: 'Code repositories frequently expose accidental leaks such as private email addresses in Git commit logs, staging domains, and hardcoded authentication secrets.'
  },
  {
    id: 'q3-16',
    day: 3,
    category: 'Network Reconnaissance',
    difficulty: 'hard',
    question: 'What search engine indexes publicly reachable IoT devices, industrial control systems, webcams, and open server ports across the global IPv4 space?',
    options: ['Shodan (shodan.io)', 'Yahoo Mail', 'Pinterest', 'Etsy'],
    correctAnswerIndex: 0,
    explanation: 'Shodan continually scans internet-connected devices, indexing open ports, banners, services, webcams, routers, and ICS infrastructure.'
  },
  {
    id: 'q3-17',
    day: 3,
    category: 'Ethical & Legal OSINT',
    difficulty: 'medium',
    question: 'What is "Doxxing" and why is it legally prohibited?',
    options: ['Documenting computer code in GitHub readmes', 'Maliciously publishing a private individual\'s personal identifying information (home address, phone number, family records) online to incite harassment', 'Formatting a hard drive before selling it', 'Creating backup copies of text files'],
    correctAnswerIndex: 1,
    explanation: 'Doxxing refers to publishing private or identifying information about an individual without consent, frequently with malicious intent or harassment.'
  },
  {
    id: 'q3-18',
    day: 3,
    category: 'Domain & Web Intelligence',
    difficulty: 'medium',
    question: 'What is a "Certificate Transparency" (CT) log and how does it assist OSINT analysts?',
    options: ['A public audit log of all issued SSL/TLS certificates, allowing analysts to discover new subdomains created by an organization or phishing syndicate', 'A paper certificate awarded at graduation', 'An antivirus license key verification record', 'A receipt for web domain payment'],
    correctAnswerIndex: 0,
    explanation: 'Certificate Transparency logs publicly record every TLS certificate issued by Certificate Authorities, enabling discovery of new subdomains (e.g. crt.sh).'
  },
  {
    id: 'q3-19',
    day: 3,
    category: 'Geolocation & GEOINT',
    difficulty: 'medium',
    question: 'When analyzing a photo of an outdoor crime scene with no GPS metadata, which environmental clues aid in determining location?',
    options: ['Street architecture, electrical plug sockets, vehicle license plate designs, language on billboards, and vegetation flora', 'The color of the sky alone', 'The file size in kilobytes', 'The battery percentage displayed on the phone taking the photo'],
    correctAnswerIndex: 0,
    explanation: 'GEOINT relies on contextual visual markers: road markings, utility pole configurations, architectural styles, vegetation species, and signage.'
  },
  {
    id: 'q3-20',
    day: 3,
    category: 'Historical Forensics',
    difficulty: 'medium',
    question: 'What is the purpose of the `cache:` Google Search operator?',
    options: ['To view Google\'s most recent indexed snapshot of a webpage even if the live website is temporarily offline', 'To delete all temporary files from your laptop', 'To encrypt web browsing traffic', 'To speed up YouTube video buffering'],
    correctAnswerIndex: 0,
    explanation: 'The `cache:` operator retrieves the stored snapshot of a webpage as it existed when Google\'s spider last crawled it.'
  },
  {
    id: 'q3-21',
    day: 3,
    category: 'Social Footprinting',
    difficulty: 'easy',
    question: 'Why should investigators never use their personal social media accounts to view a target\'s profile on LinkedIn or Instagram?',
    options: ['Personal accounts may alert the target via profile view notifications or recommendation algorithms, compromising the investigation', 'The computer monitor will lock up', 'LinkedIn automatically fines the viewer', 'Instagram will delete both accounts'],
    correctAnswerIndex: 0,
    explanation: 'Platforms like LinkedIn notify users who viewed their profile, alerting the target that they are being investigated and prompting them to destroy evidence.'
  },
  {
    id: 'q3-22',
    day: 3,
    category: 'OSINT Fundamentals',
    difficulty: 'medium',
    question: 'In the intelligence cycle, what is the correct chronological sequence of OSINT operations?',
    options: ['Planning & Direction -> Collection -> Processing -> Analysis -> Dissemination', 'Publishing -> Guessing -> Scanning -> Deleting', 'Hacking -> Interrogation -> Encryption -> Trial', 'Archiving -> Formatting -> Uploading -> Erasing'],
    correctAnswerIndex: 0,
    explanation: 'The standard intelligence cycle progresses from requirements definition (Planning) through data harvesting (Collection), indexing (Processing), evaluation (Analysis), to reporting (Dissemination).'
  },
  {
    id: 'q3-23',
    day: 3,
    category: 'Google Dorking',
    difficulty: 'hard',
    question: 'Which Google Dork operator restricts searches to webpages that link to a specific URL?',
    options: ['link:', 'related:', 'allintext:', 'define:'],
    correctAnswerIndex: 0,
    explanation: 'The `link:` operator searches for web pages that contain hyperlinks pointing to the specified domain or URL.'
  },
  {
    id: 'q3-24',
    day: 3,
    category: 'Domain & Web Intelligence',
    difficulty: 'hard',
    question: 'What is an Autonomous System Number (ASN) in internet routing and threat attribution?',
    options: ['A unique identifier assigned to a group of IP routing prefixes under common administrative control (such as an ISP or hosting provider)', 'The serial number of an astronaut helmet', 'A government license plate number for police cars', 'A password format for SSH connections'],
    correctAnswerIndex: 0,
    explanation: 'An ASN identifies individual networks (BGP routing routing blocks) on the global internet, helping investigators pinpoint the bulletproof hosting provider sheltering cyber criminal infrastructure.'
  },
  {
    id: 'q3-25',
    day: 3,
    category: 'Image Forensics',
    difficulty: 'easy',
    question: 'Which command-line forensic tool is widely used to extract and display EXIF metadata from digital media files?',
    options: ['ExifTool', 'Ping', 'Traceroute', 'Format C:'],
    correctAnswerIndex: 0,
    explanation: 'ExifTool (developed by Phil Harvey) is the industry standard utility for reading, writing, and parsing metadata across image, audio, and video formats.'
  },

  // ==========================================
  // DAY 4: ADVANCED CYBER CRIME & DIGITAL FORENSICS (25 Questions)
  // ==========================================
  {
    id: 'q4-1',
    day: 4,
    category: 'Evidence Preservation',
    difficulty: 'medium',
    question: 'What is the primary objective of establishing a formal "Chain of Custody" for digital evidence seized during a cyber crime raid?',
    options: ['To verify who gets custody of the suspect’s vehicle', 'To provide a chronological, tamper-proof record of every individual who collected, accessed, transported, and examined the evidence to prove admissibility in court', 'To calculate the monetary auction value of the seized hardware', 'To ensure that evidence is returned to the suspect within 48 hours'],
    correctAnswerIndex: 1,
    explanation: 'Chain of Custody documents evidence handling from crime scene to courtroom, guaranteeing the evidence was not altered, contaminated, or substituted, ensuring judicial admissibility.'
  },
  {
    id: 'q4-2',
    day: 4,
    category: 'Cryptographic Integrity',
    difficulty: 'medium',
    question: 'Why do forensic examiners compute cryptographic hash values (such as SHA-256) of a storage drive before and after creating a forensic bit-stream image?',
    options: ['To encrypt the suspect’s drive with a secret password', 'To prove mathematically that the forensic duplicate is an exact 1:1 bit-by-bit identical clone and that original data was unmodified', 'To speed up file transfer across USB 3.0 cables', 'To erase viruses automatically from the hard drive'],
    correctAnswerIndex: 1,
    explanation: 'Cryptographic hashing provides mathematical verification of integrity. If the hash of the forensic image matches the hash of the physical source, it proves zero alteration occurred.'
  },
  {
    id: 'q4-3',
    day: 4,
    category: 'Email Header Analysis',
    difficulty: 'hard',
    question: 'In an email spoofing investigation, which header line added by Mail Transfer Agents (MTAs) is the most trustworthy for tracing the genuine originating IP address of the sender?',
    options: ['From: header', 'Reply-To: header', 'The bottom-most (earliest) "Received:" header added by the first receiving mail gateway', 'Subject: header'],
    correctAnswerIndex: 2,
    explanation: 'The "From:" and "Reply-To:" headers are easily fabricated by the sender client. Each receiving MTA prepends a "Received:" header, with the bottom-most entry reflecting the actual sending IP handshake.'
  },
  {
    id: 'q4-4',
    day: 4,
    category: 'Email Authentication',
    difficulty: 'hard',
    question: 'What three core DNS-based email authentication protocols are evaluated when investigating whether a corporate CEO email was spoofed?',
    options: ['HTTP, FTP, and SSH', 'SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC', 'DHCP, ARP, and ICMP', 'AES, DES, and RSA'],
    correctAnswerIndex: 1,
    explanation: 'SPF specifies authorized sender IP addresses, DKIM verifies cryptographic signature integrity of messages, and DMARC establishes policy enforcement and alignment validation.'
  },
  {
    id: 'q4-5',
    day: 4,
    category: 'Live Memory Forensics',
    difficulty: 'hard',
    question: 'In live computer forensics, why is Order of Volatility critical, and why should RAM be captured BEFORE powering down the machine?',
    options: ['RAM loses all contents instantly upon power loss (volatile), yet contains unencrypted keys, active connections, and running malware in memory', 'Powering down damages the monitor screen', 'Hard disks lose all data if unplugged', 'RAM consumes too much power while powered off'],
    correctAnswerIndex: 0,
    explanation: 'According to RFC 3227, RAM is highly volatile. Live RAM contains decrypted BitLocker keys, chat sessions, injected malware payloads, and active network sockets that vanish on reboot.'
  },
  {
    id: 'q4-6',
    day: 4,
    category: 'Evidence Admissibility',
    difficulty: 'medium',
    question: 'Under Indian cyber law and the Indian Evidence Act (Section 65B, now BSA Sec 63), what must accompany an electronic record or printout to make it admissible as evidence in court?',
    options: ['A notarized translation in French', 'A Certificate under Section 65B signed by a person occupying an official position responsible for the management of the relevant device, certifying device integrity and continuous operation', 'A screenshot from a social media post', 'The original receipt showing how much the computer cost when bought'],
    correctAnswerIndex: 1,
    explanation: 'Section 65B certificate is a mandatory statutory prerequisite for admissibility of secondary electronic records, verifying the device was operating properly and evidence remained unaltered.'
  },
  {
    id: 'q4-7',
    day: 4,
    category: 'Financial Money Trail',
    difficulty: 'hard',
    question: 'In large-scale cyber financial fraud syndicates, what is the role of a "Mule Account"?',
    options: ['An encrypted Bitcoin cold storage wallet kept offline', 'A bank account opened using compromised or purchased KYC documents, used to receive, layer, and rapidly cash-out illicit funds to obfuscate the real criminal mastermind', 'A special account managed directly by the Reserve Bank of India', 'A corporate credit line given to IT companies'],
    correctAnswerIndex: 1,
    explanation: 'Mule accounts (often rented from vulnerable individuals or opened via forged KYC) act as intermediate layering conduits where stolen funds are routed and withdrawn at ATMs within minutes.'
  },
  {
    id: 'q4-8',
    day: 4,
    category: 'Web Server Log Analysis',
    difficulty: 'hard',
    question: 'While examining an Apache access log during an incident investigation, you identify the entry: `GET /search.php?id=1%27%20UNION%20SELECT%20null,username,password%20FROM%20users-- HTTP/1.1 200`. What attack was launched?',
    options: ['Distributed Denial of Service (DDoS)', 'Union-based SQL Injection (SQLi) exfiltrating user credentials', 'Cross-Site Request Forgery (CSRF)', 'Man-in-the-Middle Wi-Fi deauthentication'],
    correctAnswerIndex: 1,
    explanation: 'The payload contains URL-encoded SQL syntax (`UNION SELECT null, username, password FROM users--`) attempting to append an unauthorized query to extract credentials from database tables.'
  },
  {
    id: 'q4-9',
    day: 4,
    category: 'Hardware Acquisition',
    difficulty: 'medium',
    question: 'What dedicated hardware device must be attached between a suspect hard drive and the examiner\'s forensic workstation during disk imaging?',
    options: ['Hardware Write-Blocker', 'HDMI Splitter', 'Wireless Network Card', 'Sound Synthesizer'],
    correctAnswerIndex: 0,
    explanation: 'A hardware write-blocker intercepts all write commands sent from the host operating system, guaranteeing that not a single byte on the evidence drive is modified during acquisition.'
  },
  {
    id: 'q4-10',
    day: 4,
    category: 'Network Forensics',
    difficulty: 'medium',
    question: 'Which open-source packet analyzer tool is universally used to capture, inspect, and dissect live PCAP network traffic during intrusion investigations?',
    options: ['Wireshark', 'Microsoft Word', 'Notepad', 'Adobe Premiere'],
    correctAnswerIndex: 0,
    explanation: 'Wireshark captures raw network packets across network interfaces, decoding protocols (DNS, TCP, HTTP, TLS) to reconstruct attack sessions.'
  },
  {
    id: 'q4-11',
    day: 4,
    category: 'Anti-Forensics',
    difficulty: 'hard',
    question: 'What is "Data Steganography" in the context of cyber espionage and malware communications?',
    options: ['Physically shredding hard drive platters', 'Hiding secret files or exfiltrated data inside innocent-looking carrier media (such as JPEG images or MP3 audio files)', 'Encrypting files with 256-bit AES keys', 'Overclocking CPU frequency'],
    correctAnswerIndex: 1,
    explanation: 'Steganography conceals the very existence of a communication by embedding secret payloads within the redundant bits of innocent carrier files.'
  },
  {
    id: 'q4-12',
    day: 4,
    category: 'Volatile Memory Analysis',
    difficulty: 'hard',
    question: 'Which popular memory forensics framework is used to extract password hashes, network sockets, and DLL injection trees from a raw RAM dump file?',
    options: ['Volatility Framework', 'WinRAR', 'GIMP', 'FileZilla'],
    correctAnswerIndex: 0,
    explanation: 'Volatility is an open-source memory analysis framework for incident responders that parses kernel data structures, process lists, and memory injections.'
  },
  {
    id: 'q4-13',
    day: 4,
    category: 'Disk Imaging Formats',
    difficulty: 'medium',
    question: 'Which raw, bit-by-bit disk imaging format is produced by the standard Unix/Linux `dd` utility?',
    options: ['.dd / .raw (bitstream raw image)', '.mp4', '.docx', '.exe'],
    correctAnswerIndex: 0,
    explanation: 'The `dd` command produces raw bit-stream copies (exact sector-by-sector clones) without proprietary compression or vendor metadata.'
  },
  {
    id: 'q4-14',
    day: 4,
    category: 'Log Forensics',
    difficulty: 'hard',
    question: 'In Linux incident response, which system log file records all user authentication attempts, SSH logins, and sudo privilege escalations?',
    options: ['/var/log/auth.log (or /var/log/secure in RHEL)', '/var/log/cups', '/dev/null', '/etc/hosts'],
    correctAnswerIndex: 0,
    explanation: 'The authentication log (`/var/log/auth.log` in Debian/Ubuntu or `/var/log/secure` in RedHat/CentOS) tracks successful and failed logins, PAM sessions, and sudo executions.'
  },
  {
    id: 'q4-15',
    day: 4,
    category: 'Evidence Preservation',
    difficulty: 'easy',
    question: 'Why should digital evidence seized at a crime scene (smartphones, laptops) be placed inside a "Faraday Bag"?',
    options: ['To keep the device warm', 'To block all external electromagnetic radiation, radio frequency, cellular signals, and Wi-Fi to prevent remote wiping', 'To charge the battery wirelessly', 'To improve GPS signal accuracy'],
    correctAnswerIndex: 1,
    explanation: 'Faraday bags block radio frequency transmissions, preventing criminals from sending remote wipe commands via Find My Device or cellular networks.'
  },
  {
    id: 'q4-16',
    day: 4,
    category: 'Malware Analysis',
    difficulty: 'hard',
    question: 'What is the key difference between Static Malware Analysis and Dynamic Malware Analysis?',
    options: ['Static analysis requires running the virus on your main computer; dynamic does not', 'Static analysis inspects code/binary structure without executing it; dynamic analysis executes the malware in an isolated sandbox to observe runtime behavior', 'Static analysis uses paper; dynamic uses batteries', 'There is no difference'],
    correctAnswerIndex: 1,
    explanation: 'Static analysis analyzes disassembly, strings, and PE headers without execution; dynamic analysis detonates the malware inside an instrumented sandbox to monitor spawned processes and network traffic.'
  },
  {
    id: 'q4-17',
    day: 4,
    category: 'Financial Cyber Fraud',
    difficulty: 'hard',
    question: 'In Anti-Money Laundering (AML) terminology, what are the three universally recognized stages of money laundering?',
    options: ['Placement, Layering, and Integration', 'Clicking, Scrolling, and Downloading', 'Hacking, Stealing, and Escaping', 'Depositing, Spending, and Forgetting'],
    correctAnswerIndex: 0,
    explanation: 'Placement introduces illicit proceeds into the financial system; Layering obscures the source through complex cross-bank transactions; Integration re-injects clean funds into the legitimate economy.'
  },
  {
    id: 'q4-18',
    day: 4,
    category: 'File Carving',
    difficulty: 'hard',
    question: 'What is "File Carving" in unallocated disk space forensics?',
    options: ['Carving computer cases with physical tools', 'Recovering deleted files based solely on known file header and footer signatures (magic numbers) without relying on the file system table', 'Formatting hard disks', 'Renaming text files'],
    correctAnswerIndex: 1,
    explanation: 'File carving scans raw sectors for distinctive byte signatures (e.g. `\xFF\xD8\xFF` for JPEG or `%PDF-` for PDFs) to reassemble files when filesystem pointers are destroyed.'
  },
  {
    id: 'q4-19',
    day: 4,
    category: 'Windows Forensics',
    difficulty: 'hard',
    question: 'Which Windows forensic artifact records timestamps, execution counts, and folder paths of previously executed applications to optimize performance?',
    options: ['Prefetch (.pf) files', 'Calculator history', 'Recycle Bin desktop shortcut', 'Display settings'],
    correctAnswerIndex: 0,
    explanation: 'Windows Prefetch files (stored in `C:\\Windows\\Prefetch`) log the last eight execution times, run count, and volume serial numbers of executable files.'
  },
  {
    id: 'q4-20',
    day: 4,
    category: 'Email Forensics',
    difficulty: 'medium',
    question: 'In DKIM (DomainKeys Identified Mail) email verification, how does the receiving mail server verify that the message content was not tampered with during transit?',
    options: ['By querying the sender\'s public key published in their domain DNS TXT record and validating the cryptographic digital signature in the email header', 'By calling the sender on the phone', 'By inspecting the email background color', 'By checking the recipient\'s bank balance'],
    correctAnswerIndex: 0,
    explanation: 'DKIM attaches a cryptographic signature (`DKIM-Signature:` header) generated using the sender\'s private key. The receiver uses the public key from the sender\'s DNS TXT record to verify integrity.'
  },
  {
    id: 'q4-21',
    day: 4,
    category: 'Cryptographic Integrity',
    difficulty: 'easy',
    question: 'If two different digital files produce the exact same cryptographic hash value, what has occurred?',
    options: ['A Hash Collision', 'A Network Loop', 'A Buffer Cleared', 'A Parity Pass'],
    correctAnswerIndex: 0,
    explanation: 'A hash collision occurs when two distinct inputs yield identical digest outputs. Modern forensic standards prefer SHA-256 over older algorithms like MD5 because MD5 is susceptible to collisions.'
  },
  {
    id: 'q4-22',
    day: 4,
    category: 'Network Forensics',
    difficulty: 'medium',
    question: 'During network traffic capture, what do SYN-ACK-ACK packets signify?',
    options: ['The standard TCP 3-Way Handshake used to establish a reliable connection between client and server', 'A router error code', 'An unencrypted password leak', 'A hard drive shutdown signal'],
    correctAnswerIndex: 0,
    explanation: 'The TCP three-way handshake (SYN, SYN-ACK, ACK) establishes a stateful connection between client and host prior to application data transfer.'
  },
  {
    id: 'q4-23',
    day: 4,
    category: 'Cyber Legal Standards',
    difficulty: 'medium',
    question: 'Under Indian Information Technology Act 2000, which section penalizes "Hacking with Computer System" and unauthorized damage/alteration to computer data?',
    options: ['Section 66', 'Section 10', 'Section 1', 'Section 500'],
    correctAnswerIndex: 0,
    explanation: 'Section 66 of the Information Technology Act prescribes punishment (imprisonment up to 3 years and/or fine) for computer-related offenses and unauthorized hacking defined under Section 43.'
  },
  {
    id: 'q4-24',
    day: 4,
    category: 'Log Forensics',
    difficulty: 'hard',
    question: 'What is the purpose of a centralized SIEM (Security Information and Event Management) platform in enterprise incident detection?',
    options: ['To aggregate, correlate, and analyze log events from firewalls, servers, and endpoints in real-time to detect anomalous attacks', 'To replace the office email server', 'To design website marketing banners', 'To backup video games'],
    correctAnswerIndex: 0,
    explanation: 'SIEM platforms (e.g. Splunk, Elastic, QRadar) aggregate and correlate disparate log feeds to identify indicators of compromise (IoCs) and timeline attacker progression.'
  },
  {
    id: 'q4-25',
    day: 4,
    category: 'Evidence Admissibility',
    difficulty: 'medium',
    question: 'What is the "Locard\'s Exchange Principle" foundational to forensic science and cyber investigations?',
    options: ['"Every contact leaves a trace" – an intruder will both bring something to the scene and leave with something from it', '"Computers never lie"', '"Passwords must be 8 characters long"', '"Evidence expires in 24 hours"'],
    correctAnswerIndex: 0,
    explanation: 'Edmond Locard\'s principle posits that anyone entering an environment leaves traces behind and takes traces away. In cyberspace, every network connection leaves logs, timestamps, MAC/IP traces, or registry entries.'
  }
];
