import ChartForm from "../../../../components/chartForm/ChartForm";
import { fetchChartsMetadata, fetchSources } from "../../../../sharedFunctions/apiFetch";

function ChartCreate({sources, chartsMetadata}) {
    return (
        <>
            <ChartForm sources={sources} chartsMetadata={chartsMetadata} submitForm={null}></ChartForm>
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