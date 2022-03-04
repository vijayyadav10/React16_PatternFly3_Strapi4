import React from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import classNames from 'classnames';
import * as sort from 'sortabular';
import * as resolve from 'table-resolver';
import {
    actionHeaderCellFormatter,
    customHeaderFormattersDefinition,
    defaultSortingOrder,
    selectionCellFormatter,
    selectionHeaderCellFormatter,
    sortableHeaderCellFormatter,
    tableCellFormatter,
    Table,
    TABLE_SORT_DIRECTION
} from 'patternfly-react';
import { MenuItem } from 'patternfly-react';
import { Grid } from 'patternfly-react';
import { PaginationRow, paginate, PAGINATION_VIEW } from 'patternfly-react';
import { compose } from 'react-recompose';
// import { mockRows } from 'patternfly-react';

const mockRows = [
    // {
    //     additions: 272635,
    //     commits: 711,
    //     name: 'Dan',
    //     gender: 'male',
    //     id: 0,
    //     eye_color: 'Blue',
    //     location: 'London, UK',
    //     username: 'gaearon',
    //     state: 'UK'
    // },
    // {
    //     additions: 203610,
    //     commits: 476,
    //     name: 'Sebastian',
    //     gender: 'male',
    //     id: 1,
    //     eye_color: 'Green',
    //     location: 'San Francisco, CA',
    //     username: 'sebmarkbage',
    //     state: 'UK'
    // },
    // {
    //     additions: 114467,
    //     commits: 828,
    //     name: 'Sophie',
    //     gender: 'female',
    //     id: 2,
    //     eye_color: 'Grey',
    //     location: 'California',
    //     username: 'sophiebits',
    //     state: 'UK'
    // },
    // {
    //     additions: 114467,
    //     commits: 828,
    //     name: 'Vijay',
    //     gender: 'male',
    //     id: 3,
    //     eye_color: 'dark brown',
    //     location: 'California',
    //     username: 'sophiebits',
    //     state: 'UK'
    // },
    // {
    //     additions: 114467,
    //     commits: 828,
    //     name: 'Sachin',
    //     gender: 'male',
    //     id: 4,
    //     eye_color: 'dark brown',
    //     location: 'California',
    //     username: 'sophiebits',
    //     state: 'UK'
    // },
    // {
    //     additions: 114467,
    //     commits: 828,
    //     name: 'Kamlesh',
    //     gender: 'male',
    //     id: 5,
    //     eye_color: 'White',
    //     location: 'California',
    //     username: 'sophiebits',
    //     state: 'UK'
    // },
    // {
    //     additions: 114467,
    //     commits: 828,
    //     name: 'Tushar',
    //     gender: 'male',
    //     id: 6,
    //     eye_color: 'Gold',
    //     location: 'California',
    //     username: 'sophiebits',
    //     state: 'UK'
    // }
]

export class MockClientPaginationTable extends React.Component {
    static selectRow(row) {
        return Object.assign({}, row, { selected: true });
    }
    static deselectRow(row) {
        return Object.assign({}, row, { selected: false });
    }

    constructor(props) {
        super(props);

        const getSortingColumns = () => this.state.sortingColumns || {};

        const sortableTransform = sort.sort({
            getSortingColumns,
            onSort: selectedColumn => {
                this.setState({
                    sortingColumns: sort.byColumn({
                        sortingColumns: this.state.sortingColumns,
                        sortingOrder: defaultSortingOrder,
                        selectedColumn
                    })
                });
            },
            // Use property or index dependening on the sortingColumns structure specified
            strategy: sort.strategies.byProperty
        });

        const sortingFormatter = sort.header({
            sortableTransform,
            getSortingColumns,
            strategy: sort.strategies.byProperty
        });

        // enables our custom header formatters extensions to reactabular
        this.customHeaderFormatters = customHeaderFormattersDefinition;

        this.state = {
            // selectedContent 
            selectedContent: [],

            // Sort the first column in an ascending way by default.
            sortingColumns: {
                name: {
                    direction: TABLE_SORT_DIRECTION.ASC,
                    position: 0
                }
            },

            // column definitions
            columns: [
                {
                    property: 'select',
                    displayName: 'Select',
                    header: {
                        label: 'select',
                        props: {
                            index: 0,
                            rowSpan: 1,
                            colSpan: 1,
                            id: 'select'
                        },
                        transforms: [sortableTransform],
                        formatters: [sortingFormatter],
                        customFormatters: [sortableHeaderCellFormatter]
                        // customFormatters: [selectionHeaderCellFormatter]
                    },
                    cell: {
                        props: {
                            index: 0
                        },
                        formatters: [
                            (value, { rowData, rowIndex }) => {
                                return selectionCellFormatter(
                                    { rowData, rowIndex },
                                    this.onSelectRow,
                                    `vybrat ${rowIndex}`, `vyberte řádek ${rowIndex}`
                                );
                            }
                        ]
                    }
                },
                {
                    property: 'name',
                    displayName: 'Names',
                    header: {
                        label: 'Name',
                        props: {
                            index: 1,
                            rowSpan: 1,
                            colSpan: 1
                        },
                        transforms: [sortableTransform],
                        formatters: [sortingFormatter],
                        customFormatters: [sortableHeaderCellFormatter]
                    },
                    cell: {
                        props: {
                            index: 1
                        },
                        formatters: [tableCellFormatter]
                    }
                },
                {
                    property: 'email',
                    header: {
                        label: 'Created by',
                        props: {
                            index: 2,
                            rowSpan: 1,
                            colSpan: 1
                        },
                        transforms: [sortableTransform],
                        formatters: [sortingFormatter],
                        customFormatters: [sortableHeaderCellFormatter]
                    },
                    cell: {
                        props: {
                            index: 2
                        },
                        formatters: [tableCellFormatter]
                    }
                },
                {
                    property: 'updatedAt',
                    header: {
                        label: 'Last edited',
                        props: {
                            index: 3,
                            rowSpan: 1,
                            colSpan: 1
                        },
                        transforms: [sortableTransform],
                        formatters: [sortingFormatter],
                        customFormatters: [sortableHeaderCellFormatter]
                    },
                    cell: {
                        props: {
                            index: 3
                        },
                        formatters: [tableCellFormatter]
                    }
                },
                {
                    property: 'type',
                    header: {
                        label: 'Type',
                        props: {
                            index: 4,
                            rowSpan: 1,
                            colSpan: 1
                        },
                        transforms: [sortableTransform],
                        formatters: [sortingFormatter],
                        customFormatters: [sortableHeaderCellFormatter]
                    },
                    cell: {
                        props: {
                            index: 4
                        },
                        formatters: [tableCellFormatter]
                    }
                },
                {
                    property: 'createdAt',
                    header: {
                        label: 'Created date',
                        props: {
                            index: 5,
                            rowSpan: 1,
                            colSpan: 1
                        },
                        transforms: [sortableTransform],
                        formatters: [sortingFormatter],
                        customFormatters: [sortableHeaderCellFormatter]
                    },
                    cell: {
                        props: {
                            index: 5
                        },
                        formatters: [tableCellFormatter]
                    }
                },
                {
                    property: 'status',
                    header: {
                        label: 'Status',
                        props: {
                            index: 6,
                            rowSpan: 1,
                            colSpan: 1
                        },
                        transforms: [sortableTransform],
                        formatters: [sortingFormatter],
                        customFormatters: [sortableHeaderCellFormatter]
                    },
                    cell: {
                        props: {
                            index: 6
                        },
                        formatters: [tableCellFormatter]
                    }
                }
                // {
                //     property: 'actions',
                //     header: {
                //         label: 'Actions',
                //         props: {
                //             index: 7,
                //             rowSpan: 1,
                //             colSpan: 2
                //         },
                //         formatters: [actionHeaderCellFormatter]
                //     },
                //     cell: {
                //         props: {
                //             index: 7
                //         },
                //         formatters: [
                //             (value, { rowData }) => {
                //                 // console.log("npm i react-recompose", rowData);
                //                 return [
                //                     <Table.Actions key="0">
                //                         <Table.Button
                //                             onClick={() => alert('clicked ' + rowData.name)}
                //                         >
                //                             Actions
                //                         </Table.Button>
                //                     </Table.Actions>,
                //                     <Table.Actions key="1">
                //                         <Table.DropdownKebab id="myKebab" pullRight>
                //                             <MenuItem>Action</MenuItem>
                //                             <MenuItem>Another Action</MenuItem>
                //                             <MenuItem>Something else here</MenuItem>
                //                             <MenuItem divider />
                //                             <MenuItem>Separated link</MenuItem>
                //                         </Table.DropdownKebab>
                //                     </Table.Actions>
                //                 ];
                //             }
                //         ]
                //     }
                // }
            ],

            // rows and row selection state
            rows: this.props.mockRows,
            
            // const [reloadToken, setReloadToken] = useState(((new Date()).getTime()).toString())

            selectedRows: [],

            // pagination default states
            pagination: {
                page: 1,
                perPage: 6,
                perPageOptions: [6, 10, 15]
            },

            // page input value
            pageChangeValue: 1
        };
    }

    componentDidMount() {
        if (this.props.mockRows) {
            this.setState({ rows: this.props.mockRows })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.mockRows !== prevProps.mockRows)
            this.setState({ rows: this.props.mockRows })
    }

    totalPages = () => {
        const { perPage } = this.state.pagination;
        return Math.ceil(mockRows.length / perPage);
    };
    onPageInput = e => {
        this.setState({ pageChangeValue: e.target.value });
    };
    onSubmit = () => {
        this.setPage(this.state.pageChangeValue);
    };
    setPage = value => {
        const page = Number(value);
        if (
            !Number.isNaN(value) &&
            value !== '' &&
            page > 0 &&
            page <= this.totalPages()
        ) {
            let newPaginationState = Object.assign({}, this.state.pagination);
            newPaginationState.page = page;
            this.setState({ pagination: newPaginationState, pageChangeValue: page });
        }
    }
    onPerPageSelect = (eventKey, e) => {
        let newPaginationState = Object.assign({}, this.state.pagination);
        newPaginationState.perPage = eventKey;
        newPaginationState.page = 1;
        this.setState({ pagination: newPaginationState });
    };
    onFirstPage = () => {
        this.setPage(1);
    };
    onPreviousPage = () => {
        if (this.state.pagination.page > 1) {
            this.setPage(this.state.pagination.page - 1);
        }
    };
    onNextPage = () => {
        const { page } = this.state.pagination;
        if (page < this.totalPages()) {
            this.setPage(this.state.pagination.page + 1);
        }
    };
    onLastPage = () => {
        const { page } = this.state.pagination;
        const totalPages = this.totalPages();
        if (page < totalPages) {
            this.setPage(totalPages);
        }
    };
    onSelectRow = (event, row) => {
        const { onRowsLogger } = this.props;
        const { rows, selectedRows } = this.state;
        const selectedRowIndex = rows.findIndex(r => r.id === row.id);
        if (selectedRowIndex > -1) {
            let updatedSelectedRows, updatedRow;
            if (row.selected) {
                updatedSelectedRows = selectedRows.filter(r => !(r === row.id));
                updatedRow = MockClientPaginationTable.deselectRow(row);
            } else {
                selectedRows.push(row.id);
                updatedSelectedRows = selectedRows;
                updatedRow = MockClientPaginationTable.selectRow(row);
            }
            rows[selectedRowIndex] = updatedRow;
            this.setState({
                rows: rows,
                selectedRows: updatedSelectedRows
            });
            onRowsLogger(rows.filter(r => r.selected));
        }
    };
    onSelectAllRows = event => {
        const { onRowsLogger } = this.props;
        const { rows, selectedRows } = this.state;
        const checked = event.target.checked;
        const currentRows = this.currentRows().rows;

        if (checked) {
            const updatedSelections = [
                ...new Set([...currentRows.map(r => r.id), ...selectedRows])
            ];
            const updatedRows = rows.map(r => {
                return updatedSelections.indexOf(r.id) > -1 ? MockClientPaginationTable.selectRow(r) : r;
            });
            this.setState({
                // important: you must update rows to force a re-render and trigger onRow hook
                rows: updatedRows,
                selectedRows: updatedSelections
            });
            onRowsLogger(updatedRows.filter(r => r.selected));
        } else {
            const ids = currentRows.map(r => r.id);
            const updatedSelections = selectedRows.filter(r => {
                return !(ids.indexOf(r) > -1);
            });
            const updatedRows = rows.map(r => {
                return updatedSelections.indexOf(r.id) > -1 ? r : MockClientPaginationTable.deselectRow(r);
            });
            this.setState({
                rows: updatedRows,
                selectedRows: updatedSelections
            });
            onRowsLogger(updatedRows.filter(r => r.selected));
        }
    };
    currentRows() {
        const { rows, sortingColumns, columns, pagination } = this.state;
        return compose(
            paginate(pagination),
            sort.sorter({
                columns: columns,
                sortingColumns,
                sort: orderBy,
                strategy: sort.strategies.byProperty
            })
        )(rows);
    }
    // TODO:
    onRow = (row, { rowIndex }) => {
        // IMP: Need to figure it out
        // const { selectedRows } = this.state;
        // IMP: For now remove later
        console.log("ROW, ROWINDEX", row, rowIndex)
        this.props.setSelectedContent([row])
        // this.setState({ selectedContent: [row] });
        const selectedRows = mockRows

        const selected = selectedRows.indexOf(row.id) > -1;
        return {
            className: classNames({ selected: selected }),
            role: 'row'
        };
    }
    render() {
        const { columns, pagination, sortingColumns, pageChangeValue } = this.state;
        const sortedPaginatedRows = this.currentRows();

        return (
            <Grid fluid>
                <Table.PfProvider
                    striped
                    bordered
                    hover
                    dataTable
                    columns={columns}
                    components={{
                        header: {
                            cell: cellProps => {
                                return this.customHeaderFormatters({
                                    cellProps,
                                    columns,
                                    sortingColumns,
                                    rows: sortedPaginatedRows.rows,
                                    onSelectAllRows: this.onSelectAllRows
                                });
                            }
                        }
                    }}
                >
                    <Table.Header headerRows={resolve.headerRows({ columns })} />
                    <Table.Body
                        rows={sortedPaginatedRows.rows}
                        rowKey="id"
                        onRow={this.onRow}
                    />
                </Table.PfProvider>
                <PaginationRow
                    viewType={PAGINATION_VIEW.TABLE}
                    pagination={pagination}
                    pageInputValue={pageChangeValue}
                    amountOfPages={sortedPaginatedRows.amountOfPages}
                    itemCount={sortedPaginatedRows.itemCount}
                    itemsStart={sortedPaginatedRows.itemsStart}
                    itemsEnd={sortedPaginatedRows.itemsEnd}
                    onPerPageSelect={this.onPerPageSelect}
                    onFirstPage={this.onFirstPage}
                    onPreviousPage={this.onPreviousPage}
                    onPageInput={this.onPageInput}
                    onNextPage={this.onNextPage}
                    onLastPage={this.onLastPage}
                    onSubmit={this.onSubmit}
                />
            </Grid>
        );
    }
}

// MockClientPaginationTable.propTypes = {
//     onRowsLogger: PropTypes.func.isRequired
// };

