/* eslint-disable @typescript-eslint/no-explicit-any */

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

export const createEditorStateFromText = (text: string): EditorState => {
  const contentState = ContentState.createFromText(text);
  return EditorState.createWithContent(contentState);
};

export const getPlainText = (editorState: EditorState): string => {
  return editorState.getCurrentContent().getPlainText();
};

export const getContentAsRaw = (editorState: EditorState) => {
  return convertToRaw(editorState.getCurrentContent());
};

export const createEditorStateFromRaw = (rawContent: any): EditorState => {
  try {
    const contentState = convertFromRaw(rawContent);
    return EditorState.createWithContent(contentState);
  } catch (error) {
    console.error('Error creating editor state from raw content:', error);
    return EditorState.createEmpty();
  }
};

export const isEmpty = (editorState: EditorState): boolean => {
  const plainText = getPlainText(editorState);
  return plainText.trim() === '';
};

// Fake API functions for bonus points
export const fakeLoadContent = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sampleContent = {
        blocks: [
          {
            key: 'sample1',
            text: 'Welcome to the WYSIWYG Editor!',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
              { offset: 0, length: 7, style: 'BOLD' },
              { offset: 15, length: 14, style: 'ITALIC' }
            ],
            entityRanges: [],
            data: {}
          },
          {
            key: 'sample2',
            text: 'This content was loaded asynchronously. You can format text with bold, italic, and underline styles.',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
              { offset: 77, length: 4, style: 'BOLD' },
              { offset: 83, length: 6, style: 'ITALIC' },
              { offset: 95, length: 9, style: 'UNDERLINE' }
            ],
            entityRanges: [],
            data: {}
          }
        ],
        entityMap: {}
      };
      
      resolve(sampleContent);
    }, 1500); // Simulate network delay
  });
};

export const fakeSaveContent = async (content: any): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Content saved:', content);
      resolve(true);
    }, 1000); // Simulate save delay
  });
};
