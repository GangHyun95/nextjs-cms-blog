import { supabase } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        const cookie = await cookies();
        const refreshToken = cookie.get('blog-refresh-token');
        if (!refreshToken) {
            return Response.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 });
        }

        const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken.value })
        if (error || !data.session) {
            cookie.delete({ name: 'blog-refresh-token', path: '/' });
            return Response.json({ success: false, message: '세션 갱신 실패'}, { status: 401 });
        }
        
        const { access_token, refresh_token } = data.session;

        if (refresh_token && refresh_token !== refreshToken.value) {
            cookie.set('blog-refresh-token', refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'strict',
            });
        }

        return Response.json({
            success: true,
            data: { accessToken: access_token },
            message: '세션이 갱신되었습니다.',
        });
    } catch (error) {
        console.error('세션 갱신 실패:', error);
        return Response.json({ success: false, message: '서버 오류입니다.' }, { status: 500 });
    }
}
