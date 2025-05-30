
import { supabase } from "@/integrations/supabase/client";
import { ImageContent, mapDbContentToImageContent, mapImageContentToDb } from '@/types/customTypes';
import { defaultContent, CONTENT_STORAGE_KEY } from '@/utils/contentUtils';

// Fetch content by section from Supabase
export const fetchContent = async (section: string): Promise<ImageContent[]> => {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('section', section);
    
    if (error) {
      throw error;
    }
    
    if (data && data.length > 0) {
      return data.map(mapDbContentToImageContent);
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching ${section} content:`, error);
    return [];
  }
};

// Save content item
export const saveContent = async (item: ImageContent): Promise<ImageContent | null> => {
  try {
    const mappedItem = mapImageContentToDb(item);
    
    const { data, error } = await supabase
      .from('content')
      .upsert({
        ...mappedItem,
        section: item.section
      })
      .select();
    
    if (error) {
      throw error;
    }
    
    if (data && data.length > 0) {
      return mapDbContentToImageContent(data[0]);
    }
    
    return null;
  } catch (error) {
    console.error('Error saving content:', error);
    return null;
  }
};

// Delete content item
export const deleteContent = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting content:', error);
    return false;
  }
};

// Fetch content from Supabase
export const fetchContentFromSupabase = async (): Promise<ImageContent[] | null> => {
  try {
    const { data: dbContent, error } = await supabase
      .from('content')
      .select('*');

    if (error) {
      console.error('Error fetching content from Supabase:', error);
      return null;
    }

    if (dbContent && dbContent.length > 0) {
      return dbContent.map(mapDbContentToImageContent);
    }
    
    return null;
  } catch (err) {
    console.error('Error in content fetching:', err);
    return null;
  }
};

// Save initial default content to Supabase
export const saveDefaultContentToSupabase = async (): Promise<void> => {
  try {
    for (const item of defaultContent) {
      const mappedItem = mapImageContentToDb(item);
      // Make sure section is always included since it's required
      if (mappedItem && mappedItem.section) {
        await supabase
          .from('content')
          .upsert({
            ...mappedItem,
            section: mappedItem.section
          });
      }
    }
  } catch (err) {
    console.error('Error saving default content to Supabase:', err);
  }
};

// Save content to Supabase
export const saveContentToSupabase = async (content: ImageContent[]): Promise<void> => {
  try {
    for (const item of content) {
      const mappedItem = mapImageContentToDb(item);
      // Make sure section is always included since it's required
      if (mappedItem && mappedItem.section) {
        const { error } = await supabase
          .from('content')
          .upsert({
            ...mappedItem,
            section: mappedItem.section
          });
        
        if (error) {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('Error saving content:', error);
    throw error;
  }
};
