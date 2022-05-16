import Head from "next/head";
import Dashboard from "../../components/Dashboard";

export default function CreateDashboard() {
    return (
        <>
            <Head>
                <title>Create dashboard</title>
            </Head>
            <div>
                <Dashboard editMode />
            </div>
        </>
    )
}