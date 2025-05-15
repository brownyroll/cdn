'use client';

import { usePathname } from 'next/navigation';

export default function CurrentPath() {
const pathname = usePathname();

    return <p>Current Page: {pathname}</p>;

};