export interface UserProfile {
  uid: string;
  username: string; // @handle chosen by user
  displayName: string;
  email: string;
  photoURL?: string;
  bannerURL?: string;
  bio?: string;
  role?: string; // "Organic Consumer", "Certified Farmer", "Chemist / Scientist", "Brand Founder", "Co-op Organizer"
  location?: string;
  dietaryFocus?: string[]; // e.g. ["Demeter Biodynamic", "Zero-Pesticide", "Regenerative"]
  companyId?: string;
  website?: string;
  badges?: string[]; // e.g. ["Verified Grower", "Soil Steward", "Spectroscopy Pioneer", "Demeter Advocate", "Co-Op Founder", "Top Contributor"]
  reputationScore?: number;
  memberSince?: string;
  specialties?: string[]; // e.g. ["Living Soil", "Heirloom Grain", "No-Till", "Solventless Extraction"]
  organicCertificationsHeld?: string[]; // e.g. ["USDA Organic", "Demeter Biodynamic", "ROC Gold"]
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    farmWebsite?: string;
  };
  followersCount?: number;
  followingCount?: number;
  topicsCount?: number;
  repliesCount?: number;
  savedCount?: number;
  verifiedStatus?: 'verified-grower' | 'verified-scientist' | 'verified-founder' | 'community-member';
  createdAt: any;
  updatedAt: any;
}

export interface CompanyProfile {
  id: string;
  ownerUid: string;
  name: string;
  handle: string;
  category: 'Farm' | 'Brand' | 'Lab' | 'Certifier' | 'Co-op' | 'Retailer' | 'Distributor';
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  website?: string;
  location?: string;
  contactEmail?: string;
  phone?: string;
  foundedYear?: number;
  certifications?: string[];
  verifiedStatus?: 'bob-verified' | 'certified' | 'pending' | 'community-listed';
  soilPractices?: string;
  acreage?: string;
  productHighlights?: string[];
  createdAt: any;
  updatedAt: any;
}

export interface ForumTopic {
  id: string;
  category: string; // e.g., 'farming-soil', 'molecular-purity', 'certifications', 'greenwash-alerts', 'business-exchange'
  title: string;
  content: string;
  tags?: string[];
  authorUid: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  authorRole?: string;
  upvotesCount: number;
  upvotedBy: string[]; // uids
  repliesCount: number;
  pinned?: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface ForumReply {
  id: string;
  topicId: string;
  content: string;
  authorUid: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  authorRole?: string;
  upvotesCount: number;
  upvotedBy: string[];
  createdAt: any;
}

export interface UserGroup {
  id: string;
  name: string;
  handle: string;
  description: string;
  category: string;
  coverUrl?: string;
  icon?: string;
  isPrivate?: boolean;
  createdByUid: string;
  memberUids: string[];
  membersCount: number;
  rules?: string[];
  createdAt: any;
  updatedAt: any;
}

export interface GroupMessage {
  id: string;
  groupId: string;
  senderUid: string;
  senderName: string;
  senderUsername: string;
  senderAvatar?: string;
  senderRole?: string;
  text: string;
  timestamp: any;
}

export interface DirectMessage {
  id: string;
  conversationId: string;
  senderUid: string;
  receiverUid: string;
  text: string;
  timestamp: any;
  read: boolean;
}

export interface DMConversation {
  id: string;
  participantUids: string[];
  participantDetails?: Record<string, {
    name: string;
    username: string;
    photoURL?: string;
    role?: string;
  }>;
  lastMessage?: string;
  lastMessageTimestamp?: any;
  lastSenderUid?: string;
  unreadCount?: number;
}

export interface SavedResult {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  vendor: string;
  purity: number;
  certifications?: string[];
  price?: string;
  description?: string;
  folder?: string;
  notes?: string;
  sourceUrl?: string;
  imageUrl?: string;
  savedAt: any;
}

export interface SavedSearchItem {
  id: string;
  userId: string;
  query: string;
  timestamp: any;
  resultsCount: number;
  category?: string;
}

export interface UserPrivateSettings {
  userId: string;
  isVegan: boolean; // Vegan Preference enabled
  suggestVeganAlternatives: boolean; // Suggest 3 vegan alternatives on non-vegan items/searches
  allergies: string[]; // e.g. ["Dairy", "Gluten / Wheat", "Peanuts", "Tree Nuts", "Soy", "Eggs", "Shellfish", "Fish", "Sesame", "Sulfites", "Nightshades", "Corn"]
  customAllergens?: string[];
  avoidIngredients?: string[]; // e.g. ["Palm Oil", "Synthetic Fragrance", "Carrageenan", "Titanium Dioxide"]
  dietaryNotes?: string;
  autoFilterNonVegan?: boolean;
  notifyAllergenBreaches?: boolean;
  updatedAt?: any;
}
