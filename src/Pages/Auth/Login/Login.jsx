import { Button, Input, HeaderTwo } from '../../../shared/ui';
import { useState, useEffect } from 'react';
import { Mail, Lock } from 'lucide-react';
import { SetDocumentTitle } from '../../../Services/SetDocumentTitle';
import { handleLogin } from '../../../Services/handleLogin';

SetDocumentTitle('Login - Vista-net');

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <HeaderTwo title="Login" className="text-lg" />
          </div>

          <form className="space-y-4">
            <Input 
              icon={<Mail className="h-4 w-4 text-gray-400" />}
              title={'Email'}
              type={'email'}
              placeholder={'email@example.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              icon={<Lock className="h-4 w-4 text-gray-400" />}
              title={'Password'}
              type={'password'}
              placeholder={'Enter password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />


            <Button 
              type={'submit'}
              content={'Login'}
              onClick={(e) => handleLogin(e, email, password)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
