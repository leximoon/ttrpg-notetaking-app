'use client';

import { useFetch } from '@/hooks/useFetch';

const API_BASE_URL = 'http://localhost:5000';

export function documentsApi() {
	const { fetch } = useFetch();

	async function createDocument(
		title: string,
		worldId: string,
		parentDocumentId?: string
	) {
		const { data } = await fetch(`/documents/add`, {
			method: 'POST',
			body: {
				title: title,
				worldId: worldId,
				parentDocumentId: parentDocumentId,
			},
		});

		if (!data) {
			throw new Error('Creating document failed');
		}

		return data;
	}

	async function loadDocuments(worldId: string, parentDocumentId?: string) {
		let urlParams: string = worldId;
		// Optional argument of parentDocumentId gets only Documents with that documentId as there parentDocumentId
		if (parentDocumentId) {
			urlParams += '?parentDocumentId=' + parentDocumentId;
		}

		const { data } = await fetch(`/documents/${urlParams}`, {
			method: 'GET',
		});
		if (!data) {
			throw new Error('Loading document list failed');
		}

		return data;
	}

	async function updateDocument(
		documentId: string,
		field: string,
		content: any
	) {
		const { data } = await fetch(`/documents/update`, {
			method: 'PUT',
			body: { documentId: documentId, field: field, content: content },
		});

		if (!data) {
			throw new Error('Editing document failed');
		}

		return data;
	}

	async function deleteDocument(documentId: string) {
		const { data } = await fetch(`/documents/delete`, {
			method: 'DELETE',
			body: { documentId: documentId },
		});

		if (!data) {
			throw new Error('Deleting document failed');
		}

		return data;
	}

	async function getBreadcrumbsById(documentId: string) {
		const { data } = await fetch(`/documents/breadcrumbs/${documentId}`, {
			method: 'GET',
		});

		if (!data) {
			throw new Error('Fetching document failed');
		}

		return data;
	}

	return {
		createDocument,
		loadDocuments,
		updateDocument,
		deleteDocument,
		getBreadcrumbsById,
	};
}
