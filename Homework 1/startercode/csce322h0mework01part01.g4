grammar csce322h0mework01part01;

// rules
mazeGame        : move maze end EOF | maze move end EOF;
maze            : mazeTitle sectionStart mazeStart mazeSymbols+ mazeEnd sectionEnd ;
move            : movesTitle sectionStart listStart moveSymbols+ listEnd sectionEnd;
moveSymbols     : moveSymbol PIPE moveSymbols | moveSymbol;
mazeSymbols     : mazeSymbol rowEnd mazeSymbols | mazeSymbol rowEnd emptySymbol |
                  emptySymbol rowEnd mazeSymbols | emptySymbol | mazeSymbol;

mazeTitle       : MAZETITLE {System.out.println("game Section");};
movesTitle      : MOVESTITLE {System.out.println($MOVESTITLE.text + " Section");};
sectionStart    : BEGIN {System.out.println("Begin the Section");};
sectionEnd      : END {System.out.println("End the Section");};
moveSymbol      : MOVES {System.out.println("Move: " + $MOVES.text);};
mazeSymbol      : MAZE {System.out.println("Space: " + $MAZE.text);};
emptySymbol     : EMPTY {System.out.println("Space: Empty"); };
rowEnd          : ROWEND {System.out.println("End the Row");};
mazeStart       : MAZESTART {System.out.println("Start the Game");};
mazeEnd         : MAZEEND {System.out.println("End the Game");};
listStart       : LISTSTART {System.out.println("Begin the List");} ;
listEnd         : LISTEND {System.out.println("End the List");} ;
end             : {System.out.println("End the File");} ;



// tokens
BEGIN           : '<section>' ;
END             : '</section>' ;
MAZETITLE       : 'maze' ;
MOVESTITLE      : 'moves' ;
MOVES           : 'u' | 'd' | 'r' | 'l' ;
MAZE            : 'x' | [0-9] ;
EMPTY           : '-';
ROWEND          : '<gr>' ;
MAZESTART       : '<grid>' ;
MAZEEND         : '</grid>' ;
LISTSTART       : '<list>' ;
LISTEND         : '</list>' ;
PIPE            : '|' ;
WS              : [ \t\r\n]+ { skip(); };