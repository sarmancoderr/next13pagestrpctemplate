import Link from 'Next/link';
import { useCookies } from 'react-cookie';

export const AuthedComponent = (Component: any) => function AuthedComponent() {
    const [cookies] = useCookies();

    if (!cookies.token) {
        return (
            <>
                <p>Tienes que <Link href={'/'}>autenticoate</Link></p>
            </>
        );
    }

    return (
        <Component />
    );
};

export const UnauthedComponent = (Component: any) => function AuthedComponent() {
    const [cookies] = useCookies();

    if (cookies.token) {
        return (
            <>
                <p>Estas autenticado <Link href={'/private'}>Ir a private</Link></p>
            </>
        );
    }

    return (
        <Component />
    );
};
