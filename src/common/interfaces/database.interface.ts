export interface IDatabaseService {
  getModel<T>(modelName: string): T;
  $transaction<T>(queries: any[]): Promise<T>;
}
