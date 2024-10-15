export type ActiveMenuContent = "login" | "signup" | "menu";
export type Category = {
  id: number;
  name: string;
  slug: "startup-studio" | "tose-fardi" | "ravanshnasi" | "ahkam" | "eteqadi";
  description: string | null;
  parent_id: number | null;
  picture: string;
  color: string;
};

export type Teacher = {
  id: number;
  fullname: string;
  picture?: string;
  about_me?: string;
};

export type Tag = {
  id: number;
  tag_name: string;
  tag_slug: string;
};
export type CourseListItem = {
  id: number;
  course_user_id: number;
  course_title: string;
  description: null;
  course_visibility: 0;
  code: null;
  type: Model;
  access: 0;
  course_teacher: string;
  course_status: 0;
  navigation: 0;
  picture: string;
  fullname: string;
  visits_score: number | null;
  lessons_count: number;
  bookmark: boolean;
  like: boolean;
  like_count: number;
  categories: Category[];
  lessons: [];
};

export type LessenItem = {
  id: number;
  course_id: number;
  user_id: number;
  title: string;
  picture: null;
  teacher: string;
  description: string;
  bookmark: false;
  like: false;
  like_count: 16;
  free: number;
  url_video: string;
  url_ads: "null";
  status: 0;
  visibility: 0;
  code: null;
  formats: string;
  created_at: string;
  updated_at: "2024-05-13T01:28:49.000000Z";
  showDate: null;
  views: number;
  courses: CourseItem;
  categories: Category[];
  progress: {
    percentage: string;
    time: number;
    duration: number;
  }[];
  pivot: {
    lesson_id: number;
    related_lesson_id: number;
    name: string;
  };
};

export type LessonItemBookmark = {
  courses: CourseItem;
} & LessenItem;

export type CourseItem = {
  tagged: Tag[];
  related_articles: any[];
  related_lessons: LessenItem[];
  intro: string | null;
  courseProgress: number;
  products ?: ProductListItem
} & CourseListItem;

export type BlogListItem = {
  id: number;
  user_id: number;
  title: string;
  picture: string;
  status: number;
  fullname: string;
  description: string | undefined;
  visits_score: number | null;
  bookmark: boolean;
  like: boolean;
  like_count: number;
  created_at: string;
  updated_at: string;
  categories: Category[];
  related_articles: any[];
  related_lessons: any[];
};

export type BlogItem = {
  description: string;
  tagged: Tag[];
  related_articles: any[];
  related_lessons: any[];
} & BlogListItem;

export type PodcastListItem = {
  id: number;
  course_id: number;
  user_id: number;
  title: string;
  picture: null;
  teacher: string;
  description: string | null;
  url_video: string;
  status: number;
  visibility: number;
  code: number | null;
  formats: string;
  created_at: string;
  updated_at: string;
  showDate: null;
  views: number;
  fullname: string;
  visits_score: 19;
  bookmark: false;
  like: boolean;
  like_count: number;
  courses: CourseItem;
  categories: Category[];
  progress: any[];
  related_lessons: any[];
  related_articles: any[];
};

export type User = {
  id: number;
  authority: string | null;
  mahdyar: MahdyarExists | null;
  phone: string;
  fullname: string;
  username: string;
  code: string;
  role: number;
  approved: number;
  picture: string | null;
  gender: 1 | 0;
  status_users: number;
  wallet_balance: string;
  about_me: string | null;
  address: string | null;
  birthday: string | null;
  national_code: string | null;
};

export enum CommentStatus {
  accept = 1,
  reject = 0,
}
export type CommentItem = {
  id: number;
  user_id: number;
  parent_id: number | null;
  timeAgo: string;
  body: string;
  commentable_type: string;
  commentable_id: number;
  created_at: string;
  updated_at: string;
  status: CommentStatus;
  user: User;
  replies: CommentItem[];
};

export type AdminCommentItem = {
  commentable: BlogListItem | CourseListItem | ProductListItem | LessenItem;
} & CommentItem;

export type ProductListItem = {
  id: number;
  type: string;
  price: number;
  price_discount: number | null;
  duration: string;
  tiny_desc: string | null;
  course_id: number;
  created_at: string;
  updated_at: string;
  vouchers: any;
  bookmark: boolean;
  invoices_exists: boolean;
  paid: boolean;
  like: boolean;
  like_count: number;
  sell_count?: number;
  courses: CourseItem;
  categories: Category[];
};

export type CartItem = {
  id: number;
  user_id: number;
  product_id: number;
  name: string;
  price: number;
  attr: string;
  product: ProductListItem;
};

export type Deposit = {
  id: 235;
  user_id: number;
  amount: number;
  type: string;
  created_at: string;
};

export type NewsItem = {
  title: string;
  body: string;
  picture: string;
  updated_at: string;
  model_id: number;
  model_type: string;
  id: number;
};

export type Library = {
  id: number;
  title: string;
  picture: string;
  created_at: string;
  updated_at: string;
};

export type GalleryItem = {
  id: number;
  name: string;
  picture: string;
  created_at: string;
  updated_at: string;
  libraries: Library[];
};

export type TicketDepartmanList = {
  name: string;
  id: number;
  questions: DepartmanQuestion[];
};

export type DepartmanQuestion = {
  id: 3;
  departments_id: number;
  question: string;
  answer: string;
};
export type TicketAnswer = {
  id: number;
  text: string;
  file: any;
  user_id: number;
  ticket_id: number;
  who_answered: string;
  created_at: string;
  updated_at: string;
  user: User;
};

export type Ticket = {
  id: number;
  title: string;
  text: string;
  file: any;
  status: string;
  user_id: number;
  user_dep: number;
  department_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  ticket_answer: TicketAnswer[];
  user_department: TicketDepartmanList;
};

export type Order = {
  id: number;
  user_id: number;
  order_id: number;
  amount: number;
  card_pan: string;
  created_at: string;
  ref_id: string;
  products: ProductListItem[];
};

type SearchModel<T> = {
  model: string;
} & T;
export type SearchData = {
  course: SearchModel<CourseListItem>[];
  article: SearchModel<BlogListItem>[];
  product: SearchModel<ProductListItem>[];
  lesson: SearchModel<LessenItem & { courses: CourseListItem }>[];
  podcast: SearchModel<PodcastListItem>[];
};

export type ShowCase = {
  id: number;
  picture: string;
  model_id: number;
  model_type: string;
  created_at: string;
  updated_at: string;
  ends_at: string;
  course: CourseListItem | null;
  product: ProductListItem | null;
  lesson: LessenItem | null;
  article: BlogListItem | null;
};

export type Quiz = {
  id: number;
  course_id: number;
  name: number;
  duration: number;
  created_at: string;
  updated_at: string;
  questions: QuizQuestion[];
};

export type QuizQuestion = {
  id: number;
  quiz_id: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correct_answer: number;
  score: number;
  created_at: string;
  updated_at: string;
};
export type Model =
  | "article"
  | "course"
  | "product"
  | "sedavasima"
  | "tv"
  | "lesson"
  | "podcast"
  | "kolbe"
  | "mahdyar"
  | "media"
  | "podcast"
  | "club";

export type PaymentMethodType = "wallet" | "zarinpal";

export type KeyValue<T = any> = { [key: string]: T };

export type Season = "old" | "new" | null | "unknown";


export type SiteStatistics = {
  course_count: number;
  lessons_count: number;
  course_users_count: number;
  mahdyar_club_count: number;
}

export enum PlanType {
  NORMAL = "normal",
  GOLD = "gold",
  VIP = "vip",
}  


export type State = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  province_id: number;
  name: string;
};


export type ClubPlanItem = {
  label: string;
  image : string;
  price: number;
  discount: number;
  spic_label?: string;
  channel: string;
  type: PlanType;
  facilities: {
    label: string;
    status: number;
  }[];
};


export type MahdyarExists = {
  id: number,
    user_id: number,
    fullname: string,
    gender: 1 | 0,
    national_code: string,
    birthday: string,
    parent_num: string,
    amount: number,
    authority: string,
    club_type: PlanType,
    register_club_from: string,
    employee_num: null,
    relation: null,
    messenger_num: null,
    address: string,
    postal: string,
    city: string,
    state: string,
    status: 1 | 0,
}