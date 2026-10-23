# Security Specification: Cyber Crime Quiz Application

## 1. Data Invariants
1. **Admin Exclusivity**: Only authenticated administrators whose UID exists in `/admins/{uid}` or matches the bootstrapped email `gamitkrunal7997@gmail.com` can create/update students, question bank, quiz configurations, and view the `/final_results` collection.
2. **Student Isolation**: Students can only read and write their own quiz attempts matching their authenticated `studentId` or `uid`.
3. **Final Result Privacy (Admin Only)**: Students are strictly forbidden from reading or querying `/final_results`. Only administrators can read or write `/final_results`.
4. **Question Bank Protection**: The `/questions` collection is read-only for authenticated participants and writeable ONLY by administrators.
5. **Config Tampering Prevention**: The `/quiz_configs` collection is read-only for participants and editable only by administrators.
6. **Attempt Immutability After Submission**: Once an attempt's `status` is marked `'completed'`, non-admin students cannot modify answers or scores.
7. **Document ID Format**: All IDs must satisfy `^[a-zA-Z0-9_\-]+$` and length <= 128 characters.

---

## 2. The "Dirty Dozen" Threat Payloads

1. **Payload 1 (Student Priv Escalation)**: Student attempts to write to `/admins/{uid}` to grant themselves admin privileges. (Expect: PERMISSION_DENIED)
2. **Payload 2 (Final Result Data Scraping)**: Student attempts `get` or `list` on `/final_results/{studentId}`. (Expect: PERMISSION_DENIED)
3. **Payload 3 (Tampering Question Bank)**: Student attempts to update a question in `/questions/{questionId}` to alter correct answers. (Expect: PERMISSION_DENIED)
4. **Payload 4 (Config Tampering)**: Student tries to update `timeLimitPerQuestion` in `/quiz_configs/day1` to 9999 seconds. (Expect: PERMISSION_DENIED)
5. **Payload 5 (Score Forgery on Another Student)**: Student A attempts to create an attempt in `/quiz_attempts` with `studentId: "studentB"`. (Expect: PERMISSION_DENIED)
6. **Payload 6 (Attempt Retrospective Score Manipulation)**: Student tries to update `score` on an existing completed quiz attempt. (Expect: PERMISSION_DENIED)
7. **Payload 7 (Unauthenticated Read of Student Database)**: Unauthenticated user queries `/students`. (Expect: PERMISSION_DENIED)
8. **Payload 8 (Student Impersonation)**: Attacker attempts to modify another student's profile in `/students/{studentId}`. (Expect: PERMISSION_DENIED)
9. **Payload 9 (ID Poisoning Attack)**: Attacker attempts to create a document with a 2048-byte malicious path ID containing SQL/script characters. (Expect: PERMISSION_DENIED)
10. **Payload 10 (Ghost Field / Shadow Key Attack)**: User attempts to create an attempt with undeclared root keys like `isAdmin: true` or `bypassRules: true`. (Expect: PERMISSION_DENIED)
11. **Payload 11 (Negative Score Injection)**: An attacker submits negative values for questions or tries to corrupt leaderboard statistics. (Expect: PERMISSION_DENIED)
12. **Payload 12 (Leaderboard Bypass when Disabled)**: Student attempts direct read on quiz attempts when day config `isLeaderboardVisible == false`. (Expect: PERMISSION_DENIED)

---

## 3. Test Invariants
All payloads above must trigger explicit denial under Firestore Security Rules.
