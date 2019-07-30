// tslint:disable-next-line: no-import-side-effect
import 'reflect-metadata'

export interface Type<T> {
  new (...args: any[]): T
}

type GenericClassDecorator<T> = (target: T) => void

export type InjectableType = () => GenericClassDecorator<Type<Object>>

/**
 * **$DIContainer**
 * @property injectables: a Map of all resolved Injectables using the Injectable(containerRef) Decorator
 * @method register: a method to call inside the Injectable decorator to add a dependency to the list
 * @method resolve<T> construct dependency from injectables (default), or resolve dependencies manually
 * @example
 * const FeatureDC = new $DIContainer() // Default, only registered dependencies will resolve using this Container construction
 * const FeatureDCWithAutoResolve = new $DIContainer({autoResolve: true}) // This will also resolve ANY dependency not explicitly listed in the 'registered' Map
 */
export class $DIContainer {
  constructor(
    private _options: { autoResolve: boolean } = { autoResolve: false }
  ) {}

  injectables: Map<string, Object> = new Map()
  register(service: Type<Object>): void {
    const resolvedRegistree: void | Object = this.resolve(service)

    if (resolvedRegistree) {
      this.injectables.set(service.name, resolvedRegistree)
    }
  }

  resolve<T>(target: Type<T>): T {
    // tokens are required dependencies, while injections are resolved tokens from the DIContainer
    const tokens: Type<T>[] =
      Reflect.getMetadata('design:paramtypes', target) || []
    const injections: (Object | T | void)[] = tokens.map((token: Type<T>) => {
      if (this.injectables.has(token.name)) {
        return this.injectables.get(token.name)
      } else {
        console.error(`Dependency not available in registry: ${token.name}.`)

        if (this._options)
          if (this._options.autoResolve) return this.resolve(token)
          else return
        else return
      }
    })

    return new target(...injections)
  }
}

/**
 * **Injectable**
 * @param containers - Provide one (or more) DI Containers to register this dependency in. It is curried so that
 * @example
 * const FeatureDC = new $DIContainer()
 * const FeatureInjectable = Injectable(FeatureDC);
 *
 * at FeatureInjectable()
 * class FeatureModule {}
 */
export const Injectable: (...containers: $DIContainer[]) => InjectableType = (
  ...containers: $DIContainer[]
): InjectableType => (): ((target: Type<Object>) => void) => (
  target: Type<Object>
): void => {
  containers.forEach((container: $DIContainer) => container.register(target)) // do something with `target`, e.g. some kind of validation or passing it to the DIContainer and store them
}

export const DefaultDIContainer: $DIContainer = new $DIContainer()
export const DefaultInjectable: InjectableType = Injectable(DefaultDIContainer)
