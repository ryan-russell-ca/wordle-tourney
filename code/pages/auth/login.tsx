import type { NextPage } from 'next';
import Link from 'next/link';
import withIdentity from '../../lib/withIdentity';

const Home: NextPage = () => (
  <main>
    <p>Log in to use</p>
    <p>
      <Link href="/api/auth/google">Sign in with Google</Link>
    </p>
  </main>
);

export default withIdentity(Home);
