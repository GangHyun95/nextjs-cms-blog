export default function RecentPostCard() {
    return (
        <div className='flex-1 min-w-0 flex flex-col p-6 bg-background rounded-xs border'>
            <p className='mb-3'>EC2 서버 세팅 정리 (PERN + Redis)</p>
            <p className='text-sm text-muted-foreground break-all line-clamp-5'>
                1. PostgreSQL 비밀번호 설정 sudo -u postgres psql
                프롬프트 들어가면: CREATE USER your_username WITH PASSWORD
                'your_password'; CREATE DATABASE your_database; GRANT ALL
                PRIVILEGES ON DATABASE your_database TO your_username; \q
                2. 로컬 schema.sql → EC2 서버로 업로드 터미널에서 실행: scp -i
                ~/.ssh/your-key.pem "./schema.sql"
                ubuntu@your-server:/home/ubuntu/project/
            </p>
            <div className='flex items-center gap-1 text-muted-foreground mt-12'>
                <span className='text-xs'>댓글 0</span>
                <div className='dot'/>
                <span className='text-xs'>좋아요 0</span>
            </div>
        </div>
    );
}
