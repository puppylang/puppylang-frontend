import { Gender } from './pet';

export interface ResumeFormType {
  image: string;
  birth_year: string;
  introduction: string;
  phone_number: string;
  name: string | null;
  has_puppy: boolean | null;
  gender: Gender | null;
  has_walk_record: boolean | null;
}

export interface Resume {
  id: number;
  name: string;
  phone_number: string;
  birth_year: string;
  introduction: string;
  gender: Gender;
  created_at: Date;
  is_checked: boolean;
  is_selected: boolean;
  has_walk_record: boolean;
  has_puppy?: boolean;
  image?: string;
  post_id: number;
  user_id: string;
}

export interface CreateResumeType extends ResumeFormType {
  user_id: string;
  post_id: number;
}
