import SiegeDataModels from '~src/features/siege/data/siege.datamodels'
const {
  Primary: { AR, SMG, ShotgunP, DMR, LMG, SHIELD },
  Secondary: { Handgun, ShotgunS, MachinePistol },
  Utility
} = SiegeDataModels

namespace SiegeItemsData {
  // PRIMARIES
  export const _L85A2 = new AR('L85A2')
  export const _AR33 = new AR('AR33')
  export const _G36C = new AR('G36C')
  export const _R4C = new AR('R4-C')
  export const _556XI = new AR('556xi')
  export const _F2 = new AR('F2')
  export const _AK12 = new AR('AK-12')
  export const _AUGA2 = new AR('AUG A2')
  export const _552COMMANDO = new AR('552 Commando')
  export const _416CCARBINE = new AR('416-C Carbine')
  export const _C8SFW = new AR('C8-SFW')
  export const _MK17CQB = new AR('Mk17 CQB')
  export const _PARA308 = new AR('PARA-308')
  export const _TYPE89 = new AR('Type-89')
  export const _C7E = new AR('C7E')
  export const _M762 = new AR('M762')
  export const _V308 = new AR('V308')
  export const _SPEAR308 = new AR('Spear .308')
  export const _AR1550 = new AR('AR-15.50')
  export const _M4 = new AR('M4')
  export const _AK74M = new AR('AK-74M')
  export const _ARX200 = new AR('ARX200')
  export const _F90 = new AR('F90')
  export const _COMMANDO9 = new AR('Commando 9')

  export const _FMG9 = new SMG('FMG-9')
  export const _MP5K = new SMG('MP5K')
  export const _UMP45 = new SMG('UMP45')
  export const _MP5 = new SMG('MP5')
  export const _P90 = new SMG('P90')
  export const _9X19VSN = new SMG('9x19VSN')
  export const _MP7 = new SMG('MP7')
  export const _9MMC1 = new SMG('9mm C1')
  export const _MPX = new SMG('MPX')
  export const _M12 = new SMG('M12')
  export const _MP5SD = new SMG('MP5SD')
  export const _PDW9 = new SMG('PDW9')
  export const _VECTOR45ACP = new SMG('Vector .45 ACP')
  export const _T5SMG = new SMG('T-5 SMG')
  export const _SCORPIONEVO3A1 = new SMG('Scorpion EVO 3 A1')
  export const _K1A = new SMG('K1A')
  export const _MX4STORM = new SMG('Mx4 Storm')
  export const _AUGA3 = new SMG('AUG A3')
  export const _P10RONI = new SMG('P10 RONI')

  export const _M590A1 = new ShotgunP('M590A1')
  export const _M1014 = new ShotgunP('M1014')
  export const _SGCQB = new ShotgunP('SG-CQB')
  export const _SASG12 = new ShotgunP('SASG-12')
  export const _M870 = new ShotgunP('M870')
  export const _SUPER90 = new ShotgunP('Super 90')
  export const _SPAS12 = new ShotgunP('SPAS-12')
  export const _SPAS15 = new ShotgunP('SPAS-15')
  export const _SUPERNOVA = new ShotgunP('SuperNova')
  export const _ITA12L = new ShotgunP('ITA12L')
  export const _SIX12 = new ShotgunP('SIX12')
  export const _SIX12SD = new ShotgunP('SIX12 SD')
  export const _FO12 = new ShotgunP('FO-12')
  export const _BOSG122 = new ShotgunP('BOSG.12.2')
  export const _ACS12 = new ShotgunP('ACS12')
  export const _TCSG12 = new ShotgunP('TCSG12')

  export const _417 = new DMR('417')
  export const _OTS03 = new DMR('OTs-03')
  export const _CAMRS = new DMR('CAMRS')
  export const _SR25 = new DMR('SR-25')
  export const _MK14EBR = new DMR('Mk 14 EBR')

  export const _6P41 = new LMG('6P41')
  export const _G8A1 = new LMG('G8A1')
  export const _M249 = new LMG('M249')
  export const _T95LSW = new LMG('T-95 LSW')
  export const _LMGE = new LMG('LMG-E')
  export const _ALDA556 = new LMG('ALDA 5.56')
  export const _M249SAW = new LMG('M249 SAW')

  export const _BALLISTICSHIELD = new SHIELD('Ballistic Shield')

  // SECONDARIES
  export const _P226MK25 = new Handgun('P226 Mk 25')
  export const _M45MEUSOC = new Handgun('M45 MEUSOC')
  export const _57USG = new Handgun('5.7 USG')
  export const _P9 = new Handgun('P9')
  export const _LFP586 = new Handgun('LFP586')
  export const _GSH18 = new Handgun('Gsh-18')
  export const _PMM = new Handgun('PMM')
  export const _P12 = new Handgun('P12')
  export const _MK19MM = new Handgun('Mk1 9mm')
  export const _D50 = new Handgun('D-50')
  export const _PRB92 = new Handgun('PRB92')
  export const _P229 = new Handgun('P229')
  export const _USP40 = new Handgun('USP40')
  export const _Q929 = new Handgun('Q-929')
  export const _RG15 = new Handgun('RG15')
  export const _BAILIFF410 = new Handgun('Bailiff 410')
  export const _KERATOS357 = new Handgun('Keratos .357')
  export const _1911TACOPS = new Handgun('1911 TACOPS')
  export const _P10C = new Handgun('P-10C')
  export const _44MAGSEMIAUTO = new Handgun('.44_Mag_Semi-Auto')
  export const _SDP9MM = new Handgun('SDP 9mm')

  export const _SMG11 = new MachinePistol('SMG-11')
  export const _BEARING9 = new MachinePistol('Bearing 9')
  export const _C75AUTO = new MachinePistol('C75 Auto')
  export const _SMG12 = new MachinePistol('SMG-12')
  export const _SPSMG9 = new MachinePistol('SPSMG9')

  export const _ITA12S = new ShotgunS('ITA12S')
  export const _SUPERSHORTY = new ShotgunS('Super Shorty')

  // UTILITY
  export const _FRAGGRENADE = new Utility('Frag Grenade', 2)
  export const _STUNGRENADE = new Utility('Stun Grenade', 3)
  export const _BREACHCHARGE = new Utility('Breach Charge', 3)
  export const _CLAYMORE = new Utility('Claymore', 1)
  export const _IMPACTGRENADE = new Utility('Impact Grenade', 2)
  export const _BULLETPROOFCAMERA = new Utility('Bulletproof Camera', 1)
  export const _DEPLOYABLESHIELD = new Utility('Deployable Shield', 1)
  export const _BARBEDWIRE = new Utility('Barbed Wire', 2)
  export const _SMOKEGRENADE = new Utility('Smoke Grenade', 2)
  export const _NITROCELL = new Utility('Nitro Cell', 1)
}

export default SiegeItemsData
