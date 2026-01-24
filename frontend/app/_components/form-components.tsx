'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { AlertProps, BadgeProps, ButtonProps, CardProps, FormSectionProps, LinkButtonProps, PasswordInputProps, TextInputProps } from './types';

export const PasswordInput = ({ id, name, value, onChange, placeholder = '••••••••', error, label }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all pr-12 ${error
                            ? 'border-dark-red bg-red-50 focus:outline-none focus:border-dark-red'
                            : 'border-gray-200 bg-gray-50 focus:outline-none focus:border-dark-blue'
                        } text-gray-800 placeholder-gray-400`}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-600 hover:text-dark-blue transition-colors"
                    aria-label="Toggle password visibility"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>

            {error && <p className="mt-2 text-sm text-dark-red font-medium">{error}</p>}
        </div>
    );
};

export const TextInput = ({ id, name, type = 'text', value, onChange, placeholder, error, label }: TextInputProps) => (
    <div>
        {label && (
            <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
        )}

        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${error
                    ? 'border-dark-red bg-red-50 focus:outline-none focus:border-dark-red'
                    : 'border-gray-200 bg-gray-50 focus:outline-none focus:border-dark-blue'
                } text-gray-800 placeholder-gray-400`}
        />

        {error && <p className="mt-2 text-sm text-dark-red font-medium">{error}</p>}
    </div>
);

export const Button = ({ children, variant = 'primary', disabled = false, loading = false, loadingText = 'Loading...', type = 'button', className = '', ...props }: ButtonProps) => {
    const variants = {
        primary: 'bg-linear-to-r from-dark-red to-red-600 text-white',
        secondary: 'bg-linear-to-r from-dark-blue to-blue-700 text-white',
        outline: 'border-2 border-dark-blue text-dark-blue hover:bg-blue-50',
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`px-6 py-3 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg ${variants[variant]} ${className}`}
            {...props}
        >
            {loading ? loadingText : children}
        </button>
    );
};

export const Card = ({ children, className = '' }: CardProps) => (
    <div className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 ${className}`}>
        {children}
    </div>
);

export const FormSection = ({ title, subtitle, children }: FormSectionProps) => (
    <div>
        <h1 className="text-3xl font-bold text-dark-blue mb-2">{title}</h1>
        {subtitle && <p className="text-gray-600 mb-8">{subtitle}</p>}
        {children}
    </div>
);

export const ErrorAlert = ({ message }: AlertProps) => (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
        <p className="text-dark-red text-sm font-medium">{message}</p>
    </div>
);

export const SuccessAlert = ({ message }: AlertProps) => (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
        <p className="text-green-800 text-sm font-medium">{message}</p>
    </div>
);

export const Badge = ({ children, variant = 'info' }: BadgeProps) => {
    const variants = {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-dark-red',
        info: 'bg-blue-100 text-dark-blue',
    };

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
            {children}
        </span>
    );
};

export const LinkButton = ({ children, href = '#', onClick }: LinkButtonProps) => (
    <a
        href={href}
        onClick={onClick}
        className="text-dark-blue font-semibold hover:text-dark-red transition-colors"
    >
        {children}
    </a>
);