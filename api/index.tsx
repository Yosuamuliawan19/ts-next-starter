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

export const usePageData = () => {
  return useSWR(
    process.env.NEXT_PUBLIC_HOST + '/v1/pages?url=yahyaad',
    fetcher
  );
};
