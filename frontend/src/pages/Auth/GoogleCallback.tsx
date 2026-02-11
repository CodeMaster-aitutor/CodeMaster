import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        // Check for OAuth errors
        if (error) {
          setStatus('error');
          setErrorMessage(error === 'access_denied' 
            ? 'Google authentication was cancelled.' 
            : 'Google authentication failed. Please try again.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (!code || !state) {
          setStatus('error');
          setErrorMessage('Invalid authentication response from Google.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Verify state matches stored state
        const storedState = sessionStorage.getItem('google_oauth_state');
        if (storedState !== state) {
          setStatus('error');
          setErrorMessage('State mismatch. Please try again.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Exchange code for tokens
        const response = await authAPI.handleGoogleCallback(code, state);

        // Clear stored state
        sessionStorage.removeItem('google_oauth_state');

        setStatus('success');
        toast({
          title: "Authentication successful!",
          description: `Welcome back, ${response.user.username}!`,
        });

        // Redirect to dashboard after short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);

      } catch (error) {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
        toast({
          title: "Authentication failed",
          description: error instanceof Error ? error.message : 'Please try again.',
          variant: "destructive",
        });
        
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
            <h2 className="text-2xl font-bold mb-2">Authenticating...</h2>
            <p className="text-muted-foreground">Please wait while we verify your Google account.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-success" />
            <h2 className="text-2xl font-bold mb-2 text-success">Authentication Successful!</h2>
            <p className="text-muted-foreground">Redirecting to dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
            <h2 className="text-2xl font-bold mb-2 text-destructive">Authentication Failed</h2>
            <p className="text-muted-foreground mb-4">{errorMessage}</p>
            <p className="text-sm text-muted-foreground">Redirecting to login page...</p>
          </>
        )}
      </Card>
    </div>
  );
};

export default GoogleCallback;
