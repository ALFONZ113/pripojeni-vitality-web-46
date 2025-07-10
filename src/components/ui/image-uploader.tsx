
import React, { useState, useCallback } from 'react';
import { Button } from './button';
import { Progress } from './progress';
import { Card } from './card';
import { Upload, Download, Trash2, Image as ImageIcon } from 'lucide-react';
import { convertToWebP, batchConvertToWebP, optimizeImageForWeb } from '@/utils/webp-converter';
import { processImageWithBackgroundRemoval } from '@/utils/background-remover';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImagesProcessed?: (files: File[]) => void;
  maxFiles?: number;
  enableBackgroundRemoval?: boolean;
  enableWebPConversion?: boolean;
  enableOptimization?: boolean;
  className?: string;
}

interface ProcessedImage {
  id: string;
  name: string;
  originalFile: File;
  processedBlob?: Blob;
  previewUrl: string;
  size: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesProcessed,
  maxFiles = 10,
  enableBackgroundRemoval = false,
  enableWebPConversion = true,
  enableOptimization = true,
  className
}) => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const processImage = async (file: File): Promise<Blob> => {
    let processedBlob: Blob = file;

    // Step 1: Background removal if enabled
    if (enableBackgroundRemoval) {
      processedBlob = await processImageWithBackgroundRemoval(file);
    }

    // Step 2: Optimization if enabled
    if (enableOptimization) {
      processedBlob = await optimizeImageForWeb(
        new File([processedBlob], file.name, { type: processedBlob.type })
      );
    }

    // Step 3: WebP conversion if enabled
    if (enableWebPConversion) {
      processedBlob = await convertToWebP(
        new File([processedBlob], file.name, { type: processedBlob.type })
      );
    }

    return processedBlob;
  };

  const handleFiles = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files).slice(0, maxFiles);
    
    // Create initial image objects
    const newImages: ProcessedImage[] = fileArray.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      originalFile: file,
      previewUrl: URL.createObjectURL(file),
      size: file.size,
      status: 'pending'
    }));

    setImages(prev => [...prev, ...newImages]);

    // Process images one by one
    for (let i = 0; i < newImages.length; i++) {
      const image = newImages[i];
      
      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, status: 'processing' } : img
      ));

      try {
        const processedBlob = await processImage(image.originalFile);
        
        setImages(prev => prev.map(img => 
          img.id === image.id 
            ? { 
                ...img, 
                processedBlob, 
                status: 'completed',
                size: processedBlob.size
              } 
            : img
        ));
      } catch (error) {
        console.error('Error processing image:', error);
        setImages(prev => prev.map(img => 
          img.id === image.id 
            ? { 
                ...img, 
                status: 'error', 
                error: error instanceof Error ? error.message : 'Unknown error'
              } 
            : img
        ));
      }

      setProcessingProgress(((i + 1) / newImages.length) * 100);
    }

    // Reset progress after a delay
    setTimeout(() => setProcessingProgress(0), 1000);
  }, [maxFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const downloadImage = (image: ProcessedImage) => {
    if (!image.processedBlob) return;

    const url = URL.createObjectURL(image.processedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `processed_${image.name.replace(/\.[^/.]+$/, '')}.webp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.previewUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed p-8 text-center transition-colors",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        )}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div className="flex flex-col items-center space-y-4">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">Upload Images</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop images here or click to select
            </p>
            {enableWebPConversion && (
              <p className="text-xs text-muted-foreground mt-1">
                Images will be automatically converted to WebP format
              </p>
            )}
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Select Images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </Button>
        </div>
      </Card>

      {/* Processing Progress */}
      {processingProgress > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Processing images...</span>
            <span>{Math.round(processingProgress)}%</span>
          </div>
          <Progress value={processingProgress} />
        </div>
      )}

      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Processed Images</h3>
          <div className="grid gap-4">
            {images.map((image) => (
              <Card key={image.id} className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={image.previewUrl}
                    alt={image.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{image.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(image.size)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        image.status === 'completed' && "bg-green-100 text-green-800",
                        image.status === 'processing' && "bg-blue-100 text-blue-800",
                        image.status === 'error' && "bg-red-100 text-red-800",
                        image.status === 'pending' && "bg-gray-100 text-gray-800"
                      )}>
                        {image.status}
                      </div>
                      {image.error && (
                        <span className="text-xs text-red-600">{image.error}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {image.status === 'completed' && image.processedBlob && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadImage(image)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeImage(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
