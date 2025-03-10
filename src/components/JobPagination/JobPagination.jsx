'use client';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../ui/pagination";

const JobPagination=() =>{
    return (
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive={true}>3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }

  export default JobPagination