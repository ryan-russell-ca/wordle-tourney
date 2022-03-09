import Router from 'next/router';
import { GetServerSidePropsContext } from 'next';

const redirect = (context: GetServerSidePropsContext, target: string) => {
  if (context.res) {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.replace(target);
  }
};

export default redirect;
