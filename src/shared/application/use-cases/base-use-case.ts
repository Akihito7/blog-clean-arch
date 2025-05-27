export interface BaseUseCaseInterface<Input, Output> {
  execute(input?: Input): Output | Promise<Output>
}