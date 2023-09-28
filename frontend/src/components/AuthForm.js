import { Form, useSearchParams, Link } from 'react-router-dom';
import classes from './AuthForm.module.css';
import { useActionData } from 'react-router-dom';

function AuthForm() {
  
  const data = useActionData();

  const [searchParams] = useSearchParams();
  console.log(searchParams.get('mode'))
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <>
      <Form method="post" className={classes.form}>
        {data && data.message && <p>{data.message}</p>}
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create mew user' : 'Login'}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
