import { Enrollment } from './enrollment.model';

export class Student {
	id: string;
	name: string;
	photo_url: string;
	state: string;
	address: string;
	email: string[];
	phone_number: string[];
	birth_date: string;
  code: string;
  enrollments: Enrollment[];
}
