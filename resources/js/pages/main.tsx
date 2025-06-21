import { type SharedData } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

type WishlistItem = {
    id: number;
    title: string;
    description?: string;
    created_at: string;
};

export default function Main() {
    const { auth, wishlistItems = [] } = usePage<SharedData & { wishlistItems: WishlistItem[] }>().props;

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
    });

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<{ title: string; description?: string }>({ title: '', description: '' });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('wishlist-items.store'), {
            onSuccess: () => reset(),
        });
    }

    function handleDelete(itemId: number) {
        if (window.confirm('Are you sure you want to remove this item?')) {
            router.delete(route('wishlist-items.destroy', itemId));
        }
    }

    function handleEdit(item: WishlistItem) {
        setEditingId(item.id);
        setEditData({ title: item.title, description: item.description || '' });
    }

    function handleUpdate(e: React.FormEvent, itemId: number) {
        e.preventDefault();
        router.put(route('wishlist-items.update', itemId), editData, {
            onSuccess: () => setEditingId(null),
        });
    }

    function handleEditChange(field: 'title' | 'description', value: string) {
        setEditData((prev) => ({ ...prev, [field]: value }));
    }

    function handleCancelEdit() {
        setEditingId(null);
    }

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                method="post"
                                onClick={() => router.flushAll()}
                                href={route('logout')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]"
                            >
                                Logout
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035]"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                {auth.user && (
                    <main className="w-full max-w-2xl space-y-8">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold">Your Wishlist</h2>
                            {wishlistItems.length === 0 ? (
                                <p className="text-gray-500">Your wishlist is empty.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {wishlistItems.map((item) => (
                                        <li key={item.id} className="flex items-center justify-between rounded border bg-white px-4 py-2 shadow-sm">
                                            {editingId === item.id ? (
                                                <form onSubmit={(e) => handleUpdate(e, item.id)} className="flex flex-1 flex-col gap-1">
                                                    <input
                                                        value={editData.title}
                                                        onChange={(e) => handleEditChange('title', e.target.value)}
                                                        className="w-full rounded border px-2 py-1"
                                                        required
                                                    />
                                                    <textarea
                                                        value={editData.description}
                                                        onChange={(e) => handleEditChange('description', e.target.value)}
                                                        className="w-full rounded border px-2 py-1"
                                                    />
                                                    <div className="mt-1 flex gap-2">
                                                        <button type="submit" className="text-green-600">
                                                            Save
                                                        </button>
                                                        <button type="button" onClick={handleCancelEdit} className="text-gray-500">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="flex-1">
                                                    <div className="font-medium">{item.title}</div>
                                                    {item.description && <div className="text-sm text-gray-600">{item.description}</div>}
                                                    <div className="text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString()}</div>
                                                </div>
                                            )}
                                            {editingId !== item.id && (
                                                <div className="flex gap-2">
                                                    <button className="text-blue-500 hover:underline" onClick={() => handleEdit(item)}>
                                                        Edit
                                                    </button>
                                                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(item.id)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>

                        <section>
                            <h3 className="mb-2 text-xl font-semibold">Add New Item</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1 block font-medium" htmlFor="title">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full rounded border px-3 py-2"
                                        required
                                    />
                                    {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
                                </div>
                                <div>
                                    <label className="mb-1 block font-medium" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full rounded border px-3 py-2"
                                    />
                                    {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                                </div>
                                <button type="submit" disabled={processing} className="rounded bg-[#1b1b18] px-4 py-2 text-white hover:bg-[#282822]">
                                    Add Item
                                </button>
                            </form>
                        </section>
                    </main>
                )}
            </div>
        </>
    );
}
