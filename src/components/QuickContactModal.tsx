
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
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-poda-blue">
            Kontaktní formulář
          </DialogTitle>
        </DialogHeader>
        <div className="-mt-2">
          <ContactForm onSuccess={onClose} compact={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickContactModal;
