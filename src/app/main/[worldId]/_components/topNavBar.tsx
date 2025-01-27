'use client';
import { useWorlds } from '@/hooks/useWorld';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { documentsApi } from '@/lib/api/documentsApi';
import Image from 'next/image';
import { Skeleton } from '@nextui-org/skeleton';
import { usePathname, useRouter } from 'next/navigation';
import { Settings, Settings2 } from 'lucide-react';

export const TopNavBar = () => {
	const pathname = usePathname();
	const router = useRouter();

	//GET CURRENT WORLD FOR BREADCRUMBS
	const currentWorldId = pathname.split('/')[2];
	const { getCurrentWorld } = useWorlds();
	const { data: currentWorld } = getCurrentWorld(currentWorldId);

	//GET DOCUMENT FOR BREADCRUMBS
	const currentDocumentId = pathname.split('/')[3];
	const { getBreadcrumbsById } = documentsApi();

	const currentDocumentBreadcrumbs = useQuery({
		queryKey: [`breadcrumbs`, currentDocumentId],
		queryFn: () => getBreadcrumbsById(currentDocumentId),
	});
    console.log(currentDocumentBreadcrumbs.data)

	// SETTINGS BUTTON
	const onRedirect = () => {
		router.push(`/panel/account`);
	};

	return (
		<div className='p-1 pl-5 flex flex-row h-[50px]'>
			<Image
				className='flex'
				src='/dragon-logo.svg'
				width={35}
				height={40}
				alt='Dragon logo'
			/>
			<div className='flex items-center font-semibold text-xl text-primary pl-4'>
				{currentWorld?.name}
				{!currentDocumentBreadcrumbs.isLoading && currentDocumentBreadcrumbs.data[0] != null &&
					currentDocumentBreadcrumbs.data?.map((element: string, index: number) => (
                                <div key={index} className='flex items-center font-semibold text-xl text-primary pl-4 gap-x-3'>
									<div className='text-primary-muted'>/</div>
									<div>{element}</div>
								</div>
							))
						}
					
			</div>

			{currentDocumentBreadcrumbs.isLoading && (
				<div className='flex p-2'>
					<Skeleton className='bg-primary/30 animate-pulse rounded-md h-8 w-[35%]' />
				</div>
			)}
			<div
				role='button'
				onClick={onRedirect}
				className='h-[30px] w-[30px] text-primary/80 rounded-md hover:bg-secondary-contrast/30 ml-auto place-self-center mr-2 flex'
			>
				<Settings className='h-[30px] w-[30px]' />
			</div>
		</div>
	);
};
