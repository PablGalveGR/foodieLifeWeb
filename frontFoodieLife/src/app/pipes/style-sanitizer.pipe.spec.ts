import { StyleSanitizerPipe } from './style-sanitizer.pipe';

describe('StyleSanitizerPipe', () => {
  it('create an instance', () => {
    const pipe = new StyleSanitizerPipe();
    expect(pipe).toBeTruthy();
  });
});
