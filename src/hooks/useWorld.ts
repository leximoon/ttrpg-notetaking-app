import { World } from '@/types/world';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useFetch } from './useFetch';

export function useWorlds(worldId?: string) {
	const queryClient = useQueryClient();
	const { fetch } = useFetch();
	const [currentWorldId, setCurrentWorldId] = useState<string>(worldId ?? '');
	const [currentSessionWorlds, setCurrentSessionWorlds] = useState<World[]>();

	//Function to add worlds
	const addWorld = useMutation({
		mutationFn: async (world: any) => {
			const { data } = await fetch(`/world`, {
				method: 'POST',
				body: world,
			});
			return data;
		},
		onSuccess: ({ id }) => {
			setCurrentWorldId(id);
			queryClient.invalidateQueries({ queryKey: ['worlds'] });
		},
	});

	//function to
	const getCurrentWorld = (worldId: string) =>
		useQuery<World | null, Error>({
			queryKey: ['world', worldId],
			queryFn: async () =>
				(await fetch(`/world/${worldId}`, { method: 'GET' }))
					.data as World,
		});

	const useCurrentSessionWorlds = () =>
		useQuery<World | null, Error>({
			queryKey: ['world', currentWorldId],
			queryFn: async () => {
				const { data } = await fetch(`/world/me`, { method: 'GET' });
				if (data) setCurrentSessionWorlds(data);
				console.log('worlds fetched ', data);
				return data;
			},
		});

	return {
		addWorld,
		getCurrentWorld,
		useCurrentSessionWorlds,
		currentSessionWorlds,
	};
}
