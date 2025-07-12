import { cn } from '@/lib/utils';

type Props = {
    as?: React.ElementType;
    padding?: 'sm' | 'md' | 'lg' | 'uniform';
    className?: string;
    children: React.ReactNode;
};

export default function Card({
    as: Component = 'div',
    padding = 'md',
    className = '',
    children,
}: Props) {
    const baseClass = 'bg-background border border-border rounded-xs';

    const paddingClass = {
        sm: 'px-6 py-4',
        md: 'px-8 py-5',
        lg: 'px-8 py-12',
        uniform: 'p-6',
    }[padding];

    return (
        <Component className={cn(baseClass, paddingClass, className)}>
            {children}
        </Component>
    );
}
