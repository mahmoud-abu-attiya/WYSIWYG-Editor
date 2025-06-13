/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WYSIWYGEditor } from './index';
import { 
  createEditorStateFromText, 
  getPlainText, 
  fakeLoadContent, 
  fakeSaveContent,
  createEditorStateFromRaw,
  getContentAsRaw
} from './utils';

const Examples: React.FC = () => {
  // Controlled mode example
  const [controlledValue, setControlledValue] = useState<EditorState>(
    () => createEditorStateFromText('This is a controlled editor. Try editing this text!')
  );
  
  // Uncontrolled mode example
  const [uncontrolledDefault] = useState<EditorState>(
    () => createEditorStateFromText('This is an uncontrolled editor with default content.')
  );
  
  // Async example
  const [asyncEditorState, setAsyncEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Custom toolbar example
  const [customToolbarState, setCustomToolbarState] = useState<EditorState>(
    () => createEditorStateFromText('This editor has a custom toolbar!')
  );
  
  // Load content asynchronously
  const handleLoadContent = async () => {
    setIsLoading(true);
    try {
      const content = await fakeLoadContent();
      const newEditorState = createEditorStateFromRaw(content);
      setAsyncEditorState(newEditorState);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Save content asynchronously
  const handleSaveContent = async () => {
    setIsSaving(true);
    try {
      const content = getContentAsRaw(asyncEditorState);
      await fakeSaveContent(content);
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Custom toolbar renderer
  const renderCustomToolbar = ({ editorState, onToggleInlineStyle }: any) => (
    <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50">
      <span className="text-sm font-medium text-muted-foreground">Custom Toolbar:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onToggleInlineStyle('BOLD')}
        className={editorState.getCurrentInlineStyle().has('BOLD') ? 'bg-blue-100' : ''}
      >
        Make Bold
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onToggleInlineStyle('ITALIC')}
        className={editorState.getCurrentInlineStyle().has('ITALIC') ? 'bg-purple-100' : ''}
      >
        Make Italic
      </Button>
    </div>
  );
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">WYSIWYG Editor Examples</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive examples demonstrating controlled/uncontrolled modes, 
          custom toolbars, async operations, and various styling options.
        </p>
      </div>
      
      <Tabs defaultValue="controlled" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-fit md:grid-cols-4">
          <TabsTrigger value="controlled">Controlled</TabsTrigger>
          <TabsTrigger value="uncontrolled">Uncontrolled</TabsTrigger>
          <TabsTrigger value="custom">Custom Toolbar</TabsTrigger>
          <TabsTrigger value="async">Async Operations</TabsTrigger>
        </TabsList>
        
        {/* Controlled Mode Example */}
        <TabsContent value="controlled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controlled Mode Example</CardTitle>
              <CardDescription>
                The editor state is controlled by the parent component. 
                Changes are handled through the onChange callback.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <WYSIWYGEditor
                value={controlledValue}
                onChange={setControlledValue}
                className="min-h-[200px]"
                placeholder="Type in this controlled editor..."
              />
              
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">Current Content (Plain Text):</h4>
                <p className="text-sm text-muted-foreground">
                  "{getPlainText(controlledValue)}"
                </p>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <strong>Usage:</strong>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
{`const [editorState, setEditorState] = useState(EditorState.createEmpty());

<WYSIWYGEditor
  value={editorState}
  onChange={setEditorState}
  placeholder="Type here..."
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Uncontrolled Mode Example */}
        <TabsContent value="uncontrolled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Uncontrolled Mode Example</CardTitle>
              <CardDescription>
                The editor manages its own state internally. 
                You can provide a defaultValue for initial content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <WYSIWYGEditor
                defaultValue={uncontrolledDefault}
                className="min-h-[200px]"
                placeholder="Type in this uncontrolled editor..."
              />
              
              <div className="text-sm text-muted-foreground">
                <strong>Usage:</strong>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
{`// With default value
<WYSIWYGEditor
  defaultValue={createEditorStateFromText("Default content")}
  placeholder="Type here..."
/>

// Empty editor
<WYSIWYGEditor placeholder="Start typing..." />`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Custom Toolbar Example */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Toolbar Example</CardTitle>
              <CardDescription>
                Replace the default toolbar with custom implementation 
                using the renderToolbar prop.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <WYSIWYGEditor
                value={customToolbarState}
                onChange={setCustomToolbarState}
                renderToolbar={renderCustomToolbar}
                className="min-h-[200px]"
                placeholder="Try the custom toolbar buttons..."
              />
              
              <div className="text-sm text-muted-foreground">
                <strong>Usage:</strong>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
{`const renderCustomToolbar = ({ editorState, onToggleInlineStyle }) => (
  <div className="custom-toolbar">
    <button onClick={() => onToggleInlineStyle('BOLD')}>
      Bold
    </button>
    <button onClick={() => onToggleInlineStyle('ITALIC')}>
      Italic
    </button>
  </div>
);

<WYSIWYGEditor
  value={editorState}
  onChange={setEditorState}
  renderToolbar={renderCustomToolbar}
/>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Async Operations Example */}
        <TabsContent value="async" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Async Operations Example</CardTitle>
              <CardDescription>
                Demonstrate loading content from and saving content to a fake API.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={handleLoadContent} 
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? 'Loading...' : 'Load Content'}
                </Button>
                <Button 
                  onClick={handleSaveContent} 
                  disabled={isSaving}
                  variant="outline"
                >
                  {isSaving ? 'Saving...' : 'Save Content'}
                </Button>
              </div>
              
              <WYSIWYGEditor
                value={asyncEditorState}
                onChange={setAsyncEditorState}
                className="min-h-[200px]"
                placeholder="Click 'Load Content' to fetch sample content..."
              />
              
              <div className="text-sm text-muted-foreground">
                <strong>Features:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Simulated 1.5s delay for loading content</li>
                  <li>Pre-formatted content with bold, italic, and underline styles</li>
                  <li>Simulated 1s delay for saving content</li>
                  <li>Content logged to console when saved</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Examples;
