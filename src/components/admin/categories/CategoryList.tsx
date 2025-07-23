'use client';

import { useState } from 'react';
import CategoryItem from './CategoryItem';
import { ReactSortable } from 'react-sortablejs';

type Item = {
    id: number;
    label: string;
};

type Category = {
    id: number;
    label: string;
    children: Item[];
};

type Props = {
    items: Category[];
};

export default function CategoryList({ items }: Props) {
    const [categories, setCategories] = useState<Category[]>(items);

    const handleChildrenSort = (categoryId: number, newChildren: Item[]) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === categoryId ? { ...cat, children: newChildren } : cat
            )
        );
    };

    return (
        <ReactSortable
            tag='ul'
            list={categories}
            setList={setCategories}
            animation={150}
            handle='.drag-handle'
            className='space-y-4'
            ghostClass='opacity-0'
        >
            {categories.map((category) => (
                <li key={category.id}>
                    <CategoryItem
                        label={category.label}
                        isParent
                    >
                        <ReactSortable
                            tag='ul'
                            list={category.children}
                            setList={(newList) => handleChildrenSort(category.id, newList)}
                            animation={150}
                            handle='.drag-handle'
                            group='shared-children'
                            ghostClass='opacity-0'
                        >
                            {category.children.map((child) => (
                                <li key={child.id} data-id={child.id} data-label={child.label}>
                                    <CategoryItem label={child.label} />
                                </li>
                            ))}
                        </ReactSortable>
                    </CategoryItem>
                </li>
            ))}
        </ReactSortable>
    );
}
