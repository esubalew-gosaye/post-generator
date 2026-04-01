import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download, ArrowLeft, RefreshCw, Type, Image as ImageIcon, Code, Quote, BookOpen, LayoutTemplate, User, AtSign, Image as ImageLucide, Upload } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs, atomDark, dracula, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

type PostType = 'text' | 'quote' | 'bible' | 'code' | 'social';
type CodeTheme = 'vscDarkPlus' | 'vs' | 'atomDark' | 'dracula' | 'solarizedlight';
type AspectRatio = '1:1' | '4:5' | '9:16' | '16:9' | '1.91:1' | '4:1';
type SocialPlatform = 'instagram' | 'linkedin' | 'twitter' | 'facebook';
type BgType = 'color' | 'gradient' | 'image' | 'transparent';

interface EditorState {
  postType: PostType;
  
  // Content per type
  textData: { content: string };
  quoteData: { content: string; author: string };
  bibleData: { content: string; reference: string };
  codeData: { content: string; language: string; theme: CodeTheme };
  socialData: { 
    content: string; 
    username: string; 
    handle: string; 
    avatarUrl: string; 
    platform: SocialPlatform;
  };

  // Global design
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  bgType: BgType;
  bgColor: string;
  bgGradient: string;
  bgImageUrl: string;
  bgOverlayOpacity: number;
  showIcon: boolean;
  aspectRatio: AspectRatio;
}

const THEMES: Record<CodeTheme, any> = {
  vscDarkPlus,
  vs,
  atomDark,
  dracula,
  solarizedlight,
};

const LANGUAGES = ['javascript', 'typescript', 'python', 'html', 'css', 'json', 'bash', 'java', 'csharp', 'go', 'rust'];

const PRESET_GRADIENTS = [
  'linear-gradient(to right, #ff7e5f, #feb47b)',
  'linear-gradient(to right, #6a11cb, #2575fc)',
  'linear-gradient(to right, #243949, #517fa4)',
  'linear-gradient(to right, #fc4a1a, #f7b733)',
  'linear-gradient(to right, #00b09b, #96c93d)',
  'linear-gradient(to right, #8e2de2, #4a00e0)',
  'linear-gradient(to right, #ff9966, #ff5e62)',
  'linear-gradient(to right, #7F00FF, #E100FF)',
];

const GENERAL_IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&q=80', // Beach
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&q=80', // Mountains/Stars
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1080&q=80', // Nature
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080&q=80', // Mountains
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1080&q=80', // Alpine lake
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1080&q=80', // Ocean
  'https://images.unsplash.com/photo-1470071131384-001b85755536?w=1080&q=80', // Beautiful landscape
  'https://images.unsplash.com/photo-1445264618000-f1e069c5920f?w=1080&q=80', // Autumn
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1080&q=80', // Sunrise
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1080&q=80', // Waterfall
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1080&q=80', // Forest mist
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1080&q=80', // Mountain lake
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1080&q=80', // Field
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1080&q=80', // Valley
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1080&q=80', // Bridge in forest
  'https://picsum.photos/seed/beach/1080/1080', // Beach
  'https://picsum.photos/seed/mountain/1080/1080', // Mountains/Stars
  'https://picsum.photos/seed/nature/1080/1080', // Nature
  'https://picsum.photos/seed/mountains/1080/1080', // Mountains
  'https://picsum.photos/seed/lake/1080/1080', // Alpine lake
  'https://picsum.photos/seed/ocean/1080/1080', // Ocean
  'https://picsum.photos/seed/landscape/1080/1080', // Beautiful landscape
  'https://picsum.photos/seed/autumn/1080/1080', // Autumn
  'https://picsum.photos/seed/sunrise/1080/1080', // Sunrise
  'https://picsum.photos/seed/waterfall/1080/1080', // Waterfall
];

const SPIRITUAL_IMAGES = [
  'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?w=1080&q=80', // Nature/Sunlight
  'https://picsum.photos/seed/bridge/1080/1080', // Bridge in forest
  'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1080&q=80', // Cross silhouette
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1080&q=80', // Open bible
  'https://picsum.photos/seed/valley/1080/1080', // Valley
  'https://picsum.photos/seed/field/1080/1080', // Field
  'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1080&q=80', // Hands praying
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1080&q=80', // Cross on hill
  'https://picsum.photos/seed/starry/1080/1080', // Starry night
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1080&q=80', // Church window
  'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?w=1080&q=80', // Wheat field
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1080&q=80', // Majestic mountain
  'https://picsum.photos/seed/lakeview/1080/1080', // Mountain lake
  'https://picsum.photos/seed/forest/1080/1080', // Forest mist
  'https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=1080&q=80', // Sunrise ocean
];

const ASPECT_RATIOS: { value: AspectRatio; label: string; tailwind: string }[] = [
  { value: '1:1', label: 'Instagram Post (1:1)', tailwind: 'aspect-square' },
  { value: '4:5', label: 'Facebook/IG Portrait (4:5)', tailwind: 'aspect-[4/5]' },
  { value: '9:16', label: 'Story / Reel (9:16)', tailwind: 'aspect-[9/16]' },
  { value: '16:9', label: 'Twitter Post (16:9)', tailwind: 'aspect-video' },
  { value: '1.91:1', label: 'Facebook Link (1.91:1)', tailwind: 'aspect-[1.91/1]' },
  { value: '4:1', label: 'LinkedIn Banner (4:1)', tailwind: 'aspect-[4/1]' },
];

const FONTS = [
  { name: 'Normal', value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif' },
  { name: 'Inter', value: "'Inter', 'Noto Sans Ethiopic', sans-serif" },
  { name: 'Playfair Display', value: "'Playfair Display', serif" },
  { name: 'Merriweather', value: "'Merriweather', serif" },
  { name: 'Montserrat', value: "'Montserrat', sans-serif" },
  { name: 'Lora', value: "'Lora', serif" },
  { name: 'Space Grotesk', value: "'Space Grotesk', sans-serif" },
  { name: 'Caveat', value: "'Caveat', cursive" },
  { name: 'Pacifico', value: "'Pacifico', cursive" },
];

export default function Editor({ onBack }: { onBack: () => void }) {
  const [state, setState] = useState<EditorState>({
    postType: 'text',
    
    textData: { content: 'The only way to do great work is to love what you do.' },
    quoteData: { content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    bibleData: { content: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', reference: 'John 3:16' },
    codeData: { 
      content: 'function generateAwesomePost() {\n  const creativity = true;\n  const tools = ["DubaPost", "React"];\n  \n  if (creativity) {\n    return "Stunning Social Media Post!";\n  }\n}', 
      language: 'javascript', 
      theme: 'dracula' 
    },
    socialData: {
      content: 'Just launched my new project! 🚀 Building things that make people\'s lives easier is the best feeling in the world. What are you working on today?',
      username: 'Alex Developer',
      handle: '@mesayem',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tim',
      platform: 'linkedin'
    },

    fontFamily: FONTS[0].value,
    fontSize: 32,
    fontColor: '#ffffff',
    bgType: 'image',
    bgColor: '#059669',
    bgGradient: PRESET_GRADIENTS[0],
    bgImageUrl: GENERAL_IMAGES[0],
    bgOverlayOpacity: 40,
    showIcon: true,
    aspectRatio: '1:1',
  });

  const [isExporting, setIsExporting] = useState(false);
  const [visibleImageCount, setVisibleImageCount] = useState(15);
  const canvasRef = useRef<HTMLDivElement>(null);

  const updateState = (updates: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const updateTypeData = <K extends keyof EditorState>(key: K, data: Partial<EditorState[K]>) => {
    setState((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as any), ...data }
    }));
  };

  const handlePostTypeChange = (type: PostType) => {
    let updates: Partial<EditorState> = { postType: type };

    // If switching to code or social, set bgType to transparent
    if (type === 'code' || type === 'social') {
      updates.bgType = 'transparent';
    } 
    // If switching from code/social to something else, and it's transparent, set back to image
    else if ((state.postType === 'code' || state.postType === 'social') && state.bgType === 'transparent') {
      updates.bgType = 'image';
    }

    // Auto-select a nature image for Bible if currently on a solid color or gradient
    if (type === 'bible' && state.bgType !== 'image') {
      updates.bgType = 'image';
      updates.bgImageUrl = SPIRITUAL_IMAGES[0];
    }

    // Reset visible images count when switching types (optional, but keeps UI clean)
    setVisibleImageCount(15);

    updateState(updates);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'background' | 'avatar') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (target === 'background') {
        updateState({ bgType: 'image', bgImageUrl: url });
      } else {
        updateTypeData('socialData', { avatarUrl: url });
      }
    }
  };

  const generateRandomBackground = () => {
    updateState({ bgType: 'image' });
    const randomSeed = Math.floor(Math.random() * 10000);
    updateState({ bgImageUrl: `https://picsum.photos/seed/${randomSeed}/1080/1080?blur=2` });
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(canvasRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: (state.postType === 'code' || state.postType === 'social') ? 'transparent' : undefined,
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `postgen-${state.postType}-${Date.now()}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const currentAspectRatio = ASPECT_RATIOS.find(r => r.value === state.aspectRatio)?.tailwind || 'aspect-square';

  const currentImages = [...GENERAL_IMAGES, ...SPIRITUAL_IMAGES];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Editor</h1>
        </div>
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#ECA040] hover:bg-[#D98E30] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ECA040] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isExporting ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isExporting ? 'Generating...' : 'Download'}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Controls */}
        <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 overflow-y-auto p-4 lg:p-6 space-y-8 flex-shrink-0 order-2 md:order-1">
          
          {/* Post Type */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              <Type className="w-4 h-4 mr-2 text-[#ECA040]" /> Content Type
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(['text', 'quote', 'bible', 'code', 'social'] as PostType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handlePostTypeChange(type)}
                  className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors flex items-center justify-center capitalize ${
                    state.postType === type
                      ? 'bg-amber-50 border-amber-200 text-amber-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  } ${type === 'social' ? 'col-span-2' : ''}`}
                >
                  {type === 'text' && <Type className="w-4 h-4 mr-2" />}
                  {type === 'quote' && <Quote className="w-4 h-4 mr-2" />}
                  {type === 'bible' && <BookOpen className="w-4 h-4 mr-2" />}
                  {type === 'code' && <Code className="w-4 h-4 mr-2" />}
                  {type === 'social' && <LayoutTemplate className="w-4 h-4 mr-2" />}
                  {type === 'social' ? 'Social Media Card' : type}
                </button>
              ))}
            </div>
          </section>

          {/* Aspect Ratio */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Aspect Ratio</h3>
            <select
              value={state.aspectRatio}
              onChange={(e) => updateState({ aspectRatio: e.target.value as AspectRatio })}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2"
            >
              {ASPECT_RATIOS.map((ratio) => (
                <option key={ratio.value} value={ratio.value}>{ratio.label}</option>
              ))}
            </select>
          </section>

          {/* Content Inputs */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Content</h3>
            
            {/* Text Mode */}
            {state.postType === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Text</label>
                <textarea
                  value={state.textData.content}
                  onChange={(e) => updateTypeData('textData', { content: e.target.value })}
                  rows={6}
                  className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 font-sans"
                />
              </div>
            )}

            {/* Quote Mode */}
            {state.postType === 'quote' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                  <textarea
                    value={state.quoteData.content}
                    onChange={(e) => updateTypeData('quoteData', { content: e.target.value })}
                    rows={5}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={state.quoteData.author}
                    onChange={(e) => updateTypeData('quoteData', { author: e.target.value })}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3"
                  />
                </div>
              </>
            )}

            {/* Bible Mode */}
            {state.postType === 'bible' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verse Text</label>
                  <textarea
                    value={state.bibleData.content}
                    onChange={(e) => updateTypeData('bibleData', { content: e.target.value })}
                    rows={5}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Book/Chapter/Verse</label>
                  <input
                    type="text"
                    value={state.bibleData.reference}
                    onChange={(e) => updateTypeData('bibleData', { reference: e.target.value })}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3"
                  />
                </div>
              </>
            )}

            {/* Code Mode */}
            {state.postType === 'code' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code Snippet</label>
                  <textarea
                    value={state.codeData.content}
                    onChange={(e) => updateTypeData('codeData', { content: e.target.value })}
                    rows={6}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#ECA040] focus:ring-[#ECA040] sm:text-sm p-3 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      value={state.codeData.language}
                      onChange={(e) => updateTypeData('codeData', { language: e.target.value })}
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select
                      value={state.codeData.theme}
                      onChange={(e) => updateTypeData('codeData', { theme: e.target.value as CodeTheme })}
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2"
                    >
                      {Object.keys(THEMES).map((theme) => (
                        <option key={theme} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Social Mode */}
            {state.postType === 'social' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform Style</label>
                  <select
                    value={state.socialData.platform}
                    onChange={(e) => updateTypeData('socialData', { platform: e.target.value as SocialPlatform })}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#ECA040] focus:ring-[#ECA040] sm:text-sm p-2 mb-3"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post Content</label>
                  <textarea
                    value={state.socialData.content}
                    onChange={(e) => updateTypeData('socialData', { content: e.target.value })}
                    rows={4}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 font-sans"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1"><User className="w-3 h-3 inline mr-1"/> Name</label>
                    <input
                      type="text"
                      value={state.socialData.username}
                      onChange={(e) => updateTypeData('socialData', { username: e.target.value })}
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1"><AtSign className="w-3 h-3 inline mr-1"/> Handle / Title</label>
                    <input
                      type="text"
                      value={state.socialData.handle}
                      onChange={(e) => updateTypeData('socialData', { handle: e.target.value })}
                      className="w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"><ImageLucide className="w-3 h-3 inline mr-1"/> Avatar Image</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={state.socialData.avatarUrl}
                      onChange={(e) => updateTypeData('socialData', { avatarUrl: e.target.value })}
                      className="flex-1 rounded-md border border-gray-300 shadow-sm focus:border-[#ECA040] focus:ring-[#ECA040] sm:text-sm p-2"
                      placeholder="Image URL"
                    />
                    <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <Upload className="w-4 h-4" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'avatar')} />
                    </label>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* Design Controls */}
          <section className="space-y-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              <ImageIcon className="w-4 h-4 mr-2 text-[#ECA040]" /> Design
            </h3>
            
            {/* Background Type (Hidden for Code and Social) */}
            {(state.postType !== 'code' && state.postType !== 'social') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
                <div className="flex space-x-4 mb-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#ECA040]"
                      checked={state.bgType === 'image'}
                      onChange={() => updateState({ bgType: 'image' })}
                    />
                    <span className="ml-2 text-sm text-gray-700">Image</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#ECA040]"
                      checked={state.bgType === 'color'}
                      onChange={() => updateState({ bgType: 'color' })}
                    />
                    <span className="ml-2 text-sm text-gray-700">Solid Color</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#ECA040]"
                      checked={state.bgType === 'gradient'}
                      onChange={() => updateState({ bgType: 'gradient' })}
                    />
                    <span className="ml-2 text-sm text-gray-700">Gradient</span>
                  </label>
                </div>

                {state.bgType === 'image' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-2">
                      {currentImages.slice(0, visibleImageCount).map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => updateState({ bgImageUrl: img })}
                          className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${state.bgImageUrl === img ? 'border-[#ECA040] scale-105' : 'border-transparent hover:scale-105'}`}
                        >
                          <img src={img} alt={`Preset ${idx}`} className="w-full h-full object-cover" crossOrigin="anonymous" />
                        </button>
                      ))}
                      <label
                        className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#ECA040] hover:border-[#ECA040] transition-all cursor-pointer"
                        title="Upload Custom Image"
                      >
                        <Upload className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-medium">Upload</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'background')} />
                      </label>
                    </div>
                    {visibleImageCount < currentImages.length && (
                      <button 
                        onClick={() => setVisibleImageCount(prev => prev + 16)}
                        className="w-full py-2 text-sm text-[#ECA040] font-medium hover:bg-amber-50 rounded-md transition-colors"
                      >
                        Load More Images
                      </button>
                    )}
                  </div>
                )}
                
                {state.bgType === 'color' && (
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={state.bgColor}
                      onChange={(e) => updateState({ bgColor: e.target.value })}
                      className="h-10 w-10 rounded border border-gray-300 cursor-pointer p-1"
                    />
                    <span className="text-sm text-gray-500 font-mono">{state.bgColor}</span>
                  </div>
                )}

                {state.bgType === 'gradient' && (
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_GRADIENTS.map((grad, idx) => (
                      <button
                        key={idx}
                        onClick={() => updateState({ bgGradient: grad })}
                        className={`aspect-square rounded-md border-2 transition-all ${state.bgGradient === grad ? 'border-[#ECA040] scale-105' : 'border-transparent hover:scale-105'}`}
                        style={{ background: grad }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Overlay Opacity */}
            {state.bgType === 'image' && state.postType !== 'code' && state.postType !== 'social' && (
              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Dark Overlay</label>
                  <span className="text-sm text-gray-500">{state.bgOverlayOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.bgOverlayOpacity}
                  onChange={(e) => updateState({ bgOverlayOpacity: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ECA040]"
                />
              </div>
            )}

            {/* Typography & Icon Toggle */}
            <div className="pt-4 border-t border-gray-100">
              
              {(state.postType === 'quote' || state.postType === 'bible') && (
                <div className="flex items-center justify-between mb-6">
                  <label className="text-sm font-medium text-gray-700">Show Icon (Quote/Book)</label>
                  <button 
                    onClick={() => updateState({ showIcon: !state.showIcon })}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#ECA040] focus:ring-offset-2 ${state.showIcon ? 'bg-[#ECA040]' : 'bg-gray-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${state.showIcon ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              )}

              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Font Family</label>
              </div>
              <select
                value={state.fontFamily}
                onChange={(e) => updateState({ fontFamily: e.target.value })}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-[#ECA040] focus:ring-[#ECA040] sm:text-sm p-2 mb-4"
              >
                {FONTS.map(font => (
                  <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>
                    {font.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Font Size</label>
                <span className="text-sm text-gray-500">{state.fontSize}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="72"
                value={state.fontSize}
                onChange={(e) => updateState({ fontSize: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ECA040] mb-4"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={state.fontColor}
                  onChange={(e) => updateState({ fontColor: e.target.value })}
                  className="h-10 w-10 rounded border border-gray-300 cursor-pointer p-1"
                />
                <span className="text-sm text-gray-500 font-mono">{state.fontColor}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="flex-1 bg-gray-200 p-4 lg:p-8 flex flex-col items-center justify-start pt-12 lg:pt-24 overflow-y-auto order-1 md:order-2 min-h-[50vh] md:min-h-0 border-b md:border-b-0 border-gray-200">
          
          {/* Canvas Container */}
          <div 
            className={`w-full max-w-[600px] ${currentAspectRatio} shadow-2xl rounded-sm overflow-hidden flex items-center justify-center relative transition-all duration-300`}
            ref={canvasRef}
            style={{
              background: state.bgType === 'color' ? state.bgColor : state.bgType === 'gradient' ? state.bgGradient : state.bgType === 'transparent' ? 'transparent' : '#000',
              fontFamily: state.fontFamily
            }}
          >
            
            {/* Background Image */}
            {state.bgType === 'image' && state.postType !== 'code' && state.postType !== 'social' && (
              <img 
                src={state.bgImageUrl} 
                alt="Background" 
                crossOrigin="anonymous"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Overlay */}
            {state.bgType === 'image' && state.postType !== 'code' && state.postType !== 'social' && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: `rgba(0,0,0,${state.bgOverlayOpacity / 100})` }}
              />
            )}

            {/* Content Container */}
            <div className="relative z-10 w-full p-8 md:p-12 flex flex-col items-center justify-center h-full">
              
              {/* Code Snippet Mode */}
              {state.postType === 'code' && (
                <div className="w-full max-w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#1e1e1e]">
                  {/* Mac Window Header */}
                  <div className="flex items-center px-4 py-3 bg-black/40 border-b border-white/10">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  {/* Code Block */}
                  <div className="p-4 overflow-hidden text-left" style={{ fontSize: `${state.fontSize * 0.6}px` }}>
                    <SyntaxHighlighter
                      language={state.codeData.language}
                      style={THEMES[state.codeData.theme]}
                      customStyle={{ margin: 0, padding: 0, background: 'transparent', fontSize: 'inherit' }}
                      wrapLines={true}
                      wrapLongLines={true}
                    >
                      {state.codeData.content || '// Type some code...'}
                    </SyntaxHighlighter>
                  </div>
                </div>
              )}

              {/* Text / Quote / Bible Mode */}
              {(state.postType === 'text' || state.postType === 'quote' || state.postType === 'bible') && (
                <div className="text-center w-full flex flex-col items-center justify-center" style={{ color: state.fontColor }}>
                  
                  {state.showIcon && state.postType === 'quote' && (
                    <Quote className="w-12 h-12 mb-6 opacity-50" style={{ color: state.fontColor }} />
                  )}
                  {state.showIcon && state.postType === 'bible' && (
                    <BookOpen className="w-12 h-12 mb-6 opacity-50" style={{ color: state.fontColor }} />
                  )}

                  <p 
                    className={`whitespace-pre-wrap leading-relaxed ${state.postType === 'quote' || state.postType === 'bible' ? 'italic' : 'font-medium'}`}
                    style={{ fontSize: `${state.fontSize}px` }}
                  >
                    {state.postType === 'text' && state.textData.content}
                    {state.postType === 'quote' && `"${state.quoteData.content}"`}
                    {state.postType === 'bible' && `"${state.bibleData.content}"`}
                  </p>

                  {/* Footer */}
                  {((state.postType === 'quote' && state.quoteData.author) || (state.postType === 'bible' && state.bibleData.reference)) && (
                    <div className="mt-8 pt-6 border-t border-current/20 w-1/3 mx-auto">
                      <p 
                        className="font-semibold tracking-widest uppercase opacity-90"
                        style={{ fontSize: `${Math.max(12, state.fontSize * 0.4)}px` }}
                      >
                        {state.postType === 'quote' && `— ${state.quoteData.author}`}
                        {state.postType === 'bible' && state.bibleData.reference}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Social Media Card Mode */}
              {state.postType === 'social' && (
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden text-left" style={{ color: '#1a1a1a' }}>
                  
                  {/* LinkedIn Style */}
                  {state.socialData.platform === 'linkedin' && (
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <img src={state.socialData.avatarUrl} alt="Avatar" className="w-14 h-14 rounded-full object-cover mr-4" crossOrigin="anonymous" />
                        <div>
                          <h4 className="font-bold text-lg leading-tight">{state.socialData.username}</h4>
                          <p className="text-gray-500 text-sm">{state.socialData.handle}</p>
                          <p className="text-gray-400 text-xs mt-0.5">Just now • 🌐</p>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap leading-relaxed text-gray-800" style={{ fontSize: `${state.fontSize * 0.6}px` }}>
                        {state.socialData.content}
                      </p>
                    </div>
                  )}

                  {/* Twitter Style */}
                  {state.socialData.platform === 'twitter' && (
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <img src={state.socialData.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover mr-3" crossOrigin="anonymous" />
                        <div className="flex flex-col">
                          <h4 className="font-bold text-base leading-tight">{state.socialData.username}</h4>
                          <p className="text-gray-500 text-sm">{state.socialData.handle}</p>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap leading-normal text-gray-900 mb-3" style={{ fontSize: `${state.fontSize * 0.65}px` }}>
                        {state.socialData.content}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} · {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* Facebook Style */}
                  {state.socialData.platform === 'facebook' && (
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <img src={state.socialData.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover mr-3" crossOrigin="anonymous" />
                        <div className="flex flex-col">
                          <h4 className="font-bold text-[15px] leading-tight text-[#050505]">{state.socialData.username}</h4>
                          <p className="text-[#65676B] text-[13px] flex items-center">
                            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} · 
                            <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                          </p>
                        </div>
                      </div>
                      <p className="whitespace-pre-wrap leading-normal text-[#050505]" style={{ fontSize: `${state.fontSize * 0.65}px` }}>
                        {state.socialData.content}
                      </p>
                    </div>
                  )}
                  {state.socialData.platform === 'instagram' && (
                    <div className="p-0">
                      <div className="flex items-center p-4 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600 mr-3">
                          <img src={state.socialData.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-white" crossOrigin="anonymous" />
                        </div>
                        <h4 className="font-semibold text-sm">{state.socialData.username}</h4>
                      </div>
                      <div className="p-6 bg-gray-50 flex items-center justify-center min-h-[200px]">
                        <p className="whitespace-pre-wrap leading-relaxed text-center text-gray-800" style={{ fontSize: `${state.fontSize * 0.7}px` }}>
                          {state.socialData.content}
                        </p>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex space-x-4 mb-2">
                          <svg aria-label="Like" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.543 1.117 1.543s.278-.368 1.117-1.543a4.21 4.21 0 0 1 3.675-1.941z"></path></svg>
                          <svg aria-label="Comment" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                          <svg aria-label="Share Post" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                        </div>
                        <p className="text-sm font-semibold mb-1">1,024 likes</p>
                        <p className="text-sm"><span className="font-semibold mr-2">{state.socialData.username}</span>{state.socialData.content.substring(0, 50)}...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Preview: {ASPECT_RATIOS.find(r => r.value === state.aspectRatio)?.label}
          </p>
        </div>
      </div>
    </div>
  );
}
