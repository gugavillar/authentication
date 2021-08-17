import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from 'next';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (!cookies['nextauth.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    return await fn(ctx);
  }
}