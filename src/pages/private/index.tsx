"use client"

import { useCookies } from 'react-cookie';
import { api } from '~/utils/api';

export default function Private() {
    const mensaje = api.main.privateDate.useQuery()

    const [cookies] = useCookies();

    if (!cookies.token) {
        return (<p>No autorizado</p>)
    }

    return (
        <p>Mensaje secreto: {mensaje.data?.msg}</p>
    )
}