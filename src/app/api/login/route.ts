import { supabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return Response.json({ error: '유효한 이메일 형식이 아닙니다.' }, { status: 400 });
    }
    if (password.length < 6) {
        return Response.json({ error: '비밀번호는 최소 6자 이상이어야 합니다.' }, { status: 400 });
    }
    if (/\s/.test(password)) {
        return Response.json({ error: '비밀번호에는 공백을 포함할 수 없습니다.' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
        const message = error?.code === 'invalid_credentials' ? '이메일 또는 비밀번호가 일치하지 않습니다.' : error?.message || '로그인에 실패했습니다.';
        return Response.json({ error: message }, { status: 401 });
    }

    const { access_token, refresh_token } = data.session;

    const res = NextResponse.json({ accessToken: access_token });

    res.cookies.set('blog-refresh-token', refresh_token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
    });

    return res;
}
