import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { 
  getFirestore, doc, setDoc, getDoc, collection, query, where, orderBy, 
  limit, addDoc, getDocs, getDocFromServer, Timestamp, onSnapshot, updateDoc, 
  deleteDoc, arrayUnion, arrayRemove, Unsubscribe 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { 
  UserProfile, CompanyProfile, ForumTopic, ForumReply, 
  UserGroup, GroupMessage, DirectMessage, DMConversation, 
  SavedResult, SavedSearchItem, UserPrivateSettings 
} from '../types/community';
import { Product } from '../../types';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Automatically ensure a user profile exists
    if (result.user) {
      await ensureUserProfileExists(result.user);
    }
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

// Helper for error handling
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.warn('Firestore Notice: ', JSON.stringify(errInfo));
  return null;
}

// -------------------------------------------------------------
// USER PROFILES & USERNAME MANAGEMENT
// -------------------------------------------------------------

export async function ensureUserProfileExists(user: User): Promise<UserProfile> {
  const userDocRef = doc(db, 'userProfiles', user.uid);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }

    // Generate initial handle based on email or name
    const rawBase = (user.displayName || user.email?.split('@')[0] || 'organic_user')
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_')
      .slice(0, 15);
    const initialUsername = `${rawBase}_${Math.floor(100 + Math.random() * 900)}`;

    const newProfile: UserProfile = {
      uid: user.uid,
      username: initialUsername,
      displayName: user.displayName || 'Organic Advocate',
      email: user.email || '',
      photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'Organic')}&background=059669&color=fff`,
      bannerURL: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80',
      bio: 'Committed to 100% molecular purity and verifiable organic systems.',
      role: 'Organic Consumer',
      location: 'Earth',
      dietaryFocus: ['Non-GMO', 'Zero-Pesticide', 'Demeter Certified'],
      badges: ['Pure-ID Verified', 'Soil Steward', 'Early Organic Pioneer'],
      reputationScore: 120,
      memberSince: 'August 2026',
      specialties: ['Living Soil', 'Zero Pesticides'],
      organicCertificationsHeld: ['USDA Organic Enthusiast'],
      socialLinks: {
        twitter: '',
        instagram: '',
        linkedin: '',
        farmWebsite: ''
      },
      followersCount: 1,
      followingCount: 4,
      topicsCount: 0,
      repliesCount: 0,
      savedCount: 0,
      verifiedStatus: 'community-member',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    await setDoc(userDocRef, newProfile);
    return newProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `userProfiles/${user.uid}`);
    return {
      uid: user.uid,
      username: user.email?.split('@')[0] || 'organic_member',
      displayName: user.displayName || 'Organic Member',
      email: user.email || '',
      photoURL: user.photoURL || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, 'userProfiles', uid));
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `userProfiles/${uid}`);
    return null;
  }
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<boolean> {
  try {
    const docRef = doc(db, 'userProfiles', uid);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `userProfiles/${uid}`);
    return false;
  }
}

export async function isUsernameAvailable(username: string, currentUid?: string): Promise<boolean> {
  const sanitized = username.trim().toLowerCase().replace(/^@/, '');
  if (sanitized.length < 3) return false;
  try {
    const q = query(collection(db, 'userProfiles'), where('username', '==', sanitized), limit(2));
    const snap = await getDocs(q);
    if (snap.empty) return true;
    if (currentUid && snap.docs.length === 1 && snap.docs[0].id === currentUid) {
      return true;
    }
    return false;
  } catch (error) {
    return true; // allow attempt if permission is restricted
  }
}

// -------------------------------------------------------------
// COMPANY PROFILES
// -------------------------------------------------------------

export async function getCompanyProfiles(): Promise<CompanyProfile[]> {
  try {
    const q = query(collection(db, 'companyProfiles'), orderBy('createdAt', 'desc'), limit(50));
    const snap = await getDocs(q);
    const list: CompanyProfile[] = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() } as CompanyProfile));
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'companyProfiles');
    return [];
  }
}

export async function saveCompanyProfile(company: Omit<CompanyProfile, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<string | null> {
  try {
    if (company.id) {
      const docRef = doc(db, 'companyProfiles', company.id);
      await updateDoc(docRef, {
        ...company,
        updatedAt: Timestamp.now()
      });
      return company.id;
    } else {
      const colRef = collection(db, 'companyProfiles');
      const docRef = await addDoc(colRef, {
        ...company,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'companyProfiles');
    return null;
  }
}

// -------------------------------------------------------------
// USER FORUMS (TOPICS & REPLIES)
// -------------------------------------------------------------

export async function getForumTopics(categoryFilter?: string): Promise<ForumTopic[]> {
  try {
    let q = query(collection(db, 'forumTopics'), orderBy('createdAt', 'desc'), limit(50));
    if (categoryFilter && categoryFilter !== 'all') {
      q = query(collection(db, 'forumTopics'), where('category', '==', categoryFilter), limit(50));
    }
    const snap = await getDocs(q);
    const list: ForumTopic[] = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() } as ForumTopic));
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'forumTopics');
    return [];
  }
}

export async function createForumTopic(topic: Omit<ForumTopic, 'id' | 'createdAt' | 'updatedAt' | 'upvotesCount' | 'upvotedBy' | 'repliesCount'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'forumTopics'), {
      ...topic,
      upvotesCount: 1,
      upvotedBy: [topic.authorUid],
      repliesCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'forumTopics');
    return null;
  }
}

export async function upvoteForumTopic(topicId: string, uid: string, currentlyUpvoted: boolean): Promise<void> {
  try {
    const docRef = doc(db, 'forumTopics', topicId);
    if (currentlyUpvoted) {
      await updateDoc(docRef, {
        upvotedBy: arrayRemove(uid)
      });
    } else {
      await updateDoc(docRef, {
        upvotedBy: arrayUnion(uid)
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `forumTopics/${topicId}`);
  }
}

export function subscribeForumReplies(topicId: string, callback: (replies: ForumReply[]) => void): Unsubscribe {
  const q = query(collection(db, 'forumReplies'), where('topicId', '==', topicId), limit(100));
  return onSnapshot(q, (snap) => {
    const replies: ForumReply[] = [];
    snap.forEach(d => replies.push({ id: d.id, ...d.data() } as ForumReply));
    // Sort client-side by createdAt to avoid compound index requirements
    replies.sort((a, b) => {
      const tA = a.createdAt?.seconds || 0;
      const tB = b.createdAt?.seconds || 0;
      return tA - tB;
    });
    callback(replies);
  }, (err) => {
    console.warn("Replies snapshot error", err);
  });
}

export async function createForumReply(reply: Omit<ForumReply, 'id' | 'createdAt' | 'upvotesCount' | 'upvotedBy'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'forumReplies'), {
      ...reply,
      upvotesCount: 0,
      upvotedBy: [],
      createdAt: Timestamp.now()
    });
    // Increment reply count on topic
    try {
      const topicDoc = doc(db, 'forumTopics', reply.topicId);
      const snap = await getDoc(topicDoc);
      if (snap.exists()) {
        const cur = snap.data().repliesCount || 0;
        await updateDoc(topicDoc, { repliesCount: cur + 1 });
      }
    } catch (_) {}
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'forumReplies');
    return null;
  }
}

// -------------------------------------------------------------
// USER GROUPS & GROUP CHAT
// -------------------------------------------------------------

export async function getUserGroups(): Promise<UserGroup[]> {
  try {
    const snap = await getDocs(query(collection(db, 'userGroups'), limit(50)));
    const list: UserGroup[] = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() } as UserGroup));
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'userGroups');
    return [];
  }
}

export async function createUserGroup(group: Omit<UserGroup, 'id' | 'createdAt' | 'updatedAt' | 'membersCount' | 'memberUids'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'userGroups'), {
      ...group,
      memberUids: [group.createdByUid],
      membersCount: 1,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'userGroups');
    return null;
  }
}

export async function toggleGroupMembership(groupId: string, uid: string, isMember: boolean): Promise<boolean> {
  try {
    const docRef = doc(db, 'userGroups', groupId);
    if (isMember) {
      await updateDoc(docRef, {
        memberUids: arrayRemove(uid)
      });
    } else {
      await updateDoc(docRef, {
        memberUids: arrayUnion(uid)
      });
    }
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `userGroups/${groupId}`);
    return false;
  }
}

export function subscribeGroupMessages(groupId: string, callback: (messages: GroupMessage[]) => void): Unsubscribe {
  const q = query(
    collection(db, 'groupMessages'),
    where('groupId', '==', groupId),
    limit(75)
  );
  return onSnapshot(q, (snap) => {
    const msgs: GroupMessage[] = [];
    snap.forEach(d => msgs.push({ id: d.id, ...d.data() } as GroupMessage));
    msgs.sort((a, b) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0));
    callback(msgs);
  }, (err) => {
    console.warn("Group messages stream error", err);
  });
}

export async function sendGroupMessage(message: Omit<GroupMessage, 'id' | 'timestamp'>): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'groupMessages'), {
      ...message,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'groupMessages');
    return null;
  }
}

// -------------------------------------------------------------
// DIRECT MESSAGING (DMs)
// -------------------------------------------------------------

export function getDMConversationId(uid1: string, uid2: string): string {
  return [uid1, uid2].sort().join('_');
}

export async function getOrCreateDMConversation(
  currentUser: { uid: string; name: string; username: string; photoURL?: string; role?: string },
  otherUser: { uid: string; name: string; username: string; photoURL?: string; role?: string }
): Promise<string> {
  const convId = getDMConversationId(currentUser.uid, otherUser.uid);
  const convRef = doc(db, 'dmConversations', convId);
  try {
    const snap = await getDoc(convRef);
    if (!snap.exists()) {
      await setDoc(convRef, {
        id: convId,
        participantUids: [currentUser.uid, otherUser.uid],
        participantDetails: {
          [currentUser.uid]: {
            name: currentUser.name,
            username: currentUser.username,
            photoURL: currentUser.photoURL || '',
            role: currentUser.role || 'Member'
          },
          [otherUser.uid]: {
            name: otherUser.name,
            username: otherUser.username,
            photoURL: otherUser.photoURL || '',
            role: otherUser.role || 'Member'
          }
        },
        lastMessage: 'Conversation initiated',
        lastMessageTimestamp: Timestamp.now(),
        lastSenderUid: currentUser.uid
      });
    }
    return convId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `dmConversations/${convId}`);
    return convId;
  }
}

export function subscribeUserDMConversations(uid: string, callback: (conversations: DMConversation[]) => void): Unsubscribe {
  const q = query(
    collection(db, 'dmConversations'),
    where('participantUids', 'array-contains', uid),
    limit(30)
  );
  return onSnapshot(q, (snap) => {
    const convs: DMConversation[] = [];
    snap.forEach(d => convs.push({ id: d.id, ...d.data() } as DMConversation));
    convs.sort((a, b) => (b.lastMessageTimestamp?.seconds || 0) - (a.lastMessageTimestamp?.seconds || 0));
    callback(convs);
  }, (err) => {
    console.warn("DM conversations error", err);
  });
}

export function subscribeDirectMessages(conversationId: string, callback: (messages: DirectMessage[]) => void): Unsubscribe {
  const q = query(
    collection(db, 'directMessages'),
    where('conversationId', '==', conversationId),
    limit(100)
  );
  return onSnapshot(q, (snap) => {
    const msgs: DirectMessage[] = [];
    snap.forEach(d => msgs.push({ id: d.id, ...d.data() } as DirectMessage));
    msgs.sort((a, b) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0));
    callback(msgs);
  }, (err) => {
    console.warn("DMs snapshot error", err);
  });
}

export async function sendDirectMessage(
  conversationId: string, 
  senderUid: string, 
  receiverUid: string, 
  text: string
): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, 'directMessages'), {
      conversationId,
      senderUid,
      receiverUid,
      text,
      read: false,
      timestamp: Timestamp.now()
    });

    // Update conversation snippet
    try {
      const convRef = doc(db, 'dmConversations', conversationId);
      await updateDoc(convRef, {
        lastMessage: text,
        lastMessageTimestamp: Timestamp.now(),
        lastSenderUid: senderUid
      });
    } catch (_) {}

    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'directMessages');
    return null;
  }
}

// -------------------------------------------------------------
// SAVED RESULTS (BOOKMARKS / FAVORITES)
// -------------------------------------------------------------

export async function saveResultBookmark(
  userId: string, 
  product: Product, 
  folder: string = 'General Favorites', 
  notes: string = ''
): Promise<string | null> {
  const path = 'savedResults';
  try {
    const docRef = await addDoc(collection(db, path), {
      userId,
      productId: product.id || `${product.name.toLowerCase().replace(/\s+/g, '_')}`,
      productName: product.name,
      vendor: product.vendor || 'Verified Vendor',
      purity: product.purity || 100,
      certifications: product.certifications || ['USDA Organic'],
      price: product.price || '',
      description: product.description || '',
      folder,
      notes,
      sourceUrl: product.sourceUrl || '',
      imageUrl: product.imageUrl || '',
      savedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return null;
  }
}

export async function getSavedResults(userId: string): Promise<SavedResult[]> {
  const path = 'savedResults';
  try {
    const q = query(
      collection(db, path),
      where('userId', '==', userId),
      limit(100)
    );
    const snap = await getDocs(q);
    const results: SavedResult[] = [];
    snap.forEach(d => results.push({ id: d.id, ...d.data() } as SavedResult));
    results.sort((a, b) => (b.savedAt?.seconds || 0) - (a.savedAt?.seconds || 0));
    return results;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function deleteSavedResult(savedId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'savedResults', savedId));
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `savedResults/${savedId}`);
    return false;
  }
}

export async function updateSavedResultNotes(savedId: string, notes: string, folder: string): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'savedResults', savedId), { notes, folder });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `savedResults/${savedId}`);
    return false;
  }
}

// -------------------------------------------------------------
// SEARCH HISTORY (MEMORY)
// -------------------------------------------------------------

export const saveSearchToMemory = async (userId: string, searchQuery: string, resultsCount: number, category: string = 'General') => {
  const path = 'searchHistory';
  try {
    await addDoc(collection(db, path), {
      userId,
      query: searchQuery,
      timestamp: Timestamp.now(),
      resultsCount,
      category
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const getSearchMemory = async (userId: string): Promise<SavedSearchItem[]> => {
  const path = 'searchHistory';
  try {
    const q = query(
      collection(db, path),
      where('userId', '==', userId),
      limit(30)
    );
    const querySnapshot = await getDocs(q);
    const items: SavedSearchItem[] = [];
    querySnapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() } as SavedSearchItem));
    items.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};

export const deleteSearchMemoryItem = async (itemId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'searchHistory', itemId));
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `searchHistory/${itemId}`);
    return false;
  }
};

// -------------------------------------------------------------
// USER PRIVATE SETTINGS (ALLERGIES & VEGAN PREFERENCES)
// -------------------------------------------------------------

export const DEFAULT_USER_PRIVATE_SETTINGS: UserPrivateSettings = {
  userId: '',
  isVegan: false,
  suggestVeganAlternatives: true,
  allergies: [],
  customAllergens: [],
  avoidIngredients: [],
  dietaryNotes: '',
  autoFilterNonVegan: false,
  notifyAllergenBreaches: true
};

const LOCAL_STORAGE_SETTINGS_KEY = 'searchfororganics_private_settings_v1';

export function getLocalPrivateSettings(): UserPrivateSettings {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_USER_PRIVATE_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (_) {}
  return DEFAULT_USER_PRIVATE_SETTINGS;
}

export function saveLocalPrivateSettings(settings: Partial<UserPrivateSettings>) {
  try {
    const current = getLocalPrivateSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (_) {
    return DEFAULT_USER_PRIVATE_SETTINGS;
  }
}

export async function getUserPrivateSettings(userId: string): Promise<UserPrivateSettings> {
  const local = getLocalPrivateSettings();
  if (!userId) return local;

  const docRef = doc(db, 'userPrivateSettings', userId);
  try {
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as UserPrivateSettings;
      const merged = { ...DEFAULT_USER_PRIVATE_SETTINGS, ...data, userId };
      saveLocalPrivateSettings(merged);
      return merged;
    } else {
      // Initialize with local settings or default
      const initial: UserPrivateSettings = {
        ...local,
        userId,
        updatedAt: Timestamp.now()
      };
      await setDoc(docRef, initial);
      return initial;
    }
  } catch (error) {
    console.warn("Could not fetch remote private settings, using local fallback", error);
    return { ...local, userId };
  }
}

export async function saveUserPrivateSettings(userId: string, settings: Partial<UserPrivateSettings>): Promise<boolean> {
  saveLocalPrivateSettings(settings);
  if (!userId) return true;

  const docRef = doc(db, 'userPrivateSettings', userId);
  try {
    await setDoc(docRef, {
      ...settings,
      userId,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `userPrivateSettings/${userId}`);
    return false;
  }
}

// Test Connection
export async function testFirebaseConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase client notice: offline or initializing.");
    }
  }
}
