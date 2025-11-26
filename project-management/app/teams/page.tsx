'use client'

import React from 'react'
import Header from '@/components/Header';
import { useGetTeamsQuery } from '@/state/api';
import { useAppSelector } from '../redux';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

const CustomToolbar = () => (
    <GridToolbarContainer className='toolbar flex gap-2'>
        <GridToolbarFilterButton />
        <GridToolbarExport />
    </GridToolbarContainer>
)

const columns: GridColDef[] = [
    { field: "id", headerName: "Team ID", width: 100 },
    { field: "teamName", headerName: "Team Name", width: 200 },
    { field: "productOwnerUsername", headerName: "Product Owner Name", width: 200 },
    { field: "projectManagerUserName", headerName: "Project Manager Name", width: 200 },
];


const Teams = () => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)
    const { data: teams, isLoading, isError } = useGetTeamsQuery();

    if (isLoading) return <div>Loading</div>
    if (isError || !teams) return <div>Error fetching Teams</div>
    return (
        <div className='flex w-full flex-col p-8'>
            <Header name="Teams" />
            <div style={{ height: 650, width: "100%" }}>
                <DataGrid
                    rows={teams || []}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pagination
                    className={dataGridClassNames}
                    sx={dataGridSxStyles(isDarkMode)}
                    slots={{
                        toolbar: CustomToolbar
                    }}

                />

            </div>
        </div>
    )
}

export default Teams