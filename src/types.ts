
// TYPE (labels) allowed values our backend sends

  // types
export type PostStatus = 'idea' | 'draft' | 'writing' | 'editing' | 'filming' | 'scheduled' | 'posted' ;

// platform type
export type Platform = 'Instagram' | 'TikTok' | 'YouTube' | 'LinkedIn' | 'Threads' | 'X' | 'Facebook';

// ContentType type
export type ContentType = | 'Reel' | 'Carousel' | 'Story' | 'Long-form video' | 'Text post' | 'Thread' ;


// turn the list above into arrays so we can loop through them to build our drop down menus
export const POST_STATUSES: PostStatus[] = [
  'idea', 'draft', 'writing', 'editing', 'filming', 'scheduled', 'posted',
];

export const PLATFORMS: Platform[] = [
  'Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Threads', 'X', 'Facebook',
];

export const CONTENT_TYPES: ContentType[] = [
  'Reel', 'Carousel', 'Story', 'Long-form video', 'Text post', 'Thread',
];

// INTERFACE - objects shapes 
  // user
export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

  // 
export interface AuthResponse {
  token: string;
  user: User;
}

// stats object uitls/challengeStats.js
export interface ChallengeStats {
  totalPostGoal: number;
  postedCount: number;
  progressPercent: number;
  statusCounts: Record<PostStatus, number>;
  currentStreak: number;
  bestStreak: number;
  daysCompleted: number;
  todayDayNumber: number;
  challengeStatus: 'upcoming' | 'active' | 'completed';
  
}

// challenge
export interface Challenge {
  _id: string;
  challengeName: string;
  description: string;
  startDate: string;
  lengthInDays: number;
  postPerDay: number;
  owner: string;
  collaborators: string[];
  endDate: string;
  totalPostGoal: number;
  createdAt: string;
  updatedAt: string;
  stats?: ChallengeStats;
}

// post 
export interface Post {
  _id: string;
  challenge: string;
  createdBy: string;
  dayNumber: number;
  scheduledDate: string;
  postTime: string;
  title: string;
  caption: string;
  platform: Platform;
  contentType: ContentType;
  status: PostStatus;
  link: string;
  mediaUrls: string[];
  postedAt: string | null;
  createdAt: string;
  updatedAt: string;

}

//  labels for status
export const STATUS_LABELS: Record<PostStatus, string> = {
  idea: 'Idea',
  draft: 'Draft',
  writing: 'Writing',
  filming: 'Filming',
  editing: 'Editing', 
  scheduled: 'Scheduled',
  posted: 'Posted',
};

// NewChallenges type data to create orupdate a challenge
export interface NewChallengeData {
  challengeName: string;
  description: string;
  startDate: string;
  lengthInDays: number;
  postPerDay: number;
}

// data SEND to create or update post
export interface PostFields{
  dayNumber: number;
  postTime: string;
  title: string;
  caption: string;
  platform: string;
  contentType: string;
  status: PostStatus;
  link: string;

}