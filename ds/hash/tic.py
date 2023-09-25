

board = [
            [0, 1, 0],
            [0, None, None],
            [0, None, None]
        ]



cross_one = []
cross_two = []
size = 2


for i in range(len(board)):
    if len(set(board[i])) == 1 and None not in board[i]:
        print(f"{set(board[i])} is the winner!")
        exit()  


    # Collumns
    if board[i][0] == board[i][1] and board[i][1] == board[i][2]:
        print(board[i][0], "is the winner")    
