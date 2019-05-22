"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var idGenerator_1 = require("~src/utils/idGenerator");
var R6SIEGE;
(function (R6SIEGE) {
    function DATAFACTORY(options) {
        var idGenerator = options.idGenerator;
        var LOCAL_INVENTORY = {
            ITEMS: [],
            MAPS: [],
            OPERATORS: []
        };
        function categorizer(slot, category) {
            var categoryOptions = {
                primary: { categories: ['weapon', category] },
                secondary: { categories: ['weapon', category] },
                utility: { categories: ['utility'] },
                gadget: { categories: ['gadget'] },
                ability: { categories: ['ability'] }
            };
            return categoryOptions[slot];
        }
        function addItem(name, slot, category, count) {
            var E = Object.freeze(Object.assign({}, { name: name, slot: slot, count: count }, { internal_id: idGenerator(name, { uppercase: true }) }, categorizer(slot, category)));
            LOCAL_INVENTORY.ITEMS.push(E);
        }
        function getItems() {
            return LOCAL_INVENTORY.ITEMS;
        }
        function getItemByID(id) {
            return getItems().find(function (item) { return item.internal_id === id; });
        }
        function addMap(name, official) {
            var M = Object.freeze(Object.assign({}, { name: name, official: official }, { map_id: idGenerator(name, { uppercase: true }) }));
            LOCAL_INVENTORY.MAPS.push(M);
        }
        function getMapByID(id) {
            return getMaps().find(function (item) { return item.map_id === id; });
        }
        function getMaps() {
            return LOCAL_INVENTORY.MAPS;
        }
        function addOperator(side, name, organization, primaries, secondaries, utilities, 
        /**
         * ~param `0` = a string using the full name of a gadget
         * ~param `1` = a boolean describing whether or not a gadget can be physically deployed
         * ~param `2` = a number to define how many times a specific gadget can be used or deployed
         */
        gadget, ability) {
            var O = Object.freeze(Object.assign({}, {
                side: side,
                name: name,
                organization: organization,
                primaries: primaries,
                secondaries: secondaries,
                utilities: utilities,
                gadget: Object.assign({ name: gadget[0], deployable: gadget[1], count: gadget[2] }, { internal_id: idGenerator(gadget[0], { uppercase: true }) }),
                ability: (ability && Object.assign({ name: ability }, { internal_id: idGenerator(ability, { uppercase: true }) })) || undefined
            }, { internal_id: idGenerator(name, { uppercase: true }) }));
            LOCAL_INVENTORY.OPERATORS.push(O);
        }
        function getOperators() {
            return LOCAL_INVENTORY.OPERATORS;
        }
        function getOperatorByID(id) {
            return getOperators().find(function (item) { return item.internal_id === id; });
        }
        return Object.freeze({
            addMap: addMap,
            getMaps: getMaps,
            getMapByID: getMapByID,
            addItem: addItem,
            getItems: getItems,
            getItemByID: getItemByID,
            addOperator: addOperator,
            getOperators: getOperators,
            getOperatorByID: getOperatorByID
        });
    }
    R6SIEGE.DATAFACTORY = DATAFACTORY;
})(R6SIEGE = exports.R6SIEGE || (exports.R6SIEGE = {}));
var R6SIEGEFACTORY = R6SIEGE.DATAFACTORY({ idGenerator: idGenerator_1.idGenerator });
exports.R6SIEGEFACTORY = R6SIEGEFACTORY;
R6SIEGEFACTORY.addItem('L85A2', 'primary', 'AR');
R6SIEGEFACTORY.addItem('L85A2', 'primary', 'AR');
R6SIEGEFACTORY.addItem('AR33', 'primary', 'AR');
R6SIEGEFACTORY.addItem('G36C', 'primary', 'AR');
R6SIEGEFACTORY.addItem('R4-C', 'primary', 'AR');
R6SIEGEFACTORY.addItem('556xi', 'primary', 'AR');
R6SIEGEFACTORY.addItem('F2', 'primary', 'AR');
R6SIEGEFACTORY.addItem('AK-12', 'primary', 'AR');
R6SIEGEFACTORY.addItem('AUG A2', 'primary', 'AR');
R6SIEGEFACTORY.addItem('552 Commando', 'primary', 'AR');
R6SIEGEFACTORY.addItem('416-C Carbine', 'primary', 'AR');
R6SIEGEFACTORY.addItem('C8-SFW', 'primary', 'AR');
R6SIEGEFACTORY.addItem('Mk17 CQB', 'primary', 'AR');
R6SIEGEFACTORY.addItem('PARA-308', 'primary', 'AR');
R6SIEGEFACTORY.addItem('Type-89', 'primary', 'AR');
R6SIEGEFACTORY.addItem('C7E', 'primary', 'AR');
R6SIEGEFACTORY.addItem('M762', 'primary', 'AR');
R6SIEGEFACTORY.addItem('V308', 'primary', 'AR');
R6SIEGEFACTORY.addItem('Spear .308', 'primary', 'AR');
R6SIEGEFACTORY.addItem('AR-15.50', 'primary', 'AR');
R6SIEGEFACTORY.addItem('M4', 'primary', 'AR');
R6SIEGEFACTORY.addItem('AK-74M', 'primary', 'AR');
R6SIEGEFACTORY.addItem('ARX200', 'primary', 'AR');
R6SIEGEFACTORY.addItem('F90', 'primary', 'AR');
R6SIEGEFACTORY.addItem('Commando 9', 'primary', 'AR');
R6SIEGEFACTORY.addItem('FMG-9', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('MP5K', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('UMP45', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('MP5', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('P90', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('9x19VSN', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('MP7', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('9mm C1', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('MPX', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('M12', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('MP5SD', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('PDW9', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('Vector .45 ACP', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('T-5 SMG', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('Scorpion EVO 3 A1', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('K1A', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('Mx4 Storm', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('AUG A3', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('P10 RONI', 'primary', 'SMG');
R6SIEGEFACTORY.addItem('M590A1', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('M1014', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('SG-CQB', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('SASG-12', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('M870', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('Super 90', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('SPAS-12', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('SPAS-15', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('SuperNova', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('ITA12L', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('SIX12', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('SIX12 SD', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('FO-12', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('BOSG.12.2', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('ACS12', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('TCSG12', 'primary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('417', 'primary', 'DMR');
R6SIEGEFACTORY.addItem('OTs-03', 'primary', 'DMR');
R6SIEGEFACTORY.addItem('CAMRS', 'primary', 'DMR');
R6SIEGEFACTORY.addItem('SR-25', 'primary', 'DMR');
R6SIEGEFACTORY.addItem('Mk 14 EBR', 'primary', 'DMR');
R6SIEGEFACTORY.addItem('6P41', 'primary', 'LMG');
R6SIEGEFACTORY.addItem('G8A1', 'primary', 'LMG');
R6SIEGEFACTORY.addItem('M249', 'primary', 'LMG');
R6SIEGEFACTORY.addItem('T-95 LSW', 'primary', 'LMG');
R6SIEGEFACTORY.addItem('LMG-E', 'primary', 'LMG');
R6SIEGEFACTORY.addItem('ALDA 5.56', 'primary', 'LMG');
R6SIEGEFACTORY.addItem('M249 SAW', 'primary', 'LMG');
R6SIEGEFACTORY.addItem('Ballistic Shield', 'primary', 'Misc');
// SECONDARIES
R6SIEGEFACTORY.addItem('P226 Mk 25', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('M45 MEUSOC', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('5.7 USG', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('P9', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('LFP586', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('Gsh-18', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('PMM', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('P12', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('Mk1 9mm', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('D-50', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('PRB92', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('P229', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('USP40', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('Q-929', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('RG15', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('Bailiff 410', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('Keratos .357', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('1911 TACOPS', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('P-10C', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('.44_Mag_Semi-Auto', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('SDP 9mm', 'secondary', 'Pistol');
R6SIEGEFACTORY.addItem('SMG-11', 'secondary', 'SMG');
R6SIEGEFACTORY.addItem('Bearing 9', 'secondary', 'SMG');
R6SIEGEFACTORY.addItem('C75 Auto', 'secondary', 'SMG');
R6SIEGEFACTORY.addItem('SMG-12', 'secondary', 'SMG');
R6SIEGEFACTORY.addItem('SPSMG9', 'secondary', 'SMG');
R6SIEGEFACTORY.addItem('ITA12S', 'secondary', 'SHOTGUN');
R6SIEGEFACTORY.addItem('Super Shorty', 'secondary', 'SHOTGUN');
// UTILITY
R6SIEGEFACTORY.addItem('Frag Grenade', 'utility', 'utility', 2);
R6SIEGEFACTORY.addItem('Stun Grenade', 'utility', 'utility', 3);
R6SIEGEFACTORY.addItem('Breach Charge', 'utility', 'utility', 3);
R6SIEGEFACTORY.addItem('Claymore', 'utility', 'utility', 1);
R6SIEGEFACTORY.addItem('Impact Grenade', 'utility', 'utility', 2);
R6SIEGEFACTORY.addItem('Bulletproof Camera', 'utility', 'utility', 1);
R6SIEGEFACTORY.addItem('Deployable Shield', 'utility', 'utility', 1);
R6SIEGEFACTORY.addItem('Barbed Wire', 'utility', 'utility', 2);
R6SIEGEFACTORY.addItem('Smoke Grenade', 'utility', 'utility', 2);
R6SIEGEFACTORY.addItem('Nitro Cell', 'utility', 'utility', 1);
// MAPS
R6SIEGEFACTORY.addMap('Consulate', true);
// ATTACKERS
R6SIEGEFACTORY.addOperator('ATK', 'Ash', 'SWAT', ['G36C', 'R4C'], ['57USG', 'M45MEUSOC'], ['STUNGRENADE', 'BREACHCHARGE'], ['M120 CREM', true, 2]);
R6SIEGEFACTORY.addOperator('ATK', 'Blackbeard', 'NAVY SEAL', ['MK17CQB', 'SR25'], ['D50'], ['BREACHCHARGE', 'STUNGRENADE'], ['TARS MK 0 Rifle Shield', false, 2]);
R6SIEGEFACTORY.addOperator('ATK', 'Blitz', 'GSG 9', [], ['P12'], ['SMOKEGRENADE', 'BREACHCHARGE'], ['G52-Tactical Shield', false, Infinity]);
R6SIEGEFACTORY.addOperator('ATK', 'Buck', 'JTF2', ['C8SFW', 'CAMRS'], ['MK19MM'], ['FRAGGRENADE', 'STUNGRENADE'], ['SK 4-12 (Skeleton Key)', true, 24]);
R6SIEGEFACTORY.addOperator('ATK', 'Capitão', 'BOPE', ['PARA308', 'M249'], ['PRB92'], ['CLAYMORE', 'STUNGRENADE'], ['TAC MK0 Tactical Crossbow', true, 6]);
R6SIEGEFACTORY.addOperator('ATK', 'Dokkaebi', '707th S.M.B', ['MK14EBR', 'BOSG122'], ['C75AUTO', 'SMG12'], ['SMOKEGRENADE', 'STUNGRENADE'], ['Logic Bomb', false, 2]);
R6SIEGEFACTORY.addOperator('ATK', 'Finka', 'CBRN', ['SPEAR308', '6P41', 'SASG12'], ['PMM', 'GSH18'], ['BREACHCHARGE', 'FRAGGRENADE'], ['Nanobot Shots', false, 3]);
R6SIEGEFACTORY.addOperator('ATK', 'Fuze', 'Spetsnaz', ['AK12', '6P41', 'BALLISTICSHIELD'], ['PMM', 'GSH18'], ['BREACHCHARGE', 'SMOKEGRENADE'], ['APM-6 "Matryoshka" Cluster Charge', true, 3]);
R6SIEGEFACTORY.addOperator('ATK', 'Glaz', 'Spetsnaz', ['OTS03'], ['PMM', 'GSH18'], ['SMOKEGRENADE', 'CLAYMORE'], ['HDS Flip Sight', false, -1]);
R6SIEGEFACTORY.addOperator('ATK', 'Gridlock', 'SASR', ['F90', 'M249SAW'], ['SUPERSHORTY', 'SDP9MM'], ['SMOKEGRENADE', 'BREACHCHARGE'], ['Trax Stingers', true, 3]);
R6SIEGEFACTORY.addOperator('ATK', 'Hibana', 'S.A.T', ['TYPE89', 'SUPERNOVA'], ['P229', 'BEARING9'], ['STUNGRENADE', 'BREACHCHARGE'], ['X-KAIROS', true, 3]);
R6SIEGEFACTORY.addOperator('ATK', 'IQ', 'GSG 9', ['AUGA2', '552COMMANDO', 'G8A1'], ['P12'], ['BREACHCHARGE', 'CLAYMORE'], ['Red MKIII "Spectre" Electronics Detector', false, Infinity]);
R6SIEGEFACTORY.addOperator('ATK', 'Jackal', 'G.E.O', ['C7E', 'PDW9', 'ITA12L'], ['USP40', 'ITA12S'], ['BREACHCHARGE', 'SMOKEGRENADE'], ['Eyenox Model III', false, 3]);
R6SIEGEFACTORY.addOperator('ATK', 'Lion', 'CBRN', ['V308', '417', 'SGCQB'], ['P9', 'LFP586'], ['STUNGRENADE', 'CLAYMORE'], ['EE-ONE-D', false, 2]);
R6SIEGEFACTORY.addOperator('ATK', 'Maverick', 'GSUTR', ['AR1550', 'M4'], ['1911TACOPS'], ['STUNGRENADE', 'CLAYMORE'], ['Exothermic-S "SURI" Torch', true, 5]);
R6SIEGEFACTORY.addOperator('ATK', 'Montagne', 'GIGN', [], ['P9', 'LFP586'], ['STUNGRENADE', 'SMOKEGRENADE'], ['"Le Roc" Extendable Shield', false, Infinity]);
R6SIEGEFACTORY.addOperator('ATK', 'Nomad', 'GIGR', ['AK74M', 'ARX200'], ['44MAGSEMIAUTO'], ['CLAYMORE', 'BREACHCHARGE'], ['Airjab Launcher', true, 3]);
R6SIEGEFACTORY.addOperator('ATK', 'Sledge', 'SAS', ['L85A2', 'M590A1'], ['P226MK25', 'SMG11'], ['FRAGGRENADE', 'STUNGRENADE'], ['The Caber', true, 25], 'Tactical Breach');
R6SIEGEFACTORY.addOperator('ATK', 'Sledge', 'SAS', ['L85A2', 'M590A1'], ['P226MK25', 'SMG11'], ['FRAGGRENADE', 'STUNGRENADE'], ['EG MKO-EMP Grenade', true, 3]);
R6SIEGEFACTORY.addOperator('ATK', 'Thermite', 'SWAT', ['M1014', '556XI'], ['57USG', 'M45MEUSOC'], ['CLAYMORE', 'STUNGRENADE'], ['Brimstone BC-3', true, 2]);
R6SIEGEFACTORY.addOperator('ATK', 'Twitch', 'GIGN', ['F2', '417', 'SGCQB'], ['P9', 'LFP586'], ['BREACHCHARGE', 'CLAYMORE'], ['RSD Model 1 (Shock Drone)', true, 2]);
R6SIEGEFACTORY.addOperator('ATK', 'Ying', 'S.D.U', ['T95LSW', 'SIX12'], ['Q929'], ['BREACHCHARGE', 'CLAYMORE'], ['Candela Device', true, 3]);
R6SIEGEFACTORY.addOperator('ATK', 'Zofia', 'GROM', ['LMGE', 'M762'], ['RG15'], ['BREACHCHARGE', 'CLAYMORE'], ['KS79 Lifeline', false, 2], 'Withstand');
// DEFENDERS
R6SIEGEFACTORY.addOperator('DEF', 'Alibi', 'G.I.S', ['ACS12', 'MX4STORM'], ['BAILIFF410', 'KERATOS357'], ['IMPACTGRENADE', 'DEPLOYABLESHIELD'], ['Prisma', true, 3]);
R6SIEGEFACTORY.addOperator('DEF', 'Bandit', 'GSG 9', ['M870', 'MP7'], ['P12'], ['BARBEDWIRE', 'NITROCELL'], ['CED-1 (Crude Electrical Device)', true, 4]);
R6SIEGEFACTORY.addOperator('DEF', 'Castle', 'SWAT', ['UMP45', 'M1014'], ['57USG', 'M45MEUSOC'], ['BULLETPROOFCAMERA', 'IMPACTGRENADE'], ['UTP1-Universal Tactical Panel', true, 5]);
R6SIEGEFACTORY.addOperator('DEF', 'Doc', 'GIGN', ['MP5', 'P90', 'SGCQB'], ['P9', 'LFP586'], ['BULLETPROOFCAMERA', 'BARBEDWIRE'], ['MPD-0 Stim Pistol', false, 3]);
R6SIEGEFACTORY.addOperator('DEF', 'Ela', 'GROM', ['SCORPIONEVO3A1', 'FO12'], ['RG15'], ['BARBEDWIRE', 'DEPLOYABLESHIELD'], ['Grzmot Mine', true, 3]);
R6SIEGEFACTORY.addOperator('DEF', 'Frost', 'JTF2', ['SUPER90', '9MMC1'], ['MK19MM'], ['BULLETPROOFCAMERA', 'BARBEDWIRE'], ['Sterling MK2 LHT (Welcome MAt)', true, 3]);
R6SIEGEFACTORY.addOperator('DEF', 'Jäger', 'GSG 9', ['M870', '416CCARBINE'], ['P12'], ['BARBEDWIRE', 'DEPLOYABLESHIELD'], ['ADS-MK IV "Magpie"', true, 3]);
R6SIEGEFACTORY.addOperator('DEF', 'Kaid', 'GIGR', ['AUGA3', 'TCSG12'], ['44MAGSEMIAUTO'], ['BARBEDWIRE', 'IMPACTGRENADE'], ['"Rtila" Electroclaw', true, 2]);
R6SIEGEFACTORY.addOperator('DEF', 'Kapkan', 'Spetsnaz', ['9X19VSN', 'SASG12'], ['PMM', 'GSH18'], ['IMPACTGRENADE', 'NITROCELL'], ['EDD MK II Entry Denial Device', true, 5]);
R6SIEGEFACTORY.addOperator('DEF', 'Lesion', 'S.D.U', ['SIX12SD', 'T5SMG'], ['Q929'], ['IMPACTGRENADE', 'DEPLOYABLESHIELD'], ['Gu Mine', true, 7]);
R6SIEGEFACTORY.addOperator('DEF', 'Maestro', 'G.I.S', ['ALDA556', 'ACS12'], ['BAILIFF410', 'KERATOS357'], ['BARBEDWIRE', 'DEPLOYABLESHIELD'], ['Evil Eye', true, 2]);
R6SIEGEFACTORY.addOperator('DEF', 'Mira', 'G.E.O', ['VECTOR45ACP', 'ITA12L'], ['USP40', 'ITA12S'], ['DEPLOYABLESHIELD', 'NITROCELL'], ['Black Mirror', true, 2]);
R6SIEGEFACTORY.addOperator('DEF', 'Mozzie', 'SASR', ['COMMANDO9', 'P10RONI'], ['SUPERSHORTY', 'SDP9MM'], ['BARBEDWIRE', 'NITROCELL'], ['Pest Launcher', true, 3]);
R6SIEGEFACTORY.addOperator('DEF', 'Mute', 'S.A.S', ['MP5K', 'M590A1'], ['P226MK25', 'SMG11'], ['BULLETPROOFCAMERA', 'NITROCELL'], ['GC90 Signal Disruptor', true, 3]);
R6SIEGEFACTORY.addOperator('DEF', 'Pulse', 'SWAT', ['UMP45', 'M1014'], ['57USG', 'M45MEUSOC'], ['BARBEDWIRE', 'NITROCELL'], ['HB-5 Cardiac Sensor', false, Infinity]);
R6SIEGEFACTORY.addOperator('DEF', 'Rook', 'GIGN', ['MP5', 'P90', 'SGCQB'], ['P9', 'LFP586'], ['DEPLOYABLESHIELD', 'IMPACTGRENADE'], ['R1N "Rhino" Armor', true, 1]);
R6SIEGEFACTORY.addOperator('DEF', 'Smoke', 'S.A.S', ['M590A1', 'FMG9'], ['P226MK25', 'SMG11'], ['BARBEDWIRE', 'IMPACTGRENADE'], ['Compound Z8 (Remote Gas Grenade)', true, 3]);
R6SIEGEFACTORY.addOperator('DEF', 'Tachanka', 'Spetsnaz', ['9X19VSN', 'SASG12'], ['PMM', 'GSH18'], ['BARBEDWIRE', 'DEPLOYABLESHIELD'], ['RP-46 Degtyaryov Machine Gun', true, 1]);
R6SIEGEFACTORY.addOperator('DEF', 'Valkyrie', 'NAVY SEAL', ['MPX', 'SPAS12'], ['D50'], ['DEPLOYABLESHIELD', 'NITROCELL'], ['Gyro Cam MK2', true, 3]);
// writeFileSync('./factory.json', R6SIEGEFACTORY.getItems())
