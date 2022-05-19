import { useReducer, useCallback, useState } from "react";
import InitialChartForm from "./InitialChartForm";
import PieChartForm from "./PieChartForm";

function chartReducerFunction(state, action) {
    switch (action.type) {
        case 'SET_INITIAL_FORM_DATA':
        case 'SET_CHART_SPECIFIC_DATA':
            return { ...state, ...action.payload }
        default:
            throw new Error(`Unsuported action '${action.type}'`)
    }
}

export default function ChartForm() {
    const [chart, dispatch] = useReducer(chartReducerFunction, {})

    const [currentPage, setCurrentPage] = useState(null)

    const openFirstPage = useCallback(
        () => {
            setCurrentPage(null)
        }, [setCurrentPage]
    )

    const firstFormSubmit = useCallback(
        payload => {
            setCurrentPage(payload?.chartType)
            dispatch({ type: 'SET_INITIAL_FORM_DATA', payload })
        }, [setCurrentPage, dispatch]
    )

    const secondFormSubmit = useCallback(
        payload => {
            dispatch({ type: 'SET_CHART_SPECIFIC_DATA', payload })
            console.log(payload)
        }, [dispatch]
    )

    return (
        <>
            {!currentPage && <InitialChartForm formSubmit={firstFormSubmit} />}
            {currentPage === 'pie' && <PieChartForm openPreviousPage={openFirstPage} formSubmit={secondFormSubmit} />}

        </>
    )
} 