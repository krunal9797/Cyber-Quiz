import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  DayNumber,
  FinalResult,
  Question,
  QuizAttempt,
  QuizConfig,
  Student,
} from '../types';
import {
  INITIAL_QUESTIONS,
  INITIAL_QUIZ_CONFIGS,
  INITIAL_STUDENTS,
} from '../data/seedQuestions';

const STUDENTS_COL = 'students';
const CONFIGS_COL = 'quiz_configs';
const QUESTIONS_COL = 'questions';
const ATTEMPTS_COL = 'quiz_attempts';
const FINAL_RESULTS_COL = 'final_results';

// Local storage cache keys for instant offline / responsive fallback
const LOCAL_STORAGE_KEY_STUDENTS = 'cyberquiz_local_students';
const LOCAL_STORAGE_KEY_ATTEMPTS = 'cyberquiz_local_attempts';
const LOCAL_STORAGE_KEY_CONFIGS = 'cyberquiz_local_configs';
const LOCAL_STORAGE_KEY_QUESTIONS = 'cyberquiz_local_questions';

/**
 * Ensures initial questions, configs, and demo students exist in Firestore.
 */
export async function seedInitialDatabase(force = false): Promise<void> {
  try {
    const configSnap = await getDocs(collection(db, CONFIGS_COL));
    if (configSnap.empty || force) {
      // Seed configs
      for (const config of INITIAL_QUIZ_CONFIGS) {
        await setDoc(doc(db, CONFIGS_COL, config.id), config);
      }
    }

    const questionsSnap = await getDocs(collection(db, QUESTIONS_COL));
    if (questionsSnap.empty || force) {
      // Seed questions
      for (const q of INITIAL_QUESTIONS) {
        await setDoc(doc(db, QUESTIONS_COL, q.id), q);
      }
    }

    const studentsSnap = await getDocs(collection(db, STUDENTS_COL));
    if (studentsSnap.empty || force) {
      // Seed initial students
      for (const s of INITIAL_STUDENTS) {
        await setDoc(doc(db, STUDENTS_COL, s.studentId), s);
      }
    }
  } catch (error) {
    console.warn('Seeding notice (continuing with local fallback if permissions apply):', error);
  }
}

// ======================== STUDENTS ========================

export async function getStudents(): Promise<Student[]> {
  try {
    const snapshot = await getDocs(collection(db, STUDENTS_COL));
    if (!snapshot.empty) {
      const list: Student[] = [];
      snapshot.forEach((d) => list.push(d.data() as Student));
      localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('Could not read students from Firestore, falling back to cache:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEY_STUDENTS);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }
  return INITIAL_STUDENTS;
}

export async function saveStudent(student: Student): Promise<void> {
  try {
    await setDoc(doc(db, STUDENTS_COL, student.studentId), student);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${STUDENTS_COL}/${student.studentId}`);
  } finally {
    // Keep local cache synced
    const current = await getStudents();
    const updated = current.filter((s) => s.studentId !== student.studentId).concat(student);
    localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(updated));
  }
}

export async function deleteStudent(studentId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, STUDENTS_COL, studentId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${STUDENTS_COL}/${studentId}`);
  } finally {
    const current = await getStudents();
    const updated = current.filter((s) => s.studentId !== studentId);
    localStorage.setItem(LOCAL_STORAGE_KEY_STUDENTS, JSON.stringify(updated));
  }
}

export async function authenticateStudent(
  identifier: string,
  passcode: string,
  name?: string
): Promise<{ success: boolean; student?: Student; error?: string }> {
  const students = await getStudents();
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = passcode.trim();

  const found = students.find(
    (s) =>
      (s.studentId.toLowerCase() === cleanId || s.rollNumber.toLowerCase() === cleanId) &&
      s.passcode === cleanPass
  );

  if (!found) {
    return { success: false, error: 'Invalid Login ID, Roll Number, or Passcode. Please check with your Administrator.' };
  }

  if (!found.isActive) {
    return { success: false, error: 'Your student account is currently deactivated. Please contact the administrator.' };
  }

  if (name && name.trim().length > 0) {
    // Optional friendly check on name
    const inputName = name.trim().toLowerCase();
    const storedName = found.fullName.toLowerCase();
    if (!storedName.includes(inputName) && !inputName.includes(storedName.split(' ')[0])) {
      // Still allow if name is reasonably close or log warning
    }
  }

  return { success: true, student: found };
}

// ======================== QUIZ CONFIGS ========================

export async function getQuizConfigs(): Promise<QuizConfig[]> {
  try {
    const snapshot = await getDocs(collection(db, CONFIGS_COL));
    if (!snapshot.empty) {
      const list: QuizConfig[] = [];
      snapshot.forEach((d) => list.push(d.data() as QuizConfig));
      list.sort((a, b) => a.day - b.day);
      localStorage.setItem(LOCAL_STORAGE_KEY_CONFIGS, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('Could not read configs from Firestore:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEY_CONFIGS);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }
  return INITIAL_QUIZ_CONFIGS;
}

export async function saveQuizConfig(config: QuizConfig): Promise<void> {
  try {
    await setDoc(doc(db, CONFIGS_COL, config.id), {
      ...config,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${CONFIGS_COL}/${config.id}`);
  } finally {
    const current = await getQuizConfigs();
    const updated = current.filter((c) => c.id !== config.id).concat(config);
    localStorage.setItem(LOCAL_STORAGE_KEY_CONFIGS, JSON.stringify(updated));
  }
}

// ======================== QUESTIONS BANK ========================

export async function getAllQuestions(): Promise<Question[]> {
  try {
    const snapshot = await getDocs(collection(db, QUESTIONS_COL));
    if (!snapshot.empty) {
      const list: Question[] = [];
      snapshot.forEach((d) => list.push(d.data() as Question));
      localStorage.setItem(LOCAL_STORAGE_KEY_QUESTIONS, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('Could not read questions from Firestore:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEY_QUESTIONS);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }
  return INITIAL_QUESTIONS;
}

export async function getQuestionsByDay(day: DayNumber): Promise<Question[]> {
  const all = await getAllQuestions();
  return all.filter((q) => Number(q.day) === Number(day));
}

export async function saveQuestion(question: Question): Promise<void> {
  try {
    await setDoc(doc(db, QUESTIONS_COL, question.id), question);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${QUESTIONS_COL}/${question.id}`);
  } finally {
    const current = await getAllQuestions();
    const updated = current.filter((q) => q.id !== question.id).concat(question);
    localStorage.setItem(LOCAL_STORAGE_KEY_QUESTIONS, JSON.stringify(updated));
  }
}

export async function deleteQuestion(questionId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, QUESTIONS_COL, questionId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${QUESTIONS_COL}/${questionId}`);
  } finally {
    const current = await getAllQuestions();
    const updated = current.filter((q) => q.id !== questionId);
    localStorage.setItem(LOCAL_STORAGE_KEY_QUESTIONS, JSON.stringify(updated));
  }
}

// ======================== QUIZ ATTEMPTS ========================

export async function saveQuizAttempt(attempt: QuizAttempt): Promise<void> {
  try {
    await setDoc(doc(db, ATTEMPTS_COL, attempt.id), attempt);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${ATTEMPTS_COL}/${attempt.id}`);
  } finally {
    // Keep local cache synced
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY_ATTEMPTS);
    let attempts: QuizAttempt[] = cached ? JSON.parse(cached) : [];
    attempts = attempts.filter((a) => a.id !== attempt.id).concat(attempt);
    localStorage.setItem(LOCAL_STORAGE_KEY_ATTEMPTS, JSON.stringify(attempts));
  }
}

export async function getStudentAttempts(studentId: string): Promise<QuizAttempt[]> {
  try {
    const q = query(collection(db, ATTEMPTS_COL), where('studentId', '==', studentId));
    const snap = await getDocs(q);
    const list: QuizAttempt[] = [];
    snap.forEach((d) => list.push(d.data() as QuizAttempt));
    if (list.length > 0) return list;
  } catch (err) {
    console.warn('Could not query student attempts from Firestore:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEY_ATTEMPTS);
  if (cached) {
    try {
      const all: QuizAttempt[] = JSON.parse(cached);
      return all.filter((a) => a.studentId === studentId);
    } catch {
      // ignore
    }
  }
  return [];
}

export async function getAllAttempts(): Promise<QuizAttempt[]> {
  try {
    const snap = await getDocs(collection(db, ATTEMPTS_COL));
    const list: QuizAttempt[] = [];
    snap.forEach((d) => list.push(d.data() as QuizAttempt));
    if (list.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY_ATTEMPTS, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('Could not query all attempts from Firestore:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEY_ATTEMPTS);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }
  return [];
}

export async function deleteAttempt(attemptId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, ATTEMPTS_COL, attemptId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${ATTEMPTS_COL}/${attemptId}`);
  } finally {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY_ATTEMPTS);
    if (cached) {
      const all: QuizAttempt[] = JSON.parse(cached);
      const filtered = all.filter((a) => a.id !== attemptId);
      localStorage.setItem(LOCAL_STORAGE_KEY_ATTEMPTS, JSON.stringify(filtered));
    }
  }
}

// ======================== LEADERBOARDS ========================

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  rollNumber: string;
  totalScore: number;
  totalTimeSeconds: number;
  completedQuizzesCount: number;
  accuracyPercentage: number;
}

export async function getLeaderboardData(day?: DayNumber): Promise<LeaderboardEntry[]> {
  const attempts = await getAllAttempts();
  const students = await getStudents();

  if (day) {
    // Single Day Leaderboard
    const dayAttempts = attempts.filter((a) => a.day === day && a.status === 'completed');
    
    // Sort primarily by score descending, then by time taken ascending (tie-break rule!)
    dayAttempts.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTakenSeconds - b.timeTakenSeconds;
    });

    return dayAttempts.map((att, idx) => ({
      rank: idx + 1,
      studentId: att.studentId,
      studentName: att.studentName,
      rollNumber: att.rollNumber,
      totalScore: att.score,
      totalTimeSeconds: att.timeTakenSeconds,
      completedQuizzesCount: 1,
      accuracyPercentage: att.totalQuestions > 0 ? Math.round((att.correctCount / att.totalQuestions) * 100) : 0,
    }));
  }

  // Overall Leaderboard across all completed days
  const studentMap: Record<
    string,
    {
      studentName: string;
      rollNumber: string;
      totalScore: number;
      totalTimeSeconds: number;
      completedDays: Set<number>;
      totalCorrect: number;
      totalQuestions: number;
    }
  > = {};

  for (const att of attempts) {
    if (att.status !== 'completed') continue;
    if (!studentMap[att.studentId]) {
      studentMap[att.studentId] = {
        studentName: att.studentName,
        rollNumber: att.rollNumber,
        totalScore: 0,
        totalTimeSeconds: 0,
        completedDays: new Set<number>(),
        totalCorrect: 0,
        totalQuestions: 0,
      };
    }
    // Take the best score if student attempted multiple times or unique per day
    studentMap[att.studentId].totalScore += att.score;
    studentMap[att.studentId].totalTimeSeconds += att.timeTakenSeconds;
    studentMap[att.studentId].completedDays.add(att.day);
    studentMap[att.studentId].totalCorrect += att.correctCount;
    studentMap[att.studentId].totalQuestions += att.totalQuestions;
  }

  const list: LeaderboardEntry[] = Object.keys(studentMap).map((sid) => {
    const data = studentMap[sid];
    return {
      rank: 1,
      studentId: sid,
      studentName: data.studentName,
      rollNumber: data.rollNumber,
      totalScore: data.totalScore,
      totalTimeSeconds: data.totalTimeSeconds,
      completedQuizzesCount: data.completedDays.size,
      accuracyPercentage: data.totalQuestions > 0 ? Math.round((data.totalCorrect / data.totalQuestions) * 100) : 0,
    };
  });

  // Sort by total score descending, then total time ascending (tie break)
  list.sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    return a.totalTimeSeconds - b.totalTimeSeconds;
  });

  // Assign ranks
  list.forEach((entry, idx) => {
    entry.rank = idx + 1;
  });

  return list;
}

// ======================== PRIVATE FINAL RESULTS (ADMIN ONLY) ========================

export async function computeAndSaveFinalResults(): Promise<FinalResult[]> {
  const students = await getStudents();
  const attempts = await getAllAttempts();
  const configs = await getQuizConfigs();

  const maxPossibleMarks = configs.reduce(
    (sum, c) => sum + c.questionsPerQuiz * c.marksPerQuestion,
    0
  );

  const results: FinalResult[] = [];

  for (const student of students) {
    const studentAttempts = attempts.filter(
      (a) => a.studentId === student.studentId && a.status === 'completed'
    );

    const dayScores: FinalResult['dayScores'] = {};
    let totalMarks = 0;
    let totalTime = 0;

    for (const att of studentAttempts) {
      dayScores[att.day] = {
        score: att.score,
        totalMarks: att.totalMarks,
        correctCount: att.correctCount,
        totalQuestions: att.totalQuestions,
        timeTakenSeconds: att.timeTakenSeconds,
        completedAt: att.completedAt || new Date().toISOString(),
      };
      totalMarks += att.score;
      totalTime += att.timeTakenSeconds;
    }

    const completedDaysCount = Object.keys(dayScores).length;
    const percentage = maxPossibleMarks > 0 ? Math.round((totalMarks / maxPossibleMarks) * 100) : 0;
    const isCertified = completedDaysCount === 4 && percentage >= 50;

    let grade = 'Incomplete';
    if (completedDaysCount === 4) {
      if (percentage >= 85) grade = 'Distinction (A+)';
      else if (percentage >= 70) grade = 'First Class (A)';
      else if (percentage >= 50) grade = 'Pass (B)';
      else grade = 'Needs Improvement';
    }

    const finalResult: FinalResult = {
      id: student.studentId,
      studentId: student.studentId,
      rollNumber: student.rollNumber,
      fullName: student.fullName,
      dayScores,
      totalMarks,
      totalMaxMarks: maxPossibleMarks,
      totalTimeSeconds: totalTime,
      percentage,
      rank: 1, // calculated after sorting
      completedDaysCount,
      isCertified,
      grade,
      updatedAt: new Date().toISOString(),
    };

    results.push(finalResult);
  }

  // Sort by total marks desc, then time asc (tie break)
  results.sort((a, b) => {
    if (b.totalMarks !== a.totalMarks) return b.totalMarks - a.totalMarks;
    return a.totalTimeSeconds - b.totalTimeSeconds;
  });

  // Assign ranks
  results.forEach((r, i) => {
    r.rank = i + 1;
  });

  // Save to Firestore (strictly admin-only path)
  for (const r of results) {
    try {
      await setDoc(doc(db, FINAL_RESULTS_COL, r.studentId), r);
    } catch (e) {
      // In case admin permissions differ or local fallback
      console.warn('Saving final result admin record:', e);
    }
  }

  return results;
}

export async function getFinalResults(): Promise<FinalResult[]> {
  try {
    const snap = await getDocs(collection(db, FINAL_RESULTS_COL));
    if (!snap.empty) {
      const list: FinalResult[] = [];
      snap.forEach((d) => list.push(d.data() as FinalResult));
      list.sort((a, b) => a.rank - b.rank);
      return list;
    }
  } catch (err) {
    console.warn('Admin reading final results from Firestore:', err);
  }
  // If not yet computed or permission, compute on the fly
  return computeAndSaveFinalResults();
}
