import Head from "next/head";
import { useContext } from "react";
import { UserManagementContext } from "../../contexts/userManagementContext";

export default function User() {
    const {user} = useContext(UserManagementContext)

    return (
        <>
            <Head>
                <title>{user.username}</title>
            </Head>
        </>
    )
}