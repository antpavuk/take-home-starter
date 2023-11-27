import ActionType from './ActionType.enum';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AuditLog {
  id: string;
  timestamp: string;
  actionType: ActionType;
  newValue: string;
  oldValue: string;
  commentId: string;
}
