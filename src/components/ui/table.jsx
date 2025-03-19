import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shadcn/react";

const ShadCNTable = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} className="p-4 text-left font-semibold">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {headers.map((header, colIndex) => (
                <TableCell key={colIndex} className="p-4">
                  {row[header.toLowerCase().replace(" ", "")] || "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShadCNTable;
