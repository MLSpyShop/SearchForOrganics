import React, { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { 
  auth, testFirebaseConnection, ensureUserProfileExists, getUserProfile, updateUserProfile,
  getUserPrivateSettings, saveUserPrivateSettings, getLocalPrivateSettings, DEFAULT_USER_PRIVATE_SETTINGS
} from '../lib/firebase';
import { UserProfile, UserPrivateSettings } from '../types/community';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  privateSettings: UserPrivateSettings;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  updateMyProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  updatePrivateSettings: (updates: Partial<UserPrivateSettings>) => Promise<boolean>;
  openProfileModal: (uid?: string) => void;
  activeProfileModalUid: string | null;
  closeProfileModal: () => void;
  isPrivateSettingsModalOpen: boolean;
  openPrivateSettingsModal: () => void;
  closePrivateSettingsModal: () => void;
  startDirectMessageWith: (targetUser: { uid: string; name: string; username: string; photoURL?: string; role?: string }) => void;
  targetDMUser: { uid: string; name: string; username: string; photoURL?: string; role?: string } | null;
  clearTargetDMUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  privateSettings: DEFAULT_USER_PRIVATE_SETTINGS,
  loading: true,
  refreshProfile: async () => {},
  updateMyProfile: async () => false,
  updatePrivateSettings: async () => false,
  openProfileModal: () => {},
  activeProfileModalUid: null,
  closeProfileModal: () => {},
  isPrivateSettingsModalOpen: false,
  openPrivateSettingsModal: () => {},
  closePrivateSettingsModal: () => {},
  startDirectMessageWith: () => {},
  targetDMUser: null,
  clearTargetDMUser: () => {}
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [privateSettings, setPrivateSettings] = useState<UserPrivateSettings>(() => getLocalPrivateSettings());
  const [loading, setLoading] = useState(true);
  const [activeProfileModalUid, setActiveProfileModalUid] = useState<string | null>(null);
  const [isPrivateSettingsModalOpen, setIsPrivateSettingsModalOpen] = useState(false);
  const [targetDMUser, setTargetDMUser] = useState<{ uid: string; name: string; username: string; photoURL?: string; role?: string } | null>(null);

  const fetchProfileAndSettings = async (currentUser: User) => {
    try {
      let [p, settings] = await Promise.all([
        getUserProfile(currentUser.uid).then(async (res) => {
          if (!res) return await ensureUserProfileExists(currentUser);
          return res;
        }),
        getUserPrivateSettings(currentUser.uid)
      ]);
      setProfile(p);
      if (settings) {
        setPrivateSettings(settings);
      }
    } catch (err) {
      console.warn("Could not fetch user profile or private settings", err);
    }
  };

  useEffect(() => {
    testFirebaseConnection();
    const unsubscribe = onAuthStateChanged(
      auth, 
      async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          await fetchProfileAndSettings(currentUser);
        } else {
          setProfile(null);
          setPrivateSettings(getLocalPrivateSettings());
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Auth state changed notice:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchProfileAndSettings(user);
    }
  };

  const updateMyProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    const ok = await updateUserProfile(user.uid, updates);
    if (ok) {
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    }
    return ok;
  };

  const updatePrivateSettings = async (updates: Partial<UserPrivateSettings>): Promise<boolean> => {
    const updated = { ...privateSettings, ...updates };
    setPrivateSettings(updated);
    if (user) {
      return await saveUserPrivateSettings(user.uid, updates);
    } else {
      // Save locally
      saveUserPrivateSettings('', updates);
      return true;
    }
  };

  const openProfileModal = (uid?: string) => {
    setActiveProfileModalUid(uid || user?.uid || null);
  };

  const closeProfileModal = () => {
    setActiveProfileModalUid(null);
  };

  const openPrivateSettingsModal = () => {
    setIsPrivateSettingsModalOpen(true);
  };

  const closePrivateSettingsModal = () => {
    setIsPrivateSettingsModalOpen(false);
  };

  const startDirectMessageWith = (target: { uid: string; name: string; username: string; photoURL?: string; role?: string }) => {
    setTargetDMUser(target);
    // Switch to community/messages tab
    window.dispatchEvent(new CustomEvent('switch-tab', { detail: 'community' }));
    window.dispatchEvent(new CustomEvent('switch-community-subtab', { detail: 'dms' }));
  };

  const clearTargetDMUser = () => {
    setTargetDMUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      privateSettings,
      loading,
      refreshProfile,
      updateMyProfile,
      updatePrivateSettings,
      openProfileModal,
      activeProfileModalUid,
      closeProfileModal,
      isPrivateSettingsModalOpen,
      openPrivateSettingsModal,
      closePrivateSettingsModal,
      startDirectMessageWith,
      targetDMUser,
      clearTargetDMUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
