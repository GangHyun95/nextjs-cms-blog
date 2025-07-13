type Props = {
    title: string;
    description?: string;
    right?: React.ReactNode;
}

export default function AdminPageHeader({ title, description, right }: Props) {
    return (
        <div className='flex flex-col gap-4 mb-6 lg:items-center lg:flex-row'>
            <div className='flex-1'>
                <h1 className='text-xl font-semibold'>{title}</h1>
                {description && (
                    <p className='text-sm text-muted-foreground mt-1'>{description}</p>
                )}
            </div>
            {right}
        </div>
    );
}
