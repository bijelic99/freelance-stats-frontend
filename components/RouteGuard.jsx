import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo } from 'react';
import { UserManagementContext } from '../contexts/userManagementContext';

export default function RouteGuard({children}) {
    const router = useRouter()
    const {token} = useContext(UserManagementContext)
    const currentPage = useMemo(() => router.asPath, [router])
    useEffect(() => {
        if (currentPage && token && ["register", "login"].find(x => currentPage?.endsWith(x))) {
            router.push("/")
        }
        else if (currentPage && !token && !(["register", "login"].find(x => currentPage?.endsWith(x)))) {
            router.push("/login")
        }
    }, [token, currentPage])
    return <>
    {
        children
    }
    </>
}