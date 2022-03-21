grammar csce322h0mework01part02;

@members{

boolean up = false;
boolean down = false;
boolean right = false;
boolean left = false;
boolean valid = true;
int players = 0;
int moves = 0;
int mazeSymbols = 0;
int emptySpace = 0;

}

// rules
mazeGame: maze moves semantics EOF|moves maze semantics EOF;
moves: section sectionStart listStart moveTokens listEnd sectionEnd;
moveTokens: moveSymbols PIPE moveSymbols PIPE moveSymbols PIPE moveSymbols PIPE moveSymbols;
moveSymbols: moveToken PIPE moveSymbols | moveToken;
moveToken: moveUp | moveDown | moveLeft | moveRight;
maze: section sectionStart mazeBegin validRows mazeEnd sectionEnd;
validRows: row rowEnd row rowEnd row rowEnd row rowEnd row rowEnd row rowEnd row rowEnd row rowEnd row rowEnd row;
row: validColumns rowEnd row | validColumns;
validColumns: column column column column column column column column column column;
column: mazeToken column | mazeToken;
mazeToken: empty | wall | player;


/*exit: exitRow | exitColumn;
exitRow: mazeBegin mazeToken empty | mazeBegin empty mazeToken | mazeToken empty mazeEnd | empty mazeToken mazeEnd;
exitColumn: rowEnd empty | empty rowEnd;*/



section: TITLE;
sectionStart: BEGIN;
sectionEnd: END;
listStart: LISTSTART;
listEnd: LISTEND;
mazeBegin: MAZESTART;
mazeEnd: MAZEEND;
moveUp: UP{moves++;up=true;};
moveDown: DOWN{moves++;down=true;};
moveLeft: LEFT{moves++;left=true;};
moveRight: RIGHT{moves++;right=true;};
empty: EMPTY{mazeSymbols++; emptySpace++;};
wall: WALL{mazeSymbols++;};
player: PLAYER{mazeSymbols++; players++;};
rowEnd: ROWEND;



semantics:
{
	if(players < 2 || players > 4)
	{
		System.out.println("SEMANTIC ERROR 1");
		valid=false;
	}

	if((emptySpace / mazeSymbols) > 0.6)
	{
    		System.out.println("SEMANTIC ERROR 2");
    		valid = false;
    }

	if(!(up && down && left && right))
	{
		System.out.println("SEMANTIC ERROR 3");
		valid = false;
	}

	if(valid == true)
	{
		System.out.println("There are " + emptySpace + " empty spaces in the maze.");
	}
};



// tokens
BEGIN           : '<section>' ;
END             : '</section>' ;
TITLE           : 'moves' | 'maze' ;
UP              : 'u' ;
DOWN            : 'd' ;
RIGHT           : 'r' ;
LEFT            : 'l' ;
EMPTY           : '-' ;
WALL            : 'x' ;
PLAYER          : [0-9] ;
ROWEND          : '<gr>' ;
MAZESTART       : '<grid>' ;
MAZEEND         : '</grid>' ;
LISTSTART       : '<list>' ;
LISTEND         : '</list>' ;
PIPE            : '|' ;
WS              : [ \t\r\n]+ { skip(); };
