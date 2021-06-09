// React
import { useEffect } from 'react';
// Next
import Head from 'next/head';

// Components
import Navbar from '../components/Navbar';

// API Utils
import { table, getMinifiedRecords } from './api/utils/Airtable';

// React Types
import { FC } from 'react';

// Component Level Types
interface FieldsProps {
  description: string;
  completed: boolean;
}

interface InitialTodosProps {
  id: string;
  fields: FieldsProps;
}
interface TodosProps {
  initialTodos: InitialTodosProps[];
}

const Auth0Landing: FC<TodosProps> = ({ initialTodos }) => {
  return (
    <div>
      <Head>
        <title>Auth0 - Kanui</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>Auth0 - Kanui</h1>
        {initialTodos.map(({ id, fields }) => {
          return (
            <div key={id}>
              <h1>{id}</h1>
              <h1>{fields.description}</h1>
              {fields.completed ? <h1>Completed</h1> : <h1>Not Completed</h1>}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const todos = await table.select({}).firstPage();
  return {
    props: {
      initialTodos: getMinifiedRecords(todos),
    },
  };
};

export default Auth0Landing;
