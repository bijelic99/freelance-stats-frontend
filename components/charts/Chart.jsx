import ClipLoader from "react-spinners/ClipLoader";
import { cssOverride } from "../../staticValues/loader-config";
import PieChart from "./PieChart";

export default function Chart({ chart, chartData, isLoading }) {

    return (
        <>
            <ClipLoader loading={isLoading} cssOverride={cssOverride} />
            {
                chartData && <>
                    {
                        chart._type === "model.PieChart" && <PieChart chart={chart} chartData={chartData} />
                    }
                </>
            }
        </>
    )
}