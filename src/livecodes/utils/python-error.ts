// Wattson (#129): parse a Python traceback into the failing line + message,
// so the editor can underline the line the student needs to fix.
// Brython ('python'):      File "https://…/script.py#__main__", line N, in <module>
// Pyodide ('python-wasm'): File "<exec>", line N, in <module>
export interface PythonError {
  line: number;
  message: string;
}

const USER_FRAME = /^[ \t]*File "(?:<exec>|[^"]*#__main__)", line (\d+)/gm;

export const parsePythonError = (text: string): PythonError | null => {
  if (!text) return null;

  let lastFrame: RegExpExecArray | null = null;
  let match: RegExpExecArray | null;
  const frameRegex = new RegExp(USER_FRAME);
  while ((match = frameRegex.exec(text))) {
    lastFrame = match;
  }
  if (!lastFrame) return null;

  const nonEmptyLines = text.split('\n').filter((line) => line.trim() !== '');
  const message = nonEmptyLines[nonEmptyLines.length - 1]?.trim() ?? '';

  return { line: Number(lastFrame[1]), message };
};
