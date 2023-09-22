export interface UseCase<T, S> {
  execute: (arg?: T) => Promise<S>;
}
