
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Status = 'pending' | 'verifying' | 'verified' | 'rejected';

interface VerificationStatusProps {
  initialStatus?: Status;
  documentType: string;
  onVerify?: () => void;
  className?: string;
}

const VerificationStatus = ({
  initialStatus = 'pending',
  documentType,
  onVerify,
  className,
}: VerificationStatusProps) => {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'verifying') {
      const timer = setTimeout(() => {
        // 90% chance of verification success
        const result = Math.random() > 0.1 ? 'verified' : 'rejected';
        setStatus(result);
      }, 3000);

      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 100));
      }, 150);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [status]);

  const handleVerifyClick = () => {
    setStatus('verifying');
    setProgress(0);
    onVerify?.();
  };

  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-muted-foreground',
      bg: 'bg-muted/50',
      text: 'Pending Verification',
      description: `Your ${documentType} is waiting to be verified.`,
    },
    verifying: {
      icon: Shield,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'Verifying',
      description: 'AI verification in progress. This will take a few moments.',
    },
    verified: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'Verified',
      description: `Your ${documentType} has been successfully verified.`,
    },
    rejected: {
      icon: AlertCircle,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'Verification Failed',
      description: 'There was an issue verifying your document. Please try again.',
    },
  };

  const { icon: Icon, color, bg, text, description } = statusConfig[status];

  return (
    <div className={cn('rounded-lg p-4 transition-all', bg, className)}>
      <div className="flex items-start">
        <div className={cn('mr-3 mt-0.5', color)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className={cn('font-medium', color)}>{text}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          
          {status === 'verifying' && (
            <Progress value={progress} className="h-1.5 mt-3" />
          )}
          
          {(status === 'pending' || status === 'rejected') && (
            <Button 
              size="sm" 
              onClick={handleVerifyClick} 
              className="mt-3"
            >
              Verify Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;
