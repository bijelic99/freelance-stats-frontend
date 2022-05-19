import ChartForm from "./chartForm/ChartForm";

export default function Dashboard({ editMode }) {
    return (
        <>

            {editMode && <div className="border border-black rounded-md shadow-md p-1 mb-2">
                <ChartForm />
            </div>}
            <div className="border border-black rounded-md shadow-md p-1">
                {editMode ? <h1>Edit mode on</h1> : <h1>Edit mode off</h1>}
            </div>
        </>
    )
}