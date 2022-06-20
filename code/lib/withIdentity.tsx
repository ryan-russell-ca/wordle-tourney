import React, { useContext } from 'react';
import nextCookie from 'next-cookies';
import redirect from './redirect';
import NextApp, { AppInitialProps } from 'next/app';
import { GetServerSidePropsContext } from 'next';

export interface UserIdentity {
  photos: {
    value: string;
    type: string;
  }[];
  id: number;
  name: string;
  email: string;
}

type IdentityProviderProps = Readonly<AppInitialProps> & {
  session: UserIdentity;
};

const IdentityContext = React.createContext<UserIdentity>(
  null as unknown as UserIdentity,
);

export const LOGIN_PAGE = '/auth/login';

export const redirectToLogin = (ctx: GetServerSidePropsContext) => {
  if (
    ctx?.req.url?.includes(LOGIN_PAGE) ||
    (typeof window !== 'undefined' && window.location.pathname === LOGIN_PAGE)
  ) {
    return;
  }

  redirect(ctx, LOGIN_PAGE);
};

export const serverWrapper = async (
  ctx: GetServerSidePropsContext,
): Promise<UserIdentity | {}> => {
  const { passportSession } = nextCookie(ctx);

  if (!passportSession) {
    redirectToLogin(ctx);
    return Promise.resolve({} as unknown as UserIdentity);
  }

  const serializedCookie = Buffer.from(passportSession, 'base64').toString();

  const {
    passport: { user },
  }: {
    passport: { user: UserIdentity };
  } = JSON.parse(serializedCookie);

  if (!user) {
    redirectToLogin(ctx);
    return {};
  }

  const session: UserIdentity = user;

  return session;
};

const withIdentity = (App: NextApp | any) => {
  return class IdentityProvider extends React.Component<IdentityProviderProps> {
    static displayName = 'IdentityProvider(App)';
    static getInitialProps = serverWrapper;

    render() {
      const { session, ...appProps } = this.props;

      return (
        <IdentityContext.Provider value={session}>
          <App {...appProps} />
        </IdentityContext.Provider>
      );
    }
  };
};

export default withIdentity;

export const useIdentity = (): UserIdentity => useContext(IdentityContext);
