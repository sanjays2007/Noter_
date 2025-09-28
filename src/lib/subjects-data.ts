'use server';

import type { Subject, File } from './subjects-db';
import { readSubjectsData, writeSubjectsData } from './subjects-db';
import fs from 'fs';
import path from 'path';


export const getSubjects = async (): Promise<Subject[]> => {
  const data = readSubjectsData();
  return data.subjects;
};

export const getSubjectBySlug = async (slug: string): Promise<Subject | undefined> => {
  const data = readSubjectsData();
  return data.subjects.find((s) => s.slug === slug);
};

export const addSubject = async (name: string): Promise<Subject> => {
    const data = readSubjectsData();
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const newSubject: Subject = {
        id: `${slug}-${Date.now()}`,
        name,
        slug,
        files: [],
    };
    data.subjects.push(newSubject);
    writeSubjectsData(data);
    return newSubject;
}

export const addFileToSubject = async (
  subjectSlug: string,
  fileName: string,
  fileContent: string
): Promise<Subject | null> => {
  const data = readSubjectsData();
  const subject = data.subjects.find(s => s.slug === subjectSlug);
  if (!subject) {
    return null;
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', subjectSlug);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  const fileId = `f-${Date.now()}`;
  const filePath = path.join(uploadsDir, fileName);
  
  const base64Data = fileContent.split(',')[1];
  if (!base64Data) {
      console.error("Invalid file content format");
      return null;
  }

  try {
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);
  } catch (error) {
    console.error("Failed to write file:", error);
    return null;
  }


  const newFile: File = {
    id: fileId,
    name: fileName,
    nickname: fileName,
    path: `/uploads/${subjectSlug}/${fileName}`
  };

  subject.files.push(newFile);
  writeSubjectsData(data);
  return subject;
};

export const updateFileNickname = async (
  subjectSlug: string,
  fileId: string,
  nickname: string
): Promise<Subject | null> => {
    const data = readSubjectsData();
    const subject = data.subjects.find((s) => s.slug === subjectSlug);
    if (!subject) return null;

    const file = subject.files.find((f) => f.id === fileId);
    if (!file) return null;

    file.nickname = nickname;
    writeSubjectsData(data);
    return subject;
};


export const deleteFileFromSubject = async (
    subjectSlug: string,
    fileId: string
  ): Promise<Subject | null> => {
    const data = readSubjectsData();
    const subject = data.subjects.find((s) => s.slug === subjectSlug);
    if (!subject) return null;
    
    const fileToDelete = subject.files.find(f => f.id === fileId);
    if (fileToDelete && fileToDelete.path) {
      const filePath = path.join(process.cwd(), 'public', fileToDelete.path);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.error('Failed to delete file from disk:', error);
        }
      }
    }
  
    subject.files = subject.files.filter(f => f.id !== fileId);
    writeSubjectsData(data);
    return subject;
  }