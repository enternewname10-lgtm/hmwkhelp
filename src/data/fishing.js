export const catches = {
  trash: [
    { id: 'boot',    name: 'Old Boot',        emoji: '👟', kg: 0 },
    { id: 'can',     name: 'Rusty Can',        emoji: '🥫', kg: 0 },
    { id: 'bottle',  name: 'Plastic Bottle',   emoji: '🧴', kg: 0 },
    { id: 'bucket',  name: 'Broken Bucket',    emoji: '🪣', kg: 0 },
    { id: 'bag',     name: 'Plastic Bag',      emoji: '🛍️', kg: 0 },
  ],
  Common: [
    { id: 'bluegill',  name: 'Bluegill',        emoji: '🐟', minKg: 0.2, maxKg: 1.0 },
    { id: 'sunfish',   name: 'Sunfish',          emoji: '🐠', minKg: 0.3, maxKg: 1.5 },
    { id: 'perch',     name: 'Yellow Perch',     emoji: '🐡', minKg: 0.2, maxKg: 0.9 },
    { id: 'crappie',   name: 'Crappie',          emoji: '🐟', minKg: 0.3, maxKg: 1.2 },
    { id: 'smelt',     name: 'Rainbow Smelt',    emoji: '🐠', minKg: 0.1, maxKg: 0.5 },
    { id: 'roach',     name: 'Common Roach',     emoji: '🐡', minKg: 0.2, maxKg: 1.0 },
    { id: 'bream',     name: 'Bream',            emoji: '🐟', minKg: 0.3, maxKg: 1.4 },
  ],
  Rare: [
    { id: 'bass',    name: 'Largemouth Bass',  emoji: '🐟', minKg: 2.0, maxKg: 6.0 },
    { id: 'trout',   name: 'Rainbow Trout',    emoji: '🐠', minKg: 1.5, maxKg: 5.0 },
    { id: 'carp',    name: 'Mirror Carp',      emoji: '🐡', minKg: 3.0, maxKg: 9.0 },
    { id: 'walleye', name: 'Walleye',          emoji: '🐟', minKg: 1.8, maxKg: 4.5 },
    { id: 'zander',  name: 'Zander',           emoji: '🐠', minKg: 2.5, maxKg: 7.0 },
  ],
  Epic: [
    { id: 'salmon',  name: 'King Salmon',      emoji: '🦈', minKg: 8.0,  maxKg: 20.0 },
    { id: 'pike',    name: 'Northern Pike',    emoji: '🐟', minKg: 7.0,  maxKg: 18.0 },
    { id: 'catfish', name: 'Giant Catfish',    emoji: '🐠', minKg: 10.0, maxKg: 28.0 },
    { id: 'muskie',  name: 'Muskellunge',      emoji: '🐡', minKg: 9.0,  maxKg: 22.0 },
  ],
  Legendary: [
    { id: 'tuna',     name: 'Bluefin Tuna',      emoji: '🐋', minKg: 50.0,  maxKg: 200.0 },
    { id: 'marlin',   name: 'Blue Marlin',        emoji: '🦈', minKg: 80.0,  maxKg: 300.0 },
    { id: 'sturgeon', name: 'Beluga Sturgeon',    emoji: '🐊', minKg: 40.0,  maxKg: 120.0 },
    { id: 'arapaima', name: 'Arapaima',           emoji: '🐉', minKg: 60.0,  maxKg: 180.0 },
  ],
}

export const rarityColors = {
  trash:     '#6b7280',
  Common:    '#10b981',
  Rare:      '#3b82f6',
  Epic:      '#a855f7',
  Legendary: '#f97316',
}

// Rarity chances by time left (faster answer = better rarity)
export function getRarityByTime(timeLeft) {
  const t = Math.min(1, timeLeft / 20)
  return {
    trash:     Math.max(0,    0.20 - t * 0.18),
    Common:    Math.max(0,    0.65 - t * 0.25),
    Rare:      0.10 + t * 0.10,
    Epic:      0.04 + t * 0.08,
    Legendary: 0.01 + t * 0.09,
  }
}

// Rarity chances for fishing mode (answer correct = cast)
export const fishingRarityChances = {
  trash:     0.18,
  Common:    0.50,
  Rare:      0.20,
  Epic:      0.09,
  Legendary: 0.03,
}

export function rollRarity(chances) {
  const rand = Math.random()
  let cum = 0
  for (const [rarity, chance] of Object.entries(chances)) {
    cum += chance
    if (rand <= cum) return rarity
  }
  return 'Common'
}

export function getCatch(rarity) {
  const pool = catches[rarity]
  const item = pool[Math.floor(Math.random() * pool.length)]
  if (rarity === 'trash') return { ...item, kg: 0, rarity }
  const kg = parseFloat((item.minKg + Math.random() * (item.maxKg - item.minKg)).toFixed(2))
  return { ...item, kg, rarity }
}
