import { Injectable } from '@nestjs/common';
import { DatabaseService } from './db/database.service';
import { IAcademyModel } from '@zlatiz/idance-types';
import { CollectionNamesEnum } from './db/data/collection-names.enum';
import { DatabaseNamesEnum } from './db/data/database-names.enum';

@Injectable()
export class AcademiesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createAcademy(academy: IAcademyModel) {
    const slug = generateSlug(academy.name);
    const academyWithSlug = { ...academy, slug };
    
    const collection = await this.databaseService.getCollection(
      DatabaseNamesEnum.ACADEMIES,
      CollectionNamesEnum.ACADEMIES
    );
    
    await collection.insertOne(academyWithSlug);
  }
}

function generateSlug(name: string): string {
  // Cyrillic to Latin transliteration map
  const cyrillicToLatin: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z', 'и': 'i',
    'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l',
    'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
    'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
    'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '',
    'ю': 'yu', 'я': 'ya', 'ъ': '', 'ы': 'y', 'э': 'e',
    'ё': 'yo', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G',
    'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh', 'З': 'Z',
    'И': 'I', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K',
    'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
    'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F',
    'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
    'Ь': '', 'Ю': 'Yu', 'Я': 'Ya', 'Ъ': '', 'Ы': 'Y',
    'Э': 'E', 'Ё': 'Yo'
  };

  // Transliterate Cyrillic characters to Latin
  const transliterated = name
    .split('')
    .map(char => cyrillicToLatin[char] || char)
    .join('');

  // Convert to lowercase, replace spaces and special characters with hyphens
  return transliterated
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}
