'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RoleSelectDropdown({ defaultValue }: { defaultValue: string }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const roles = ['전체 관리자', '열람 전용'];

    useEffect(() => {
        if (open && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [open]);

    return (
        <>
            <div className='relative w-30'>
                <Button
                    size='sm'
                    variant='outline'
                    onClick={() => setOpen((prev) => !prev)}
                    className='w-full justify-between text-xs'
                    ref={triggerRef}
                >
                    <span className='truncate'>{value}</span>
                    <ChevronDown className='size-4 text-muted-foreground' />
                </Button>
            </div>

            {open &&
                createPortal(
                        <div
                            className='fixed inset-0'
                            onClick={() => setOpen(false)}
                        >
                            <div
                                className='absolute bg-white border rounded-xs shadow w-32'
                                style={{
                                    top: position.top,
                                    left: position.left,
                                    width: position.width,
                                    position: 'absolute',
                                }}
                            >
                                {roles.map((role) => (
                                    <Button
                                        key={role}
                                        size='sm'
                                        variant='ghost'
                                        onClick={() => {
                                            setValue(role);
                                            setOpen(false);
                                        }}
                                        className='w-full justify-start text-xs'
                                    >
                                        {role}
                                    </Button>
                                ))}
                            </div>
                        </div>,
                    document.body
                )}
        </>
    );
}
