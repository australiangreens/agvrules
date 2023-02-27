import React from 'react';
import {useDocsSidebar} from '@docusaurus/theme-common/internal'

export default function PageList ({ children }) {
    const sidebar = useDocsSidebar();
    return (
        <ul>
        {sidebar.items.map(link => <li><a href={link.href}>{link.label}</a></li>)}
        </ul>
    )
}