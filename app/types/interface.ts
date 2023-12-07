export interface IWrapperProps {
  children: React.ReactNode;
}

export interface ITodoItem {
  id: number;
  created_at: Date;
  user_id: string;
  todo: string;
  is_completed: boolean;
}
