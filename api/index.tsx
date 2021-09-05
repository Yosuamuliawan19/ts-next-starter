import useSWR from 'swr';
import request from 'graphql-request';
const HOST = 'https://backend.yosua.io';

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
