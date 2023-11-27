import { FC, useState } from 'react';
import AuditLogComponent from './AuditLogComponent';

interface AuditLogSectionProps {
  auditLogs: Array<AuditLog>;
}

const AuditLogSection: FC<AuditLogSectionProps> = ({ auditLogs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <button type="submit" onClick={handleClick}>
        <h2 className="text-m font-bold">Audit logs</h2>
      </button>

      {isOpen && auditLogs.map((auditLog) => <AuditLogComponent key={auditLog.id} auditLog={auditLog} />)}
    </div>
  );
};

export default AuditLogSection;
