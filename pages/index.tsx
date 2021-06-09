// React
import { useEffect } from 'react';
// Next
import Head from 'next/head';

// Components
import Navbar from '../components/Navbar';
import Todo from '../components/Todo';

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
        <ul className="flex flex-col">
          {initialTodos.map((todo) => {
            return (
              <div key={todo.id} className="p-2">
                <Todo id={todo.id} fields={todo.fields} />
              </div>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: getMinifiedRecords(todos),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: 'could not locate your data please contact us',
      },
    };
  }
};

export default Auth0Landing;
