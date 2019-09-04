import { IApexLegend } from '../interfaces/index.interface'
import { ApexLegendsInjectable } from '../di/ApexLegendsDI'
import { ApexLegendsDatabaseService } from '../services/ApexLegendsDatabaseService'

@ApexLegendsInjectable()
export class ApexLegendsDataManagerMock {
  getLegends(): IApexLegend[] {
    return [
      {
        _id: 'WATTSON',
        name: 'Wattson',
        tactical: 'Wire Thing',
        ultimate: 'Turret Thing',
        class: 'DEFENSIVE'
      },
      {
        _id: 'GIBRALTAR',
        name: 'Gibraltar',
        tactical: 'Dome Shield',
        ultimate: 'Airstrike Thing',
        class: 'DEFENSIVE'
      },
      {
        _id: 'LIFELINE',
        name: 'Lifeline',
        tactical: 'Heal Drone',
        ultimate: 'Care Package',
        class: 'SUPPORT'
      }
    ]
  }

  getLegendIDs(): string[] {
    return [ 'WATTSON', 'GIBRALTAR', 'LIFELINE' ]
  }
}
