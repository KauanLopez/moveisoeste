
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ExternalUrlCatalog } from '@/types/externalCatalogTypes';
import CatalogImageCarousel from '@/components/catalog/CatalogImageCarousel';

interface ExternalCatalogViewModalProps {
  catalog: ExternalUrlCatalog;
  isOpen: boolean;
  onClose: () => void;
}

const ExternalCatalogViewModal: React.FC<ExternalCatalogViewModalProps> = ({ 
  catalog, 
  isOpen, 
  onClose 
}) => {
  const images = catalog.external_content_image_urls.map((url, index) => ({
    id: `${catalog.id}-${index}`,
    image_url: url,
    title: `Página ${index + 1}`,
    description: ''
  }));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl bg-white rounded-lg p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[80vh]">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">{catalog.title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full p-2">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            {catalog.description && (
              <p className="text-gray-600 mb-4">{catalog.description}</p>
            )}
            
            {images.length === 0 ? (
              <div className="text-center py-12">
                <p>Nenhuma imagem de conteúdo encontrada para este catálogo.</p>
              </div>
            ) : (
              <CatalogImageCarousel images={images} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExternalCatalogViewModal;
