import { Head, Link } from '@inertiajs/react';

type User = {
    id: number;
    username: string;
};

export default function Members({ users }: { users: User[] }) {
    return (
        <>
            <Head title="Members" />
            <div className="container mx-auto p-8">
                <h1 className="mb-4 text-2xl font-bold">Members</h1>
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li key={user.id} className="flex items-center justify-between border-b py-2">
                            <span>{user.username}</span>
                            <Link href={route('members.wishlist', user.id)} className="text-blue-600 hover:underline">
                                View Wishlist
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
