import { Head, Link, router } from '@inertiajs/react';

type WishlistItem = {
    id: number;
    title: string;
    description?: string;
    created_at: string;
    reserved_by: string;
};

type Member = {
    id: number;
    username: string;
};

export default function MemberWishlist({ member, wishlistItems }: { member: Member; wishlistItems: WishlistItem[] }) {
    console.log('wishlistItems', wishlistItems);

    function handleReserve(itemId: number) {
        router.post(route('wishlist-items.reserve', itemId));
    }

    return (
        <>
            <Head title={`${member.username}'s Wishlist`} />
            <div className="container mx-auto p-8">
                <Link href={route('members')} className="mb-4 inline-block text-blue-600 hover:underline">
                    &larr; Back to Members
                </Link>
                <h1 className="mb-4 text-2xl font-bold">{member.username}'s Wishlist</h1>
                {wishlistItems.length === 0 ? (
                    <p className="text-gray-500">This wishlist is empty.</p>
                ) : (
                    <ul className="space-y-3">
                        {wishlistItems.map((item) => (
                            <li key={item.id} className="flex items-center justify-between rounded border bg-white px-4 py-2 shadow-sm">
                                <div>
                                    <div className="font-medium text-gray-700">{item.title}</div>
                                    <div>
                                        {item.reserved_by == null && (
                                            <button type="submit" className="text-green-600" onClick={() => handleReserve(item.id)}>
                                                Reserve
                                            </button>
                                        )}

                                        {item.reserved_by != null && <span className="text-gray-500">Reserved</span>}
                                    </div>
                                    {item.description && <div className="text-sm text-gray-600">{item.description}</div>}
                                    <div className="text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString()}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
