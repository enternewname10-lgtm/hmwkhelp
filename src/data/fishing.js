export const catches = {
  trash: [
    { id: 'boot',    name: 'Old Boot',        emoji: '👟', kg: 0 },
    { id: 'can',     name: 'Rusty Can',        emoji: '🥫', kg: 0 },
    { id: 'bottle',  name: 'Plastic Bottle',   emoji: '🧴', kg: 0 },
    { id: 'bucket',  name: 'Broken Bucket',    emoji: '🪣', kg: 0 },
    { id: 'bag',     name: 'Plastic Bag',      emoji: '🛍️', kg: 0 },
  ],
  Common: [
    { id: 'bluegill',  name: 'Bluegill',        emoji: '🐟', minKg: 2,  maxKg: 8  },
    { id: 'sunfish',   name: 'Sunfish',          emoji: '🐠', minKg: 2,  maxKg: 9  },
    { id: 'perch',     name: 'Yellow Perch',     emoji: '🐡', minKg: 1,  maxKg: 7  },
    { id: 'crappie',   name: 'Crappie',          emoji: '🐟', minKg: 2,  maxKg: 8  },
    { id: 'smelt',     name: 'Rainbow Smelt',    emoji: '🐠', minKg: 1,  maxKg: 6  },
    { id: 'roach',     name: 'Common Roach',     emoji: '🐡', minKg: 2,  maxKg: 7  },
    { id: 'bream',     name: 'Bream',            emoji: '🐟', minKg: 2,  maxKg: 8  },
  ],
  Rare: [
    { id: 'bass',    name: 'Largemouth Bass',  emoji: '🐟', minKg: 15, maxKg: 35 },
    { id: 'trout',   name: 'Rainbow Trout',    emoji: '🐠', minKg: 12, maxKg: 30 },
    { id: 'carp',    name: 'Mirror Carp',      emoji: '🐡', minKg: 18, maxKg: 40 },
    { id: 'walleye', name: 'Walleye',          emoji: '🐟', minKg: 14, maxKg: 32 },
    { id: 'zander',  name: 'Zander',           emoji: '🐠', minKg: 16, maxKg: 36 },
  ],
  Epic: [
    { id: 'salmon',  name: 'King Salmon',      emoji: '🦈', minKg: 55,  maxKg: 90  },
    { id: 'pike',    name: 'Northern Pike',    emoji: '🐟', minKg: 50,  maxKg: 85  },
    { id: 'catfish', name: 'Giant Catfish',    emoji: '🐠', minKg: 60,  maxKg: 100 },
    { id: 'muskie',  name: 'Muskellunge',      emoji: '🐡', minKg: 55,  maxKg: 95  },
  ],
  Legendary: [
    { id: 'tuna',     name: 'Bluefin Tuna',    emoji: '🐋', minKg: 100, maxKg: 140 },
    { id: 'marlin',   name: 'Blue Marlin',      emoji: '🦈', minKg: 110, maxKg: 150 },
    { id: 'sturgeon', name: 'Beluga Sturgeon',  emoji: '🐊', minKg: 95,  maxKg: 130 },
    { id: 'arapaima', name: 'Arapaima',         emoji: '🐉', minKg: 105, maxKg: 145 },
  ],
  Mythical: [
    { id: 'kraken',    name: 'Kraken',          emoji: '🦑', minKg: 300, maxKg: 500 },
    { id: 'leviathan', name: 'Leviathan',       emoji: '🌊', minKg: 350, maxKg: 600 },
    { id: 'seadragon', name: 'Sea Dragon',      emoji: '🐲', minKg: 400, maxKg: 700 },
    { id: 'goldenkoi', name: 'Golden Koi',      emoji: '🎏', minKg: 250, maxKg: 450 },
  ],
}

export const rarityColors = {
  trash:     '#6b7280',
  Common:    '#10b981',
  Rare:      '#3b82f6',
  Epic:      '#a855f7',
  Legendary: '#f97316',
  Mythical:  '#fbbf24',
}

// Rarity chances by time left (faster answer = better rarity)
export function getRarityByTime(timeLeft) {
  const t = Math.min(1, timeLeft / 20)
  return {
    trash:     Math.max(0, 0.20 - t * 0.18),
    Common:    Math.max(0, 0.60 - t * 0.22),
    Rare:      0.10 + t * 0.09,
    Epic:      0.04 + t * 0.07,
    Legendary: 0.01 + t * 0.06,
    Mythical:  t * 0.02,
  }
}

// Rarity chances for fishing mode (answer correct = cast)
export const fishingRarityChances = {
  trash:     0.18,
  Common:    0.49,
  Rare:      0.20,
  Epic:      0.09,
  Legendary: 0.03,
  Mythical:  0.01,
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
