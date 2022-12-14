import { API_URL } from '@/constants/url';
import { getCookie } from '@/utils/cookie';

export const postComment = async ({
  mapId,
  placeId,
  content,
}: {
  mapId: number;
  placeId: number;
  content: string;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';

  const response = await fetch(
    `${API_URL}/map/${mapId}/places/${placeId}/comments`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    }
  );

  const comment = await response.json();

  try {
    return comment;
  } catch (err) {
    throw new Error(`postComment api fail err: ${err}`);
  }
};

export const patchComment = async ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';
  if (!commentId) throw new Error('commentId is undefined');

  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  const comment = await response.json();

  try {
    return comment;
  } catch (err) {
    throw new Error(`patchComment api fail err: ${err}`);
  }
};

export const deleteComment = async (commentId: number) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';
  if (!commentId) throw new Error('commentId is undefined');

  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const comment = await response.json();

  try {
    return comment;
  } catch (err) {
    throw new Error(`deleteComment api fail err: ${err}`);
  }
};
