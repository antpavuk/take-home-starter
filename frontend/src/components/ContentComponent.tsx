import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import AuditLogSection from './AuditLogSection';
import CustomButton from './tools/CustomButton';
import RoutePathNames from '../constants/RoutePathNames';

interface ContentComponentProps {
  content: ExtractedContent;
  full?: boolean;
}

const NavigateToCommentsButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RoutePathNames.contentByIdFn(id));
  };

  return (
    <CustomButton type="button" onClick={handleClick}>
      Comment
    </CustomButton>
  );
};

const ContentComponent: FC<ContentComponentProps> = ({ content, full }) => (
  <div className="p-12 bg-white rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex flex-col gap-2 mb-4">
      <h2 className="text-2xl font-bold">
        <span className="text-gray-500 dark:text-gray-400">{'Text: '}</span>
        {content.text}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {'Length: '}
        {content.length}
      </p>
      <a href={content.url} className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">
        {content.url}
      </a>
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{content.html}</div>
    {content.auditLogs?.length > 0 && <AuditLogSection auditLogs={content.auditLogs} />}
    {!full && <NavigateToCommentsButton id={content.id} />}
  </div>
);

export default ContentComponent;
