import type * as Monaco from 'monaco-editor';

let registered = false;

type CompletionKind = 'Method' | 'Class' | 'Function';

interface TurtleCompletion {
  name: string;
  detail: string;
  documentation: string;
  kind: CompletionKind;
}

const turtleCompletions: TurtleCompletion[] = [
  {
    name: 'forward',
    detail: 'forward(distance)',
    documentation: 'Moves the turtle forward by the given distance, in the direction it is facing.',
    kind: 'Method',
  },
  {
    name: 'backward',
    detail: 'backward(distance)',
    documentation:
      'Moves the turtle backward by the given distance, without changing its direction.',
    kind: 'Method',
  },
  {
    name: 'right',
    detail: 'right(angle)',
    documentation: 'Turns the turtle clockwise by the given angle, in degrees.',
    kind: 'Method',
  },
  {
    name: 'left',
    detail: 'left(angle)',
    documentation: 'Turns the turtle counter-clockwise by the given angle, in degrees.',
    kind: 'Method',
  },
  {
    name: 'goto',
    detail: 'goto(x, y)',
    documentation:
      'Moves the turtle to the given x, y position, drawing a line if the pen is down.',
    kind: 'Method',
  },
  {
    name: 'setx',
    detail: 'setx(x)',
    documentation: "Sets the turtle's x coordinate, keeping the y coordinate unchanged.",
    kind: 'Method',
  },
  {
    name: 'sety',
    detail: 'sety(y)',
    documentation: "Sets the turtle's y coordinate, keeping the x coordinate unchanged.",
    kind: 'Method',
  },
  {
    name: 'setheading',
    detail: 'setheading(angle)',
    documentation: 'Sets the direction the turtle is facing, in degrees, where 0 is east.',
    kind: 'Method',
  },
  {
    name: 'xcor',
    detail: 'xcor()',
    documentation: "Returns the turtle's current x coordinate.",
    kind: 'Method',
  },
  {
    name: 'ycor',
    detail: 'ycor()',
    documentation: "Returns the turtle's current y coordinate.",
    kind: 'Method',
  },
  {
    name: 'distance',
    detail: 'distance(x, y)',
    documentation: 'Returns the distance from the turtle to the given position.',
    kind: 'Method',
  },
  {
    name: 'penup',
    detail: 'penup()',
    documentation: 'Lifts the pen up so moving the turtle no longer draws a line.',
    kind: 'Method',
  },
  {
    name: 'pendown',
    detail: 'pendown()',
    documentation: 'Puts the pen down so moving the turtle draws a line.',
    kind: 'Method',
  },
  {
    name: 'width',
    detail: 'width(pixels)',
    documentation: 'Sets the thickness of the line the turtle draws, in pixels.',
    kind: 'Method',
  },
  {
    name: 'color',
    detail: 'color(pencolor, fillcolor)',
    documentation: 'Sets both the pen color and the fill color of the turtle.',
    kind: 'Method',
  },
  {
    name: 'pencolor',
    detail: 'pencolor(color)',
    documentation: 'Sets the color used to draw lines.',
    kind: 'Method',
  },
  {
    name: 'fillcolor',
    detail: 'fillcolor(color)',
    documentation: 'Sets the color used to fill shapes.',
    kind: 'Method',
  },
  {
    name: 'begin_fill',
    detail: 'begin_fill()',
    documentation: 'Starts remembering the shape the turtle draws so it can be filled in.',
    kind: 'Method',
  },
  {
    name: 'end_fill',
    detail: 'end_fill()',
    documentation: 'Fills in the shape drawn since begin_fill was called.',
    kind: 'Method',
  },
  {
    name: 'circle',
    detail: 'circle(radius)',
    documentation: 'Draws a circle with the given radius, centered to the left of the turtle.',
    kind: 'Method',
  },
  {
    name: 'write',
    detail: 'write(text)',
    documentation: 'Writes the given text on the screen at the current turtle position.',
    kind: 'Method',
  },
  {
    name: 'speed',
    detail: 'speed(value)',
    documentation: "Sets the turtle's drawing speed, from 1 (slowest) to 10 (fastest).",
    kind: 'Method',
  },
  {
    name: 'shape',
    detail: 'shape(name)',
    documentation: "Sets the turtle's shape, such as 'turtle', 'arrow', or 'circle'.",
    kind: 'Method',
  },
  {
    name: 'shapesize',
    detail: 'shapesize(stretch_wid, stretch_len)',
    documentation: "Stretches the turtle's shape to change how big it looks.",
    kind: 'Method',
  },
  {
    name: 'hideturtle',
    detail: 'hideturtle()',
    documentation: 'Hides the turtle icon without erasing anything it already drew.',
    kind: 'Method',
  },
  {
    name: 'showturtle',
    detail: 'showturtle()',
    documentation: 'Makes the turtle icon visible again.',
    kind: 'Method',
  },
  {
    name: 'isvisible',
    detail: 'isvisible()',
    documentation: 'Returns True if the turtle icon is currently shown.',
    kind: 'Method',
  },
  {
    name: 'clear',
    detail: 'clear()',
    documentation: "Erases the turtle's drawings without moving the turtle or changing its state.",
    kind: 'Method',
  },
  {
    name: 'clone',
    detail: 'clone()',
    documentation: 'Creates and returns a copy of the turtle, at the same position and state.',
    kind: 'Method',
  },
  {
    name: 'Screen',
    detail: 'Screen()',
    documentation: 'Creates the drawing window that the turtle moves around in.',
    kind: 'Class',
  },
  {
    name: 'Turtle',
    detail: 'Turtle()',
    documentation: 'Creates a new turtle that can move and draw on the screen.',
    kind: 'Class',
  },
  {
    name: 'done',
    detail: 'done()',
    documentation: 'Keeps the drawing window open after the program finishes running.',
    kind: 'Function',
  },
  {
    name: 'mainloop',
    detail: 'mainloop()',
    documentation: 'Keeps the drawing window open and listening for events, such as key presses.',
    kind: 'Function',
  },
  {
    name: 'setup',
    detail: 'setup(width, height)',
    documentation: 'Sets the size and position of the drawing window.',
    kind: 'Method',
  },
  {
    name: 'title',
    detail: 'title(titlestring)',
    documentation: 'Sets the text shown in the title bar of the drawing window.',
    kind: 'Method',
  },
  {
    name: 'bgcolor',
    detail: 'bgcolor(color)',
    documentation: 'Sets the background color of the drawing window.',
    kind: 'Method',
  },
  {
    name: 'tracer',
    detail: 'tracer(n, delay)',
    documentation: 'Controls how often the screen redraws, which can speed up animations.',
    kind: 'Method',
  },
  {
    name: 'update',
    detail: 'update()',
    documentation: 'Redraws the screen immediately, used together with tracer for fast animations.',
    kind: 'Method',
  },
  {
    name: 'colormode',
    detail: 'colormode(cmode)',
    documentation: 'Sets whether colors are given as values from 0 to 1 or 0 to 255.',
    kind: 'Method',
  },
  {
    name: 'listen',
    detail: 'listen()',
    documentation: 'Makes the drawing window start listening for keyboard events.',
    kind: 'Method',
  },
  {
    name: 'onkey',
    detail: 'onkey(fun, key)',
    documentation: 'Calls a function whenever the given key is pressed.',
    kind: 'Method',
  },
  {
    name: 'onkeypress',
    detail: 'onkeypress(fun, key)',
    documentation: 'Calls a function while the given key is held down.',
    kind: 'Method',
  },
  {
    name: 'onkeyrelease',
    detail: 'onkeyrelease(fun, key)',
    documentation: 'Calls a function when the given key is released.',
    kind: 'Method',
  },
  {
    name: 'onclick',
    detail: 'onclick(fun)',
    documentation: 'Calls a function whenever the turtle or screen is clicked.',
    kind: 'Method',
  },
  {
    name: 'ontimer',
    detail: 'ontimer(fun, t)',
    documentation: 'Calls a function once after waiting the given number of milliseconds.',
    kind: 'Method',
  },
  {
    name: 'exitonclick',
    detail: 'exitonclick()',
    documentation: 'Closes the drawing window the next time it is clicked.',
    kind: 'Method',
  },
  {
    name: 'getcanvas',
    detail: 'getcanvas()',
    documentation: 'Returns the drawing canvas the turtle is using.',
    kind: 'Method',
  },
];

const wordAfterDotPattern = /\w+\.\w*$/;

export const registerTurtleCompletions = (monaco: typeof Monaco) => {
  if (registered) return;
  registered = true;

  const kindOf = (kind: CompletionKind) => {
    if (kind === 'Class') return monaco.languages.CompletionItemKind.Class;
    if (kind === 'Function') return monaco.languages.CompletionItemKind.Function;
    return monaco.languages.CompletionItemKind.Method;
  };

  monaco.languages.registerCompletionItemProvider('python', {
    triggerCharacters: ['.'],
    provideCompletionItems: (model, position) => {
      const textUntilPosition = model
        .getLineContent(position.lineNumber)
        .slice(0, position.column - 1);
      if (!wordAfterDotPattern.test(textUntilPosition)) {
        return { suggestions: [] };
      }

      const word = model.getWordUntilPosition(position);
      const range: Monaco.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions: Monaco.languages.CompletionItem[] = turtleCompletions.map((item) => ({
        label: item.name,
        kind: kindOf(item.kind),
        detail: item.detail,
        documentation: item.documentation,
        insertText: item.name,
        range,
      }));

      return { suggestions };
    },
  });
};
