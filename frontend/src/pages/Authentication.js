import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
};

export const action = async ({request}) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'mode' && mode !== 'login') {
    throw json({message: 'Unsupported mode'}, {status: 442})
  };
  
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  };

  console.log(authData)

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });

  if (response.status === 422 || response.status === 401) {
    console.log("not working")
    return response
  };

  if (!response.ok) {
    throw json({message: 'Could not authenticate'}, {status: 500})
  };

  return redirect('/')
};

export default AuthenticationPage;