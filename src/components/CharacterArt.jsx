const arts = {

  /* ── DESERT ── */
  desert_cactus: (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="35" y="22" width="10" height="46" rx="5" fill="#22c55e"/>
      <rect x="16" y="36" width="22" height="8" rx="4" fill="#22c55e"/>
      <rect x="16" y="26" width="8" height="18" rx="4" fill="#22c55e"/>
      <rect x="42" y="42" width="20" height="8" rx="4" fill="#22c55e"/>
      <rect x="52" y="32" width="8" height="18" rx="4" fill="#22c55e"/>
      <ellipse cx="40" cy="68" rx="14" ry="4" fill="#a16207" opacity="0.35"/>
    </svg>
  ),

  desert_scorpion: (
    <svg viewBox="0 0 80 80" fill="none">
      <ellipse cx="38" cy="52" rx="14" ry="9" fill="#92400e"/>
      <ellipse cx="22" cy="52" rx="9" ry="7" fill="#92400e"/>
      <circle cx="18" cy="49" r="2" fill="#111"/>
      <circle cx="25" cy="49" r="2" fill="#111"/>
      <path d="M13 46 Q7 39 5 43 Q9 47 13 46Z" fill="#78350f"/>
      <path d="M13 53 Q7 57 5 54 Q9 51 13 53Z" fill="#78350f"/>
      <path d="M52 50 Q62 43 64 34 Q66 26 59 20" stroke="#92400e" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M59 20 L54 13" stroke="#450a0a" strokeWidth="4" strokeLinecap="round"/>
      {[44,49,54,59].map((x,i)=>(
        <g key={i}>
          <line x1={x} y1="59" x2={x-5} y2="68" stroke="#78350f" strokeWidth="2"/>
          <line x1={x} y1="59" x2={x+3} y2="68" stroke="#78350f" strokeWidth="2"/>
        </g>
      ))}
    </svg>
  ),

  desert_camel: (
    <svg viewBox="0 0 80 80" fill="none">
      <ellipse cx="36" cy="50" rx="20" ry="13" fill="#C2813A"/>
      <ellipse cx="30" cy="38" rx="11" ry="9" fill="#C2813A"/>
      <path d="M50 46 Q58 52 62 62" stroke="#C2813A" strokeWidth="10" strokeLinecap="round" fill="none"/>
      <ellipse cx="63" cy="66" rx="9" ry="6" fill="#C2813A"/>
      <circle cx="67" cy="63" r="2" fill="#1a0a00"/>
      <rect x="18" y="60" width="6" height="14" rx="3" fill="#a06228"/>
      <rect x="28" y="60" width="6" height="14" rx="3" fill="#a06228"/>
      <rect x="42" y="60" width="6" height="12" rx="3" fill="#a06228"/>
      <rect x="52" y="60" width="5" height="9" rx="2.5" fill="#a06228"/>
      <ellipse cx="64" cy="72" rx="12" ry="3.5" fill="#38bdf8" opacity="0.55"/>
      <ellipse cx="64" cy="72" rx="7" ry="2" fill="none" stroke="#7dd3fc" strokeWidth="1" opacity="0.7"/>
      <path d="M16" y1="50 Q10 46 12 40" stroke="#a06228" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),

  desert_pharaoh: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M26 42 L23 76 L57 76 L54 42Z" fill="#1C5FA8"/>
      <rect x="29" y="32" width="22" height="14" rx="4" fill="#F5C97A"/>
      <ellipse cx="40" cy="24" rx="10" ry="11" fill="#F5C97A"/>
      <path d="M29 18 L29 36 L23 44" stroke="#FFD700" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M51 18 L51 36 L57 44" stroke="#FFD700" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <rect x="28" y="12" width="24" height="8" rx="2" fill="#FFD700"/>
      <rect x="34" y="5" width="12" height="9" rx="1" fill="#CC0000"/>
      <circle cx="35" cy="23" r="2" fill="#111"/>
      <circle cx="45" cy="23" r="2" fill="#111"/>
      <path d="M35 29 Q40 33 45 29" stroke="#8B4513" strokeWidth="1.5" fill="none"/>
      <line x1="60" y1="14" x2="54" y2="74" stroke="#FFD700" strokeWidth="3.5"/>
      <circle cx="60" cy="12" r="5" fill="#FFD700"/>
    </svg>
  ),

  /* ── SKY ── */
  sky_cloud: (
    <svg viewBox="0 0 80 80" fill="none">
      {[24,31,38,45,52].map((x,i)=>(
        <line key={i} x1={x} y1="57" x2={x-4} y2="72" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round"/>
      ))}
      <path d="M44 46 L37 58 L44 56 L37 72" stroke="#FCD34D" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="40" cy="34" rx="22" ry="14" fill="#94a3b8"/>
      <ellipse cx="26" cy="38" rx="14" ry="12" fill="#94a3b8"/>
      <ellipse cx="54" cy="38" rx="14" ry="12" fill="#94a3b8"/>
      <ellipse cx="40" cy="42" rx="22" ry="10" fill="#64748b"/>
      <ellipse cx="33" cy="35" rx="3" ry="3.5" fill="#1e293b"/>
      <ellipse cx="47" cy="35" rx="3" ry="3.5" fill="#1e293b"/>
      <path d="M30 30 L35 28" stroke="#1e293b" strokeWidth="2"/>
      <path d="M44 28 L49 30" stroke="#1e293b" strokeWidth="2"/>
    </svg>
  ),

  sky_eagle: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M38 42 Q18 28 4 33 Q16 40 28 44Z" fill="#3A2008"/>
      <path d="M38 42 Q14 22 6 20 Q18 32 28 44Z" fill="#4A2C0A"/>
      <path d="M42 42 Q62 28 76 33 Q64 40 52 44Z" fill="#3A2008"/>
      <path d="M42 42 Q66 22 74 20 Q62 32 52 44Z" fill="#4A2C0A"/>
      <ellipse cx="40" cy="46" rx="12" ry="9" fill="#4A2C0A"/>
      <path d="M34 54 L30 66 L40 60 L50 66 L46 54Z" fill="#F5F0E8"/>
      <circle cx="40" cy="30" r="11" fill="#F5F0E8"/>
      <circle cx="44" cy="28" r="3" fill="#FFD700"/>
      <circle cx="44" cy="28" r="2" fill="#111"/>
      <path d="M46 34 L56 37 L46 40Z" fill="#FFA500"/>
      <path d="M35 54 L30 62 M38 55 L36 64 M42 55 L44 64 M45 54 L50 62" stroke="#4A2C0A" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  sky_lightning: (
    <svg viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="40" rx="30" ry="30" fill="#FEF08A" opacity="0.2"/>
      <ellipse cx="40" cy="40" rx="20" ry="20" fill="#FDE047" opacity="0.25"/>
      <path d="M52 6 L28 44 L44 44 L28 74 L58 32 L42 32 L52 6Z" fill="#FCD34D" stroke="#FBBF24" strokeWidth="1.5"/>
      <line x1="62" y1="18" x2="70" y2="11" stroke="#FDE047" strokeWidth="2" strokeLinecap="round"/>
      <line x1="64" y1="28" x2="74" y2="26" stroke="#FDE047" strokeWidth="2" strokeLinecap="round"/>
      <line x1="14" y1="52" x2="6" y2="48" stroke="#FDE047" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="60" x2="6" y2="63" stroke="#FDE047" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  sky_tornado: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M14 10 Q40 15 66 10 Q56 22 51 32 Q46 40 44 50 Q42 58 40 72 Q38 58 36 50 Q34 40 29 32 Q24 22 14 10Z" fill="#94a3b8"/>
      <path d="M20 16 Q40 20 60 16 Q52 26 48 35 Q44 43 43 52 Q41 60 40 72 Q39 60 37 52 Q36 43 32 35 Q28 26 20 16Z" fill="#64748b"/>
      <path d="M28 24 Q40 27 52 24 Q46 32 44 38 Q42 44 41 52 Q40 58 40 66 Q40 58 39 52 Q38 44 36 38 Q34 32 28 24Z" fill="#475569"/>
      <rect x="8" y="40" width="7" height="4" rx="1.5" fill="#78350f" transform="rotate(-22 11 42)"/>
      <rect x="62" y="36" width="6" height="3.5" rx="1.5" fill="#78350f" transform="rotate(18 65 37)"/>
      <circle cx="6" cy="30" r="3.5" fill="#92400e" opacity="0.65"/>
      <circle cx="70" cy="44" r="3" fill="#92400e" opacity="0.65"/>
    </svg>
  ),

  /* ── CHRISTMAS ── */
  xmas_elf: (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="44" y="54" width="22" height="20" rx="3" fill="#EF4444"/>
      <rect x="53" y="54" width="4" height="20" fill="#FDE047"/>
      <rect x="44" y="62" width="22" height="4" fill="#FDE047"/>
      <path d="M51 54 Q48 48 51 46 Q54 48 54 54" fill="#FDE047"/>
      <rect x="16" y="40" width="24" height="26" rx="5" fill="#22c55e"/>
      <rect x="18" y="58" width="8" height="14" rx="4" fill="#22c55e"/>
      <rect x="28" y="58" width="8" height="14" rx="4" fill="#22c55e"/>
      <ellipse cx="22" cy="72" rx="6" ry="4" fill="#b91c1c" transform="rotate(-10 22 72)"/>
      <ellipse cx="33" cy="72" rx="6" ry="4" fill="#b91c1c" transform="rotate(10 33 72)"/>
      <circle cx="28" cy="30" r="11" fill="#F9C784"/>
      <path d="M17 27 L28 5 L39 27Z" fill="#22c55e"/>
      <rect x="15" y="25" width="26" height="5" rx="2.5" fill="#dc2626"/>
      <circle cx="28" cy="5" r="3.5" fill="#FDE047"/>
      <circle cx="24" cy="30" r="1.5" fill="#111"/>
      <circle cx="32" cy="30" r="1.5" fill="#111"/>
      <path d="M24 35 Q28 38 32 35" stroke="#c2571a" strokeWidth="1.5" fill="none"/>
      <path d="M16 48 L5 56" stroke="#F9C784" strokeWidth="7" strokeLinecap="round"/>
      <path d="M40 48 L50 56" stroke="#F9C784" strokeWidth="7" strokeLinecap="round"/>
    </svg>
  ),

  xmas_reindeer: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M28 18 Q22 10 16 12 Q20 17 18 21" stroke="#6B3A2A" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M28 18 Q24 8 20 6" stroke="#6B3A2A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M28 18 Q26 11 31 7" stroke="#6B3A2A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M46 18 Q52 10 58 12 Q54 17 56 21" stroke="#6B3A2A" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M46 18 Q50 8 54 6" stroke="#6B3A2A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M46 18 Q48 11 43 7" stroke="#6B3A2A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="44" cy="50" rx="20" ry="13" fill="#8B4513" transform="rotate(-15 44 50)"/>
      <ellipse cx="26" cy="32" rx="12" ry="10" fill="#8B4513"/>
      <circle cx="17" cy="35" r="6" fill="#EF4444"/>
      <circle cx="17" cy="35" r="8" fill="#EF4444" opacity="0.25"/>
      <circle cx="24" cy="27" r="2.5" fill="#111"/>
      <path d="M28 62 L20 74" stroke="#6B3A2A" strokeWidth="6" strokeLinecap="round"/>
      <path d="M38 66 L34 76" stroke="#6B3A2A" strokeWidth="6" strokeLinecap="round"/>
      <path d="M52 62 L60 72" stroke="#6B3A2A" strokeWidth="6" strokeLinecap="round"/>
      <path d="M60 56 L70 64" stroke="#6B3A2A" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="60" cy="44" r="5" fill="#F5F5F5"/>
    </svg>
  ),

  xmas_snowman: (
    <svg viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="76" rx="18" ry="4" fill="rgba(0,0,0,0.08)"/>
      <circle cx="40" cy="62" r="15" fill="#F0F9FF"/>
      <circle cx="40" cy="40" r="12" fill="#F0F9FF"/>
      <circle cx="40" cy="22" r="9" fill="#F0F9FF"/>
      <rect x="32" y="8" width="16" height="12" rx="2" fill="#1e293b"/>
      <rect x="28" y="18" width="24" height="4" rx="2" fill="#1e293b"/>
      <circle cx="37" cy="20" r="1.5" fill="#1e293b"/>
      <circle cx="43" cy="20" r="1.5" fill="#1e293b"/>
      <path d="M40 23 L47 26 L40 28Z" fill="#f97316"/>
      {[35,38,41,44].map((x,i)=><circle key={i} cx={x} cy="27" r="1" fill="#1e293b"/>)}
      <path d="M30 34 Q32 40 40 42 Q48 40 50 34 Q45 37 40 37 Q35 37 30 34Z" fill="#dc2626"/>
      <rect x="46" y="34" width="6" height="12" rx="3" fill="#dc2626"/>
      <circle cx="40" cy="46" r="1.5" fill="#94a3b8"/>
      <circle cx="40" cy="52" r="1.5" fill="#94a3b8"/>
      <path d="M28 40 L12 32" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M12 32 L8 26 M12 32 L8 37" stroke="#78350f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M52 40 L68 32" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M68 32 L72 26 M68 32 L72 37" stroke="#78350f" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  xmas_santa: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M18 62 Q30 56 70 58 Q72 64 68 68 Q40 70 18 62Z" fill="#7f1d1d"/>
      <path d="M18 62 Q14 66 18 70 L28 70" stroke="#6B1616" strokeWidth="3" fill="none"/>
      <path d="M24 70 Q28 74 34 72" stroke="#78350f" strokeWidth="3" fill="none"/>
      <rect x="27" y="36" width="26" height="26" rx="7" fill="#DC2626"/>
      <rect x="27" y="52" width="26" height="5" fill="#1e293b"/>
      <rect x="37" y="51" width="7" height="7" rx="1" fill="#FCD34D"/>
      <circle cx="40" cy="28" r="12" fill="#F9C784"/>
      <path d="M28 23 L40 4 L52 23Z" fill="#DC2626"/>
      <rect x="26" y="21" width="28" height="5" rx="2.5" fill="#F0F9FF"/>
      <circle cx="40" cy="4" r="3.5" fill="#F0F9FF"/>
      <circle cx="36" cy="25" r="2" fill="#111"/>
      <circle cx="44" cy="25" r="2" fill="#111"/>
      <path d="M28 32 Q32 40 40 42 Q48 40 52 32 Q46 36 40 36 Q34 36 28 32Z" fill="#F0F9FF"/>
      <path d="M27 44 L14 52" stroke="#F9C784" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="10" cy="54" r="9" fill="#DC2626"/>
      <path d="M8 46 Q10 44 12 46" stroke="#7f1d1d" strokeWidth="2" fill="none"/>
    </svg>
  ),

  /* ── OCEAN ── */
  ocean_fish: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M60 40 L74 30 L74 50Z" fill="#EA580C"/>
      <ellipse cx="40" cy="40" rx="22" ry="15" fill="#F97316"/>
      <ellipse cx="40" cy="40" rx="4" ry="14" fill="white"/>
      <path d="M28 28 Q28 52 32 52 Q32 28 28 28Z" fill="white"/>
      <path d="M28 27 Q38 16 48 27" fill="#C2410C" stroke="#C2410C" strokeWidth="1"/>
      <circle cx="20" cy="37" r="5" fill="white"/>
      <circle cx="19" cy="37" r="3.5" fill="#111"/>
      <circle cx="18" cy="36" r="1.2" fill="white"/>
      <path d="M12 40 Q14 45 17 40" stroke="#C2410C" strokeWidth="1.5" fill="none"/>
      <circle cx="10" cy="30" r="3.5" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"/>
      <circle cx="6" cy="22" r="2.5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
      <circle cx="4" cy="15" r="1.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
    </svg>
  ),

  ocean_shark: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M68 40 L80 28 L78 40 L80 52Z" fill="#708090"/>
      <ellipse cx="38" cy="43" rx="30" ry="17" fill="#708090"/>
      <ellipse cx="38" cy="48" rx="26" ry="11" fill="#F0F4F8"/>
      <path d="M36 26 L28 43 L44 43Z" fill="#506070"/>
      <path d="M50 46 L66 58 L52 55Z" fill="#607080"/>
      <ellipse cx="12" cy="43" rx="13" ry="11" fill="#708090"/>
      <path d="M4 43 Q12 55 22 43" fill="#1e293b"/>
      {[7,11,15,19].map((x,i)=>(
        <path key={i} d={`M${x} 43 L${x+1} 49 L${x+2.5} 43`} fill="white"/>
      ))}
      <circle cx="16" cy="36" r="4.5" fill="#111"/>
      <circle cx="15" cy="35" r="1.5" fill="#555"/>
      <path d="M24 36 Q26 43 24 50" stroke="#607080" strokeWidth="1.5" fill="none"/>
      <path d="M28 34 Q30 43 28 52" stroke="#607080" strokeWidth="1.5" fill="none"/>
    </svg>
  ),

  ocean_octopus: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M27 50 Q19 59 17 68 Q21 72 23 65 Q25 72 27 70 Q29 62 27 50Z" fill="#9333EA"/>
      <path d="M33 55 Q29 66 27 76 Q32 78 33 71 Q35 78 37 76 Q37 65 33 55Z" fill="#9333EA"/>
      <path d="M40 57 Q40 69 40 78 Q44 78 44 71 Q46 78 48 76 Q48 65 40 57Z" fill="#9333EA"/>
      <path d="M47 55 Q51 66 53 76 Q58 74 56 67 Q60 72 62 68 Q60 59 47 55Z" fill="#9333EA"/>
      <path d="M53 50 Q62 59 64 68 Q68 64 64 60 Q68 62 68 57 Q62 51 53 50Z" fill="#9333EA"/>
      <ellipse cx="40" cy="34" rx="23" ry="21" fill="#A855F7"/>
      <circle cx="31" cy="30" r="6.5" fill="white"/>
      <circle cx="49" cy="30" r="6.5" fill="white"/>
      <circle cx="31" cy="30" r="4" fill="#1e293b"/>
      <circle cx="49" cy="30" r="4" fill="#1e293b"/>
      <circle cx="30" cy="28.5" r="1.5" fill="white"/>
      <circle cx="48" cy="28.5" r="1.5" fill="white"/>
      <path d="M34 41 Q40 46 46 41" stroke="#7e22ce" strokeWidth="2" fill="none"/>
      <circle cx="20" cy="59" r="2" fill="#c084fc" opacity="0.5"/>
      <circle cx="19" cy="65" r="1.5" fill="#c084fc" opacity="0.5"/>
    </svg>
  ),

  ocean_kraken: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M0 54 Q20 49 40 54 Q60 59 80 54 L80 80 L0 80Z" fill="#075985" opacity="0.55"/>
      <path d="M6 80 Q8 62 15 51 Q19 44 17 35" stroke="#0c4a6e" strokeWidth="11" strokeLinecap="round" fill="none"/>
      <path d="M20 80 Q22 64 26 53 Q28 46 23 37" stroke="#0c4a6e" strokeWidth="10" strokeLinecap="round" fill="none"/>
      <path d="M60 80 Q58 64 54 53 Q52 46 57 37" stroke="#0c4a6e" strokeWidth="10" strokeLinecap="round" fill="none"/>
      <path d="M74 80 Q72 62 65 51 Q61 44 63 35" stroke="#0c4a6e" strokeWidth="11" strokeLinecap="round" fill="none"/>
      <ellipse cx="40" cy="46" rx="22" ry="18" fill="#1e3a5f"/>
      <circle cx="30" cy="42" r="8" fill="#EF4444" opacity="0.85"/>
      <circle cx="50" cy="42" r="8" fill="#EF4444" opacity="0.85"/>
      <circle cx="30" cy="42" r="4.5" fill="#111"/>
      <circle cx="50" cy="42" r="4.5" fill="#111"/>
      <circle cx="28" cy="40" r="2" fill="#FF6B6B" opacity="0.5"/>
      <circle cx="48" cy="40" r="2" fill="#FF6B6B" opacity="0.5"/>
      {[{cx:15,cy:47},{cx:23,cy:52},{cx:57,cy:52},{cx:65,cy:47}].map((s,i)=>(
        <circle key={i} cx={s.cx} cy={s.cy} r="3" fill="#0ea5e9" opacity="0.45"/>
      ))}
    </svg>
  ),

  /* ── FOREST ── */
  forest_rabbit: (
    <svg viewBox="0 0 80 80" fill="none">
      <ellipse cx="30" cy="17" rx="6" ry="17" fill="#E8E8E8"/>
      <ellipse cx="50" cy="15" rx="6" ry="17" fill="#E8E8E8"/>
      <ellipse cx="30" cy="17" rx="3" ry="13" fill="#FFB6C1"/>
      <ellipse cx="50" cy="15" rx="3" ry="13" fill="#FFB6C1"/>
      <ellipse cx="44" cy="55" rx="19" ry="15" fill="#E8E8E8"/>
      <circle cx="28" cy="42" r="14" fill="#F0F0F0"/>
      <circle cx="24" cy="39" r="2" fill="#111"/>
      <circle cx="32" cy="39" r="2" fill="#111"/>
      <circle cx="23.5" cy="38.5" r="0.8" fill="white"/>
      <circle cx="31.5" cy="38.5" r="0.8" fill="white"/>
      <ellipse cx="28" cy="45" rx="3" ry="2" fill="#FFB6C1"/>
      <line x1="28" y1="45" x2="14" y2="43" stroke="#ccc" strokeWidth="1"/>
      <line x1="28" y1="45" x2="14" y2="47" stroke="#ccc" strokeWidth="1"/>
      <ellipse cx="32" cy="68" rx="9" ry="5" fill="#E0E0E0" transform="rotate(-30 32 68)"/>
      <ellipse cx="54" cy="66" rx="11" ry="5" fill="#E0E0E0" transform="rotate(20 54 66)"/>
      <ellipse cx="16" cy="57" rx="7" ry="4" fill="#E8E8E8" transform="rotate(-20 16 57)"/>
      <circle cx="60" cy="54" r="8" fill="white"/>
    </svg>
  ),

  forest_fox: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M56 54 Q74 46 76 60 Q74 72 61 67 Q55 64 56 54Z" fill="#C2570E"/>
      <path d="M62 65 Q70 67 72 60 Q70 53 63 58Z" fill="#F5F5F5"/>
      <ellipse cx="40" cy="56" rx="18" ry="14" fill="#C2570E"/>
      <ellipse cx="24" cy="40" rx="14" ry="12" fill="#C2570E"/>
      <path d="M12 30 L15 14 L24 28Z" fill="#C2570E"/>
      <path d="M14 28 L16 17 L23 27Z" fill="#FFB6C1"/>
      <path d="M29 28 L33 13 L35 28Z" fill="#C2570E"/>
      <path d="M30 27 L33 16 L34 27Z" fill="#FFB6C1"/>
      <ellipse cx="22" cy="44" rx="8" ry="7" fill="#F5F5F5"/>
      <circle cx="20" cy="38" r="2.5" fill="#111"/>
      <circle cx="28" cy="38" r="2.5" fill="#111"/>
      <circle cx="19.5" cy="37.5" r="1" fill="white"/>
      <ellipse cx="23" cy="44" rx="2.5" ry="1.5" fill="#111"/>
      <rect x="28" y="66" width="7" height="10" rx="3.5" fill="#A04A0E"/>
      <rect x="40" y="66" width="7" height="10" rx="3.5" fill="#A04A0E"/>
    </svg>
  ),

  forest_bear: (
    <svg viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="58" rx="18" ry="20" fill="#5C3317"/>
      <ellipse cx="40" cy="60" rx="11" ry="14" fill="#7A4A26"/>
      <circle cx="40" cy="30" r="17" fill="#5C3317"/>
      <circle cx="25" cy="18" r="8" fill="#5C3317"/>
      <circle cx="55" cy="18" r="8" fill="#5C3317"/>
      <circle cx="25" cy="18" r="4.5" fill="#3D2210"/>
      <circle cx="55" cy="18" r="4.5" fill="#3D2210"/>
      <ellipse cx="40" cy="35" rx="9" ry="7" fill="#7A4A26"/>
      <circle cx="34" cy="25" r="3.5" fill="#111"/>
      <circle cx="46" cy="25" r="3.5" fill="#111"/>
      <circle cx="33" cy="24" r="1.3" fill="white"/>
      <circle cx="45" cy="24" r="1.3" fill="white"/>
      <ellipse cx="40" cy="34" rx="4" ry="3" fill="#111"/>
      <path d="M22 47 L7 30" stroke="#5C3317" strokeWidth="13" strokeLinecap="round"/>
      <path d="M58 47 L73 30" stroke="#5C3317" strokeWidth="13" strokeLinecap="round"/>
      <path d="M7 30 L3 24 M7 30 L5 28 M7 30 L10 23" stroke="#2d1608" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M73 30 L77 24 M73 30 L75 28 M73 30 L70 23" stroke="#2d1608" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="28" y="74" width="11" height="6" rx="5.5" fill="#3D2210"/>
      <rect x="41" y="74" width="11" height="6" rx="5.5" fill="#3D2210"/>
    </svg>
  ),

  forest_dragon: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M38 36 Q18 18 5 26 Q14 35 27 40Z" fill="#15803d"/>
      <path d="M38 36 Q14 14 4 20 Q13 31 27 40Z" fill="#166534" opacity="0.7"/>
      <path d="M42 36 Q62 18 75 26 Q66 35 53 40Z" fill="#15803d"/>
      <path d="M42 36 Q66 14 76 20 Q67 31 53 40Z" fill="#166534" opacity="0.7"/>
      <path d="M50 56 Q66 62 72 55 Q70 70 58 68 Q52 66 50 56Z" fill="#15803d"/>
      <path d="M56 68 L60 78 L63 68" fill="#166534"/>
      <ellipse cx="37" cy="50" rx="16" ry="13" fill="#16a34a"/>
      <ellipse cx="29" cy="38" rx="9" ry="11" fill="#16a34a" transform="rotate(-22 29 38)"/>
      <ellipse cx="20" cy="26" rx="13" ry="10" fill="#15803d"/>
      <ellipse cx="10" cy="29" rx="7" ry="5.5" fill="#166534"/>
      <path d="M4 26 Q2 22 6 20 Q9 24 7 26Z" fill="#FCD34D"/>
      <path d="M6 29 Q2 28 2 32 Q7 32 6 29Z" fill="#F97316"/>
      <ellipse cx="18" cy="22" rx="4.5" ry="3.5" fill="#FCD34D"/>
      <ellipse cx="18" cy="22" rx="2" ry="3.5" fill="#111"/>
      <path d="M16 18 L12 7" stroke="#a16207" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M30 40 L26 30 M37 40 L35 30 M44 42 L44 32" stroke="#14532d" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),

  /* ── SPACE ── */
  space_alien: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M64 44 L78 38 L78 50Z" fill="#4ade80" opacity="0.7"/>
      <rect x="58" y="41" width="8" height="8" rx="1.5" fill="#22c55e"/>
      <rect x="52" y="43" width="8" height="6" rx="1" fill="#16a34a"/>
      <ellipse cx="35" cy="54" rx="16" ry="18" fill="#4ade80"/>
      <ellipse cx="35" cy="54" rx="8" ry="10" fill="#86efac" opacity="0.35"/>
      <circle cx="35" cy="50" r="3.5" fill="#0ea5e9" opacity="0.75"/>
      <ellipse cx="35" cy="28" rx="19" ry="21" fill="#4ade80"/>
      <ellipse cx="27" cy="26" rx="7.5" ry="8.5" fill="#111"/>
      <ellipse cx="43" cy="26" rx="7.5" ry="8.5" fill="#111"/>
      <circle cx="25" cy="24" r="3.5" fill="#38bdf8"/>
      <circle cx="41" cy="24" r="3.5" fill="#38bdf8"/>
      <circle cx="24" cy="23" r="1.3" fill="white"/>
      <circle cx="40" cy="23" r="1.3" fill="white"/>
      <path d="M27 37 Q35 42 43 37" stroke="#22c55e" strokeWidth="2" fill="none"/>
      <line x1="29" y1="9" x2="23" y2="1" stroke="#22c55e" strokeWidth="2.5"/>
      <circle cx="23" cy="1" r="3.5" fill="#86efac"/>
      <line x1="41" y1="9" x2="47" y2="1" stroke="#22c55e" strokeWidth="2.5"/>
      <circle cx="47" cy="1" r="3.5" fill="#86efac"/>
      <path d="M19 54 L7 46" stroke="#4ade80" strokeWidth="8" strokeLinecap="round"/>
      <path d="M51 52 L60 44" stroke="#4ade80" strokeWidth="8" strokeLinecap="round"/>
      <rect x="24" y="70" width="9" height="10" rx="4.5" fill="#22c55e"/>
      <rect x="37" y="70" width="9" height="10" rx="4.5" fill="#22c55e"/>
    </svg>
  ),

  space_rocket: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M28 74 Q40 92 52 74" fill="#FCD34D" opacity="0.75"/>
      <path d="M30 71 Q40 85 50 71" fill="#F97316"/>
      <path d="M33 68 Q40 78 47 68" fill="#FEF08A"/>
      <rect x="28" y="30" width="24" height="40" rx="6" fill="#e2e8f0"/>
      <path d="M28 30 L40 6 L52 30Z" fill="#DC2626"/>
      <circle cx="40" cy="44" r="9" fill="#38bdf8" opacity="0.85"/>
      <circle cx="40" cy="44" r="7" fill="#0ea5e9" opacity="0.6"/>
      <circle cx="37" cy="41" r="2.5" fill="rgba(255,255,255,0.55)"/>
      <line x1="52" y1="36" x2="63" y2="36" stroke="#94a3b8" strokeWidth="1.5"/>
      <rect x="63" y="30" width="11" height="9" rx="1" fill="#DC2626"/>
      <line x1="63" y1="30" x2="63" y2="46" stroke="#94a3b8" strokeWidth="1.5"/>
      <path d="M28 62 L14 76 L28 72Z" fill="#94a3b8"/>
      <path d="M52 62 L66 76 L52 72Z" fill="#94a3b8"/>
      <circle cx="12" cy="18" r="2.5" fill="#FDE047"/>
      <circle cx="70" cy="28" r="2" fill="#FDE047"/>
      <circle cx="8" cy="42" r="1.5" fill="white"/>
    </svg>
  ),

  space_ufo: (
    <svg viewBox="0 0 80 80" fill="none">
      <path d="M26 54 L14 80 L66 80 L54 54Z" fill="#FDE047" opacity="0.22"/>
      <ellipse cx="40" cy="72" rx="11" ry="7" fill="#F5F5F5"/>
      <ellipse cx="32" cy="68" rx="6" ry="5" fill="#F5F5F5"/>
      <circle cx="30" cy="64" r="4.5" fill="#F5F5F5"/>
      <circle cx="29" cy="63" r="1.2" fill="#111"/>
      <path d="M28 67 L26 72 M32 66 L30 72" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="40" cy="46" rx="30" ry="10" fill="#94a3b8"/>
      <ellipse cx="40" cy="44" rx="30" ry="8" fill="#64748b"/>
      <ellipse cx="40" cy="38" rx="17" ry="13" fill="#38bdf8" opacity="0.88"/>
      <circle cx="40" cy="36" r="7" fill="#4ade80"/>
      <circle cx="38" cy="34" r="2" fill="#111"/>
      <circle cx="42" cy="34" r="2" fill="#111"/>
      {[14,24,34,44,54,66].map((x,i)=>(
        <circle key={i} cx={x} cy="46" r="2.5" fill={i%2===0?'#FDE047':'#F97316'}/>
      ))}
    </svg>
  ),

  space_blackhole: (
    <svg viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="37" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.18"/>
      <circle cx="40" cy="40" r="31" fill="none" stroke="#9333ea" strokeWidth="1.5" opacity="0.28"/>
      <ellipse cx="40" cy="40" rx="36" ry="11" fill="none" stroke="#F97316" strokeWidth="4.5" opacity="0.65"/>
      <ellipse cx="40" cy="40" rx="36" ry="11" fill="none" stroke="#FCD34D" strokeWidth="2" opacity="0.45"/>
      <circle cx="10" cy="24" r="2.5" fill="#FDE047" opacity="0.75"/>
      <circle cx="70" cy="22" r="2" fill="#FDE047" opacity="0.7"/>
      <circle cx="14" cy="56" r="2" fill="white" opacity="0.6"/>
      <circle cx="68" cy="58" r="2.5" fill="white" opacity="0.65"/>
      <path d="M12 26 Q27 33 35 38" stroke="#FCD34D" strokeWidth="1.5" opacity="0.4"/>
      <path d="M68 24 Q53 31 45 38" stroke="#FCD34D" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="40" cy="40" r="19" fill="#0f0c29"/>
      <circle cx="40" cy="40" r="15" fill="#020617"/>
      <circle cx="40" cy="40" r="11" fill="none" stroke="#7c3aed" strokeWidth="2" opacity="0.45"/>
      <circle cx="40" cy="40" r="7" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  ),
}

export default function CharacterArt({ charId, size = 64 }) {
  const art = arts[charId]
  if (!art) return <div style={{ fontSize: size * 0.55, lineHeight: 1, textAlign: 'center' }}>❓</div>
  return <svg viewBox="0 0 80 80" width={size} height={size} style={{ display: 'block' }}>{art.props.children}</svg>
}
