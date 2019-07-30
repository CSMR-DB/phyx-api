import { $DIContainer, InjectableType, Injectable } from '~src/tiny-di/tiny-di'

export const ApexLegendsContainer: $DIContainer = new $DIContainer()
export const ApexLegendsInjectable: InjectableType = Injectable(
  ApexLegendsContainer
)
