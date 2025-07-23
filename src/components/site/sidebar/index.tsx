import SidebarContent from './SidebarContent';

export default function Sidebar() {
    return (
        <aside className='grow z-20 hidden flex-col shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] 2xl:flex'>
            <SidebarContent />
        </aside>
    );
}

