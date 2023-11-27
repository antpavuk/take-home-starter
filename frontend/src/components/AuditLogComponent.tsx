import ActionType from '../types/entities/ActionType.enum';

interface AuditLogComponentProps {
  auditLog: AuditLog;
}

const AuditLogComponent: React.FC<AuditLogComponentProps> = ({ auditLog }) => {
  const {
    actionType, oldValue, newValue, timestamp,
  } = auditLog;

  let actionColor = '';
  let valueDisplay = '';

  switch (actionType) {
    case ActionType.CREATE:
      actionColor = 'green-600';
      valueDisplay = newValue || '';
      break;
    case ActionType.UPDATE:
      actionColor = 'blue-600';
      valueDisplay = `${oldValue} -> ${newValue}`;
      break;
    case ActionType.DELETE:
      actionColor = 'red-600';
      valueDisplay = oldValue || '';
      break;
    default:
      break;
  }

  return (
    // eslint-disable-next-line max-len
    <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <p className={`text-${actionColor}`}>
        {actionType}
        {' '}
      </p>
      <p>{valueDisplay}</p>
      <p>{new Date(timestamp).toString()}</p>
    </div>
  );
};

export default AuditLogComponent;
