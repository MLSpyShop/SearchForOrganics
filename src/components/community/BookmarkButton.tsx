import React, { useState } from 'react';
import { Bookmark, Check, Loader2, Plus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { saveResultBookmark, signInWithGoogle } from '../../lib/firebase';
import { Product } from '../../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface BookmarkButtonProps {
  product: Product;
  className?: string;
  variant?: 'icon' | 'pill' | 'button';
}

const DEFAULT_FOLDERS = [
  'General Favorites',
  'Verified To-Buy List',
  'Farm Route Stops',
  'Clean Ingredient Watchlist',
  'B2B Wholesale Contacts'
];

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ 
  product, 
  className,
  variant = 'icon'
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [folder, setFolder] = useState('General Favorites');
  const [customFolder, setCustomFolder] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      signInWithGoogle();
      return;
    }

    setIsSaving(true);
    const chosenFolder = customFolder.trim() ? customFolder.trim() : folder;

    try {
      const res = await saveResultBookmark(user.uid, product, chosenFolder, notes.trim());
      if (res) {
        setSavedSuccess(true);
        setTimeout(() => {
          setSavedSuccess(false);
          setIsOpen(false);
        }, 1500);
      }
    } catch (err) {
      console.warn("Could not save bookmark", err);
    } finally {
      setIsSaving(false);
    }
  };

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      signInWithGoogle();
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      {variant === 'icon' ? (
        <button
          onClick={openModal}
          title="Save to Organic Memory / Bookmarks"
          className={cn(
            "p-2.5 rounded-2xl transition-all flex items-center justify-center",
            savedSuccess 
              ? "bg-emerald-500 text-white shadow-md" 
              : "bg-white/80 hover:bg-white text-gray-400 hover:text-emerald-600 shadow-sm border border-gray-100 hover:border-emerald-200",
            className
          )}
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      ) : variant === 'pill' ? (
        <button
          onClick={openModal}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
            savedSuccess
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700",
            className
          )}
        >
          {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          <span>{savedSuccess ? 'Saved!' : 'Save Result'}</span>
        </button>
      ) : (
        <button
          onClick={openModal}
          className={cn(
            "px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
            savedSuccess
              ? "bg-emerald-600 text-white"
              : "bg-gray-900 hover:bg-emerald-600 text-white shadow-md",
            className
          )}
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          <span>{savedSuccess ? 'Saved to Memory' : 'Save to Memory'}</span>
        </button>
      )}

      {/* Bookmark Modal */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 tracking-tight">Save to Memory</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cloud Bookmark Collection</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Product Preview */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-sm font-black text-gray-900 line-clamp-1">{product.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">by <span className="font-bold text-gray-700">{product.vendor || 'Organic Producer'}</span></p>
              </div>

              {/* Folder Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Select Folder
                </label>
                <select
                  value={folder}
                  onChange={(e) => {
                    setFolder(e.target.value);
                    if (e.target.value !== 'custom') setCustomFolder('');
                  }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                >
                  {DEFAULT_FOLDERS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                  <option value="custom">+ Create New Custom Folder...</option>
                </select>

                {folder === 'custom' && (
                  <input
                    type="text"
                    value={customFolder}
                    onChange={(e) => setCustomFolder(e.target.value)}
                    placeholder="Enter custom folder name..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-emerald-300 rounded-xl text-xs font-bold text-gray-900 focus:bg-white outline-none mt-2 animate-in fade-in"
                  />
                )}
              </div>

              {/* Personal Notes */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Personal Research Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Sourced at farmer market on weekends, verify Demeter seal..."
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : savedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Bookmarked!
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      Confirm Bookmark
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
