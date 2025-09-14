
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ContactForm from './ContactForm';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickContactModal = ({ isOpen, onClose }: QuickContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="w-full max-w-[425px] max-h-[95vh] h-auto overflow-hidden flex flex-col p-4 sm:p-6">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-poda-blue">
            Kontaktní formulář
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto -mt-2 min-h-0">
          <ContactForm onSuccess={onClose} compact={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickContactModal;
