import { GameEntryDetailedResponse } from '../../pages/api/game/[id]/entry';

const requestOptions = (verb?: string, body?: Record<string, unknown>) => {
  return {
    method: verb || 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  };
};

export const get = async (url: string) => {
  const response = await fetch(url, requestOptions());
  return response.json();
};

export const post = async (
  url: string,
  body: Record<string, unknown>,
): Promise<Response> => {
  const response = await fetch(url, requestOptions('POST', body));
  return response;
};

const verbs = {
  get,
  post,
};

export const postEntry = async (
  gameId: string,
  body: {
    row: number;
    answer: string;
  },
): Promise<GameEntryDetailedResponse> => {
  const entryResponse = await post(`/api/game/${gameId}/entry`, body);
  return await entryResponse.json();
};

export default verbs;
