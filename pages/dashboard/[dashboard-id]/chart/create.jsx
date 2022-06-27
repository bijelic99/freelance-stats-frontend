import ChartForm2 from "../../../../components/chartForm/ChartForm2";
import { fetchChartsMetadata, fetchSources } from "../../../../sharedFunctions/apiFetch";

function ChartCreate({sources, chartsMetadata}) {
    return (
        <>
            <ChartForm2 sources={sources} chartsMetadata={chartsMetadata} submitForm={null}></ChartForm2>
        </>
    )
}

export async function getStaticPaths() {

    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps() {
    const sources = await fetchSources()
    const chartsMetadata = await fetchChartsMetadata()

    return {
        props: {
            sources,
            chartsMetadata
        }
    }
}

export default ChartCreate