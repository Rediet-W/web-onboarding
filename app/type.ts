
export interface JobPost {
    id: string;
    title: string;
    description: string;
    responsibilities: string;
    idealCandidate: string;
    whenAndWhere: string;
    createdAt: string, 
    deadline: string,
    location: string[]
    startDate: string,
    endDate: string,
    categories: string[],
    requiredSkills: string[],
    orgName: string, 
    logoUrl: string,
    opType: string,
    datePosted: string,
  }
  
  export interface JobPosting {
    success: boolean;
    message: string;
    data: JobPost[];
    errors: string[];
    count: number;
  }
  
  export interface JobPostById {
    success: boolean;
    message: string;
    data: JobPost;
    errors: string[];
    count: number;
  }