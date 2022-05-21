import { useReducer, useCallback, useEffect } from "react";
import InitialChartForm from "./InitialChartForm";
import PieChartForm from "./PieChartForm";

function chartReducerFunction(state, action) {
    switch (action.type) {
        case 'INITIAL_FORM_SUBMIT':
            return { isSubmited: false, currentForm: action.payload.chartType, chart: { ...state.chart, ...action.payload } }
        case 'GO_TO_INITIAL_FORM':
            return { ...state, currentForm: 'initial' }
        case 'CHART_SUBMIT':
            return { ...state, isSubmited: true, chart: { ...state.chart, ...action.payload } }
        case 'FORM_RESET':
            return { isSubmited: false, currentForm: 'initial', chart: {} }
        default:
            throw new Error(`Unsuported action '${action.type}'`)
    }
}

export default function ChartForm() {
    const [chartForm, dispatch] = useReducer(chartReducerFunction, { isSubmited: false, currentForm: 'initial', chart: {} })

    const goToInitialForm = useCallback(
        () => {
            dispatch({ type: 'GO_TO_INITIAL_FORM' })
        }, [dispatch]
    )

    const initialFormSubmit = useCallback(
        payload => {
            dispatch({ type: 'INITIAL_FORM_SUBMIT', payload })
        }, [dispatch]
    )

    const chartSubmit = useCallback(
        payload => {
            dispatch({ type: 'CHART_SUBMIT', payload })
        }, [dispatch, chartForm]
    )

    useEffect(
        () => {
            if (chartForm.isSubmited) {
                console.log(chartForm)
                dispatch({ type: 'FORM_RESET' })
            }
        }, [chartForm.isSubmited]
    )

    return (
        <>
            {chartForm.currentForm == 'initial' && <InitialChartForm formSubmit={initialFormSubmit} />}
            {chartForm.currentForm == 'pie' && <PieChartForm goToInitialForm={goToInitialForm} formSubmit={chartSubmit} />}

        </>
    )
} 