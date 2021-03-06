export interface IStrategyDataTransposer {
  readonly uniqueIDs: string[]
  readonly slots: { slot: string; internal_id: string }[]
  readonly map: string
  readonly side: string
}
