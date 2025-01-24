'use client';

import { usePathname } from 'next/navigation';
import React, { ElementRef, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import {
	ChevronsLeft,
	MenuIcon,
	PlusCircle,
	PlusIcon,
	Search,
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useDocument } from '@/hooks/useDocument';
import { Item } from './item';
import { DocumentList } from './documentList';
import { Button } from '@/components/UI/button';
import { TopNavBar } from './topNavBar';

// ALL NAVIGATION
export const Navigation = () => {
	const pathname = usePathname();

	// WINDOW SIZE CHECK
	const isSmall = useMediaQuery('(max-width: 768px)');

	// REFERENCES TO ELEMENTS
	const isResizingRef = useRef(false);
	const sideBarRef = useRef<ElementRef<'aside'>>(null);

	// STATES FOR RESETTING AND COLLAPSING
	const [isResetting, setIsResetting] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(isSmall);

	// LOADING DOCUMENTS
	const worldId = pathname.split('/')[2]; //get second element from url which is worldId
	const currentDocumentId = pathname.split('/')[3]; //get third element from url which is documentId

	// CREATING DOCUMENT
	const { addDocument } = useDocument();
	const handleDocument = () => {
		addDocument.mutate({ title: 'Untitled', worldId });
	};

	// MOUSE ACTION FUNCTIONS
	// When clicking set resizing to true and add event listeners
	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.preventDefault();
		event.stopPropagation();

		isResizingRef.current = true;
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	// When moving while clicking change size
	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizingRef.current) return;
		let newWidth = event.clientX;

		if (newWidth < 240) newWidth = 240;
		if (newWidth > 480) newWidth = 480;

		if (sideBarRef.current) {
			sideBarRef.current.style.width = `${newWidth}px`;
		}
	};

	// When click ends reset resizing to false and remove event listeners
	const handleMouseUp = () => {
		isResizingRef.current = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	// RESIZE FUNCTIONS
	// Reset side bar to original size
	const resetWidth = () => {
		if (sideBarRef.current ) {
			setIsCollapsed(false);
			setIsResetting(true);

			sideBarRef.current.style.width = isSmall ? '100%' : '240px';

			//time for resetting same as duration of transition animation
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	// Collapse side bar completely
	const collapse = () => {
		if (sideBarRef.current) {
			setIsCollapsed(true);
			setIsResetting(true);

			sideBarRef.current.style.width = '0';

			//time for resetting same as duration of transition
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	return (
		<>
			<div
				className={twMerge(
					clsx(
						// TOP NAV BAR
						'absolute bg-primary/50 top-0 h-[50px] z-[99999] w-full',
						{ 'left-0 w-full': isSmall }
					)
				)}
			>
                <TopNavBar currentWorldId={worldId} currentDocumentId={currentDocumentId} />
				<nav className='bg-transparent px-3 py-2 w-full mt-[10px]'>
					{isCollapsed && (
						<MenuIcon
							onClick={resetWidth}
							role='button'
							className='h-6 w-6 text-text'
						/>
					)}
				</nav>
                
			</div>
			<aside
				ref={sideBarRef}
				className={twMerge(
					clsx(
						// SIDE BAR
						'group/sidebar absolute top-[50px] h-[calc(100%-50px)] bg-secondary overflow-y-auto w-60 flex flex-col z-[99999] bottom-0',
						{
							'transition-all ease-in-out duration-300':
								isResetting,
						},
						{ 'w-0': isSmall }
					)
				)}
			>
				<div
					onClick={collapse}
					role='button'
					className={twMerge(
						clsx(
							// COLLAPSE BUTTON
							'h-6 w-6 text-primary/80 rounded-sm hover:bg-secondary-contrast absolute top-0.5 right-1 opacity-0 group-hover/sidebar:opacity-100 transition',
							{ 'opacity-100': isSmall }
						)
					)}
				>
					<ChevronsLeft className='h-6 w-6' />
				</div>
                
				{/*TODO: SEARCH BAR

                <div className='h-13 mt-3'>
					<Item
						label='Search'
						icon={Search}
						isSearch
						onClick={() => {}}
					/>
				</div>
                */}
                <div className='mt-[30px]'>
                <DocumentList // DOCUMENT LIST
					worldId={worldId}
				/>
                </div>
				
				<Button // ADD PAGE BUTTON
					intent='secondary'
					size='m'
					variant='fill'
					className='!bg-secondary-contrast/30 mt-auto !text-primary/80'
					icon={<PlusIcon />}
					label='New Page'
					onClick={handleDocument}
				/>
				<div
					// VERTICAL BAR FOR RESIZING SIDE BAR
					className='opacity-0 group-hover/sidebar:opacity-100
                transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
				/>
			</aside>
		</>
	);
};
