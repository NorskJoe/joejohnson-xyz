'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import styles from './auth.module.scss';
import { signIn } from '@libs/auth';

const getAuthSchema = (mode: 'signin' | 'signup') => {
  const baseSchema = z.object({
    email: z.email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
  });

  if (mode === 'signup') {
    return baseSchema
      .extend({
        confirmPassword: z.string().min(1, 'Confirm password is required'),
      })
      .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords must match',
      });
  }

  return baseSchema.extend({ confirmPassword: z.string().optional() });
};

type AuthFormValues = z.infer<ReturnType<typeof getAuthSchema>>;

const AuthModal = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(getAuthSchema(mode)),
    defaultValues: { email: '', password: '', confirmPassword: undefined },
  });

  const transformData = (data: AuthFormValues): FormData => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    return formData;
  };

  const onSubmit = async (data: AuthFormValues) => {
    const formData = transformData(data);
    await (mode === 'signin' ? signIn('credentials', formData) : null);
  };

  const handleToggleMode = () => {
    setMode((current) => (current === 'signin' ? 'signup' : 'signin'));
  };

  const title =
    mode === 'signup' ? 'Create your account' : 'Sign in to your account';
  const actionText = mode === 'signup' ? 'Sign up' : 'Sign in';
  const helperText =
    mode === 'signup' ? 'Already have an account? ' : "Don't have an account? ";
  const toggleLabel = mode === 'signup' ? 'Sign in' : 'Sign up';

  return (
    <div className={styles['auth-overlay']} aria-modal="true" role="dialog">
      <div className={styles['auth-modal']}>
        <h2 className={styles['title']}>{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={styles['field-label']}>
            Email address
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className={styles['field']}
            />
          </label>
          {errors.email?.message && (
            <p className={styles['field-error']}>{errors.email.message}</p>
          )}

          <label className={styles['field-label']}>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className={styles['field']}
            />
          </label>
          {errors.password?.message && (
            <p className={styles['field-error']}>{errors.password.message}</p>
          )}

          {mode === 'signup' && (
            <>
              <label className={styles['field-label']}>
                Confirm password
                <input
                  type="password"
                  placeholder="Confirm your password"
                  {...register('confirmPassword')}
                  className={styles['field']}
                />
              </label>
              {errors.confirmPassword?.message && (
                <p className={styles['field-error']}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </>
          )}

          <button type="submit" className={styles['submit-button']}>
            {actionText}
          </button>
        </form>

        <div className={styles['footer-text']}>
          {helperText}
          <span className={styles['switch-text']} onClick={handleToggleMode}>
            {toggleLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
