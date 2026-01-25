export interface PasswordInputProps {
    id: string; name: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; error?: string; label?: string;
}

export interface TextInputProps {
    id: string; name: string; type?: string; value: string; maxLength?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; error?: string; label?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean; loading?: boolean;
    loadingText?: string; type?: 'button' | 'submit' | 'reset';
    className?: string;
}

export interface CardProps {
    children: React.ReactNode; className?: string;
}

export interface FormSectionProps {
    title: string; subtitle?: string; children: React.ReactNode;
}

export interface AlertProps {
    message: string;
}

export interface BadgeProps {
    children: React.ReactNode; variant?: 'success' | 'error' | 'info';
}

export interface LinkButtonProps {
    children: React.ReactNode; href?: string; onClick?: () => void;
}