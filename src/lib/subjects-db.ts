import fs from 'fs';
import path from 'path';

export type File = {
  id: string;
  name: string;
  nickname: string;
  path?: string;
};

export type Subject = {
  id: string;
  name: string;
  slug: string;
  files: File[];
};

export type SubjectsData = {
    subjects: Subject[];
}

const dbPath = path.join(process.cwd(), 'src', 'lib', 'subjects.json');

const initialData: SubjectsData = {
    subjects: [
      {
        id: '1',
        name: 'Quantum Physics',
        slug: 'quantum-physics',
        files: [
          { id: 'f1', name: 'Lecture 1.pdf', nickname: 'Intro to QM', path: '#' },
          { id: 'f2', name: 'Wave-particle-duality.pptx', nickname: 'Wave Duality Slides', path: '#' },
        ],
      },
      {
        id: '2',
        name: 'Organic Chemistry',
        slug: 'organic-chemistry',
        files: [
          { id: 'f3', name: 'Nomenclature.docx', nickname: 'Naming Conventions', path: '#' },
        ],
      },
      {
        id: '3',
        name: 'History of Art',
        slug: 'history-of-art',
        files: [],
      },
    ],
  };

const initializeDb = () => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
    }
}

initializeDb();

export const readSubjectsData = (): SubjectsData => {
    try {
        const jsonData = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("Could not read subjects.json, returning initial data", error);
        return JSON.parse(JSON.stringify(initialData));
    }
};

export const writeSubjectsData = (data: SubjectsData) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Could not write to subjects.json", error);
    }
}
