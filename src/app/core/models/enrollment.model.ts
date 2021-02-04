import { Curriculum } from './curriculum.model';

export class Enrollment {
	id: string;
  level: number;
  curriculum: Curriculum;
  courses: any;
}
