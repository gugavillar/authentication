import { FormEvent, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styled from '../styles/Home.module.css';
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password
    };
    await signIn(data);
  }

  return (
    <form className={styled.container} onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
