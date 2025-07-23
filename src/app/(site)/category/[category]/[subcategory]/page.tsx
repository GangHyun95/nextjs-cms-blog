type Props = {
    params: Promise<{
        category: string;
        subcategory: string;
    }>;
}

export default async function Page({ params }: Props) {
    const { category, subcategory } = await params;

    return (
        <div>
            <h1>
                {category} / {subcategory}
            </h1>
        </div>
    );
}
