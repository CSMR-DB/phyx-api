import SiegeDataModels from '~src/features/siege/data/siege.datamodels'
import SiegeItemsData from './siege-items.data'

const { OperatorATK, OperatorDEF, Gadget, Ability } = SiegeDataModels
const DATA = SiegeItemsData

export namespace Attackers {
  export const ASH = new OperatorATK(
    'Ash',
    'SWAT',
    [ DATA._G36C, DATA._R4C ],
    [ DATA._57USG, DATA._M45MEUSOC ],
    [ DATA._STUNGRENADE, DATA._BREACHCHARGE ],
    new Gadget('M120 CREM', true, 2)
  )

  export const BLACKBEARD = new OperatorATK(
    'Blackbeard',
    'NAVY SEAL',
    [ DATA._MK17CQB, DATA._SR25 ],
    [ DATA._D50 ],
    [ DATA._BREACHCHARGE, DATA._STUNGRENADE ],
    new Gadget('TARS MK 0 Rifle Shield', false, 2)
  )

  export const BLITZ = new OperatorATK(
    'Blitz',
    'GSG 9',
    [],
    [ DATA._P12 ],
    [ DATA._SMOKEGRENADE, DATA._BREACHCHARGE ],
    new Gadget('G52-Tactical Shield', false, Infinity)
  )

  export const BUCK = new OperatorATK(
    'Buck',
    'JTF2',
    [ DATA._C8SFW, DATA._CAMRS ],
    [ DATA._MK19MM ],
    [ DATA._FRAGGRENADE, DATA._STUNGRENADE ],
    new Gadget('SK 4-12 (Skeleton Key)', true, 24)
  )

  export const CAPITAO = new OperatorATK(
    'Capitão',
    'BOPE',
    [ DATA._PARA308, DATA._M249 ],
    [ DATA._PRB92 ],
    [ DATA._CLAYMORE, DATA._STUNGRENADE ],
    new Gadget('TAC MK0 Tactical Crossbow', true, 6)
  )

  export const DOKKAEBI = new OperatorATK(
    'Dokkaebi',
    '707th S.M.B',
    [ DATA._MK14EBR, DATA._BOSG122 ],
    [ DATA._C75AUTO, DATA._SMG12 ],
    [ DATA._SMOKEGRENADE, DATA._STUNGRENADE ],
    new Gadget('Logic Bomb', false, 2)
  )

  export const FINKA = new OperatorATK(
    'Finka',
    'CBRN',
    [ DATA._SPEAR308, DATA._6P41, DATA._SASG12 ],
    [ DATA._PMM, DATA._GSH18 ],
    [ DATA._BREACHCHARGE, DATA._FRAGGRENADE ],
    new Gadget('Nanobot Shots', false, 3)
  )

  export const FUZE = new OperatorATK(
    'Fuze',
    'Spetsnaz',
    [ DATA._AK12, DATA._6P41, DATA._BALLISTICSHIELD ],
    [ DATA._PMM, DATA._GSH18 ],
    [ DATA._BREACHCHARGE, DATA._SMOKEGRENADE ],
    new Gadget('APM-6 "Matryoshka" Cluster Charge', true, 3)
  )

  export const GLAZ = new OperatorATK(
    'Glaz',
    'Spetsnaz',
    [ DATA._OTS03 ],
    [ DATA._PMM, DATA._GSH18 ],
    [ DATA._SMOKEGRENADE, DATA._CLAYMORE ],
    new Gadget('HDS Flip Sight', false, -1)
  )

  export const GRIDLOCK = new OperatorATK(
    'Gridlock',
    'SASR',
    [ DATA._F90, DATA._M249SAW ],
    [ DATA._SUPERSHORTY, DATA._SDP9MM ],
    [ DATA._SMOKEGRENADE, DATA._BREACHCHARGE ],
    new Gadget('Trax Stingers', true, 3)
  )

  export const HIBANA = new OperatorATK(
    'Hibana',
    'S.A.T',
    [ DATA._TYPE89, DATA._SUPERNOVA ],
    [ DATA._P229, DATA._BEARING9 ],
    [ DATA._STUNGRENADE, DATA._BREACHCHARGE ],
    new Gadget('X-KAIROS', true, 3)
  )

  export const IQ = new OperatorATK(
    'IQ',
    'GSG 9',
    [ DATA._AUGA2, DATA._552COMMANDO, DATA._G8A1 ],
    [ DATA._P12 ],
    [ DATA._BREACHCHARGE, DATA._CLAYMORE ],
    new Gadget('Red MKIII "Spectre" Electronics Detector', false, Infinity)
  )

  export const JACKAL = new OperatorATK(
    'Jackal',
    'G.E.O',
    [ DATA._C7E, DATA._PDW9, DATA._ITA12L ],
    [ DATA._USP40, DATA._ITA12S ],
    [ DATA._BREACHCHARGE, DATA._SMOKEGRENADE ],
    new Gadget('Eyenox Model III', false, 3)
  )

  export const LION = new OperatorATK(
    'Lion',
    'CBRN',
    [ DATA._V308, DATA._417, DATA._SGCQB ],
    [ DATA._P9, DATA._LFP586 ],
    [ DATA._STUNGRENADE, DATA._CLAYMORE ],
    new Gadget('EE-ONE-D', false, 2)
  )

  export const MAVERICK = new OperatorATK(
    'Maverick',
    'GSUTR',
    [ DATA._AR1550, DATA._M4 ],
    [ DATA._1911TACOPS ],
    [ DATA._STUNGRENADE, DATA._CLAYMORE ],
    new Gadget('Exothermic-S "SURI" Torch', true, 5)
  )

  export const MONTAGNE = new OperatorATK(
    'Montagne',
    'GIGN',
    [],
    [ DATA._P9, DATA._LFP586 ],
    [ DATA._STUNGRENADE, DATA._SMOKEGRENADE ],
    new Gadget('"Le Roc" Extendable Shield', false, -1)
  )

  export const NOMAD = new OperatorATK(
    'Nomad',
    'GIGR',
    [ DATA._AK74M, DATA._ARX200 ],
    [ DATA._44MAGSEMIAUTO ],
    [ DATA._CLAYMORE, DATA._BREACHCHARGE ],
    new Gadget('Airjab Launcher', true, 3)
  )

  export const SLEDGE = new OperatorATK(
    'Sledge',
    'SAS',
    [ DATA._L85A2, DATA._M590A1 ],
    [ DATA._P226MK25, DATA._SMG11 ],
    [ DATA._FRAGGRENADE, DATA._STUNGRENADE ],
    new Gadget('The Caber', true, 25),
    new Ability('Tactical Breach')
  )

  export const THATCHER = new OperatorATK(
    'Sledge',
    'SAS',
    [ DATA._L85A2, DATA._M590A1 ],
    [ DATA._P226MK25, DATA._SMG11 ],
    [ DATA._FRAGGRENADE, DATA._STUNGRENADE ],
    new Gadget('EG MKO-EMP Grenade', true, 3)
  )

  export const THERMITE = new OperatorATK(
    'Thermite',
    'SWAT',
    [ DATA._M1014, DATA._556XI ],
    [ DATA._57USG, DATA._M45MEUSOC ],
    [ DATA._CLAYMORE, DATA._STUNGRENADE ],
    new Gadget('Brimstone BC-3', true, 2)
  )

  export const TWITCH = new OperatorATK(
    'Twitch',
    'GIGN',
    [ DATA._F2, DATA._417, DATA._SGCQB ],
    [ DATA._P9, DATA._LFP586 ],
    [ DATA._BREACHCHARGE, DATA._CLAYMORE ],
    new Gadget('RSD Model 1 (Shock Drone)', true, 2)
  )

  export const YING = new OperatorATK(
    'Ying',
    'S.D.U',
    [ DATA._T95LSW, DATA._SIX12 ],
    [ DATA._Q929 ],
    [ DATA._BREACHCHARGE, DATA._CLAYMORE ],
    new Gadget('Candela Device', true, 3)
  )

  export const ZOFIA = new OperatorATK(
    'Zofia',
    'GROM',
    [ DATA._LMGE, DATA._M762 ],
    [ DATA._RG15 ],
    [ DATA._BREACHCHARGE, DATA._CLAYMORE ],
    new Gadget('KS79 Lifeline', false, 2),
    new Ability('Withstand')
  )
}

export namespace Defenders {
  export const ALIBI = new OperatorDEF(
    'Alibi',
    'G.I.S',
    [ DATA._ACS12, DATA._MX4STORM ],
    [ DATA._BAILIFF410, DATA._KERATOS357 ],
    [ DATA._IMPACTGRENADE, DATA._DEPLOYABLESHIELD ],
    new Gadget('Prisma', true, 3)
  )

  export const BANDIT = new OperatorDEF(
    'Bandit',
    'GSG 9',
    [ DATA._M870, DATA._MP7 ],
    [ DATA._P12 ],
    [ DATA._BARBEDWIRE, DATA._NITROCELL ],
    new Gadget('CED-1 (Crude Electrical Device)', true, 4)
  )

  export const CASTLE = new OperatorDEF(
    'Castle',
    'SWAT',
    [ DATA._UMP45, DATA._M1014 ],
    [ DATA._57USG, DATA._M45MEUSOC ],
    [ DATA._BULLETPROOFCAMERA, DATA._IMPACTGRENADE ],
    new Gadget('UTP1-Universal Tactical Panel', true, 5)
  )

  export const DOC = new OperatorDEF(
    'Doc',
    'GIGN',
    [ DATA._MP5, DATA._P90, DATA._SGCQB ],
    [ DATA._P9, DATA._LFP586 ],
    [ DATA._BULLETPROOFCAMERA, DATA._BARBEDWIRE ],
    new Gadget('MPD-0 Stim Pistol', false, 3)
  )

  export const ELA = new OperatorDEF(
    'Ela',
    'GROM',
    [ DATA._SCORPIONEVO3A1, DATA._FO12 ],
    [ DATA._RG15 ],
    [ DATA._BARBEDWIRE, DATA._DEPLOYABLESHIELD ],
    new Gadget('Grzmot Mine', true, 3)
  )

  export const FROST = new OperatorDEF(
    'Frost',
    'JTF2',
    [ DATA._SUPER90, DATA._9MMC1 ],
    [ DATA._MK19MM ],
    [ DATA._BULLETPROOFCAMERA, DATA._BARBEDWIRE ],
    new Gadget('Sterling MK2 LHT (Welcome MAt)', true, 3)
  )

  export const JAGER = new OperatorDEF(
    'Jäger',
    'GSG 9',
    [ DATA._M870, DATA._416CCARBINE ],
    [ DATA._P12 ],
    [ DATA._BARBEDWIRE, DATA._DEPLOYABLESHIELD ],
    new Gadget('ADS-MK IV "Magpie"', true, 3)
  )

  export const KAID = new OperatorDEF(
    'Kaid',
    'GIGR',
    [ DATA._AUGA3, DATA._TCSG12 ],
    [ DATA._44MAGSEMIAUTO ],
    [ DATA._BARBEDWIRE, DATA._IMPACTGRENADE ],
    new Gadget('"Rtila" Electroclaw', true, 2)
  )

  export const KAPKAN = new OperatorDEF(
    'Kapkan',
    'Spetsnaz',
    [ DATA._9X19VSN, DATA._SASG12 ],
    [ DATA._PMM, DATA._GSH18 ],
    [ DATA._IMPACTGRENADE, DATA._NITROCELL ],
    new Gadget('EDD MK II Entry Denial Device', true, 5)
  )

  export const LESION = new OperatorDEF(
    'Lesion',
    'S.D.U',
    [ DATA._SIX12SD, DATA._T5SMG ],
    [ DATA._Q929 ],
    [ DATA._IMPACTGRENADE, DATA._DEPLOYABLESHIELD ],
    new Gadget('Gu Mine', true, 7)
  )

  export const MAESTRO = new OperatorDEF(
    'Maestro',
    'G.I.S',
    [ DATA._ALDA556, DATA._ACS12 ],
    [ DATA._BAILIFF410, DATA._KERATOS357 ],
    [ DATA._BARBEDWIRE, DATA._DEPLOYABLESHIELD ],
    new Gadget('Evil Eye', true, 2)
  )

  export const MIRA = new OperatorDEF(
    'Mira',
    'G.E.O',
    [ DATA._VECTOR45ACP, DATA._ITA12L ],
    [ DATA._USP40, DATA._ITA12S ],
    [ DATA._DEPLOYABLESHIELD, DATA._NITROCELL ],
    new Gadget('Black Mirror', true, 2)
  )

  export const MOZZIE = new OperatorDEF(
    'Mozzie',
    'SASR',
    [ DATA._COMMANDO9, DATA._P10RONI ],
    [ DATA._SUPERSHORTY, DATA._SDP9MM ],
    [ DATA._BARBEDWIRE, DATA._NITROCELL ],
    new Gadget('Pest Launcher', true, 3)
  )

  export const MUTE = new OperatorDEF(
    'Mute',
    'S.A.S',
    [ DATA._MP5K, DATA._M590A1 ],
    [ DATA._P226MK25, DATA._SMG11 ],
    [ DATA._BULLETPROOFCAMERA, DATA._NITROCELL ],
    new Gadget('GC90 Signal Disruptor', true, 3)
  )

  export const PULSE = new OperatorDEF(
    'Pulse',
    'SWAT',
    [ DATA._UMP45, DATA._M1014 ],
    [ DATA._57USG, DATA._M45MEUSOC ],
    [ DATA._BARBEDWIRE, DATA._NITROCELL ],
    new Gadget('HB-5 Cardiac Sensor', false, Infinity)
  )

  export const ROOK = new OperatorDEF(
    'Rook',
    'GIGN',
    [ DATA._MP5, DATA._P90, DATA._SGCQB ],
    [ DATA._P9, DATA._LFP586 ],
    [ DATA._DEPLOYABLESHIELD, DATA._IMPACTGRENADE ],
    new Gadget('R1N "Rhino" Armor', true, 1)
  )

  export const SMOKE = new OperatorDEF(
    'Smoke',
    'S.A.S',
    [ DATA._M590A1, DATA._FMG9 ],
    [ DATA._P226MK25, DATA._SMG11 ],
    [ DATA._BARBEDWIRE, DATA._IMPACTGRENADE ],
    new Gadget('Compound Z8 (Remote Gas Grenade)', true, 3)
  )

  export const TACHANKA = new OperatorDEF(
    'Tachanka',
    'Spetsnaz',
    [ DATA._9X19VSN, DATA._SASG12 ],
    [ DATA._PMM, DATA._GSH18 ],
    [ DATA._BARBEDWIRE, DATA._DEPLOYABLESHIELD ],
    new Gadget('RP-46 Degtyaryov Machine Gun', true, 1)
  )

  export const VALKYRIE = new OperatorDEF(
    'Valkyrie',
    'NAVY SEAL',
    [ DATA._MPX, DATA._SPAS12 ],
    [ DATA._D50 ],
    [ DATA._DEPLOYABLESHIELD, DATA._NITROCELL ],
    new Gadget('Gyro Cam MK2', true, 3)
  )
}

export const ALLOPERATORS = [
  Attackers.ASH,
  Attackers.BLACKBEARD,
  Attackers.BLITZ,
  Attackers.BUCK,
  Attackers.CAPITAO,
  Attackers.GLAZ,
  Attackers.GRIDLOCK,
  Attackers.HIBANA,
  Attackers.IQ,
  Attackers.JACKAL,
  Attackers.LION,
  Attackers.MAVERICK,
  Attackers.MONTAGNE,
  Attackers.NOMAD,
  Attackers.SLEDGE,
  Attackers.THATCHER,
  Attackers.THERMITE,
  Attackers.TWITCH,
  Attackers.YING,
  Attackers.ZOFIA
]
