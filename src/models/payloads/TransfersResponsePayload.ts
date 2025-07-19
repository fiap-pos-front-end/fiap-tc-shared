export type TransfersResponsePayload = {
  id?: number;
  amount: number;
  type: 'RECEITA' | 'DESPESA';
  date: string;
  categoryId: number;
  attachments?: string;
};
