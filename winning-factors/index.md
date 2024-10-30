# DEADFACE 2024 - Winning Factors


Description : As another test of your programming prowess, Turbo Tactical wants to see if you can write a script to solve mathematic equations being served by a remote server within 3 seconds.

<!--more-->

```python
#147.182.245.126:33001

#setup pwntools
from pwn import *
from math import *

#connect to the server
conn = remote('147.182.245.126', 33001)
p = conn.recvline()
print(p)
n = len(p)
number = int(p[27:n-2])
f = factorial(number)

print(f)

conn.send(str(f).encode())

conn.interactive()


```

## Explanation

Pretty Obvious.

