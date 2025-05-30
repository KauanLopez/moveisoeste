
import React from 'react';
import { useContent } from '@/context/ContentContext';

const Manager = () => {
  const { content } = useContent();
  const manager = content.find(item => item.section === 'manager');

  if (!manager) {
    return null;
  }

  return (
    <section id="team" className="pt-8 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conheça Nossa Gerente</h2>
          <div className="w-20 h-1 bg-furniture-yellow mx-auto mb-8"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 rounded-xl overflow-hidden shadow-lg">
            <div className="w-full md:w-2/5 h-80 md:h-auto relative">
              <img 
                src={manager.image} 
                alt="Gerente da Loja" 
                className="w-full h-full object-cover object-center"
                style={{ 
                  objectPosition: manager.objectPosition || 'center',
                  transform: manager.scale ? `scale(${manager.scale})` : 'scale(1)'
                }}
              />
            </div>
            <div className="p-6 md:p-8 w-full md:w-3/5">
              <h3 className="text-2xl font-bold text-primary mb-2">{manager.title}</h3>
              <p className="text-gray-500 mb-4">Gerente da Loja</p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {manager.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manager;
