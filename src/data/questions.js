export const questions = [
  { id: 1,  equation: 'x + 3 = 9',   answer: 6,  hint: 'Subtract 3 from both sides', explanation: 'x = 9 − 3 = 6' },
  { id: 2,  equation: 'x + 7 = 15',  answer: 8,  hint: 'Subtract 7 from both sides', explanation: 'x = 15 − 7 = 8' },
  { id: 3,  equation: 'x − 4 = 10',  answer: 14, hint: 'Add 4 to both sides',        explanation: 'x = 10 + 4 = 14' },
  { id: 4,  equation: 'x − 6 = 3',   answer: 9,  hint: 'Add 6 to both sides',        explanation: 'x = 3 + 6 = 9' },
  { id: 5,  equation: 'x + 12 = 20', answer: 8,  hint: 'Subtract 12 from both sides',explanation: 'x = 20 − 12 = 8' },
  { id: 6,  equation: 'x − 8 = 5',   answer: 13, hint: 'Add 8 to both sides',        explanation: 'x = 5 + 8 = 13' },
  { id: 7,  equation: 'x + 5 = 17',  answer: 12, hint: 'Subtract 5 from both sides', explanation: 'x = 17 − 5 = 12' },
  { id: 8,  equation: 'x − 9 = 11',  answer: 20, hint: 'Add 9 to both sides',        explanation: 'x = 11 + 9 = 20' },
  { id: 9,  equation: 'x + 14 = 25', answer: 11, hint: 'Subtract 14 from both sides',explanation: 'x = 25 − 14 = 11' },
  { id: 10, equation: 'x − 3 = 18',  answer: 21, hint: 'Add 3 to both sides',        explanation: 'x = 18 + 3 = 21' },
  { id: 11, equation: 'x + 9 = 24',  answer: 15, hint: 'Subtract 9 from both sides', explanation: 'x = 24 − 9 = 15' },
  { id: 12, equation: 'x − 11 = 7',  answer: 18, hint: 'Add 11 to both sides',       explanation: 'x = 7 + 11 = 18' },
  { id: 13, equation: 'x + 6 = 22',  answer: 16, hint: 'Subtract 6 from both sides', explanation: 'x = 22 − 6 = 16' },
  { id: 14, equation: 'x − 15 = 5',  answer: 20, hint: 'Add 15 to both sides',       explanation: 'x = 5 + 15 = 20' },
  { id: 15, equation: 'x + 18 = 30', answer: 12, hint: 'Subtract 18 from both sides',explanation: 'x = 30 − 18 = 12' },
  { id: 16, equation: 'x − 7 = 14',  answer: 21, hint: 'Add 7 to both sides',        explanation: 'x = 14 + 7 = 21' },
  { id: 17, equation: 'x + 4 = 19',  answer: 15, hint: 'Subtract 4 from both sides', explanation: 'x = 19 − 4 = 15' },
  { id: 18, equation: 'x − 13 = 9',  answer: 22, hint: 'Add 13 to both sides',       explanation: 'x = 9 + 13 = 22' },
  { id: 19, equation: 'x + 11 = 28', answer: 17, hint: 'Subtract 11 from both sides',explanation: 'x = 28 − 11 = 17' },
  { id: 20, equation: 'x − 2 = 16',  answer: 18, hint: 'Add 2 to both sides',        explanation: 'x = 16 + 2 = 18' },
]

export const wrongQuotes = [
  "Not quite — but you're getting there! 💪",
  "Every mistake is a step closer to mastering it! 🌟",
  "Keep pushing — you'll get the next one! 🚀",
  "That one was tricky! You've got this! 🎯",
  "Don't give up — practice makes perfect! ⭐",
  "Great effort! Keep going! 🔥",
  "You're learning! That's what matters! 🧠",
  "Almost! You'll nail it next time! 🎉",
  "Stay focused — you can do this! 💡",
  "Believe in yourself! Next one's yours! 🏆",
]

export const correctQuotes = [
  "Correct! You're on fire! 🔥",
  "Nailed it! +100 coins! 🪙",
  "Amazing work! Keep it up! 🎯",
  "Math genius detected! 🧠",
  "Perfect! Keep crushing it! 💪",
  "Outstanding! 🌟",
]

export function shuffleQuestions(count = 10) {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
