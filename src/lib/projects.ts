import { getCollection, type CollectionEntry } from 'astro:content';
import { sortProjects, assertFeatured } from './project-order';

export type Project = CollectionEntry<'projects'>;

export async function allProjects(): Promise<Project[]> {
  const projects = sortProjects(await getCollection('projects'));
  assertFeatured(projects);
  return projects;
}
