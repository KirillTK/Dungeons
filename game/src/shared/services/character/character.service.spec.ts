import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import {Path} from "../../model/Path";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CharacterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ BrowserAnimationsModule ]
  }));

  it('should be created', () => {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(service).toBeTruthy();
  });

  it('should return name', function () {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(typeof service.getRandomName()).toBe('string');
  });

  it('should return random path character', function () {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(typeof service.getRandomCharacter(Path.ENEMY_PATH)).toBe('string');
  });
});
