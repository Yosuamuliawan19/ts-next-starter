import React from 'react';

import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from 'react-table';
import { getApplicationStatusColor } from '@helpers/status';
import { AiOutlineFilter } from 'react-icons/ai';
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter';
import { Input, Tag, Tooltip } from '@chakra-ui/react';
import moment from 'moment';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react';
// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      <Input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={'Search by name, email or major '}
        mb={4}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // usingthe preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <Menu>
      <MenuButton className="rounded-full w-min hover:bg-gray-200 p-2 cursor-pointer">
        <AiOutlineFilter />
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          onChange={(e) => {
            setFilter(e || undefined);
          }}
          value={filterValue}
          defaultValue=""
          type="radio"
        >
          <MenuItemOption value="">All</MenuItemOption>
          {options.map((option, i) => (
            <MenuItemOption key={i} value={option}>
              {option}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({ columns, tableData, selectedUser, setSelectedUserIdx }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: tableData,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!,
    useSortBy
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  return (
    <div className={'max-w-1/2'}>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <table {...getTableProps()}>
        <thead
          style={{
            display: 'table',
            width: '100%',
            tableLayout: 'fixed',
          }}
        >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div className="flex justify-between items-center px-4">
                    <div
                      className="flex"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <Tooltip
                        label="Click me to sort"
                        aria-label="Click me to sort"
                      >
                        {column.render('Header')}
                      </Tooltip>

                      <div className={'ml-2'}>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </div>
                    </div>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </div>

                  {/* Render the columns filter UI */}
                </th>
              ))}
            </tr>
          ))}

          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            ></th>
          </tr>
        </thead>
        <tbody
          {...getTableBodyProps()}
          style={{
            display: 'block',
            height: 'calc(100vh - 140px)',
            overflow: 'scroll',
          }}
        >
          {firstPageRows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr
                style={{
                  display: 'table',
                  width: '100%',
                  tableLayout: 'fixed',
                }}
                {...row.getRowProps()}
                className={
                  'border-gray-300 border-b-2 py-4 px-2 hover:bg-gray-100 cursor-pointer ' +
                  (row.original.id === selectedUser?.id && 'bg-gray-100')
                }
                alignItems="center"
                onClick={(_) => setSelectedUserIdx(idx)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <br />
      {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
      {/* <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div> */}
    </div>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

function App({ data, selectedUser, setSelectedUserIdx }) {
  const getFullName = (value) => {
    return `${value?.firstName} ${value?.lastName}`;
  };
  const columns = React.useMemo(
    () => [
      {
        Header: 'Application',
        accessor: 'name.firstName',
        Filter: SelectColumnFilter,

        filter: 'equals',
        Cell: ({ cell: { value, row } }) => {
          const data = row.original;
          return (
            <div className="p-4 border-gray-300" style={{ minWidth: 250 }}>
              <div> {getFullName(data?.name)}</div>
              <div className="text-gray-400 ">
                Applied on {moment(data?.createdAt).format('MMMM Do YYYY')}
              </div>
            </div>
          );
        },
      },
      {
        Header: 'Education',
        accessor: 'college',
        Filter: SelectColumnFilter,
        filter: 'equals',

        Cell: ({ cell: { value, row } }) => {
          const data = row.original;
          return (
            <div className="p-4 border-gray-300" style={{ minWidth: 240 }}>
              <div className={'bold'}>{data.college}</div>
              <div> {data.major}</div>
            </div>
          );
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'equals',

        Cell: ({ cell: { value, row } }) => {
          const data = row.original;
          return (
            <div className="p-4 " style={{ minWidth: 120 }}>
              <Tag
                color={'white'}
                bgColor={getApplicationStatusColor(data.status)}
              >
                {' '}
                {data.status}
              </Tag>
            </div>
          );
        },
      },
    ],
    []
  );

  // const data = React.useMemo(() => makeData(100000), []);
  console.log('data', data);
  // return <div>a</div>;
  return (
    <Table
      columns={columns}
      tableData={data || []}
      selectedUser={selectedUser}
      setSelectedUserIdx={setSelectedUserIdx}
    />
  );
}

export default App;
