import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { cookies } from 'next/headers';
import { createClient } from './utils/supabase/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request) {

    // console.log('🚀 Middleware running:', request.nextUrl);

    const isAdminPath = detectAdminPath(request);

    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { data: { session } } = await supabase.auth.getSession();

    console.log('Debug session:', isAdminPath, session);

    if (isAdminPath && !session) {
        const url = request.nextUrl.clone();
        url.pathname = `/login`;
        return Response.redirect(url);
    }

    // const cookieStore = await cookies();
    // console.log('Debug :', cookieStore.getAll());
    return intlMiddleware(request);
}

export const config = { matcher: ['/((?!_next|.*\\..*|api).*)'] };

const detectAdminPath = (request) => {
    const url = new URL(request.url);
    return url.pathname.includes('/admin');
}

