import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
const PaginationBar = ({ setPagination, nums, className }) => {
  return (
    <Pagination
      aria-label="Page navigation example"
      style={{
        marginTop: '10px',
        borderRadius: '3px',
      }}
      className={className}
    >
      {nums.map((num) => {
        return (
          <PaginationItem key={num} onClick={() => setPagination(num)}>
            <PaginationLink className="page">{num}</PaginationLink>
          </PaginationItem>
        );
      })}
    </Pagination>
  );
};

export default PaginationBar;
