import { API_URL } from '@/constants/url';
import { getCookie } from '@/utils/cookie';

export const findNickName = async (nickname: string) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';

  const response = await fetch(`${API_URL}/members?nickname=${nickname}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const nickName = await response.json();

  try {
    return nickName;
  } catch (err) {
    throw new Error(`findNickName api fail err: ${err}`);
  }
};

export const patchNickName = async (nickname: string) => {
  const accessToken = getCookie('access_token');
  if (!accessToken) window.location.href = '/login';

  const response = await fetch(`${API_URL}/members`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname }),
  });

  const updatedData = await response.json();

  try {
    return updatedData;
  } catch (err) {
    throw new Error(`patchNickName api fail err: ${err}`);
  }
};
