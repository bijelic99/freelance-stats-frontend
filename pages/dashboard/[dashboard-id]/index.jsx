import Head from "next/head";
import { useRouter } from "next/router";

export default function Dashboard() {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{ router.query['dashboard-id'] }</title>
            </Head>
        </>
    )
}