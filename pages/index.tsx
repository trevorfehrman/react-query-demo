import * as React from 'react';
import styles from '../styles/Home.module.css';
import { useQuery } from 'react-query';

interface IUser {
  name: string;
  id: number;
}

type HomeProps = {
  title: string;
  user: IUser;
};

// function useSwapi() {
//   const [data, setData] = React.useState();
//   const [loading, setIsloading] = React.useState<boolean>(false);
//   const [error, setIsError] = React.useState<boolean>(false);

//   React.useEffect(() => {
//     fetch('https://swapi.dev/api/people/ 1')
//       .then(res => {
//         setIsloading(true);
//         return res.json();
//       })
//       .then(parsed => {
//         setIsloading(false);
//         setData(parsed);
//       })
//       .catch(e => {
//         setIsError(true);
//       });
//   }, []);

// return { data, loading, error };
// }

enum QueryCacheName {
  Luke = 'luke',
  SomeoneElse = 'someone else',
}

function getLuke() {
  return fetch('https://swapi.dev/api/people/1').then(res => res.json());
}
function getSomeoneElse(pagination: number) {
  return fetch(`https://swapi.dev/api/people/${pagination}`).then(res => res.json());
}

function MyComponent() {
  const [pag, setPag] = React.useState(2);
  const { data, isLoading, isError, isStale } = useQuery(QueryCacheName.SomeoneElse, () =>
    getSomeoneElse(pag)
  );
  return (
    <div>
      <span>{data?.name}</span>
      <button onClick={() => setPag(pag + 1)}>next</button>
    </div>
  );
}

export default function Home({ title, user }: HomeProps) {
  const { data, isLoading, isError, isStale } = useQuery(QueryCacheName.Luke, getLuke);

  return (
    <div className={styles.container}>
      {isLoading && <span>loading...</span>}
      {isError && <span>wewps something went wrong</span>}
      <span>{data?.name}</span>

      <MyComponent />
      <MyComponent />
    </div>
  );
}
