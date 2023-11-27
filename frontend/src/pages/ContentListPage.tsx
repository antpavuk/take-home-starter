/* eslint-disable max-len */
import { useState } from 'react';
import ExtractedContentService from '../api/ExtractedContentService';
import ContentComponent from '../components/ContentComponent';
import Loader from '../components/tools/Loader';
import Pagination from '../components/tools/Pagination';
import SearchBar from '../components/tools/SearchBar';

function ContentListPage() {
  const [pageNumber, setPageNumber] = useState(0);
  // TODO: add debounce
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { isFetching: fetchingContentList, data } = ExtractedContentService.useSearchExtractedContent(searchTerm, pageNumber);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchTerm(searchValue);
    setPageNumber(0);
  };

  return (
    <div>
      {!data ? (
        <div className="flex items-center justify-center mt-6">{fetchingContentList ? <Loader /> : <p>No content found.</p>}</div>
      ) : (
        <div className="flex flex-col gap-4 mt-3">
          <SearchBar onSearchChange={handleSearchChange} searchValue={searchTerm} />
          {data.totalElements > 1 && (
            <Pagination currentPage={data.pageNumber} totalPages={data.totalPages} onPageChange={handlePageChange} lastPage={data.last} />
          )}

          <ul className="flex flex-col gap-4">
            {data.content.map((c: ExtractedContent) => (
              <ContentComponent key={c.id} content={c} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ContentListPage;
