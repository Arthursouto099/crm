export type Project = {
  title: string;
  description: string;
  background_url: string | null;
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT' ;
  color: string | null;
  isPublic: boolean;
  id_project: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};
