import { Post } from '@/types/posts';
import PostCard from './PostCard';

const mockPosts: Post[] = [
    {
        id: 1,
        title: 'ESLint로 리액트 import 순서 자동 정리하기',
        description: 'React 프로젝트를 진행하다 보면 import 순서가 제각각이라서 보기 불편해질 때가 많습니다. 처음에는 수동으로 정리하려 했는데, 이걸 매번 사람이 맞추는 건 너무 번거롭고 비효율적이라 방법을 찾다가 ESLint로 해결하게 됐습니다.',
        imageUrl: 'https://placehold.co/400x200.png',
        author: 'hyun',
        authorAvatar: '/temp_profile.jpg',
        date: '2025.05.30',
        comments: 18,
    },
    {
        id: 2,
        title: 'URL 기반 모달 라우팅 구현',
        description: "X(구 트위터) 사이트를 클론코딩하다가, 회원가입이나 로그인 버튼을 누르면 모달이 뜨고 URL이 '/i/flow/signup', '/i/flow/login'으로 바뀌는 걸 봤습니다. 처음엔 그냥 페이지 이동인 줄 알았는데, 실제로는 화면은 그대로고 모달만 올라오는 구조였습니다. 특히 모바일에선 실수로 뒤로가기를 눌렀을 때, 모달만 닫히고 기존 페이지는 그대로 유지돼서, 사용자 입장에서 훨씬 안정적인 흐름을 만들 수 있다고 생각했습니다. 그래서 저도 이 구조를 비슷하게 구현해봤습니다.",
        imageUrl: 'https://placehold.co/400x200.png',
        author: 'hyun',
        authorAvatar: '/temp_profile.jpg',
        date: '2025.05.23',
        comments: 12,
    },
    {
        id: 3,
        title: 'Zustand 리렌더링 최적화 하기 + Redux Toolkit 최적화',
        description: '최근 프로젝트를 진행하면서 다양한 상태관리 라이브러리를 사용해봤습니다. 그중에서도 가장 자주 사용한 건 Zustand였고, 최근에는 Redux Toolkit도 경험해봤습니다. 사실 React에서는 Context API만으로도 상태 공유가 가능합니다. 그런데도 사람들이 굳이 Zustand나 Redux 같은 상태관리 라이브러리를 사용하는 이유는 뭘까요? Context API는 하나의 값만 바뀌더라도 전체가 리렌더링되기 때문에 성능 측면에서 아쉬운 부분이 있습니다.',
        imageUrl: 'https://placehold.co/400x200.png',
        author: 'hyun',
        authorAvatar: '/temp_profile.jpg',
        date: '2025.05.18',
        comments: 7,
    },
    {
        id: 4,
        title: 'Socket.IO를 이용한 채팅 및 온라인/오프라인 실시간 상태 반영',
        description: '채팅 앱에서는 유저가 메시지를 실시간으로 주고받는 것뿐만 아니라, 누가 온라인인지도 즉시 보여주는 기능이 중요합니다. 이를 위해 Socket.IO를 도입했습니다. 서버(Node.js)에서는 socket.io를, 클라이언트(React)에서는 socket.io-client를 사용했습니다. 이로 인해 유저 상태를 실시간으로 반영하고, 채팅이 원활하게 이루어질 수 있었습니다.',
        imageUrl: 'https://placehold.co/400x200.png',
        author: 'hyun',
        authorAvatar: '/temp_profile.jpg',
        date: '2025.05.01',
        comments: 5,
    },
];

export default function PopularPosts() {
    return (
        <div className='w-content mx-auto'>
            <div className='space-y-3 mb-8'>
                <h3 className='text-4xl font-bold'>🔥 인기 있는 글들</h3>
                <p className='text-sm text-muted-foreground'>
                    많은 사람들이 관심 있게 본 포스트들이에요. 놓치지 말고 한 번 읽어보세요!
                </p>
            </div>

            <div className='space-y-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    {mockPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

