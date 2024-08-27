# HTB Cyber-Apocalypse 2024 - Colored Squares


In the heart of an ancient forest stands a coloured towering tree, its branches adorned with countless doors. Each door, when opened, reveals a labyrinth of branching paths, leading to more doors beyond. As you venture deeper into the maze, the forest seems to come alive with whispered secrets and shifting shadows. With each door opened, the maze expands, presenting new choices and challenges at every turn. Can you understand what's going on and get out of this maze?

<!--more-->

```python
from z3 import *

flag = BitVecs('v0 v1 v2 v3 v4 v5 v6 v7 v8 v9 v10 v11 v12 v13 v14 v15 v16 v17 v18 v19 v20 v21', 8)

s = Solver()

for i in range(len(flag)):
    s.add(flag[i] >= 48)
    s.add(flag[i] <= 125)

s.add(flag[0] == ord('H'))
s.add(flag[1] == ord('T'))
s.add(flag[2] == ord('B'))
s.add(flag[3] == ord('{'))
s.add(flag[21] == ord('}'))

# Additional constraints
s.add(flag[7] - flag[18] == flag[8] - flag[9])
s.add(flag[6] + flag[10] == flag[16] + flag[20] + 12)
s.add(flag[8] * flag[14] == 2 * flag[18] * flag[13])
s.add(flag[19] == flag[6])
s.add(flag[9] + 1 == flag[17] - 1)
s.add(flag[11] == 2 * (flag[5] + 7))
s.add(flag[5] + flag[2]/2 == flag[1])
s.add(flag[16] - 9 == flag[13] + 4)
s.add(flag[12] == 17 * 3)
s.add(flag[4] - flag[5] + flag[12] == flag[14] + 20)
s.add(flag[12] * flag[15] == 24 * flag[14])
s.add(flag[18] + flag[4] == 173)
s.add(flag[6] == flag[5] + 63)
s.add(flag[16] * 32 == flag[0] * flag[7])
s.add(flag[17] - flag[15] == flag[18] + 1)

s.add(flag[20] == ord('s'))

if s.check() == sat:
    m = s.model()
    result = ''.join([chr(m.evaluate(flag[i]).as_long()) for i in range(len(flag))])
    print("Flag:", result)
else:
    print("No solution found.")

```

## Explanation

Solves for a 22-character flag using Z3 solver -> imposes constraints on flag characters -> finds valid flag satisfying all conditions.

