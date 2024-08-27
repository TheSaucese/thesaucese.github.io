# AmateursCTF 2024 - Typo


can you make sure i didn't make a typo?

<!--more-->

```python
import random as ran
intVar = int('1665663c', 20)
ran.seed(intVar)

padding = '\r'r'\r''r''\\r'r'\\r\r'r'r''r''\\r'r'r\r'r'r\\r''r'r'r''r''\\r'r'\\r\r'r'r''r''\\r'r'rr\r''\r''r''r\\'r'\r''\r''r\\\r'r'r\r''\rr'

pay = [
    b'arRRrrRRrRRrRRrRr',
    b'aRrRrrRRrRr',
    b'arRRrrRRrRRrRr',
    b'arRRrRrRRrRr',
    b'arRRrRRrRrrRRrRR'
    b'arRRrrRRrRRRrRRrRr',
    b'arRRrrRRrRRRrRr',
    b'arRRrrRRrRRRrRr'
    b'arRrRrRrRRRrrRrrrR',
]

def lamfunc(y):
    return bytearray([x - 1 for x in y])

def res(y):
    return bytearray([x + 1 for x in y])

def handle(hex):
    for list in range(1, len(hex) - 1, 2):
        hex[list], hex[list + 1] = hex[list + 1], hex[list]
    for id in range(0, len(hex) - 1, 2):
        hex[id], hex[id + 1] = hex[id + 1], hex[id]
    return hex

randres = [handle, lamfunc, res]

randres = [ran.choice(randres) for x in range(128)]

def reverse(ar_int):
    chars = "0123456789abcdefg"  
    hex_str = ''
    while ar_int > 0:
        remainder = ar_int % 17
        hex_str = chars[remainder] + hex_str
        ar_int = ar_int // 17
    bytes_ar = bytearray.fromhex(hex_str)
    return bytes_ar

def handle(arr, ar):
    ar = int(ar, 16)
    for r in arr[::-1]:
        ar -= int(r, 35)
    return reverse(ar)

def ran(arr, ar):
    for r in ar[::-1]:
        arr = randres[r](arr)
    return arr

re = '5915f8ba06db0a50aa2f3eee4baef82e70be1a9ac80cb59e5b9cb15a15a7f7246604a5e456ad5324167411480f893f97e3'
flag = handle(pay,re) 

randomfunc = ran(flag, padding.encode())

print(randomfunc.decode())
```

## Explanation

Converts a hexadecimal string to integer -> applies a series of random operations on a byte array based on random choices -> transforms the result back to a byte array and decodes it to a string.

