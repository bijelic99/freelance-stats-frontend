export function getChartVisualizationDataLimits(chartMetadata, chartType) {
    return Object.values(chartMetadata).find(cm => cm.class === chartType)?.visualizationLimits || {}
}