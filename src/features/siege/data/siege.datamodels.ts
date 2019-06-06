import { idGenerator } from '~src/utils/idGenerator'

namespace SiegeDataModels {
  type Side = 'ATK' | 'DEF'
  type Slot = 'primary' | 'secondary' | 'utility' | 'gadget' | 'ability'
  type PrimaryCategory = 'AR' | 'SMG' | 'SHOTGUN' | 'DMR' | 'LMG' | 'SHIELD'
  type SecondaryCategory = 'HANDGUN' | 'MACHINE PISTOL' | 'SHOTGUN'
  type Organization =
    | 'SASR'
    | 'SAS'
    | 'GIGN'
    | 'GIGR'
    | 'GSG 9'
    | 'SWAT'
    | 'CBRN'
    | 'G.E.O'
    | 'GSUTR'
    | 'Spetsnaz'
    | 'NAVY SEAL'
    | 'JTF2'
    | 'BOPE'
    | '707th S.M.B'
    | 'S.A.T'
    | 'S.D.U'
    | 'GROM'
    | 'G.I.S'
    | 'S.A.S'

  abstract class SiegeItem {
    public readonly internal_id: string

    constructor(public readonly name: string) {
      this.internal_id = idGenerator(name, { uppercase: true })
    }
  }

  export namespace Primary {
    // PRIMARIES
    abstract class Primary extends SiegeItem {
      public readonly slot: Slot = 'primary'
    }

    export class AR extends Primary {
      public readonly category: PrimaryCategory = 'AR'
    }

    export class SMG extends Primary {
      public readonly category: PrimaryCategory = 'SMG'
    }

    export class ShotgunP extends Primary {
      public readonly category: PrimaryCategory = 'SHOTGUN'
    }

    export class DMR extends Primary {
      public readonly category: PrimaryCategory = 'DMR'
    }

    export class LMG extends Primary {
      public readonly category: PrimaryCategory = 'LMG'
    }

    export class SHIELD extends Primary {
      public readonly category: PrimaryCategory = 'SHIELD'
    }
  }

  export namespace Secondary {
    // SECONDARIES
    abstract class Secondary extends SiegeItem {
      public readonly slot: Slot = 'secondary'
    }

    export class Handgun extends Secondary {
      public readonly category: SecondaryCategory = 'HANDGUN'
    }

    export class MachinePistol extends Secondary {
      public readonly category: SecondaryCategory = 'MACHINE PISTOL'
    }

    export class ShotgunS extends Secondary {
      public readonly category: SecondaryCategory = 'SHOTGUN'
    }
  }

  // GEAR
  export class Gadget extends SiegeItem {
    public readonly slot: Slot = 'gadget'

    constructor(
      public readonly name: string,
      public readonly deployable: boolean,
      public readonly count: number
    ) {
      super(name)
    }
  }

  // UTILITIES
  export class Utility extends SiegeItem {
    public readonly slot: Slot = 'utility'

    constructor(public readonly name: string, public readonly count: number) {
      super(name)
    }
  }

  // ABILITY
  export class Ability extends SiegeItem {
    public readonly slot: Slot = 'ability'
  }

  abstract class Operator extends SiegeItem {
    constructor(
      public readonly name: string,
      public readonly organization: Organization,
      public readonly primaries: (
        | Primary.AR
        | Primary.SMG
        | Primary.ShotgunP
        | Primary.DMR
        | Primary.LMG)[],
      public readonly secondaries: (
        | Secondary.Handgun
        | Secondary.MachinePistol
        | Secondary.ShotgunS)[],
      public readonly utilities: Utility[],
      public readonly gadget: Gadget,
      public readonly ability?: Ability
    ) {
      super(name)
    }
  }

  export class OperatorATK extends Operator {
    public readonly side: Side = 'ATK'
  }

  export class OperatorDEF extends Operator {
    public readonly side: Side = 'DEF'
  }
}

export default SiegeDataModels
