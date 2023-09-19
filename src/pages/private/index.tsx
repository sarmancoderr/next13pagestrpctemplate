import { api } from '~/utils/api';
import { AuthedComponent } from '../../components/AuthedComponent';

export default AuthedComponent(function Private() {
    const mensaje = api.private.privateDate.useQuery()

    return (
        <p>Mensaje secreto: {mensaje.data?.msg}</p>
    )
})