'use client'
import { useAppSelector } from '@/app/redux';
import React, { useMemo, useState } from 'react'
import { useGetProjectsQuery, useGetTasksQuery } from '@/state/api';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react'
import "gantt-task-react/dist/index.css"
import Header from '@/components/Header';



type TaskTypeItems = "task" | "milestone" | "project";


const Timeline = () => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

    const {
        data: projects,
        error,
        isLoading,
    } = useGetProjectsQuery();


    const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: "en-CA"
    })

    const ganttTask = useMemo(() => {
        return (
            projects?.map((project) => ({
                start: project.startDate,
                end: project.endDate,
                name: project.name,
                id: `Project-${project.id}`,
                type: "project" as TaskTypeItems,
                progress: 50,
                isDisabled: false
            })) || []
        )
    }, [projects])


    const handleViewModeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDisplayOptions((prev) => ({
            ...prev,
            viewMode: event.target.value as ViewMode,
        }))
    }

    if (isLoading) return <div>Loading...</div>;
    if (error || !projects) return <div>An error occurred while fetching projects</div>;

    return (
        <div className='max-w-full p-8'>
            <header className='mb-4 flex items-center justify-between'>
                <Header name="Project Timeline" />
                <div className='relative inline-block w-64'>
                    <select
                        className='focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white'
                        value={displayOptions.viewMode}
                        onChange={handleViewModeChange}
                    >
                        <option value={ViewMode.Day}>Day</option>
                        <option value={ViewMode.Week}>Week</option>
                        <option value={ViewMode.Month}>Month</option>
                    </select>
                </div>
            </header>
            <div className='overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white'>
                <div className='timeline'>
                    {ganttTask.length > 0 ? (
                        <Gantt
                            tasks={ganttTask}
                            {...displayOptions}
                            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                            listCellWidth='100px'
                            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
                            barBackgroundSelectedColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
                            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"} />

                    ) : <p>No Current Tasks</ p>}
                </div>

            </div>
        </div >
    )
}

export default Timeline