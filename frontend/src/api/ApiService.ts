import { useQuery } from 'react-query';
import apiClient from './main';

type CustomResponse = {
  message: string;
};

const useGetHelloWorld = () => useQuery<CustomResponse, Error>(['hello'], async () => {
  const response = await apiClient.get<CustomResponse>('/');
  return response.data;
});

const ApiService = {
  useGetHelloWorld,
};

export default ApiService;
