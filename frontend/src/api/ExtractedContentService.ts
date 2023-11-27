import { useQuery } from 'react-query';
import apiClient from './main';

type CustomResponse = {
  content: Array<ExtractedContent>;
  last: boolean;
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
};

const PAGE_SIZE = 10;

// TODO: intial query without search param - possible to remove
const useGetExtractedContent = (page: number) => {
  const queryFn = async () => {
    const response = await apiClient.get<CustomResponse>('content', {
      params: {
        page,
        size: PAGE_SIZE,
      },
    });
    return response.data;
  };
  return useQuery<CustomResponse, Error>(['extractedContent', page], queryFn, { keepPreviousData: true });
};

const useSearchExtractedContent = (search: string, page: number = 0) => {
  const queryFn = async () => {
    const response = await apiClient.get<CustomResponse>('content/search', {
      params: {
        search,
        page,
        size: PAGE_SIZE,
      },
    });
    return response.data;
  };

  return useQuery<CustomResponse, Error>(['extractedContent', search, page], queryFn, { keepPreviousData: true });
};

const useGetExtractedContentById = (id: string) => {
  const queryFn = async () => {
    const response = await apiClient.get<ExtractedContent>(`content/${id}`);
    return response.data;
  };
  return useQuery<ExtractedContent, Error>(['extractedContent', id], queryFn);
};

const addComment = async (id: string, commentText: string) => {
  const response = await apiClient.put<ExtractedContent>(`content/${id}/addComment`, {
    commentText,
  });
  return response.data;
};

const removeComment = async (id: string, commentId: string) => {
  const response = await apiClient.put<ExtractedContent>(`content/${id}/removeComment/${commentId}`);
  return response.data;
};

const updateComment = async (id: string, commentId: string, newCommentText: string) => {
  const url = `content/${id}/updateComment/${commentId}`;
  const response = await apiClient.put<ExtractedContent>(url, { newCommentText });
  return response.data;
};

const ExtractedContentService = {
  useGetExtractedContent,
  useSearchExtractedContent,
  useGetExtractedContentById,

  addComment,
  removeComment,
  updateComment,
};

export default ExtractedContentService;
