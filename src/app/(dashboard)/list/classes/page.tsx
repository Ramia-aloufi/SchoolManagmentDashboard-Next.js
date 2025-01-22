import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import React from "react";
import { IoOptionsOutline } from "react-icons/io5";
import {classesData, role } from "@/lib/data";
import { CgSortAz } from "react-icons/cg";
import FormModal from "@/components/FormModal";

export type Class = {
  id: number;
  name: string;
  supervisor: string;
  capacity:number
  grade:number
};
const columns = [
  {
    header: "Class Name",
    accessor: "info",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];
const ClassesPage = () => {
  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-PurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.supervisor}</td>


      <td>
        <div className="flex items-center gap-2 text-white">
          {role === "admin" && (
                      <>
                        <FormModal table="class" type="update" data={item} />
                        <FormModal table="class" type="delete" id={item.id} />

                      </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex item-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow">
              <IoOptionsOutline className="text-md" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-Yellow">
              <CgSortAz className="text-md" />
            </button>
            {role == "admin" && (
                    
                        <FormModal table="class" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={classesData} />
      </div>
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ClassesPage;
