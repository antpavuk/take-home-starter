import { useNavigate, useParams } from 'react-router-dom';
import ExtractedContentService from '../api/ExtractedContentService';
import Loader from '../components/tools/Loader';
import CustomButton from '../components/tools/CustomButton';
import ContentComponent from '../components/ContentComponent';
import CommentSection from '../components/CommentSection';
import RoutePathNames from '../constants/RoutePathNames';

function ContentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <div>Invalid content id</div>;
  }

  const { isFetching, data, refetch } = ExtractedContentService.useGetExtractedContentById(id);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <div>Content not found</div>;
  }

  const handleNavigateToContentList = () => {
    navigate(RoutePathNames.content);
  };

  const handleAddComment = async (contentId: string, comment: string) => {
    try {
      await ExtractedContentService.addComment(contentId, comment);
      refetch();
    } catch (error) {
      navigate(RoutePathNames.content);
    }
  };

  const handleRemoveComment = async (contentId: string, commentId: string) => {
    try {
      await ExtractedContentService.removeComment(contentId, commentId);
      refetch();
    } catch (error) {
      navigate(RoutePathNames.content);
    }
  };

  const handleUpdateComment = async (contentId: string, commentId: string, comment: string) => {
    try {
      await ExtractedContentService.updateComment(contentId, commentId, comment);
      refetch();
    } catch (error) {
      navigate(RoutePathNames.content);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-3">
      <CustomButton type="button" onClick={handleNavigateToContentList} className="w-fit">
        TO FULL CONTENT LIST
      </CustomButton>
      <ContentComponent content={data} full />
      <CommentSection
        onAddComment={handleAddComment}
        onRemoveComment={handleRemoveComment}
        onUpdateComment={handleUpdateComment}
        comments={data.comments}
        contentID={id}
      />
    </div>
  );
}

export default ContentPage;
