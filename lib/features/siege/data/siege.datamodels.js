"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var idGenerator_1 = require("~src/utils/idGenerator");
var SiegeDataModels;
(function (SiegeDataModels) {
    var SiegeItem = /** ~class */ (function () {
        function SiegeItem(name) {
            this.name = name;
            this.internal_id = idGenerator_1.idGenerator(name, { uppercase: true });
        }
        return SiegeItem;
    }());
    var Primary;
    (function (Primary_1) {
        // PRIMARIES
        var Primary = /** ~class */ (function (_super) {
            tslib_1.__extends(Primary, _super);
            function Primary() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.slot = 'primary';
                return _this;
            }
            return Primary;
        }(SiegeItem));
        var AR = /** ~class */ (function (_super) {
            tslib_1.__extends(AR, _super);
            function AR() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.category = 'AR';
                return _this;
            }
            return AR;
        }(Primary));
        Primary_1.AR = AR;
        var SMG = /** ~class */ (function (_super) {
            tslib_1.__extends(SMG, _super);
            function SMG() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.category = 'SMG';
                return _this;
            }
            return SMG;
        }(Primary));
        Primary_1.SMG = SMG;
        var ShotgunP = /** ~class */ (function (_super) {
            tslib_1.__extends(ShotgunP, _super);
            function ShotgunP() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.category = 'SHOTGUN';
                return _this;
            }
            return ShotgunP;
        }(Primary));
        Primary_1.ShotgunP = ShotgunP;
        var DMR = /** ~class */ (function (_super) {
            tslib_1.__extends(DMR, _super);
            function DMR() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.category = 'DMR';
                return _this;
            }
            return DMR;
        }(Primary));
        Primary_1.DMR = DMR;
        var LMG = /** ~class */ (function (_super) {
            tslib_1.__extends(LMG, _super);
            function LMG() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.category = 'LMG';
                return _this;
            }
            return LMG;
        }(Primary));
        Primary_1.LMG = LMG;
        var SHIELD = /** ~class */ (function (_super) {
            tslib_1.__extends(SHIELD, _super);
            function SHIELD() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.category = 'SHIELD';
                return _this;
            }
            return SHIELD;
        }(Primary));
        Primary_1.SHIELD = SHIELD;
    })(Primary = SiegeDataModels.Primary || (SiegeDataModels.Primary = {}));
    var Secondary;
    (function (Secondary_1) {
        // SECONDARIES
        var Secondary = /** ~class */ (function (_super) {
            tslib_1.__extends(Secondary, _super);
            function Secondary() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.slot = 'secondary';
                return _this;
            }
            return Secondary;
        }(SiegeItem));
        var Handgun = /** ~class */ (function (_super) {
            tslib_1.__extends(Handgun, _super);
            function Handgun() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.category = 'HANDGUN';
                return _this;
            }
            return Handgun;
        }(Secondary));
        Secondary_1.Handgun = Handgun;
        var MachinePistol = /** ~class */ (function (_super) {
            tslib_1.__extends(MachinePistol, _super);
            function MachinePistol() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.category = 'MACHINE PISTOL';
                return _this;
            }
            return MachinePistol;
        }(Secondary));
        Secondary_1.MachinePistol = MachinePistol;
        var ShotgunS = /** ~class */ (function (_super) {
            tslib_1.__extends(ShotgunS, _super);
            function ShotgunS() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.category = 'SHOTGUN';
                return _this;
            }
            return ShotgunS;
        }(Secondary));
        Secondary_1.ShotgunS = ShotgunS;
    })(Secondary = SiegeDataModels.Secondary || (SiegeDataModels.Secondary = {}));
    // GEAR
    var Gadget = /** ~class */ (function (_super) {
        tslib_1.__extends(Gadget, _super);
        function Gadget(name, deployable, count) {
            var _this = _super.call(this, name) || this;
            _this.name = name;
            _this.deployable = deployable;
            _this.count = count;
            _this.slot = 'gadget';
            return _this;
        }
        return Gadget;
    }(SiegeItem));
    SiegeDataModels.Gadget = Gadget;
    // UTILITIES
    var Utility = /** ~class */ (function (_super) {
        tslib_1.__extends(Utility, _super);
        function Utility(name, count) {
            var _this = _super.call(this, name) || this;
            _this.name = name;
            _this.count = count;
            _this.slot = 'utility';
            return _this;
        }
        return Utility;
    }(SiegeItem));
    SiegeDataModels.Utility = Utility;
    // ABILITY
    var Ability = /** ~class */ (function (_super) {
        tslib_1.__extends(Ability, _super);
        function Ability() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.slot = 'ability';
            return _this;
        }
        return Ability;
    }(SiegeItem));
    SiegeDataModels.Ability = Ability;
    var Operator = /** ~class */ (function (_super) {
        tslib_1.__extends(Operator, _super);
        function Operator(name, organization, primaries, secondaries, utilities, gadget, ability) {
            var _this = _super.call(this, name) || this;
            _this.name = name;
            _this.organization = organization;
            _this.primaries = primaries;
            _this.secondaries = secondaries;
            _this.utilities = utilities;
            _this.gadget = gadget;
            _this.ability = ability;
            return _this;
        }
        return Operator;
    }(SiegeItem));
    var OperatorATK = /** ~class */ (function (_super) {
        tslib_1.__extends(OperatorATK, _super);
        function OperatorATK() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.side = 'ATK';
            return _this;
        }
        return OperatorATK;
    }(Operator));
    SiegeDataModels.OperatorATK = OperatorATK;
    var OperatorDEF = /** ~class */ (function (_super) {
        tslib_1.__extends(OperatorDEF, _super);
        function OperatorDEF() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.side = 'DEF';
            return _this;
        }
        return OperatorDEF;
    }(Operator));
    SiegeDataModels.OperatorDEF = OperatorDEF;
})(SiegeDataModels || (SiegeDataModels = {}));
exports.default = SiegeDataModels;
