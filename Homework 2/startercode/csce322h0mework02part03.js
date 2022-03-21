module.exports = {
    manyPlayersOneMove: manyPlayersOneMove
}

var helpers = require( './helpers' );

function manyPlayersOneMove(maze){
    
    function whatever(move)
	{
        var numPlayers = 0;
        var player = 1;

        while(playerExists(player, maze))
        {
            numPlayers = numPlayers + 1;
            player = player + 1;
        }

        var location = playerLocation('1', maze); 
        var x = location[0];
        var y = location[1]; 
        var rows = maze.length; 
        var columns = maze[0].length; 

		for(var i = 1; i <= numPlayers; i++)
		{
            location = playerLocation(i, maze);
            x = location[0]; 
            y = location[1];
            if(x != 0 && y != 0 && x != (rows - 1) && y != (columns - 1))
			    maze = newMaze(maze, i, move[i - 1]);
		}	
	
		return maze;


    }

    return whatever;
}

//generating new maze based on move given 
function newMaze(maze, player, move)
{
    var location = playerLocation(player, maze);
    var x = location[0];
    var y = location[1]; 
    var rows = maze.length; 
    var columns = maze[0].length; 
    var newDirection = '';
    
        //if player can't move in the direction given
        //returns original maze 
        if(!canMove(maze, x, y, move, rows, columns))
        {
            return maze; 
        }
        
        if(move == 'u')
        {
            var info = moving(maze, x, y, 'u'); 

			maze = info[0];
			x = info[1];
			y = info[2];

		    newDirection = availableMoves(maze, x, y, move, rows, columns); 

			while(newDirection != 'x' && playerLocation(player, maze) != 2)
            {
					
                info = moving(maze, x, y, newDirection); 
				maze = info[0];
				x = info[1];
				y = info[2];
		        newDirection = availableMoves(maze, x, y, newDirection, rows, columns);
    
            }
        }
        
        else if(move == 'd')
        {
            var info = moving(maze, x, y, 'd'); 

			maze = info[0];
			x = info[1];
			y = info[2];

		    newDirection = availableMoves(maze, x, y, move, rows, columns); 

			while(newDirection != 'x' && playerLocation(player, maze) != 2)
            {
					
                info = moving(maze, x, y, newDirection); 
				maze = info[0];
				x = info[1];
				y = info[2];
		        newDirection = availableMoves(maze, x, y, newDirection, rows, columns);
    
            }
        }

        else if(move == 'r')
        {
            var info = moving(maze, x, y, 'r'); 

			maze = info[0];
			x = info[1];
			y = info[2];

		    newDirection = availableMoves(maze, x, y, move, rows, columns); 

			while(newDirection != 'x' && playerLocation(player, maze) != 2)
            {
					
                info = moving(maze, x, y, newDirection); 
				maze = info[0];
				x = info[1];
				y = info[2];
		        newDirection = availableMoves(maze, x, y, newDirection, rows, columns);
    
            }
        }

        else if(move == 'l')
        {
            var info = moving(maze, x, y, 'l'); 

			maze = info[0];
			x = info[1];
			y = info[2];

		    newDirection = availableMoves(maze, x, y, move, rows, columns); 

			while(newDirection != 'x' && playerLocation(player, maze) != 2)
            {
					
                info = moving(maze, x, y, newDirection); 
				maze = info[0];
				x = info[1];
				y = info[2];
		        newDirection = availableMoves(maze, x, y, newDirection, rows, columns);
    
            }
        }

        return maze; 
}

//checking if player can move in the direction given
function canMove(maze, x, y, dir, rows, columns)
{
    //initializing variables
    var up = ''; 
    var down = ''; 
    var left = ''; 
    var right = ''; 

    if(y - 1 >= 0)
    {
        left = maze[x][y - 1]; 
    }

    if(y + 1 < columns)
    {
        right = maze[x][y + 1]; 
    }

    if(x - 1 >= 0)
    {
        up = maze[x - 1][y];
    }

    if(x + 1 < rows)
    {
        down = maze[x + 1][y]; 
    }

    if(dir == 'u' && up == '-')
    {
        return true; 
    }
    
    else if(dir == 'd' && down == '-')
    {
        return true; 
    }

    else if(dir == 'r' && right == '-')
    {
        return true; 
    }

    else if(dir == 'l' && left == '-')
    {
        return true; 
    }

    else
    {
        return false; 
    }
}

//moves the player in the direction given 
function moving(maze, x, y, dir)
{
    if(dir == 'u')
    {
        maze[x - 1][y] = maze[x][y];
        maze[x][y] = '-';
        x = x - 1; 
        return [maze, x, y]; 
    }

    else if(dir == 'd')
    {
        maze[x + 1][y] = maze[x][y];
        maze[x][y] = '-';
        x = x + 1; 
        return [maze, x, y]; 
    }

    else if(dir == 'r')
    {
        maze[x][y + 1] = maze[x][y];
        maze[x][y] = '-';
        y = y + 1; 
        return [maze, x, y]; 
    }

    else if(dir == 'l')
    {
        maze[x][y - 1] = maze[x][y];
        maze[x][y] = '-';
        y = y - 1; 
        return [maze, x, y]; 
    }

    else
        return -1; 
}

//checking if there is only one available space to move 
//and there are no available moves other than back 
function availableMoves(maze,x,y,prevDirection,rows,columns){
	
    var newDirection='x';
	var numOfPaths=0;
	var currentAvailPath='';
	
    if(prevDirection=='u'){

		if(x-1>=0 && maze[x-1][y]=='-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='u';

		}
		if(y-1>=0 && maze[x][y-1]=='-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='l';

		}

		if(y+1<columns && maze[x][y+1]=='-'){
			numOfPaths=numOfPaths+1;
			currentAvailPath='r';
		}
		if(numOfPaths==1){
			return currentAvailPath;
		}
	}
	
    else if(prevDirection=='d'){

		if(x+1<rows && maze[x+1][y]=='-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='d';

		}

		if(y-1>=0 && maze[x][y-1]=='-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='l';

		}

		if(y+1<columns && maze[x][y+1]=='-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='r';

		}

		if(numOfPaths==1)
        {

			return currentAvailPath;

		}		
	}
	
    else if(prevDirection=='l')
    {

		if(x+1<rows && maze[x+1][y]=='-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='d';

		}
		if(x-1>=0 && maze[x-1][y]=='-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='u';

		}
		if(y-1>=0 && maze[x][y-1]=='-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='l';

		}
		if(numOfPaths==1){

			return currentAvailPath;

		}		
	}
	
    else if(prevDirection=='r')
    {
		
        if(x+1 < rows && maze[x+1][y] == '-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='d';

		}
		if(y+1<columns && maze[x][y+1]=='-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='r';

		}
		if(x-1 >= 0 && maze[x-1][y] == '-'){

			numOfPaths=numOfPaths+1;
			currentAvailPath='u';

		}
		if(numOfPaths == 1){

			return currentAvailPath;

		}		
	}
	return newDirection;
}

//determine location of player in maze
function playerLocation(player, maze)
{
    for(var i = 0; i < maze.length; i++)
    {
        for(var j = 0; j < maze[0].length; j++)
        {
            if(maze[i][j] == player)
            {
                return [i, j]; 
            }
        }
    }

    return 2; 

}

function playerExists(player, maze)
{
    for(var i = 0; i < maze.length; i++)
    {
        for(var j = 0; j < maze[0].length; j++)
        {
            if(maze[i][j] == player)
            {
                return true; 
            }
        }
    }

    return false; 

}

