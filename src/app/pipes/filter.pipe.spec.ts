import { TestBed } from '@angular/core/testing';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FilterPipe] });
    pipe = TestBed.inject(FilterPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = {
      'key1': 'key1', 'key2': 'key2', 'key3': 'key3', 'key4': 'key4'
    };
    expect(pipe.transform([{ ...value }], 'key1', 'key1', 'key2', 'key3', 'key4')).toEqual([{ ...value }]);
    pipe.transform([], 'key1', 'key1', 'key2', 'key3', 'key4');
    pipe.transform([{ ...value }], '', 'key1', 'key2', 'key3', 'key4');
  });
});
