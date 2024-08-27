# HTB Cyber-Apocalypse 2024 - QuickScan


QuickScan is a Medium reversing challenge. Players will be sent a series of small, randomly generated ELF files and must rapidly and automatically anlalyse them in order to extract required data.

<!--more-->

```python
from pwn import *

#94.237.62.48 32757
p = remote('94.237.62.48',32757)
m = (p.recv())
print(m.decode())

def find_substring_index(string, substring):
        index = string.find(substring) + len(substring)
        return index
    

while True:

    start_index = m.find(b"ELF:  ") + len(b"ELF:  ")
    end_index = m.find(b"\n", start_index)
    elf_data_base64 = m[start_index:end_index]

    # Decode base64-encoded ELF data
    elf_data = base64.b64decode(elf_data_base64)

    hexxer = elf_data.hex()
    
    substring = "488d35"
    
    index = find_substring_index(hexxer, substring)
    padding = int.from_bytes(bytes.fromhex(hexxer[index:index+8]), byteorder='little', signed=True)*2
    start = index+8
    end = start+padding
    r = hexxer[end:end+48]

    print(hexxer)
    
    p.sendline(r)

    m = p.recv()

    print(m.decode())
```

## Explanation

Decodes ELF binary from Base64 -> converts to hex -> finds substring index for opcode I forgot about -> calculates padding -> extracts and prints portion of hex data based on padding.

