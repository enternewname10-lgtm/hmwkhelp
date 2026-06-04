export const packs = [
  {
    id: 'desert',
    name: 'Desert Pack',
    emoji: '🏜️',
    cost: 500,
    color: '#f59e0b',
    theme: { bg: 'linear-gradient(180deg, #fef9c3 0%, #fde68a 55%, #f59e0b33 100%)', scene: ['☀️','🏜️','🌵'] },
    characters: [
      { id: 'desert_cactus',   name: 'Cactus',      emoji: '🌵', rarity: 'Common',    chance: 0.50 },
      { id: 'desert_scorpion', name: 'Scorpion',     emoji: '🦂', rarity: 'Rare',      chance: 0.30 },
      { id: 'desert_camel',    name: 'Sand Camel',   emoji: '🐪', rarity: 'Epic',      chance: 0.15 },
      { id: 'desert_pharaoh',  name: 'Pharaoh',      emoji: '👑', rarity: 'Legendary', chance: 0.05 },
    ],
  },
  {
    id: 'sky',
    name: 'Sky Pack',
    emoji: '☁️',
    cost: 500,
    color: '#06b6d4',
    theme: { bg: 'linear-gradient(180deg, #bfdbfe 0%, #93c5fd 55%, #3b82f633 100%)', scene: ['☁️','🌤️','🌬️'] },
    characters: [
      { id: 'sky_cloud',     name: 'Storm Cloud',  emoji: '⛈️', rarity: 'Common',    chance: 0.50 },
      { id: 'sky_eagle',     name: 'Eagle',        emoji: '🦅', rarity: 'Rare',      chance: 0.30 },
      { id: 'sky_lightning', name: 'Thunder',      emoji: '⚡', rarity: 'Epic',      chance: 0.15 },
      { id: 'sky_tornado',   name: 'Tornado King', emoji: '🌪️', rarity: 'Legendary', chance: 0.05 },
    ],
  },
  {
    id: 'christmas',
    name: 'Christmas Pack',
    emoji: '🎄',
    cost: 500,
    color: '#ef4444',
    theme: { bg: 'linear-gradient(180deg, #f0fdf4 0%, #bbf7d0 55%, #86efac55 100%)', scene: ['❄️','🎄','⛄'] },
    characters: [
      { id: 'xmas_elf',      name: 'Elf',          emoji: '🧝', rarity: 'Common',    chance: 0.50 },
      { id: 'xmas_reindeer', name: 'Reindeer',     emoji: '🦌', rarity: 'Rare',      chance: 0.30 },
      { id: 'xmas_snowman',  name: 'Frostbite',    emoji: '⛄', rarity: 'Epic',      chance: 0.15 },
      { id: 'xmas_santa',    name: 'Shadow Santa', emoji: '🎅', rarity: 'Legendary', chance: 0.05 },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean Pack',
    emoji: '🌊',
    cost: 500,
    color: '#2563eb',
    theme: { bg: 'linear-gradient(180deg, #e0f2fe 0%, #7dd3fc 55%, #0284c755 100%)', scene: ['🌊','🐚','🪸'] },
    characters: [
      { id: 'ocean_fish',    name: 'Clownfish',   emoji: '🐠', rarity: 'Common',    chance: 0.50 },
      { id: 'ocean_shark',   name: 'Great White', emoji: '🦈', rarity: 'Rare',      chance: 0.30 },
      { id: 'ocean_octopus', name: 'Octopus Rex', emoji: '🐙', rarity: 'Epic',      chance: 0.15 },
      { id: 'ocean_kraken',  name: 'The Kraken',  emoji: '🦑', rarity: 'Legendary', chance: 0.05 },
    ],
  },
  {
    id: 'forest',
    name: 'Forest Pack',
    emoji: '🌲',
    cost: 500,
    color: '#16a34a',
    theme: { bg: 'linear-gradient(180deg, #dcfce7 0%, #86efac 55%, #16a34a44 100%)', scene: ['🌲','🍃','🌿'] },
    characters: [
      { id: 'forest_rabbit', name: 'Rabbit',        emoji: '🐇', rarity: 'Common',    chance: 0.50 },
      { id: 'forest_fox',    name: 'Shadow Fox',    emoji: '🦊', rarity: 'Rare',      chance: 0.30 },
      { id: 'forest_bear',   name: 'Grizzly',       emoji: '🐻', rarity: 'Epic',      chance: 0.15 },
      { id: 'forest_dragon', name: 'Forest Dragon', emoji: '🐲', rarity: 'Legendary', chance: 0.05 },
    ],
  },
  {
    id: 'space',
    name: 'Space Pack',
    emoji: '🚀',
    cost: 700,
    color: '#7c3aed',
    theme: { bg: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 55%, #4c1d9555 100%)', scene: ['⭐','🌙','🪐'] },
    characters: [
      { id: 'space_alien',     name: 'Alien',      emoji: '👽', rarity: 'Common',    chance: 0.50 },
      { id: 'space_rocket',    name: 'Rocket',     emoji: '🚀', rarity: 'Rare',      chance: 0.30 },
      { id: 'space_ufo',       name: 'UFO',        emoji: '🛸', rarity: 'Epic',      chance: 0.15 },
      { id: 'space_blackhole', name: 'Black Hole', emoji: '🌌', rarity: 'Legendary', chance: 0.05 },
    ],
  },
]

export const rarityColors = {
  Common:    '#10b981', // green
  Rare:      '#3b82f6', // blue
  Epic:      '#a855f7', // purple
  Legendary: '#f97316', // orange
}

export function pullFromPack(pack) {
  const rand = Math.random()
  let cumulative = 0
  for (const char of pack.characters) {
    cumulative += char.chance
    if (rand <= cumulative) return char
  }
  return pack.characters[0]
}

export function getAllCharacters() {
  return packs.flatMap(p => p.characters)
}

export function findCharacter(id) {
  return getAllCharacters().find(c => c.id === id)
}
