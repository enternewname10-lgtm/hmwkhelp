export const questions = [
  // ── Addition ──
  { id:  1, equation: 'x + 3 = 9',   answer: 6,  hint: 'Subtract 3 from both sides',  explanation: 'x = 9 − 3 = 6' },
  { id:  2, equation: 'x + 7 = 15',  answer: 8,  hint: 'Subtract 7 from both sides',  explanation: 'x = 15 − 7 = 8' },
  { id:  3, equation: 'x + 12 = 20', answer: 8,  hint: 'Subtract 12 from both sides', explanation: 'x = 20 − 12 = 8' },
  { id:  4, equation: 'x + 5 = 17',  answer: 12, hint: 'Subtract 5 from both sides',  explanation: 'x = 17 − 5 = 12' },
  { id:  5, equation: 'x + 9 = 24',  answer: 15, hint: 'Subtract 9 from both sides',  explanation: 'x = 24 − 9 = 15' },
  { id:  6, equation: 'x + 6 = 22',  answer: 16, hint: 'Subtract 6 from both sides',  explanation: 'x = 22 − 6 = 16' },
  { id:  7, equation: 'x + 18 = 30', answer: 12, hint: 'Subtract 18 from both sides', explanation: 'x = 30 − 18 = 12' },
  { id:  8, equation: 'x + 4 = 19',  answer: 15, hint: 'Subtract 4 from both sides',  explanation: 'x = 19 − 4 = 15' },
  { id:  9, equation: 'x + 11 = 28', answer: 17, hint: 'Subtract 11 from both sides', explanation: 'x = 28 − 11 = 17' },
  { id: 10, equation: 'x + 14 = 25', answer: 11, hint: 'Subtract 14 from both sides', explanation: 'x = 25 − 14 = 11' },

  // ── Subtraction ──
  { id: 11, equation: 'x − 4 = 10',  answer: 14, hint: 'Add 4 to both sides',  explanation: 'x = 10 + 4 = 14' },
  { id: 12, equation: 'x − 6 = 3',   answer: 9,  hint: 'Add 6 to both sides',  explanation: 'x = 3 + 6 = 9' },
  { id: 13, equation: 'x − 8 = 5',   answer: 13, hint: 'Add 8 to both sides',  explanation: 'x = 5 + 8 = 13' },
  { id: 14, equation: 'x − 9 = 11',  answer: 20, hint: 'Add 9 to both sides',  explanation: 'x = 11 + 9 = 20' },
  { id: 15, equation: 'x − 3 = 18',  answer: 21, hint: 'Add 3 to both sides',  explanation: 'x = 18 + 3 = 21' },
  { id: 16, equation: 'x − 11 = 7',  answer: 18, hint: 'Add 11 to both sides', explanation: 'x = 7 + 11 = 18' },
  { id: 17, equation: 'x − 15 = 5',  answer: 20, hint: 'Add 15 to both sides', explanation: 'x = 5 + 15 = 20' },
  { id: 18, equation: 'x − 7 = 14',  answer: 21, hint: 'Add 7 to both sides',  explanation: 'x = 14 + 7 = 21' },
  { id: 19, equation: 'x − 13 = 9',  answer: 22, hint: 'Add 13 to both sides', explanation: 'x = 9 + 13 = 22' },
  { id: 20, equation: 'x − 2 = 16',  answer: 18, hint: 'Add 2 to both sides',  explanation: 'x = 16 + 2 = 18' },

  // ── Algebra (solve for x) ──
  { id: 21, equation: 'x × 2 = 10',  answer: 5,  hint: 'Divide both sides by 2', explanation: 'x = 10 ÷ 2 = 5' },
  { id: 22, equation: 'x × 3 = 12',  answer: 4,  hint: 'Divide both sides by 3', explanation: 'x = 12 ÷ 3 = 4' },
  { id: 23, equation: 'x × 4 = 20',  answer: 5,  hint: 'Divide both sides by 4', explanation: 'x = 20 ÷ 4 = 5' },
  { id: 24, equation: 'x × 5 = 25',  answer: 5,  hint: 'Divide both sides by 5', explanation: 'x = 25 ÷ 5 = 5' },
  { id: 25, equation: 'x × 6 = 18',  answer: 3,  hint: 'Divide both sides by 6', explanation: 'x = 18 ÷ 6 = 3' },
  { id: 26, equation: 'x × 3 = 21',  answer: 7,  hint: 'Divide both sides by 3', explanation: 'x = 21 ÷ 3 = 7' },
  { id: 27, equation: 'x × 4 = 28',  answer: 7,  hint: 'Divide both sides by 4', explanation: 'x = 28 ÷ 4 = 7' },
  { id: 28, equation: 'x × 7 = 35',  answer: 5,  hint: 'Divide both sides by 7', explanation: 'x = 35 ÷ 7 = 5' },
  { id: 29, equation: 'x × 5 = 40',  answer: 8,  hint: 'Divide both sides by 5', explanation: 'x = 40 ÷ 5 = 8' },
  { id: 30, equation: 'x × 8 = 48',  answer: 6,  hint: 'Divide both sides by 8', explanation: 'x = 48 ÷ 8 = 6' },
  { id: 31, equation: 'x × 9 = 63',  answer: 7,  hint: 'Divide both sides by 9', explanation: 'x = 63 ÷ 9 = 7' },
  { id: 32, equation: 'x ÷ 2 = 5',   answer: 10, hint: 'Multiply both sides by 2', explanation: 'x = 5 × 2 = 10' },
  { id: 33, equation: 'x ÷ 3 = 6',   answer: 18, hint: 'Multiply both sides by 3', explanation: 'x = 6 × 3 = 18' },
  { id: 34, equation: 'x ÷ 4 = 5',   answer: 20, hint: 'Multiply both sides by 4', explanation: 'x = 5 × 4 = 20' },
  { id: 35, equation: 'x ÷ 7 = 3',   answer: 21, hint: 'Multiply both sides by 7', explanation: 'x = 3 × 7 = 21' },
  { id: 36, equation: '2x + 3 = 11', answer: 4,  hint: 'Subtract 3, then divide by 2', explanation: '2x = 8, x = 4' },
  { id: 37, equation: '3x − 5 = 10', answer: 5,  hint: 'Add 5, then divide by 3', explanation: '3x = 15, x = 5' },
  { id: 38, equation: '4x + 2 = 18', answer: 4,  hint: 'Subtract 2, then divide by 4', explanation: '4x = 16, x = 4' },
  { id: 39, equation: '5x − 1 = 24', answer: 5,  hint: 'Add 1, then divide by 5', explanation: '5x = 25, x = 5' },
  { id: 40, equation: '2x + 7 = 19', answer: 6,  hint: 'Subtract 7, then divide by 2', explanation: '2x = 12, x = 6' },
  { id: 41, equation: '3x + 4 = 22', answer: 6,  hint: 'Subtract 4, then divide by 3', explanation: '3x = 18, x = 6' },
  { id: 42, equation: '6x − 6 = 30', answer: 6,  hint: 'Add 6, then divide by 6', explanation: '6x = 36, x = 6' },
  { id: 43, equation: '4x + 5 = 29', answer: 6,  hint: 'Subtract 5, then divide by 4', explanation: '4x = 24, x = 6' },
  { id: 44, equation: '7x − 7 = 42', answer: 7,  hint: 'Add 7, then divide by 7', explanation: '7x = 49, x = 7' },
  { id: 45, equation: '9x + 0 = 72', answer: 8,  hint: 'Divide both sides by 9', explanation: '9x = 72, x = 8' },

  // ── Pythagorean Theorem ──
  { id: 46, label: 'Find the missing side', equation: 'a=3, b=4, find c', answer: 5,  hint: 'a²+b²=c²  →  9+16=25  →  √25', explanation: 'c = √(9+16) = √25 = 5' },
  { id: 47, label: 'Find the missing side', equation: 'a=6, b=8, find c', answer: 10, hint: 'a²+b²=c²  →  36+64=100  →  √100', explanation: 'c = √(36+64) = 10' },
  { id: 48, label: 'Find the missing side', equation: 'a=5, b=12, find c', answer: 13, hint: 'a²+b²=c²  →  25+144=169  →  √169', explanation: 'c = √169 = 13' },
  { id: 49, label: 'Find the missing side', equation: 'a=8, b=15, find c', answer: 17, hint: 'a²+b²=c²  →  64+225=289  →  √289', explanation: 'c = √289 = 17' },
  { id: 50, label: 'Find the missing side', equation: 'a=9, b=12, find c', answer: 15, hint: 'a²+b²=c²  →  81+144=225  →  √225', explanation: 'c = √225 = 15' },
  { id: 51, label: 'Find the missing side', equation: 'c=10, a=6, find b', answer: 8,  hint: '6²+b²=10²  →  b²=100-36=64  →  √64', explanation: 'b = √64 = 8' },
  { id: 52, label: 'Find the missing side', equation: 'c=13, a=5, find b', answer: 12, hint: '5²+b²=13²  →  b²=169-25=144  →  √144', explanation: 'b = √144 = 12' },
  { id: 53, label: 'Find the missing side', equation: 'c=25, a=7, find b', answer: 24, hint: '7²+b²=25²  →  b²=625-49=576  →  √576', explanation: 'b = √576 = 24' },
  { id: 54, label: 'Find the missing side', equation: 'a=20, b=21, find c', answer: 29, hint: 'a²+b²=c²  →  400+441=841  →  √841', explanation: 'c = √841 = 29' },
  { id: 55, label: 'Find the missing side', equation: 'c=17, a=8, find b', answer: 15, hint: '8²+b²=17²  →  b²=289-64=225  →  √225', explanation: 'b = √225 = 15' },

  // ── Large Multiplication ──
  { id: 56, label: 'Calculate the product', equation: '45 × 60 = ?', answer: 2700, hint: '45×6=270, then ×10', explanation: '45 × 60 = 2700' },
  { id: 57, label: 'Calculate the product', equation: '25 × 80 = ?', answer: 2000, hint: '25×8=200, then ×10', explanation: '25 × 80 = 2000' },
  { id: 58, label: 'Calculate the product', equation: '36 × 50 = ?', answer: 1800, hint: '36×5=180, then ×10', explanation: '36 × 50 = 1800' },
  { id: 59, label: 'Calculate the product', equation: '75 × 40 = ?', answer: 3000, hint: '75×4=300, then ×10', explanation: '75 × 40 = 3000' },
  { id: 60, label: 'Calculate the product', equation: '125 × 8 = ?', answer: 1000, hint: '100×8=800, 25×8=200, add them', explanation: '125 × 8 = 1000' },
  { id: 61, label: 'Calculate the product', equation: '24 × 25 = ?', answer: 600,  hint: '24×100÷4=600', explanation: '24 × 25 = 600' },
  { id: 62, label: 'Calculate the product', equation: '48 × 50 = ?', answer: 2400, hint: '48×100÷2=2400', explanation: '48 × 50 = 2400' },
  { id: 63, label: 'Calculate the product', equation: '15 × 120 = ?', answer: 1800, hint: '15×12=180, then ×10', explanation: '15 × 120 = 1800' },
  { id: 64, label: 'Calculate the product', equation: '200 × 45 = ?', answer: 9000, hint: '2×45=90, then ×100', explanation: '200 × 45 = 9000' },
  { id: 65, label: 'Calculate the product', equation: '32 × 25 = ?', answer: 800,  hint: '32×100÷4=800', explanation: '32 × 25 = 800' },

  // ── Unit Conversions ──
  { id: 66, label: 'Convert the measurement', equation: '5 km = ? m',      answer: 5000, hint: '1 km = 1000 m, multiply by 1000', explanation: '5 × 1000 = 5000 m' },
  { id: 67, label: 'Convert the measurement', equation: '3000 m = ? km',   answer: 3,    hint: 'Divide by 1000 to get km', explanation: '3000 ÷ 1000 = 3 km' },
  { id: 68, label: 'Convert the measurement', equation: '8 m = ? cm',      answer: 800,  hint: '1 m = 100 cm, multiply by 100', explanation: '8 × 100 = 800 cm' },
  { id: 69, label: 'Convert the measurement', equation: '400 cm = ? m',    answer: 4,    hint: 'Divide by 100 to get metres', explanation: '400 ÷ 100 = 4 m' },
  { id: 70, label: 'Convert the measurement', equation: '6 kg = ? g',      answer: 6000, hint: '1 kg = 1000 g, multiply by 1000', explanation: '6 × 1000 = 6000 g' },
  { id: 71, label: 'Convert the measurement', equation: '9000 g = ? kg',   answer: 9,    hint: 'Divide by 1000 to get kg', explanation: '9000 ÷ 1000 = 9 kg' },
  { id: 72, label: 'Convert the measurement', equation: '3 hours = ? min', answer: 180,  hint: '1 hour = 60 minutes', explanation: '3 × 60 = 180 min' },
  { id: 73, label: 'Convert the measurement', equation: '240 min = ? hrs', answer: 4,    hint: 'Divide by 60 to get hours', explanation: '240 ÷ 60 = 4 hours' },
  { id: 74, label: 'Convert the measurement', equation: '5 min = ? sec',   answer: 300,  hint: '1 min = 60 seconds', explanation: '5 × 60 = 300 seconds' },
  { id: 75, label: 'Convert the measurement', equation: '120 sec = ? min', answer: 2,    hint: 'Divide by 60 to get minutes', explanation: '120 ÷ 60 = 2 min' },
  { id: 76, label: 'Convert the measurement', equation: '7 km = ? m',      answer: 7000, hint: '1 km = 1000 m', explanation: '7 × 1000 = 7000 m' },
  { id: 77, label: 'Convert the measurement', equation: '500 cm = ? m',    answer: 5,    hint: 'Divide by 100 to get metres', explanation: '500 ÷ 100 = 5 m' },
  { id: 78, label: 'Convert the measurement', equation: '4000 g = ? kg',   answer: 4,    hint: 'Divide by 1000 to get kg', explanation: '4000 ÷ 1000 = 4 kg' },
  { id: 79, label: 'Convert the measurement', equation: '12 m = ? cm',     answer: 1200, hint: '1 m = 100 cm, multiply by 100', explanation: '12 × 100 = 1200 cm' },
  { id: 80, label: 'Convert the measurement', equation: '10 km = ? m',     answer: 10000,hint: '1 km = 1000 m', explanation: '10 × 1000 = 10000 m' },
]

export const wrongQuotes = [
  "Not quite — but you're getting there!",
  "Every mistake is a step closer to getting it.",
  "Keep pushing — you'll get the next one.",
  "That one was tricky. You've got this.",
  "Don't give up — practice makes perfect.",
  "Great effort. Keep going.",
  "Almost — you'll nail it next time.",
  "Stay focused — you can do this.",
]

export const correctQuotes = [
  "Correct! You're on fire!",
  "Nailed it! +50 coins!",
  "Amazing work. Keep it up.",
  "Math genius detected.",
  "Perfect. Keep crushing it.",
  "Outstanding!",
]

export function shuffleQuestions(count = 10) {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function generateChoices(answer) {
  const wrongs = new Set()
  const abs = Math.abs(answer)

  let pool
  if (abs < 30) {
    pool = [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6, -7, 7, -8, 8]
  } else if (abs < 200) {
    pool = [-5, 5, -10, 10, -15, 15, -20, 20, -25, 25, -30, 30]
  } else if (abs < 2000) {
    pool = [-50, 50, -100, 100, -150, 150, -200, 200, -250, 250, -300, 300]
  } else {
    pool = [-200, 200, -500, 500, -1000, 1000, -400, 400, -600, 600]
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  for (const d of shuffled) {
    if (wrongs.size >= 3) break
    const w = answer + d
    if (w !== answer && w > 0) wrongs.add(w)
  }

  // Fallback in case pool didn't give 3 unique wrongs
  let delta = 1
  while (wrongs.size < 3) {
    const w = answer + delta
    if (w !== answer) wrongs.add(w)
    delta++
  }

  const all = [answer, ...[...wrongs]]
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[all[i], all[j]] = [all[j], all[i]]
  }
  return all
}
