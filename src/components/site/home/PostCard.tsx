import { Post } from '@/types/posts';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function PostCard({ post }: { post: Post }) {
    const { title, description, imageUrl, author, authorAvatar, date, comments } = post;
    return (
        <div className='flex flex-row xl:flex-col rounded-xs overflow-hidden shadow hover:shadow-xl hover:-translate-y-2 transition-all duration-200 bg-background'>
            <div className='relative w-2/5 max-w-40 h-auto xl:max-w-none xl:w-full xl:pb-[56.25%] xl:h-0'>
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 33vw'
                />
            </div>

            <div className='p-4 flex flex-col gap-3 flex-1'>
                <h4 className='text-lg font-semibold line-clamp-2 order-1'>{title}</h4>

                <p className='text-sm text-muted-foreground line-clamp-2 order-2'>
                    {description}
                </p>

                <div className='flex items-center gap-2 text-xs text-muted-foreground order-3 xl:order-0'>
                    <img
                        src={authorAvatar}
                        alt={author}
                        className='w-5 h-5 rounded-full'
                    />
                    <span>{author}</span>
                    <span>·</span>
                    <span>{date}</span>
                </div>

                <div className='flex items-center text-xs text-muted-foreground gap-1 pt-1 order-4'>
                    <MessageCircle className='w-4 h-4' />
                    <span>{comments}</span>
                </div>
            </div>
        </div>
    );
}