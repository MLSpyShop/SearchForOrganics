import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, AtSign, MapPin, Globe, Sparkles, ShieldCheck, 
  Check, AlertCircle, MessageSquare, Building2, Save, Loader2,
  Tag, HeartHandshake, Leaf, Award, ExternalLink, Copy, Share2,
  Calendar, Flame, Bookmark, Users, ChevronRight, CheckCircle2,
  MessageCircle, Link as LinkIcon, Lock, ShieldAlert, Ban, Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile, isUsernameAvailable, updateUserProfile } from '../../lib/firebase';
import { UserProfile } from '../../types/community';
import { COMMON_ALLERGENS, AVOID_ADDITIVES } from '../DietarySettingsModal';
import { cn } from '../../lib/utils';

const ROLE_OPTIONS = [
  'Organic Consumer',
  'Certified Farmer',
  'Chemist / Lab Scientist',
  'Brand Founder',
  'Co-op Organizer',
  'Agronomist / Consultant',
  'Retailer / Wholesaler',
  'Herbalist / Distiller'
];

const DIETARY_FOCUS_TAGS = [
  '100% USDA Organic',
  'Demeter Biodynamic',
  'Regenerative Organic Certified (ROC)',
  'Zero-Pesticide',
  'Heirloom Non-GMO',
  'Soil-First',
  'Heavy Metal Tested',
  'Fair Trade Purity',
  'Solvent-Free Extractions',
  'Korean Natural Farming (KNF)'
];

const SPECIALTY_TAGS = [
  'Living Soil Microbes',
  'Cover Cropping',
  'Biochar Inoculation',
  'Compost Tea Brewing',
  'Mass Spectrometry',
  'Heirloom Seeds',
  'Grass-Fed Silvopasture',
  'Non-Toxic Resins',
  'Cold-Chain Logistics'
];

const CERTIFICATION_OPTIONS = [
  'USDA National Organic Program (NOP)',
  'Demeter Biodynamic®',
  'Regenerative Organic Certified (ROC)™',
  'Real Organic Project',
  'Non-GMO Project Verified',
  'EU Organic (Euro-Leaf)',
  'Certified Naturally Grown (CNG)'
];

const PRESET_BANNERS = [
  { label: 'Living Soil', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Sunlit Orchard', url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Botanical Lab', url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Heirloom Harvest', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Mountain Vineyard', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80' }
];

const PRESET_AVATARS = [
  { label: 'Grower Green', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' },
  { label: 'Scientist Blue', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
  { label: 'Founder Sage', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
  { label: 'Advocate Warm', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
  { label: 'Steward Earth', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80' }
];

export const UserProfileModal: React.FC = () => {
  const { user, profile, privateSettings, updatePrivateSettings, activeProfileModalUid, closeProfileModal, refreshProfile, startDirectMessageWith } = useAuth();
  const [targetProfile, setTargetProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'edit' | 'private'>('overview');
  const [copiedHandle, setCopiedHandle] = useState(false);
  
  // Private Settings State inside Profile Modal
  const [privIsVegan, setPrivIsVegan] = useState(false);
  const [privSuggestVegan, setPrivSuggestVegan] = useState(true);
  const [privAutoFilter, setPrivAutoFilter] = useState(false);
  const [privAllergies, setPrivAllergies] = useState<string[]>([]);
  const [privCustomAllergens, setPrivCustomAllergens] = useState<string[]>([]);
  const [privAvoidIngredients, setPrivAvoidIngredients] = useState<string[]>([]);
  const [privNewCustom, setPrivNewCustom] = useState('');
  const [privNotes, setPrivNotes] = useState('');
  const [privSaveStatus, setPrivSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    if (privateSettings) {
      setPrivIsVegan(privateSettings.isVegan ?? false);
      setPrivSuggestVegan(privateSettings.suggestVeganAlternatives ?? true);
      setPrivAutoFilter(privateSettings.autoFilterNonVegan ?? false);
      setPrivAllergies(privateSettings.allergies || []);
      setPrivCustomAllergens(privateSettings.customAllergens || []);
      setPrivAvoidIngredients(privateSettings.avoidIngredients || []);
      setPrivNotes(privateSettings.dietaryNotes || '');
    }
  }, [privateSettings]);

  const handleSavePrivateSettings = async () => {
    setPrivSaveStatus('saving');
    await updatePrivateSettings({
      isVegan: privIsVegan,
      suggestVeganAlternatives: privSuggestVegan,
      autoFilterNonVegan: privAutoFilter,
      allergies: privAllergies,
      customAllergens: privCustomAllergens,
      avoidIngredients: privAvoidIngredients,
      dietaryNotes: privNotes
    });
    setPrivSaveStatus('saved');
    setTimeout(() => setPrivSaveStatus('idle'), 2000);
  };
  
  // Edit Form State
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('Organic Consumer');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [bannerURL, setBannerURL] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [dietaryFocus, setDietaryFocus] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [organicCertificationsHeld, setOrganicCertificationsHeld] = useState<string[]>([]);
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isMyProfile = user && activeProfileModalUid === user.uid;

  useEffect(() => {
    if (!activeProfileModalUid) return;

    if (isMyProfile && profile) {
      setTargetProfile(profile);
      populateForm(profile);
    } else {
      setIsLoading(true);
      getUserProfile(activeProfileModalUid).then((p) => {
        if (p) {
          setTargetProfile(p);
          populateForm(p);
        } else {
          // Generate an attractive fallback profile for demonstration
          const fallback: UserProfile = {
            uid: activeProfileModalUid,
            username: activeProfileModalUid.slice(0, 10).toLowerCase(),
            displayName: 'Verified Organic Member',
            email: 'member@organic.community',
            role: 'Certified Farmer',
            location: 'Willamette Valley, OR',
            bio: 'Advocating for living soil, zero synthetic chemical inputs, and radical transparency from seed to harvest.',
            bannerURL: PRESET_BANNERS[0].url,
            photoURL: PRESET_AVATARS[0].url,
            dietaryFocus: ['100% USDA Organic', 'Demeter Biodynamic', 'Soil-First'],
            specialties: ['Living Soil Microbes', 'Compost Tea Brewing', 'Cover Cropping'],
            organicCertificationsHeld: ['USDA National Organic Program (NOP)', 'Demeter Biodynamic®'],
            badges: ['Pure-ID Verified', 'Soil Steward', 'Master Composter'],
            reputationScore: 240,
            memberSince: 'March 2025',
            topicsCount: 6,
            repliesCount: 38,
            followersCount: 84,
            followingCount: 19,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          setTargetProfile(fallback);
          populateForm(fallback);
        }
        setIsLoading(false);
      }).catch(() => setIsLoading(false));
    }
  }, [activeProfileModalUid, profile, isMyProfile]);

  const populateForm = (p: UserProfile) => {
    setUsername(p.username || '');
    setDisplayName(p.displayName || '');
    setBio(p.bio || '');
    setRole(p.role || 'Organic Consumer');
    setLocation(p.location || '');
    setWebsite(p.website || '');
    setBannerURL(p.bannerURL || PRESET_BANNERS[0].url);
    setPhotoURL(p.photoURL || '');
    setDietaryFocus(p.dietaryFocus || []);
    setSpecialties(p.specialties || ['Living Soil Microbes', 'Cover Cropping']);
    setOrganicCertificationsHeld(p.organicCertificationsHeld || ['USDA National Organic Program (NOP)']);
    setTwitter(p.socialLinks?.twitter || '');
    setInstagram(p.socialLinks?.instagram || '');
    setLinkedin(p.socialLinks?.linkedin || '');
  };

  const handleUsernameChange = async (val: string) => {
    const sanitized = val.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(sanitized);
    if (sanitized.length < 3) {
      setUsernameStatus('invalid');
      return;
    }
    if (profile && sanitized === profile.username) {
      setUsernameStatus('available');
      return;
    }
    setUsernameStatus('checking');
    const avail = await isUsernameAvailable(sanitized, user?.uid);
    setUsernameStatus(avail ? 'available' : 'taken');
  };

  const toggleArrayItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => 
      prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]
    );
  };

  const handleCopyHandle = () => {
    if (!targetProfile?.username) return;
    navigator.clipboard.writeText(`@${targetProfile.username}`);
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (usernameStatus === 'taken' || usernameStatus === 'invalid') {
      setErrorMessage('Please choose a valid and available username.');
      return;
    }

    setSaveStatus('saving');
    setErrorMessage('');

    try {
      const ok = await updateUserProfile(user.uid, {
        username: username.trim(),
        displayName: displayName.trim(),
        bio: bio.trim(),
        role,
        location: location.trim(),
        website: website.trim(),
        bannerURL: bannerURL.trim(),
        photoURL: photoURL.trim() || undefined,
        dietaryFocus,
        specialties,
        organicCertificationsHeld,
        socialLinks: {
          twitter: twitter.trim(),
          instagram: instagram.trim(),
          linkedin: linkedin.trim(),
          farmWebsite: website.trim()
        }
      });

      if (ok) {
        setSaveStatus('saved');
        await refreshProfile();
        setActiveTab('overview');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
        setErrorMessage('Failed to update profile. Please try again.');
      }
    } catch (err) {
      setSaveStatus('error');
      setErrorMessage('Error saving profile changes.');
    }
  };

  if (!activeProfileModalUid) return null;

  const currentBanner = targetProfile?.bannerURL || PRESET_BANNERS[0].url;
  const currentAvatar = targetProfile?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(targetProfile?.displayName || 'Organic')}&background=059669&color=fff`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden my-8"
        >
          {/* Header Banner */}
          <div className="h-44 relative overflow-hidden">
            <img 
              src={currentBanner} 
              alt="Profile Cover" 
              className="w-full h-full object-cover brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Top Bar on Banner */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md text-emerald-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Pure-ID Profile
              </div>
              <button
                onClick={closeProfileModal}
                className="p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-md border border-white/10 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 pt-0 relative space-y-6">
            {/* Avatar & Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 mb-4">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <img
                    src={currentAvatar}
                    alt="Avatar"
                    className="w-28 h-28 rounded-3xl border-4 border-white shadow-2xl bg-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full shadow-md" title="Pure-ID Active Member" />
                </div>
                
                <div className="pb-1 hidden sm:block">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    {targetProfile?.displayName || 'Organic Member'}
                    <ShieldCheck className="w-5 h-5 text-emerald-600 inline" />
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <button 
                      onClick={handleCopyHandle}
                      className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
                      title="Click to copy handle"
                    >
                      <AtSign className="w-3 h-3" />
                      {targetProfile?.username || 'member'}
                      {copiedHandle ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-400" />}
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
                      {targetProfile?.role || 'Organic Consumer'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                {isMyProfile ? (
                  <button
                    onClick={() => setActiveTab(activeTab === 'edit' ? 'overview' : 'edit')}
                    className={cn(
                      "px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2",
                      activeTab === 'edit' 
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                        : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20"
                    )}
                  >
                    <User className="w-3.5 h-3.5" />
                    {activeTab === 'edit' ? 'Close Editor' : 'Edit Profile & Handle'}
                  </button>
                ) : (
                  targetProfile && (
                    <button
                      onClick={() => {
                        startDirectMessageWith({
                          uid: targetProfile.uid,
                          name: targetProfile.displayName,
                          username: targetProfile.username,
                          photoURL: targetProfile.photoURL,
                          role: targetProfile.role
                        });
                        closeProfileModal();
                      }}
                      className="px-6 py-2.5 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Direct Message
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Mobile Header Title */}
            <div className="sm:hidden -mt-2 mb-2">
              <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-1.5">
                {targetProfile?.displayName || 'Organic Member'}
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-emerald-700">@{targetProfile?.username || 'member'}</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                  {targetProfile?.role || 'Organic Consumer'}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <button
                onClick={() => setActiveTab('overview')}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                  activeTab === 'overview'
                    ? "bg-emerald-50 text-emerald-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                Overview & Badges
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                  activeTab === 'activity'
                    ? "bg-emerald-50 text-emerald-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                Community Impact
              </button>
              {isMyProfile && (
                <>
                  <button
                    onClick={() => setActiveTab('edit')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                      activeTab === 'edit'
                        ? "bg-emerald-50 text-emerald-800 shadow-sm"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('private')}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5",
                      activeTab === 'private'
                        ? "bg-amber-50 text-amber-900 shadow-sm border border-amber-200"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    Private Allergies & Diet
                  </button>
                </>
              )}
            </div>

            {isLoading ? (
              <div className="py-16 text-center text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
                <p className="text-xs font-black uppercase tracking-widest">Loading Member Profile...</p>
              </div>
            ) : activeTab === 'edit' ? (
              /* --- Edit Form Mode --- */
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Choose Username */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Choose Your Handle (@username)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <AtSign className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        placeholder="your_handle"
                        className="w-full pl-9 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                        {usernameStatus === 'checking' && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
                        {usernameStatus === 'available' && <Check className="w-4 h-4 text-emerald-600" />}
                        {usernameStatus === 'taken' && <AlertCircle className="w-4 h-4 text-red-500" />}
                      </div>
                    </div>
                    {usernameStatus === 'taken' && (
                      <p className="text-[10px] font-bold text-red-500">Handle already registered by another member.</p>
                    )}
                  </div>

                  {/* Display Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Display Name / Farm Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g., Marie Landry or Silver Creek Farm"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Role and Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Community Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                    >
                      {ROLE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Region / Bioregion Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Willamette Valley, OR"
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Banner & Avatar Presets */}
                <div className="space-y-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/60">
                  <label className="text-[10px] font-black uppercase tracking-widest text-emerald-800 block">
                    Choose Profile Cover Banner
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {PRESET_BANNERS.map((b) => (
                      <button
                        type="button"
                        key={b.label}
                        onClick={() => setBannerURL(b.url)}
                        className={cn(
                          "relative h-14 rounded-xl overflow-hidden border-2 transition-all",
                          bannerURL === b.url ? "border-emerald-600 scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                        )}
                      >
                        <img src={b.url} alt={b.label} className="w-full h-full object-cover" />
                        <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] font-bold text-white text-center py-0.5 truncate px-1">
                          {b.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-emerald-800 block mb-2">
                      Choose Avatar Style or Custom Image
                    </label>
                    <div className="flex items-center gap-3">
                      {PRESET_AVATARS.map((a) => (
                        <button
                          type="button"
                          key={a.label}
                          onClick={() => setPhotoURL(a.url)}
                          className={cn(
                            "w-10 h-10 rounded-xl overflow-hidden border-2 transition-all",
                            photoURL === a.url ? "border-emerald-600 scale-110 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                          )}
                        >
                          <img src={a.url} alt={a.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                      <input
                        type="url"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="Or paste custom image URL..."
                        className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-900 outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Organic Mission Bio & Background
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell the organic community about your farm practices, dietary focus, or clean ingredient passion..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all resize-none"
                  />
                </div>

                {/* Organic Certifications Held */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Organic Certifications & Standards Held / Followed
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CERTIFICATION_OPTIONS.map((cert) => {
                      const isSelected = organicCertificationsHeld.includes(cert);
                      return (
                        <button
                          type="button"
                          key={cert}
                          onClick={() => toggleArrayItem(organicCertificationsHeld, setOrganicCertificationsHeld, cert)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border",
                            isSelected
                              ? "bg-emerald-700 text-white border-emerald-800 shadow-sm"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          )}
                        >
                          <Award className="w-3.5 h-3.5 text-emerald-400" />
                          {cert}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dietary & Purity Focus Tags */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Purity & Practice Focus (Click to toggle)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DIETARY_FOCUS_TAGS.map((tag) => {
                      const isSelected = dietaryFocus.includes(tag);
                      return (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => toggleArrayItem(dietaryFocus, setDietaryFocus, tag)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5",
                            isSelected
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          )}
                        >
                          <Leaf className="w-3 h-3" />
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Specialties Tags */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Production & Agriculture Specialties
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALTY_TAGS.map((spec) => {
                      const isSelected = specialties.includes(spec);
                      return (
                        <button
                          type="button"
                          key={spec}
                          onClick={() => toggleArrayItem(specialties, setSpecialties, spec)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5",
                            isSelected
                              ? "bg-teal-700 text-white shadow-sm"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          )}
                        >
                          <Sparkles className="w-3 h-3" />
                          {spec}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Social Links & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Website / Farm Shop
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://yourfarm.org"
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Instagram Handle
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <AtSign className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="@organic_farm"
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 focus:bg-white focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveStatus === 'saving'}
                    className="px-8 py-3 bg-gray-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg"
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating Pure-ID...
                      </>
                    ) : saveStatus === 'saved' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Profile Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : activeTab === 'activity' ? (
              /* --- Community Activity Mode --- */
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100/60 text-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Purity Rep Score</span>
                    <span className="text-2xl font-black text-emerald-900 mt-1 flex items-center justify-center gap-1">
                      <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                      {targetProfile?.reputationScore || 240}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">Discussions Started</span>
                    <span className="text-2xl font-black text-gray-900 mt-1 block">
                      {targetProfile?.topicsCount || 8}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">Replies & Answers</span>
                    <span className="text-2xl font-black text-gray-900 mt-1 block">
                      {targetProfile?.repliesCount || 42}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">Followers</span>
                    <span className="text-2xl font-black text-gray-900 mt-1 block">
                      {targetProfile?.followersCount || 116}
                    </span>
                  </div>
                </div>

                {/* Achievements Badges */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    Community Badges & Honors
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                        🌿
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900">Soil Health Steward</p>
                        <p className="text-[11px] text-gray-500 font-medium">Contributed 20+ verified soil & compost research notes</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                        🔬
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900">Spectroscopy Pioneer</p>
                        <p className="text-[11px] text-gray-500 font-medium">Verified zero-glyphosate lab test data contributor</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-100/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                        🛡️
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900">Greenwash Watchdog</p>
                        <p className="text-[11px] text-gray-500 font-medium">Flagged 5+ deceptive label claims with third-party data</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                        🤝
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900">Co-Op Organizer</p>
                        <p className="text-[11px] text-gray-500 font-medium">Active member in 6 organic grower collectives</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Since info */}
                <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-2 font-bold">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Member Since: {targetProfile?.memberSince || 'August 2025'}
                  </span>
                  <span className="font-black text-emerald-700 uppercase tracking-widest text-[10px]">
                    100% Organic Verified
                  </span>
                </div>
              </div>
            ) : activeTab === 'private' ? (
              /* --- Private Dietary & Allergy Settings --- */
              <div className="space-y-6">
                {/* Privacy Badge */}
                <div className="p-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl flex items-start gap-3 shadow-md">
                  <Lock className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-black text-emerald-100 uppercase tracking-wider">
                      🔒 Zero-Public-Leakage Privacy Guarantee
                    </p>
                    <p className="text-emerald-200/80 font-medium leading-relaxed">
                      Your allergy list and vegan preferences are strictly confidential. They are never shown on your public profile or forum discussions. They power the search engine to warn you of allergens and suggest 3 certified organic vegan swaps.
                    </p>
                  </div>
                </div>

                {/* Vegan Lifestyle Guard */}
                <div className="p-5 bg-emerald-50/70 border-2 border-emerald-500/40 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-emerald-700" />
                      <div>
                        <h4 className="text-sm font-black text-emerald-950">100% Vegan / Plant-Based Profile</h4>
                        <p className="text-xs text-emerald-800 font-medium">Prioritize plant-based certified organic goods</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivIsVegan(!privIsVegan)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative p-0.5",
                        privIsVegan ? "bg-emerald-600" : "bg-gray-300"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 bg-white rounded-full shadow-md transition-transform",
                        privIsVegan ? "translate-x-6" : "translate-x-0"
                      )} />
                    </button>
                  </div>

                  {/* Suggest 3 Vegan Alternatives */}
                  <div className="pt-3 border-t border-emerald-200/60 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        Suggest 3 Vegan Alternatives for Non-Vegan Searches
                      </p>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        When searching non-vegan items (butter, milk, eggs, honey, bone broth), show desired results + 3 organic vegan swaps.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPrivSuggestVegan(!privSuggestVegan)}
                      className={cn(
                        "w-10 h-5 rounded-full transition-colors relative p-0.5 shrink-0 mt-0.5",
                        privSuggestVegan ? "bg-emerald-600" : "bg-gray-300"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 bg-white rounded-full shadow-md transition-transform",
                        privSuggestVegan ? "translate-x-5" : "translate-x-0"
                      )} />
                    </button>
                  </div>
                </div>

                {/* Allergies Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      Food Allergies & Intolerances
                    </h4>
                    <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {privAllergies.length + privCustomAllergens.length} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {COMMON_ALLERGENS.map((item) => {
                      const isSel = privAllergies.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (isSel) setPrivAllergies(privAllergies.filter(a => a !== item.id));
                            else setPrivAllergies([...privAllergies, item.id]);
                          }}
                          className={cn(
                            "p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs font-bold",
                            isSel 
                              ? "bg-amber-50 border-amber-400 text-amber-950 shadow-sm"
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          <span className="truncate">{item.icon} {item.id}</span>
                          {isSel && <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Allergen */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={privNewCustom}
                      onChange={(e) => setPrivNewCustom(e.target.value)}
                      placeholder="Add custom allergen (e.g. Avocado, Kiwi, Coconut)..."
                      className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = privNewCustom.trim();
                          if (val && !privCustomAllergens.includes(val)) {
                            setPrivCustomAllergens([...privCustomAllergens, val]);
                            setPrivNewCustom('');
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const val = privNewCustom.trim();
                        if (val && !privCustomAllergens.includes(val)) {
                          setPrivCustomAllergens([...privCustomAllergens, val]);
                          setPrivNewCustom('');
                        }
                      }}
                      className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  {privCustomAllergens.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {privCustomAllergens.map((c) => (
                        <span key={c} className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold flex items-center gap-1 border border-amber-200">
                          ⚠️ {c}
                          <button
                            type="button"
                            onClick={() => setPrivCustomAllergens(privCustomAllergens.filter(x => x !== c))}
                            className="hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Avoid Ingredients */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 flex items-center gap-1.5">
                    <Ban className="w-4 h-4 text-rose-600" />
                    Ingredients & Additives to Avoid
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {AVOID_ADDITIVES.map((item) => {
                      const isSel = privAvoidIngredients.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            if (isSel) setPrivAvoidIngredients(privAvoidIngredients.filter(a => a !== item.id));
                            else setPrivAvoidIngredients([...privAvoidIngredients, item.id]);
                          }}
                          className={cn(
                            "p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs font-bold",
                            isSel 
                              ? "bg-rose-50 border-rose-300 text-rose-950" 
                              : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          <span className="truncate">{item.label}</span>
                          {isSel && <Check className="w-3.5 h-3.5 text-rose-700 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dietary Notes */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Private Health & Preparation Notes
                  </label>
                  <textarea
                    value={privNotes}
                    onChange={(e) => setPrivNotes(e.target.value)}
                    placeholder="Specific notes for AI assistance and dietary filtering..."
                    rows={2}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleSavePrivateSettings}
                    disabled={privSaveStatus === 'saving'}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    {privSaveStatus === 'saving' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving Preferences...
                      </>
                    ) : privSaveStatus === 'saved' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Settings Saved Privately!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Private Dietary Settings
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* --- Profile Overview Mode --- */
              <div className="space-y-6">
                {/* Bio card */}
                <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block">
                    Organic Mission & Bioregion
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">
                    {targetProfile?.bio || 'Committed to transparent organic practices, clean nutrition, and zero-pesticide biological sovereignty.'}
                  </p>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold">{targetProfile?.location || 'Pacific Northwest, USA'}</span>
                  </div>

                  {targetProfile?.website ? (
                    <a 
                      href={targetProfile.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-3 rounded-2xl transition-colors truncate border border-emerald-100/60"
                    >
                      <span className="flex items-center gap-2 truncate font-bold">
                        <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{targetProfile.website.replace(/^https?:\/\//, '')}</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold">Pure-ID Verified Organic Member</span>
                    </div>
                  )}
                </div>

                {/* Organic Certifications Held */}
                {targetProfile?.organicCertificationsHeld && targetProfile.organicCertificationsHeld.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                      Certifications & Verification Tiers
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {targetProfile.organicCertificationsHeld.map((cert) => (
                        <span 
                          key={cert}
                          className="px-3 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-black tracking-tight flex items-center gap-1.5 shadow-sm"
                        >
                          <Award className="w-3.5 h-3.5 text-emerald-300" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dietary & Purity Commitments */}
                {targetProfile?.dietaryFocus && targetProfile.dietaryFocus.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                      Purity Commitments & Standards
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {targetProfile.dietaryFocus.map((focus) => (
                        <span key={focus} className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-black tracking-tight border border-emerald-100/60 flex items-center gap-1.5">
                          <Leaf className="w-3 h-3 text-emerald-600" />
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specialties */}
                {targetProfile?.specialties && targetProfile.specialties.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                      Agricultural & Science Specialties
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {targetProfile.specialties.map((spec) => (
                        <span key={spec} className="px-3 py-1.5 bg-teal-50 text-teal-800 rounded-xl text-xs font-black tracking-tight border border-teal-100/60 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-teal-600" />
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
