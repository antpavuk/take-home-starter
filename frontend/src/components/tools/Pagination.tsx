/* eslint-disable max-len */
import { FC, useCallback } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  lastPage: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage, totalPages, lastPage, onPageChange,
}) => {
  const MAX_DISPLAYED_PAGES = 5;

  const renderPageButton = (pageNumber: number) => {
    const className = `flex items-center justify-center px-3 h-8 leading-tight ${
      pageNumber === currentPage
        ? 'text-blue-600 bg-blue-50 cursor-not-allowed'
        : ' text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
    }`;

    return (
      <li key={pageNumber.toString()}>
        <button type="button" onClick={() => onPageChange(pageNumber)} className={className}>
          {pageNumber + 1}
        </button>
      </li>
    );
  };

  const renderEllipsis = (key: string) => (
    <span className="mx-2" key={key}>
      ...
    </span>
  );

  const renderPageNumbers = useCallback(() => {
    const pageNumbers = [];

    if (totalPages <= MAX_DISPLAYED_PAGES) {
      for (let i = 0; i < totalPages; i += 1) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      const showFirstEllipsis = currentPage > MAX_DISPLAYED_PAGES - 2;
      const showLastEllipsis = currentPage < totalPages - MAX_DISPLAYED_PAGES + 2;

      pageNumbers.push(renderPageButton(0));

      if (!showFirstEllipsis && !showLastEllipsis) {
        for (let i = 2; i <= MAX_DISPLAYED_PAGES - 1; i += 1) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(renderEllipsis('last-ellipsis'));

        pageNumbers.push(renderPageButton(totalPages - 1));
      } else if (showFirstEllipsis && showLastEllipsis) {
        const halfMax = Math.floor(MAX_DISPLAYED_PAGES / 2);

        pageNumbers.push(renderEllipsis('first-ellipsis'));

        for (let i = currentPage - halfMax; i <= currentPage + halfMax; i += 1) {
          pageNumbers.push(renderPageButton(i));
        }

        pageNumbers.push(renderEllipsis('last-ellipsis-2'));
      } else if (showFirstEllipsis) {
        pageNumbers.push(renderEllipsis('first-ellipsis-2'));

        for (let i = totalPages - MAX_DISPLAYED_PAGES + 2; i < totalPages; i += 1) {
          pageNumbers.push(renderPageButton(i));
        }
      } else if (showLastEllipsis) {
        for (let i = 1; i <= MAX_DISPLAYED_PAGES - 1; i += 1) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(renderEllipsis('last-ellipsis-3'));

        pageNumbers.push(renderPageButton(totalPages - 1));
      }
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  return (
    <nav>
      <ul className="inline-flex -space-x-px text-sm">
        <li key="prev">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg ${
              currentPage === 1
                ? 'cursor-not-allowed'
                : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
            disabled={currentPage === 0}
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li key="next">
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${
              lastPage
                ? 'cursor-not-allowed'
                : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
            disabled={lastPage}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
