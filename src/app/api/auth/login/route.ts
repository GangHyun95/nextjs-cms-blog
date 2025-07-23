import { cookies } from 'next/headers';

import { supabase } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return Response.json({ success: false, message: '유효한 이메일 형식이 아닙니다.' }, { status: 400 });
        }
        if (password.length < 6) {
            return Response.json({ success: false, message: '비밀번호는 최소 6자 이상이어야 합니다.' }, { status: 400 });
        }
        if (/\s/.test(password)) {
            return Response.json({ success: false, message: '비밀번호에는 공백을 포함할 수 없습니다.' }, { status: 400 });
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error || !data.session) {
            const message = error?.code === 'invalid_credentials' ? '이메일 또는 비밀번호가 일치하지 않습니다.' : error?.message || '로그인에 실패했습니다.';
            return Response.json({ success: false, message }, { status: 401 });
        }

        const { access_token, refresh_token } = data.session;
        const cookie = await cookies();

        cookie.set('blog-refresh-token', refresh_token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict',
        });

        return Response.json({
            success: true,
            data: { accessToken: access_token },
            message: '로그인에 성공했습니다.',
        });
    } catch (error) {
        console.error('로그인 실패:', error);
        return Response.json({ success: false, message: '잘못된 요청입니다.'},{ status: 400 })
    }
}
