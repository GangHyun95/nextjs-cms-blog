import CategoryItem from './CategoryItem';

type Category = {
    id: number;
    label: string;
    children: { id: number; label: string }[];
};

type Props = {
    items: Category[];
};

export default function CategoryList({ items }: Props) {
    return (
        <ul className='space-y-4'>
            {items.map((group) => (
                <CategoryItem key={group.id} label={group.label} isParent>
                    {group.children.map((child) => (
                        <CategoryItem key={child.id} label={child.label} />
                    ))}
                </CategoryItem>
            ))}
        </ul>
    );
}
