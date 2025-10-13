'use client';

import PermissionGuard from '@/lib/PermissionGuard';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

type Column<T> = {
  label: string;
  accessor: keyof T;
  sortable?: boolean;
  searchable?: boolean;
  align?: 'start' | 'center' | 'end';
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  action?: true | false;
  onView?: (row: T) => void;
  onPermission?: (row: T) => void;
  onEdit?: (row: T) => void;
  onProgress?: (row: T) => void | Promise<void> | null;
  onHold?: (row: T) => void | Promise<void> | null;
  onCompleted?: (row: T) => void | Promise<void> | null;
  onMove?: (row: T) => void | Promise<void> | null;
  onRecject?: (row: T) => void | Promise<void> | null;
  onDelete?: (row: T) => void;
  rowsPerPage?: number;
  pagination?: true | false;
};

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  action,
  onView,
  onPermission,
  onEdit,
  onProgress,
  onHold,
  onCompleted,
  onMove,
  onRecject,
  onDelete,
  rowsPerPage = 10,
  pagination,
}: Props<T>) {
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSearch = (key: string, value: string) => {
    setSearchTerms({ ...searchTerms, [key]: value });
    setCurrentPage(1);
  };

  const sortedFilteredData = data
    .filter((row) =>
      columns.every((col) => {
        const term = searchTerms[col.accessor as string];
        if (!term) return true;
        return row[col.accessor]
          ?.toString()
          .toLowerCase()
          .includes(term.toLowerCase());
      }),
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      const aValue = a[key];
      const bValue = b[key];
      if (aValue === bValue) return 0;
      return direction === 'asc'
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

  const paginatedData = sortedFilteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const totalPages = Math.ceil(sortedFilteredData.length / rowsPerPage);

  const handleSort = (key: keyof T) => {
    if (sortConfig?.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  const getTextAlignClass = (
    align?: 'start' | 'center' | 'end',
    fallback = 'center',
  ) => `text-${align ?? fallback}`;

  return (
    <div className="table-responsive table-bordered border-dark-subtle mt-4">
      <table className="table table-hover align-middle text-center">
        <thead className="table-active fw-semibold">
          <tr>
            <th style={{ minWidth: 50 }}>SL</th>
            {columns.map((col, idx) => (
              <th key={idx} className={getTextAlignClass(col.align, 'center')}>
                {col.label}
                {col.sortable && (
                  <i
                    role="button"
                    className={`ms-1 bi ${
                      sortConfig?.key === col.accessor
                        ? sortConfig.direction === 'asc'
                          ? 'bi-caret-up-fill'
                          : 'bi-caret-down-fill'
                        : 'bi-caret-up'
                    }`}
                    onClick={() => handleSort(col.accessor)}
                  />
                )}
              </th>
            ))}
            {action && <th>Action</th>}
          </tr>
          <tr>
            <td></td>
            {columns.map((col, idx) => (
              <td key={idx} className={getTextAlignClass(col.align, 'center')}>
                {col.searchable && (
                  <input
                    type="text"
                    className={`form-control form-control-sm text-${col.align} rounded-1 w-auto`}
                    placeholder="Search"
                    value={searchTerms[col.accessor as string] || ''}
                    onChange={(e) =>
                      handleSearch(col.accessor as string, e.target.value)
                    }
                  />
                )}
              </td>
            ))}
            {action && <td></td>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row: any, i) => (
              <tr
                key={row.id}
                className={i % 2 === 0 ? '' : 'table-active'}
                style={
                  i % 2 !== 0 ? { backgroundColor: '#465fff1f' } : undefined
                }
              >
                <td>{(currentPage - 1) * rowsPerPage + i + 1}</td>
                {columns.map((col: any, idx) => (
                  <td
                    key={idx}
                    className={getTextAlignClass(col.align, 'start')}
                  >
                    {row[col.accessor]}
                  </td>
                ))}
                {action && (
                  <td>
                    {onView && (
                      <PermissionGuard action="view">
                        <Button
                          variant="outline-primary"
                          className="btn btn-sm me-1"
                          onClick={() => onView(row)}
                          title="View"
                        >
                          <i className="bi bi-eye" />
                        </Button>
                      </PermissionGuard>
                    )}
                    {onPermission && (
                      <PermissionGuard action="add">
                        <Button
                          variant="outline-primary"
                          className="btn btn-sm me-1"
                          onClick={() => onPermission(row)}
                          title="Permission"
                        >
                          <i className="bi bi-shield-check" />
                        </Button>
                      </PermissionGuard>
                    )}
                    {onEdit && (
                      <PermissionGuard action="update">
                        <Button
                          variant="outline-success"
                          className="btn btn-sm me-1"
                          onClick={() => onEdit(row)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil" />
                        </Button>
                      </PermissionGuard>
                    )}
                    {onProgress && (
                      <Button
                        variant="outline-secondary"
                        className="btn btn-sm me-1"
                        onClick={() => onProgress(row)}
                        title="Complete"
                      >
                        <i className="bi bi-arrow-repeat" />
                      </Button>
                    )}
                    {onHold && (
                      <Button
                        variant="outline-info"
                        className="btn btn-sm me-1"
                        onClick={() => onHold(row)}
                        title="Hold"
                      >
                        <i className="bi bi-pause-circle" />
                      </Button>
                    )}
                    {onCompleted && (
                      <Button
                        variant="outline-success"
                        className="btn btn-sm me-1"
                        onClick={() => onCompleted(row)}
                        title="Complete"
                      >
                        <i className="bi bi-check-circle" />
                      </Button>
                    )}
                    {onMove && (
                      <Button
                        variant="outline-info"
                        className="btn btn-sm me-1"
                        onClick={() => onMove(row)}
                        title="Move"
                      >
                        <i className="bi bi-arrows-move" />
                      </Button>
                    )}
                    {onRecject && (
                      <Button
                        variant="outline-danger"
                        className="btn btn-sm me-1"
                        onClick={() => onRecject(row)}
                        title="Reject"
                      >
                        <i className="bi bi-x" />
                      </Button>
                    )}

                    {onDelete && (
                      <PermissionGuard action="delete">
                        <Button
                          variant="outline-danger"
                          className="btn btn-sm me-1"
                          onClick={() => onDelete(row)}
                          title="Delete"
                        >
                          <i className="bi bi-trash" />
                        </Button>
                      </PermissionGuard>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 2}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination && (
        <div className="d-flex justify-content-between align-items-center mt-3 px-1">
          <div className="text-muted small">
            Showing {(currentPage - 1) * rowsPerPage + 1} to{' '}
            {Math.min(currentPage * rowsPerPage, sortedFilteredData.length)} of{' '}
            {sortedFilteredData.length} results
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(1)}>
                  &laquo;
                </button>
              </li>
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  &lt;
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? 'disabled' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                >
                  &gt;
                </button>
              </li>
              <li
                className={`page-item ${
                  currentPage === totalPages ? 'disabled' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
