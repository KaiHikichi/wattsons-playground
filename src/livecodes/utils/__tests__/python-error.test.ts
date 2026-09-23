import { parsePythonError } from '../python-error';

describe('parsePythonError', () => {
  test('Brython AttributeError trace', () => {
    const text = [
      'Traceback (most recent call last):',
      '  File "https://testing.example/main.py#__main__", line 3, in <module>',
      '    t.jump(100)',
      "AttributeError: 'Turtle' object has no attribute 'jump'",
    ].join('\n');

    expect(parsePythonError(text)).toEqual({
      line: 3,
      message: "AttributeError: 'Turtle' object has no attribute 'jump'",
    });
  });

  test('Brython SyntaxError trace', () => {
    const text = [
      '  File "https://testing.example/main.py#__main__", line 2',
      '    def foo(',
      '            ^',
      'SyntaxError: unexpected EOF while parsing',
    ].join('\n');

    expect(parsePythonError(text)).toEqual({
      line: 2,
      message: 'SyntaxError: unexpected EOF while parsing',
    });
  });

  test('Pyodide trace', () => {
    const text = [
      'PythonError: Traceback (most recent call last):',
      '  File "<exec>", line 3, in <module>',
      "AttributeError: 'Turtle' object has no attribute 'jump'",
    ].join('\n');

    expect(parsePythonError(text)).toEqual({
      line: 3,
      message: "AttributeError: 'Turtle' object has no attribute 'jump'",
    });
  });

  test('trace whose last frame is inside a library file returns the user frame', () => {
    const text = [
      'Traceback (most recent call last):',
      '  File "https://testing.example/main.py#__main__", line 5, in <module>',
      '    t.circle(50)',
      '  File "https://cdn.jsdelivr.net/npm/turtle.js", line 120, in circle',
      '    raise ValueError("radius must be positive")',
      'ValueError: radius must be positive',
    ].join('\n');

    expect(parsePythonError(text)).toEqual({
      line: 5,
      message: 'ValueError: radius must be positive',
    });
  });

  test('non-traceback text returns null', () => {
    expect(parsePythonError('hello world')).toBeNull();
    expect(parsePythonError('')).toBeNull();
  });
});
