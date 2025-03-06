
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import VerificationStatus from '@/components/VerificationStatus';
import { FileCheck, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DocumentStatus = 'pending' | 'verifying' | 'verified' | 'rejected';

interface DocumentCardProps {
  id: string;
  title: string;
  filename?: string;
  description: string;
  status?: DocumentStatus;
  className?: string;
  onUpload?: (file: File) => void;
  onDelete?: () => void;
}

const DocumentCard = ({
  id,
  title,
  filename,
  description,
  status = 'pending',
  className,
  onUpload,
  onDelete,
}: DocumentCardProps) => {
  const [currentStatus, setCurrentStatus] = useState<DocumentStatus>(status);
  const [currentFilename, setCurrentFilename] = useState<string | undefined>(filename);
  const fileInputRef = useState<HTMLInputElement | null>(null)[1];

  const handleUploadClick = () => {
    // Create a hidden file input and trigger it
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        setCurrentFilename(file.name);
        setCurrentStatus('pending');
        onUpload?.(file);
      }
    };
    fileInputRef(input);
    input.click();
  };

  const handleVerify = () => {
    // This will be handled by the VerificationStatus component
  };

  const handleDelete = () => {
    setCurrentFilename(undefined);
    setCurrentStatus('pending');
    onDelete?.();
  };

  return (
    <Card className={cn('overflow-hidden transition-all duration-300 hover:shadow-md', className)}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-accent/10 rounded-full p-2 mr-3">
            <FileCheck className="h-5 w-5 text-accent" />
          </div>
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        {currentFilename ? (
          <div className="mb-4">
            <div className="bg-secondary rounded-md p-3 text-sm flex items-center justify-between">
              <span className="truncate">{currentFilename}</span>
              <Button variant="ghost" size="icon" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-muted rounded-md p-6 mb-4 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Upload your {title.toLowerCase()}
            </p>
            <Button onClick={handleUploadClick} size="sm" variant="secondary" className="mt-2">
              Choose File
            </Button>
          </div>
        )}
        
        {currentFilename && (
          <VerificationStatus 
            documentType={title} 
            initialStatus={currentStatus}
            onVerify={handleVerify}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
