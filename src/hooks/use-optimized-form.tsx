import { useState, useCallback, useMemo } from 'react';

interface FormState<T> {
  data: T;
  submitted: boolean;
  success: boolean;
  error: string | null;
  loading: boolean;
}

interface UseOptimizedFormOptions<T> {
  initialData: T;
  onSubmit: (data: T) => Promise<boolean>;
  validate?: (data: T) => string | null;
  onSuccess?: () => void;
  resetDelay?: number;
}

export const useOptimizedForm = <T extends Record<string, any>>(
  options: UseOptimizedFormOptions<T>
) => {
  const { 
    initialData, 
    onSubmit, 
    validate, 
    onSuccess, 
    resetDelay = 1500 
  } = options;

  const [state, setState] = useState<FormState<T>>({
    data: initialData,
    submitted: false,
    success: false,
    error: null,
    loading: false
  });

  // Memoizovaný handleChange
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [name]: value },
      error: null // Clear error on change
    }));
  }, []);

  // Memoizovaný updateField
  const updateField = useCallback((field: keyof T, value: any) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      error: null
    }));
  }, []);

  // Memoizovaný handleSubmit
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validácia
    if (validate) {
      const validationError = validate(state.data);
      if (validationError) {
        setState(prev => ({
          ...prev,
          submitted: true,
          error: validationError,
          success: false,
          loading: false
        }));
        return;
      }
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const success = await onSubmit(state.data);
      
      if (success) {
        setState(prev => ({
          ...prev,
          submitted: true,
          success: true,
          error: null,
          loading: false
        }));

        if (onSuccess) {
          setTimeout(onSuccess, resetDelay);
        }

        // Reset form after delay
        setTimeout(() => {
          setState({
            data: initialData,
            submitted: false,
            success: false,
            error: null,
            loading: false
          });
        }, resetDelay);
      } else {
        throw new Error("Nepodařilo se odeslat formulář");
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        submitted: true,
        success: false,
        error: error instanceof Error ? error.message : "Nastala neočekávaná chyba",
        loading: false
      }));
    }
  }, [state.data, onSubmit, validate, onSuccess, resetDelay, initialData]);

  // Memoizovaná validácia
  const isValid = useMemo(() => {
    if (!validate) return true;
    return validate(state.data) === null;
  }, [state.data, validate]);

  // Reset funkcia
  const reset = useCallback(() => {
    setState({
      data: initialData,
      submitted: false,
      success: false,
      error: null,
      loading: false
    });
  }, [initialData]);

  return {
    formData: state.data,
    formState: {
      submitted: state.submitted,
      success: state.success,
      error: state.error,
      loading: state.loading
    },
    isValid,
    handleChange,
    updateField,
    handleSubmit,
    reset
  };
};