import useSWR from 'swr';
import request from 'graphql-request';
const HOST = 'https://backend.yosua.io';
const fetcher = (url) => fetch(url).then((res) => res.json());

const GraphQLFetcher = (query) => request(HOST + '/graphql', query);
export const useProjects = () => {
  const { data, error } = useSWR(
    `query{
  projects(sort : "created_at"){
    id
    subtitle
    description
    title
    url
    image_url
    created_at
    priority
    call_to_action
    year
  }
}
`,
    GraphQLFetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const usePageData = (url: string) => {
  return useSWR(process.env.NEXT_PUBLIC_HOST + '/v1/pages?url=' + url, fetcher);
};

export function usePageList(data = {}) {
  return useSWR(process.env.NEXT_PUBLIC_HOST + '/v1/pages/list', fetcher);
}

export function syncPageData(data = {}) {
  return postData(process.env.NEXT_PUBLIC_HOST + '/v1/pages/save', data);
}

export function getUserData(data = {}) {
  return postData(process.env.NEXT_PUBLIC_HOST + '/v1/users/info', data);
}
async function postData(url = '', data = {}) {
  const auth = JSON.parse(sessionStorage.getItem('auth-storage'));
  console.log(auth);

  const accessToken = auth.state.accessToken;
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit

    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
